#!/bin/bash

# Script complet de TRANSFERT et IMPORTATION du dump Supabase
# Exécution complète en une seule commande

echo "🚀 SCRIPT COMPLET DE TRANSFERT ET IMPORTATION SUPABASE"
echo "=================================================="
echo ""

# Configuration
LOCAL_IP="172.28.114.141"
SERVER_IP="37.59.121.40"
SERVER_USER="ubuntu"
SERVER_PASS="Catilo"
DUMP_FILE="supabase_dump_20251028_164145.sql"
HTTP_PORT="8888"

echo "📋 Configuration:"
echo "- IP Locale: $LOCAL_IP"
echo "- Serveur distant: $SERVER_IP"
echo "- Utilisateur: $SERVER_USER"
echo "- Fichier: $DUMP_FILE"
echo "- Port HTTP: $HTTP_PORT"
echo ""

# Vérification du fichier local
echo "🔍 Étape 1: Vérification du fichier local"
if [ ! -f "$DUMP_FILE" ]; then
    echo "❌ Fichier dump non trouvé: $DUMP_FILE"
    echo "Génération du dump requise..."
    echo "docker compose -f docker-compose.supabase.yml up -d"
    echo "sleep 30"
    echo "docker compose -f docker-compose.supabase.yml exec supabase-db pg_dump -U postgres postgres --data-only --disable-triggers > $DUMP_FILE"
    exit 1
fi

echo "✅ Fichier dump trouvé: $(du -h $DUMP_FILE | cut -f1)"

# Démarrage du serveur HTTP local
echo ""
echo "🌐 Étape 2: Démarrage du serveur HTTP local"
echo "Démarrage sur http://$LOCAL_IP:$HTTP_PORT"

# Vérifier si le port est déjà utilisé
if lsof -Pi :$HTTP_PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port $HTTP_PORT déjà utilisé, tentative d'arrêt..."
    pkill -f "python3 -m http.server $HTTP_PORT"
    sleep 2
fi

# Démarrer le serveur HTTP en arrière-plan
cd transfer_files
python3 -m http.server $HTTP_PORT > /tmp/http_server.log 2>&1 &
HTTP_PID=$!
cd ..

echo "✅ Serveur HTTP démarré (PID: $HTTP_PID)"

# Attendre que le serveur soit prêt
sleep 3

# Test de connexion au serveur HTTP
echo "🔍 Test de connexion au serveur HTTP..."
if curl -s --connect-timeout 5 "http://$LOCAL_IP:$HTTP_PORT/$DUMP_FILE" | head -c 100 > /dev/null; then
    echo "✅ Serveur HTTP accessible"
else
    echo "❌ Serveur HTTP inaccessible"
    kill $HTTP_PID 2>/dev/null
    exit 1
fi

# Création du script distant
echo ""
echo "📝 Étape 3: Création du script d'importation distant"

cat > remote_import.sh << 'REMOTE_EOF'
#!/bin/bash

# Configuration sur le serveur distant
DB_NAME="clubcreole_db"
DB_USER="postgres"
DUMP_FILE="/home/ubuntu/dumps/supabase_dump_20251028_164145.sql"

echo "🔄 Importation sur le serveur distant..."

# Installation de PostgreSQL si nécessaire
if ! command -v psql &> /dev/null; then
    echo "📦 Installation de PostgreSQL..."
    sudo apt update
    sudo DEBIAN_FRONTEND=noninteractive apt install -y postgresql postgresql-contrib
fi

# Démarrage du service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Création utilisateur si nécessaire
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
    sudo -u postgres createuser -s $DB_USER
fi

# Suppression ancienne base si exists
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    sudo -u postgres dropdb $DB_NAME
fi

# Création nouvelle base
sudo -u postgres createdb -O $DB_USER $DB_NAME

# Importation
echo "📥 Importation des données..."
sudo -u postgres psql -d $DB_NAME -f $DUMP_FILE

echo "✅ Importation terminée !"

# Vérification
echo "🔍 Vérification - Tables créées:"
sudo -u postgres psql -d $DB_NAME -c "\dt" 2>/dev/null | head -10

echo ""
echo "🎯 Base de données prête :"
echo "- Hôte: localhost"
echo "- Base: $DB_NAME"
echo "- Utilisateur: $DB_USER"
echo "- Port: 5432"
REMOTE_EOF

chmod +x remote_import.sh

# Transfert du script distant
echo ""
echo "📤 Étape 4: Transfert du script vers le serveur distant"
scp remote_import.sh $SERVER_USER@$SERVER_IP:/tmp/import_script.sh

# Transfert du dump
echo "📤 Étape 5: Transfert du dump vers le serveur distant"
echo "Téléchargement depuis http://$LOCAL_IP:$HTTP_PORT/$DUMP_FILE..."

# Commande SSH pour télécharger et importer
SSH_COMMAND="mkdir -p /home/ubuntu/dumps && 
cd /home/ubuntu/dumps && 
wget -q http://$LOCAL_IP:$HTTP_PORT/$DUMP_FILE && 
chmod +x /tmp/import_script.sh && 
/tmp/import_script.sh"

echo "Exécution sur le serveur distant..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "$SSH_COMMAND"

# Vérification du résultat
echo ""
echo "🔍 Étape 6: Vérification finale"

if sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "test -f /home/ubuntu/dumps/$DUMP_FILE && echo 'Fichier présent'"; then
    echo "✅ Fichier transféré avec succès"
else
    echo "❌ Échec du transfert du fichier"
fi

# Arrêt du serveur HTTP
echo ""
echo "🛑 Étape 7: Nettoyage"
kill $HTTP_PID 2>/dev/null
echo "✅ Serveur HTTP arrêté"

# Nettoyage des fichiers temporaires
rm -f remote_import.sh

echo ""
echo "🎉 SCRIPT TERMINÉ !"
echo ""
echo "Pour vous connecter à la base de données sur le serveur distant:"
echo "ssh $SERVER_USER@$SERVER_IP"
echo "sudo -u postgres psql -d clubcreole_db"
echo ""
echo "Ou avec une application cliente PostgreSQL:"
echo "- Hôte: $SERVER_IP"
echo "- Base: clubcreole_db"  
echo "- Utilisateur: postgres"
echo "- Port: 5432"