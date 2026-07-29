# HarmonyX - Deployment Guide

## Overview

HarmonyX is a modern music streaming web application built with React, Vite, and Tailwind CSS. It's deployed to GitHub Pages via GitHub Actions.

## Prerequisites

- Node.js 20+ or pnpm 9+
- Git
- GitHub account with repository access

## Local Development

### Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The app will be available at `http://localhost:5174/HarmonyX/`

### Building

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. Push code to the `main` branch:
   ```bash
   git add .
   git commit -m "Deploy HarmonyX"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

3. Your app will be available at: `https://<username>.github.io/HarmonyX/`

### Manual Deployment

If automatic deployment doesn't work, deploy manually:

```bash
# Build the project
pnpm build

# Deploy using gh-pages package (optional)
npm install -g gh-pages
gh-pages -d dist
```

## Repository Settings

1. Go to Settings → Pages
2. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

## Features

- Music Player with HTML5 Audio API
- Playlist Management
- Favorites/Bookmarks
- Search Functionality
- Listening Statistics
- Dark/Light Theme
- Multi-language Support (English/Vietnamese)
- Responsive Design
- Glassmorphism UI
- Smooth Animations with Framer Motion

## File Structure

```
HarmonyX/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── store/           # Zustand store
│   ├── lib/             # Utilities (audio engine, queue manager)
│   ├── i18n/            # Internationalization
│   ├── types/           # TypeScript types
│   ├── data/            # Sample data
│   ├── globals.css      # Global styles
│   └── App.tsx
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Fast initial load with lazy loading
- Optimized bundle size (~150KB gzipped)
- Service Worker ready for offline capability
- Image optimization for covers

## Storage

All data is persisted to browser's localStorage:
- Playlists
- Favorites
- Play History
- Settings
- Listening Statistics

## Troubleshooting

### App not loading
- Clear browser cache
- Check GitHub Actions logs for build errors
- Ensure `base: '/HarmonyX/'` in vite.config.ts

### Songs not playing
- Check browser console for audio errors
- Ensure audio URLs are accessible
- Check browser audio permissions

### Settings not persisting
- Ensure localStorage is not disabled
- Check browser privacy settings

## Development

### Adding New Pages

1. Create component in `src/components/pages/`
2. Import in `src/components/MainContent.tsx`
3. Add route case in switch statement

### Adding Translations

1. Update `src/i18n/locales/en.json`
2. Update `src/i18n/locales/vi.json`
3. Use `useTranslation()` hook in components

### Modifying Styles

- Update Tailwind config in `tailwind.config.ts`
- Modify global styles in `src/globals.css`
- Use design tokens for consistency

## License

MIT
