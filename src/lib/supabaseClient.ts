import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function makeMissingClientProxy(message: string) {
  const thrower = () => {
    throw new Error(message);
  };
  return new Proxy({}, {
    get: () => thrower,
    apply: () => { thrower(); }
  });
}

const missingMsg =
  'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment (for Vercel: add them as project env vars).';

export const supabase: SupabaseClient | any = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true } })
  : makeMissingClientProxy(missingMsg);
