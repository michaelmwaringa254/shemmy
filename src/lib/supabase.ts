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

// CRM Types
export interface CRMContact {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  website?: string;
  linkedin_url?: string;
  contact_source: string;
  contact_type: 'prospect' | 'customer' | 'partner' | 'vendor';
  status: 'active' | 'inactive' | 'blocked';
  tags?: string[];
  notes?: string;
  assigned_to?: string;
  last_contacted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMLead {
  id: string;
  contact_id?: string;
  title: string;
  description?: string;
  source: 'website' | 'referral' | 'social_media' | 'email' | 'phone' | 'event' | 'advertisement' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_value?: number;
  probability: number;
  expected_close_date?: string;
  assigned_to?: string;
  tags?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMOpportunity {
  id: string;
  contact_id?: string;
  lead_id?: string;
  name: string;
  description?: string;
  value: number;
  probability: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  pipeline_id?: string;
  expected_close_date?: string;
  actual_close_date?: string;
  assigned_to?: string;
  tags?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMTask {
  id: string;
  title: string;
  description?: string;
  task_type: 'call' | 'email' | 'meeting' | 'follow_up' | 'proposal' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
  completed_at?: string;
  assigned_to?: string;
  contact_id?: string;
  lead_id?: string;
  opportunity_id?: string;
  tags?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMActivity {
  id: string;
  activity_type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal' | 'contact_created' | 'lead_created';
  title: string;
  description?: string;
  contact_id?: string;
  lead_id?: string;
  opportunity_id?: string;
  task_id?: string;
  user_id?: string;
  metadata?: any;
  created_at: string;
}

export interface CRMPipeline {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CRMPipelineStage {
  id: string;
  pipeline_id: string;
  name: string;
  description?: string;
  stage_order: number;
  probability: number;
  is_closed: boolean;
  created_at: string;
}

export interface CRMWorkflow {
  id: string;
  name: string;
  description?: string;
  trigger_type: 'contact_created' | 'lead_created' | 'opportunity_created' | 'task_completed' | 'stage_changed';
  trigger_conditions: any;
  actions: any[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CRMReport {
  id: string;
  name: string;
  description?: string;
  report_type: 'contacts' | 'leads' | 'opportunities' | 'tasks' | 'activities' | 'pipeline' | 'revenue';
  filters: any;
  columns: any[];
  is_public: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}