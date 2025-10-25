import 'dotenv/config';
import { supabaseServer } from '../integrations/supabase/serverClient';

async function testConnection() {
  try {
    console.log('Test de connexion à Supabase...');
    console.log('URL:', supabaseServer.supabaseUrl);

    const { data, error } = await supabaseServer
      .from("accommodations")
      .select("*")
      .limit(1);

    if (error) {
      console.error('Erreur:', error);
      throw error;
    }

    console.log('Connexion réussie !');
    console.log('Nombre de résultats:', data?.length || 0);
    if (data && data.length > 0) {
      console.log('Premier résultat:', data[0]);
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    // Log more details
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  }
}

testConnection();
