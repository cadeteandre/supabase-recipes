import { createClient } from "@supabase/supabase-js";

const supabase_URL = import.meta.env.VITE_SUPABASE_URL;
const supabase_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabase_URL, supabase_KEY);

export default supabase;