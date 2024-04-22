import { createClient } from "@supabase/supabase-js";

// Log environment variables to ensure they are being loaded correctly
console.log("Supabase URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("Supabase Key:", process.env.REACT_APP_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
