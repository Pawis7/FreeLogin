import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hiogvgvswbyeeoungsgy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpb2d2Z3Zzd2J5ZWVvdW5nc2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MjcxMjEsImV4cCI6MjA1NTUwMzEyMX0.DyebQTBAFGUUL73rGdDz03aC5UQrPPyi5MVwMrCT33E";
export const supabase = createClient(supabaseUrl, supabaseKey);