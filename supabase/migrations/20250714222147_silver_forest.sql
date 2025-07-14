/*
  # Allow Anonymous Service Request Submissions

  1. Security Changes
    - Add policy to allow anonymous users to insert service requests
    - Keep existing authenticated user policies for full access
    - Ensure public can submit requests but not view/modify others' requests

  2. Policy Details
    - Anonymous users can INSERT new service requests
    - Authenticated users retain full access (existing policy)
    - No changes to existing data or other operations
*/

-- Allow anonymous users to insert service requests
CREATE POLICY "Allow anonymous insert service requests"
  ON service_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to insert service requests (for public role as well)
CREATE POLICY "Allow public insert service requests"
  ON service_requests
  FOR INSERT
  TO public
  WITH CHECK (true);