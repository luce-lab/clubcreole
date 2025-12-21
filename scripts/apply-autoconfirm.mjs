
#!/usr/bin/env node
import { Client } from 'ssh2';

const config = {
  host: '37.59.121.40',
  port: 22,
  username: 'ubuntu',
  password: 'Catilo'
};

const COMPOSE_FILE = '/data/coolify/services/c00o4kwowko4wo4w4kosokcw/docker-compose.yml';
const SERVICE_DIR = '/data/coolify/services/c00o4kwowko4wo4w4kosokcw';

const conn = new Client();

function execCommand(conn, command) {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) reject(err);
      let output = '';
      stream.on('close', (code) => resolve({ code, output }));
      stream.on('data', (data) => { output += data.toString(); });
      stream.stderr.on('data', (data) => { output += data.toString(); });
    });
  });
}

conn.on('ready', async () => {
  console.log('✅ Connecté au serveur\n');

  // 1. Lire le fichier avec sudo
  console.log('1️⃣  Lecture du docker-compose.yml...');
  let result = await execCommand(conn, `sudo cat ${COMPOSE_FILE} | grep -n "GOTRUE_MAILER_AUTOCONFIRM"`);
  console.log(`   Trouvé: ${result.output.trim() || 'Non trouvé dans le fichier'}`);

  // 2. Modifier avec sudo
  console.log('\n2️⃣  Modification GOTRUE_MAILER_AUTOCONFIRM=false -> true...');
  result = await execCommand(conn, `sudo sed -i 's/GOTRUE_MAILER_AUTOCONFIRM=false/GOTRUE_MAILER_AUTOCONFIRM=true/g' ${COMPOSE_FILE}`);

  // 3. Vérifier le changement
  result = await execCommand(conn, `sudo cat ${COMPOSE_FILE} | grep "GOTRUE_MAILER_AUTOCONFIRM"`);
  console.log(`   Après modification: ${result.output.trim() || 'Variable non trouvée'}`);

  // 4. Redéployer via docker compose
  console.log('\n3️⃣  Redéploiement du service auth...');
  result = await execCommand(conn, `cd ${SERVICE_DIR} && sudo docker compose up -d supabase-auth`);
  console.log(`   ${result.output}`);

  // 5. Attendre
  console.log('4️⃣  Attente du démarrage (10 secondes)...');
  await new Promise(r => setTimeout(r, 10000));

  // 6. Vérifier la variable dans le conteneur
  console.log('\n5️⃣  Vérification finale...');
  result = await execCommand(conn, `docker exec supabase-auth-c00o4kwowko4wo4w4kosokcw env | grep GOTRUE_MAILER_AUTOCONFIRM`);
  console.log(`   ${result.output.trim()}`);

  if (result.output.includes('true')) {
    console.log('\n✅ SUCCESS: GOTRUE_MAILER_AUTOCONFIRM=true');
  } else {
    console.log('\n⚠️  La variable est toujours à false');
    console.log('   Cela peut nécessiter un redéploiement complet via Coolify UI');
  }

  conn.end();
  process.exit(0);
}).on('error', (err) => {
  console.error('Erreur:', err.message);
  process.exit(1);
}).connect(config);
