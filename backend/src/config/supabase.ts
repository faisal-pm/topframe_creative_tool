
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btjntmtclwmlncmvbzqy.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseKey) {
  throw new Error('SUPABASE_ANON_KEY environment variable is not set');
}
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema types
export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface Creative {
  id: string;
  name: string;
  width: number;
  height: number;
  content: string;
  assets?: any;
  script?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Campaign {
  id: string;
  name: string;
  gam_ad_unit_id?: string;
  targeting?: any;
  schedule?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  creative_id: string;
}

export interface Analytics {
  id: string;
  impressions: number;
  clicks: number;
  ctr: number;
  viewability: number;
  date: string;
  creative_id: string;
  campaign_id: string;
}