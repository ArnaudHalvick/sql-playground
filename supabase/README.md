# Supabase Directory

This directory contains database migrations and configurations.

## Structure

### Migrations
- `20250605155824_silent_night.sql`: Initial schema setup
- `20250605155926_dusty_wind.sql`: RPC function creation

## Database Setup

The migrations create:
1. Core tables (users, products, orders, etc.)
2. Sample data for learning
3. Secure RPC functions for query execution

## Security

- Row Level Security (RLS) is disabled for learning purposes
- Queries are executed through a secure RPC function
- Error handling prevents exposure of sensitive information

## Schema Updates

When modifying the database:
1. Create new migration files
2. Never modify existing migrations
3. Test changes locally first
4. Deploy through Supabase dashboard