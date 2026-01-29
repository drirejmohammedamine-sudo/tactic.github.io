
import { createClient } from '@supabase/supabase-js';

// Your Real Supabase Project URL
const supabaseUrl = 'https://ezxhxczobrevczecjkxi.supabase.co'; 

// Your Public API Key
const supabaseKey = 'sb_publishable_p6eoX4Yi8e2Gj2U11iL3FQ_QYAWt02K';

export const supabase = createClient(supabaseUrl, supabaseKey);
