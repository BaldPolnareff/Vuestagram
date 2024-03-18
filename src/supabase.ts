import { createClient } from '@supabase/supabase-js'
import * as jsonData from '../.env/supabaseCredentials.json'

const supabaseUrl = jsonData.SUPABASE_URL;
const supabaseKey = jsonData.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)