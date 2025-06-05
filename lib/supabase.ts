import { createClient } from '@supabase/supabase-js';

// These will be automatically populated in the browser when using Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function executeQuery(query: string): Promise<{ data: any[] | null; error: any }> {
  try {
    const { data, error } = await supabase.rpc('run_query', { query_text: query });
    
    if (error) {
      return { data: null, error: error.message };
    }
    
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || 'An error occurred while executing the query',
    };
  }
}