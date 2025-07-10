import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
