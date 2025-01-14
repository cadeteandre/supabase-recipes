import { createClient } from "@supabase/supabase-js";

const supabase_URL = 'https://tzhvtwmdqcprsxfyokkw.supabase.co';
const supabase_KEY = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabase_URL, supabase_KEY);

export default supabase;