-- Migration: Add 'genre' column to quotes table
-- Run this in your Supabase SQL Editor
-- This is SAFE: does NOT delete or modify existing data

ALTER TABLE quotes
ADD COLUMN IF NOT EXISTS genre TEXT;

-- Backfill existing rows with a default genre (optional)
-- UPDATE quotes SET genre = 'general' WHERE genre IS NULL;

-- Make genre NOT NULL going forward (run after backfilling)
-- ALTER TABLE quotes ALTER COLUMN genre SET NOT NULL;
