/*
  # Create Blog Posts Table

  ## Overview
  This migration creates a comprehensive blog management system with full CRUD capabilities
  and proper security through Row Level Security (RLS).

  ## New Tables
  
  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text, required) - Blog post title
  - `slug` (text, unique, required) - URL-friendly version of the title
  - `excerpt` (text) - Short summary/preview of the post
  - `content` (text, required) - Full blog post content (supports markdown)
  - `featured_image` (text) - URL to the featured/header image
  - `author_id` (uuid, required) - Reference to auth.users
  - `author_name` (text) - Cached author name for performance
  - `category` (text) - Blog post category (e.g., "Technology", "Business", "Design")
  - `tags` (text array) - Array of tags for filtering and search
  - `status` (text, default 'draft') - Publication status: 'draft', 'published', 'archived'
  - `published_at` (timestamptz) - When the post was published
  - `views` (integer, default 0) - Number of views/reads
  - `read_time` (integer) - Estimated reading time in minutes
  - `meta_title` (text) - SEO meta title
  - `meta_description` (text) - SEO meta description
  - `created_at` (timestamptz, default now()) - Record creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - Enabled on `blog_posts` table for data protection
  
  ### Policies
  1. **Public Read Access**: Anyone can view published blog posts
  2. **Authenticated Create**: Authenticated users can create blog posts
  3. **Author Update**: Authors can update their own blog posts
  4. **Author Delete**: Authors can delete their own blog posts
  
  ## Indexes
  - Index on `slug` for fast lookups by URL
  - Index on `status` for filtering published posts
  - Index on `published_at` for chronological sorting
  - Index on `author_id` for author-specific queries
  
  ## Important Notes
  - All blog posts are private by default (draft status)
  - Only published posts are visible to the public
  - Authors maintain full control over their own content
  - Proper indexing ensures fast queries even with many posts
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT '',
  category text DEFAULT 'General',
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  views integer DEFAULT 0,
  read_time integer DEFAULT 5,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published blog posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Policy: Authenticated users can create blog posts
CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authors can view all their own blog posts (including drafts)
CREATE POLICY "Authors can view own blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

-- Policy: Authors can update their own blog posts
CREATE POLICY "Authors can update own blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authors can delete their own blog posts
CREATE POLICY "Authors can delete own blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS trigger_update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trigger_update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();
