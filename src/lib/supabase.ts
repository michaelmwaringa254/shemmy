import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for our database
export interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  urgency: 'normal' | 'urgent' | 'asap';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CMSContent {
  id: string;
  section: string;
  key: string;
  type: 'text' | 'image' | 'html' | 'json';
  value: string;
  metadata: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}