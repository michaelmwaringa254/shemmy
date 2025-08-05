/*
  # CRM System Database Schema

  1. New Tables
    - `crm_contacts` - Contact management with detailed information
    - `crm_leads` - Lead management and tracking
    - `crm_opportunities` - Sales opportunities and deals
    - `crm_tasks` - Task management and assignments
    - `crm_activities` - Activity logging and history
    - `crm_pipelines` - Sales pipeline definitions
    - `crm_pipeline_stages` - Pipeline stage definitions
    - `crm_workflows` - Workflow automation rules
    - `crm_reports` - Saved reports and analytics

  2. Security
    - Enable RLS on all CRM tables
    - Add policies for authenticated users to manage CRM data

  3. Features
    - Contact and lead management
    - Sales pipeline tracking
    - Task and activity management
    - Workflow automation
    - Analytics and reporting
*/

-- Contacts table for managing all contacts
CREATE TABLE IF NOT EXISTS crm_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE,
  phone text,
  company text,
  job_title text,
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  website text,
  linkedin_url text,
  contact_source text DEFAULT 'manual',
  contact_type text DEFAULT 'prospect' CHECK (contact_type IN ('prospect', 'customer', 'partner', 'vendor')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  tags text[],
  notes text,
  assigned_to uuid REFERENCES auth.users(id),
  last_contacted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leads table for lead management
CREATE TABLE IF NOT EXISTS crm_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES crm_contacts(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  source text DEFAULT 'website' CHECK (source IN ('website', 'referral', 'social_media', 'email', 'phone', 'event', 'advertisement', 'other')),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_value decimal(10,2),
  probability integer DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  expected_close_date date,
  assigned_to uuid REFERENCES auth.users(id),
  tags text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Opportunities table for sales opportunities
CREATE TABLE IF NOT EXISTS crm_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES crm_contacts(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES crm_leads(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  value decimal(10,2) NOT NULL DEFAULT 0,
  probability integer DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  stage text DEFAULT 'prospecting' CHECK (stage IN ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
  pipeline_id uuid,
  expected_close_date date,
  actual_close_date date,
  assigned_to uuid REFERENCES auth.users(id),
  tags text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table for task management
CREATE TABLE IF NOT EXISTS crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  task_type text DEFAULT 'general' CHECK (task_type IN ('call', 'email', 'meeting', 'follow_up', 'proposal', 'general')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date timestamptz,
  completed_at timestamptz,
  assigned_to uuid REFERENCES auth.users(id),
  contact_id uuid REFERENCES crm_contacts(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES crm_leads(id) ON DELETE CASCADE,
  opportunity_id uuid REFERENCES crm_opportunities(id) ON DELETE CASCADE,
  tags text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activities table for logging all activities
CREATE TABLE IF NOT EXISTS crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_type text NOT NULL CHECK (activity_type IN ('call', 'email', 'meeting', 'note', 'task', 'deal', 'contact_created', 'lead_created')),
  title text NOT NULL,
  description text,
  contact_id uuid REFERENCES crm_contacts(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES crm_leads(id) ON DELETE CASCADE,
  opportunity_id uuid REFERENCES crm_opportunities(id) ON DELETE CASCADE,
  task_id uuid REFERENCES crm_tasks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Pipelines table for sales pipeline definitions
CREATE TABLE IF NOT EXISTS crm_pipelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pipeline stages table
CREATE TABLE IF NOT EXISTS crm_pipeline_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id uuid REFERENCES crm_pipelines(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  stage_order integer NOT NULL,
  probability integer DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  is_closed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Workflows table for automation
CREATE TABLE IF NOT EXISTS crm_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  trigger_type text NOT NULL CHECK (trigger_type IN ('contact_created', 'lead_created', 'opportunity_created', 'task_completed', 'stage_changed')),
  trigger_conditions jsonb DEFAULT '{}',
  actions jsonb NOT NULL DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reports table for saved reports
CREATE TABLE IF NOT EXISTS crm_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  report_type text NOT NULL CHECK (report_type IN ('contacts', 'leads', 'opportunities', 'tasks', 'activities', 'pipeline', 'revenue')),
  filters jsonb DEFAULT '{}',
  columns jsonb DEFAULT '[]',
  is_public boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can manage contacts"
  ON crm_contacts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage leads"
  ON crm_leads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage opportunities"
  ON crm_opportunities
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage tasks"
  ON crm_tasks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage activities"
  ON crm_activities
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage pipelines"
  ON crm_pipelines
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage pipeline stages"
  ON crm_pipeline_stages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage workflows"
  ON crm_workflows
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage reports"
  ON crm_reports
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_company ON crm_contacts(company);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_assigned_to ON crm_contacts(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_assigned_to ON crm_leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_stage ON crm_opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_assigned_to ON crm_opportunities(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_status ON crm_tasks(status);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_assigned_to ON crm_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_due_date ON crm_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_crm_activities_contact_id ON crm_activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_created_at ON crm_activities(created_at);

-- Insert default pipeline and stages
INSERT INTO crm_pipelines (id, name, description) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Sales Pipeline', 'Default sales pipeline for opportunities');

INSERT INTO crm_pipeline_stages (pipeline_id, name, description, stage_order, probability) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Prospecting', 'Initial contact and research', 1, 10),
  ('00000000-0000-0000-0000-000000000001', 'Qualification', 'Qualifying the lead', 2, 25),
  ('00000000-0000-0000-0000-000000000001', 'Proposal', 'Proposal sent to client', 3, 50),
  ('00000000-0000-0000-0000-000000000001', 'Negotiation', 'Negotiating terms', 4, 75),
  ('00000000-0000-0000-0000-000000000001', 'Closed Won', 'Deal won', 5, 100),
  ('00000000-0000-0000-0000-000000000001', 'Closed Lost', 'Deal lost', 6, 0);

-- Create trigger functions for updated_at
CREATE OR REPLACE FUNCTION update_crm_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON crm_contacts FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();
CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON crm_leads FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();
CREATE TRIGGER update_crm_opportunities_updated_at BEFORE UPDATE ON crm_opportunities FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();
CREATE TRIGGER update_crm_tasks_updated_at BEFORE UPDATE ON crm_tasks FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();
CREATE TRIGGER update_crm_pipelines_updated_at BEFORE UPDATE ON crm_pipelines FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();
CREATE TRIGGER update_crm_workflows_updated_at BEFORE UPDATE ON crm_workflows FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();
CREATE TRIGGER update_crm_reports_updated_at BEFORE UPDATE ON crm_reports FOR EACH ROW EXECUTE FUNCTION update_crm_updated_at_column();