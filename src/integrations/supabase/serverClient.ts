// Server-side Supabase client for Node.js scripts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types.ts';

export const SUPABASE_URL = "https://psryoyugyimibjhwhvlh.supabase.co";

// Pour les scripts d'import, utilisez la clé service_role depuis .env
// Ajoutez VITE_SUPABASE_SERVICE_ROLE_KEY dans votre fichier .env
// IMPORTANT: Ne commitez JAMAIS cette clé dans Git !
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0";

// Initialize Supabase client for server-side usage (no localStorage)
export const supabaseServer = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
