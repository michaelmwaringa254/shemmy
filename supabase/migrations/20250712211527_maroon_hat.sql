/*
  # Create service requests management system

  1. New Tables
    - `service_requests`
      - `id` (uuid, primary key)
      - `name` (text, client name)
      - `email` (text, client email)
      - `phone` (text, optional phone number)
      - `service` (text, requested service)
      - `message` (text, project details)
      - `urgency` (text, project urgency level)
      - `status` (text, request status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `service_requests` table
    - Add policy for authenticated users to manage all requests
*/

CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  urgency text DEFAULT 'normal',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to manage all service requests
CREATE POLICY "Authenticated users can manage service requests"
  ON service_requests
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON service_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();