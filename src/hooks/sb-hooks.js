import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_KEY;

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default function useClient() {
  return supabaseClient;
}
