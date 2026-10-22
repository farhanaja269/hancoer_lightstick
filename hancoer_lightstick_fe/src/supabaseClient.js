import { createClient } from '@supabase/supabase-js';

// GANTI DENGAN URL PROJECT SUPABASE KAMU
const supabaseUrl = 'https://fwcuhnfvjpaqdtgetahm.supabase.co';
// GANTI DENGAN ANON PUBLIC KEY SUPABASE KAMU'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3VobmZ2anBhcWR0Z2V0YWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NjA2MzUsImV4cCI6MjEwODAzNjYzNX0.GPv09p_bSUK912rYcvI-Y3vEC5B0iO3T_3ctpCRaIRc';

export const supabase = createClient(supabaseUrl, supabaseKey);