import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://vbspdngpwtzfxlkwjwdz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZic3Bkbmdwd3R6Znhsa3dqd2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzc0MDksImV4cCI6MjA5MzgxMzQwOX0.ZdqSbd6i1RhUVN6tMXHeoemae5VnjK5H7EPdrSqSbU0";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);