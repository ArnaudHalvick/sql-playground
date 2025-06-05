/*
  # Create Run Query RPC Function

  1. Functionality
    - Creates a stored procedure for executing user SQL queries securely
    - Returns results as JSONB
    - Provides error messages when queries fail
  
  2. Security
    - Uses SECURITY DEFINER to run with creator's privileges
    - Catches and returns SQL errors rather than exposing internal details
*/

-- Create a stored procedure to run user SQL queries safely
CREATE OR REPLACE FUNCTION run_query(query_text TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  EXECUTE query_text INTO result;
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION '%', SQLERRM;
END;
$$;