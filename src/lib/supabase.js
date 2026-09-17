import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swaleqcqxflzabblysjj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YWxlcWNxeGZsemFiYmx5c2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDgzODMsImV4cCI6MjEwNTIyNDM4M30.Aa4MXYEuSAgT8Ek9dKJf0JHBulx8Qy1iS7GWxWQOhwc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
