import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// DEBUGOWANIE
console.log('🔍 Supabase URL:', supabaseUrl);
console.log('🔍 Supabase Key (first 30 chars):', supabaseAnonKey?.substring(0, 30));

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ BŁĄD: Brak kluczy Supabase w .env.local!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
