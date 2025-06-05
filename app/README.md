# App Directory

This directory contains the Next.js application pages and layouts.

## Structure

- `layout.tsx`: Root layout with theme provider
- `page.tsx`: Main application page
- `globals.css`: Global styles and Tailwind configuration

## Components

The main page (`page.tsx`) implements:

- Split-pane layout with resizable panels
- SQL editor integration
- Results table
- Exercise selection
- Schema browser

## Theme Support

The app supports:
- Light mode
- Dark mode
- System preference detection

Theme configuration is handled by:
- `ThemeProvider` component
- CSS variables for consistent styling
- Tailwind CSS for responsive design