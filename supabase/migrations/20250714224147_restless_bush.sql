/*
  # Create newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text, optional)
      - `status` (text, default 'active')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for anonymous users to subscribe
    - Add policy for authenticated users to manage subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to subscribe to newsletter
CREATE POLICY "Allow anonymous newsletter subscription"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public users to subscribe to newsletter
CREATE POLICY "Allow public newsletter subscription"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to manage all newsletter subscriptions
CREATE POLICY "Authenticated users can manage newsletter subscriptions"
  ON newsletter_subscriptions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_newsletter_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_subscriptions_updated_at
    BEFORE UPDATE ON newsletter_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_newsletter_updated_at_column();