-- Migration: Add quote detail fields to quotes table
-- Run this in your Supabase SQL Editor
-- SAFE: does NOT delete or modify existing data

-- Add new columns
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS deep_meaning TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS story TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Auto-generate slugs from existing quote text for rows that don't have one
-- This creates URL-friendly slugs from the first ~60 chars of each quote
UPDATE quotes
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      LEFT(REGEXP_REPLACE(quote, '[^a-zA-Z0-9\s]', '', 'g'), 60),
      '\s+', '-', 'g'
    ),
    '-+$', '', 'g'
  )
) || '-' || SUBSTRING(id::text, 1, 8)
WHERE slug IS NULL;

-- Index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_quotes_slug ON quotes(slug);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_quotes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_quotes_updated_at ON quotes;
CREATE TRIGGER set_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_quotes_updated_at();
