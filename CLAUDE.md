# Gait Daily - Developer Documentation

## Project Overview

Gait Daily is a modern React web app with a Luma-inspired launch experience. It features smooth animations, a dark theme, and is built with Next.js for easy Vercel deployment.

## Architecture

### Client-Side Rendering (CSR) with Animations

The app uses a two-phase animation system:

1. **Splash Screen Phase** (0-1500ms)
   - `SplashScreen.tsx` renders a full-screen black overlay with animated icon
   - Icon uses Framer Motion for scale and opacity animations
   - After 1500ms, component unmounts and calls `onComplete()` callback

2. **Menu & Content Phase** (800ms+)
   - `SlideUpMenu.tsx` slides up from bottom with spring animation
   - Overlaps with splash screen fade-out for smooth transition
   - Main content becomes visible once splash is complete

### State Management

The animation orchestration happens in `layout-client.tsx`:

```tsx
- showSplash: boolean - Controls splash screen visibility
- showMenu: boolean - Controls menu visibility
- handleSplashComplete() - Callback that triggers at 1500ms
```

No external state management library needed for this simple flow.

## Key Components

### SplashScreen.tsx
- Full-screen overlay with fixed z-index: 50
- Animated icon center-positioned
- Uses Framer Motion's `motion.div` and `AnimatePresence`
- Exit animation: opacity fade over 0.4s with 0.6s delay
- Three visual layers: main icon, glow rings

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
