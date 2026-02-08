# Gait Daily - Developer Documentation

## Project Overview

Gait Daily is a modern React web app with a Luma-inspired launch experience. It features smooth animations, a dark theme, and is built with Next.js for easy Vercel deployment.

## Architecture

### Client-Side Rendering (CSR) with Animations

The app uses a two-phase animation system with a sophisticated 3-second splash sequence:

1. **Splash Screen Phase** (0-3000ms)
   - Blank black screen for 1 second (anticipation)
   - Icon morphs in (fades + scales from 30% to 100%) over 500ms
   - Icon stays visible for 1 second
   - Icon morphs out (fades + scales down to 30%) over 500ms
   - Splash screen exits and calls `onComplete()` callback

2. **Menu & Content Phase** (2500ms+)
   - `SlideUpMenu.tsx` slides up from bottom with spring animation
   - Overlaps with splash screen exit for seamless transition
   - Main content becomes fully visible after splash completes

### State Management

The animation orchestration happens in `layout-client.tsx`:

```tsx
- showSplash: boolean - Controls splash screen visibility
- showIcon: boolean - Controls icon fade-in timing (delayed 1s)
- showMenu: boolean - Controls menu visibility
- useEffect(() => {
    // Icon appears after 1s
    const iconTimer = setTimeout(() => setShowIcon(true), 1000);
    // Everything completes at 3s
    const completeTimer = setTimeout(() => setIsVisible(false), 3000);
  }, [])
```

**Key Features:**
- Service Worker registration for PWA support
- Two-phase icon display (fade in/out with scale)
- Nested `AnimatePresence` for proper cleanup

## Key Components

### SplashScreen.tsx
- Full-screen overlay with fixed z-index: 50
- Two-phase timing: blank screen (1s) then icon appears
- Icon morph/fade animation:
  - Fade in + scale from 30% to 100% over 500ms
  - Stay visible for 1 second with glow effects
  - Fade out + scale down to 30% over 500ms
- Uses Framer Motion's nested `AnimatePresence` for proper sequencing
- Three visual layers: main icon, glow rings (both animate together)
- Exit animation: opacity fade with exit scale transform

### SlideUpMenu.tsx
- Bottom-fixed container with z-index: 40
- Spring animation: stiffness 260, damping 20
- Conditional animation based on `isVisible` prop
- Semi-transparent border-top with white/10 color
- Starts at y: 100%, animates to y: 0

### Layout Structure
- `layout.tsx` - Server component with metadata
- `layout-client.tsx` - Client component managing animation state
- Separation ensures metadata is handled server-side, animations client-side

## Styling System

### Tailwind CSS
- Custom animations defined in `tailwind.config.ts`
- Key animations:
  - `pulse-scale`: 0-600ms icon emanation
  - `fade-out`: 600-1000ms splash fade
  - `slide-up`: 800-1300ms menu slide

### Global Styles (globals.css)
- Black background (#000) for entire app
- White text color by default
- Custom scrollbar styling
- All text color: white

### Colors Scheme
- Background: pure black (#000 or bg-black)
- Text: white (#fff or text-white)
- Accent borders/dividers: white/10 to white/30
- Hover states: white/5 background

## Database Setup

### Prisma Configuration
- Provider: SQLite for development
- Can migrate to PostgreSQL in production
- Schema file: `prisma/schema.prisma`

### Development Database
- File: `dev.db` (created on first `pnpm db:push`)
- Connection string: `file:./dev.db`
- Location: root directory (listed in .gitignore)

### Prisma Client
Automatically generated from schema. Use in API routes:

```tsx
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

## Common Development Tasks

### Add a New Database Model

1. Edit `prisma/schema.prisma`:
```prisma
model Article {
  id    Int     @id @default(autoincrement())
  title String
  body  String
  createdAt DateTime @default(now())
}
```

2. Run: `pnpm db:push`
3. Use in your code with Prisma Client

### Create an API Route

Create `app/api/articles/route.ts`:

```tsx
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const articles = await prisma.article.findMany();
  return NextResponse.json(articles);
}
```

### Update Animation Timing

All animation timings are centralized:
- Splash duration: `layout-client.tsx` - 1500ms setTimeout
- Icon animation: `SplashScreen.tsx` - 0.6s
- Splash fade: `SplashScreen.tsx` - exit animation 0.4s delay 0.6s
- Menu slide: `SlideUpMenu.tsx` - spring with 0.8s delay when isVisible

To change total duration, update the setTimeout in `layout-client.tsx`.

### Customize the Splash Icon

Edit the emoji/icon in `SplashScreen.tsx`:

```tsx
<motion.div className="...">
  {/* Replace ⚡ with your icon */}
  ⚡
</motion.div>
```

Or use a custom SVG component instead.

## Deployment

### To Vercel

1. Initialize git: `git init && git add . && git commit -m "Initial commit"`
2. Push to GitHub
3. Import in Vercel Dashboard
4. No special configuration needed - Vercel auto-detects Next.js
5. For production database, add `DATABASE_URL` environment variable

### Environment Variables

- `.env.local` - Used in development (file-based SQLite)
- `.env.production` - Not in repo, set in Vercel dashboard

For Vercel Postgres:
```
DATABASE_URL=postgresql://user:password@host/database
```

## Progressive Web App (PWA) Setup

This app is configured as a full PWA with the following features:

### PWA Files

- **`public/manifest.json`** - Web app manifest with app info, icons, and configuration
- **`public/sw.js`** - Service worker for offline support and caching
- **`app/api/icon/route.ts`** - Dynamic icon generation endpoint

### PWA Metadata

Added to `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/api/icon?size=192" }, ...],
    apple: [{ url: "/apple-icon-180.png" }, ...],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // For notch support
};
```

### Service Worker Registration

In `layout-client.tsx`:

```tsx
useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
}, []);
```

The service worker uses a **network-first strategy**:
1. Try to fetch from network
2. If successful, cache the response
3. If offline, serve from cache
4. Fallback to offline page if neither available

### Installation Prompts

- **Desktop**: Browser shows install button in address bar
- **iOS**: Users tap Share → Add to Home Screen
- **Android**: Browser shows install banner automatically

## Mobile Testing with LocalTunnel

### Quick Start

1. Start dev server: `pnpm dev`
2. Run tunnel script:
   ```bash
   # macOS/Linux
   ./scripts/ngrok-tunnel.sh

   # Windows
   scripts\ngrok-tunnel.bat

   # Or manually
   npm install -g localtunnel  # (one time)
   lt --port 3000
   ```

### What Happens

- LocalTunnel creates a public HTTPS URL that tunnels to localhost:3000
- Open the URL on your phone (e.g., https://blue-panda-123.loca.lt)
- Install the app as PWA
- Test animations and functionality
- Changes in dev reload in real-time on phone

### Benefits

- ✅ Test on actual device without deployment
- ✅ No account required
- ✅ No rate limits or time limits
- ✅ No signup/verification needed
- ✅ Debug responsive design issues
- ✅ Test PWA install behavior
- ✅ Test offline functionality
- ✅ Real-time reloads

### LocalTunnel Features

- No account needed
- Unlimited bandwidth
- Unlimited session duration
- Unlimited connections/minute
- URLs change each restart (no problem!)
- Works great for development and testing

## Performance Notes

- SplashScreen uses `AnimatePresence` for proper cleanup
- Animations use spring physics for smooth 60fps performance
- Z-index layering prevents rendering issues
- Framer Motion handles GPU acceleration automatically

## Troubleshooting

### Database Issues

**"ENOENT: no such file or directory, open 'dev.db'"**
- Run: `pnpm db:push`
- This creates the database file

### Animations Not Showing

- Check that Framer Motion is installed: `pnpm ls framer-motion`
- Ensure client component has `"use client"` directive
- Check z-index values aren't being overridden by other CSS

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Rebuild: `pnpm build`
- Check for TypeScript errors: `pnpm lint`

## Future Enhancements

- Add actual routing and pages beyond the landing page
- Implement authentication with NextAuth.js
- Add form validation with zod/react-hook-form
- Create API endpoints for CRUD operations
- Add unit tests with Jest
- Set up CI/CD with GitHub Actions
- Implement analytics tracking

## File Paths Reference

- Main app logic: `/app`
- Components: `/app/components`
- Database schema: `/prisma/schema.prisma`
- Global styles: `/app/globals.css`
- Tailwind config: `/tailwind.config.ts`
- TypeScript config: `/tsconfig.json`
- Package dependencies: `/package.json`

## Scripts

All scripts defined in `package.json`:

```json
{
  "dev": "next dev",           // Start dev server on :3000
  "build": "next build",       // Production build
  "start": "next start",       // Run production build
  "lint": "next lint",         // Run ESLint
  "db:push": "prisma db push", // Sync schema to database
  "db:studio": "prisma studio" // Visual database management
}
```
