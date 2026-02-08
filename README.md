# Gait Daily

A beautiful React web app with a Luma-inspired launch experience, featuring smooth animations and a modern dark theme.

## Features

- 🎨 **Beautiful Launch Experience** - Animated splash screen with icon morph/fade effect
- ✨ **Smooth Animations** - Powered by Framer Motion with spring physics
- 🌙 **Dark Theme** - Modern, eye-friendly dark interface
- ⚡ **Built with Next.js** - Optimized for performance and Vercel deployment
- 📱 **Progressive Web App** - Installable on any device, works offline
- 💾 **Database Ready** - SQLite with Prisma ORM
- 🚀 **Easy Deployment** - One-click Vercel deployment
- 📲 **Mobile Testing** - Built-in ngrok tunnel for quick phone testing

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: SQLite + Prisma ORM
- **PWA**: Service Worker + Web App Manifest
- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Mobile Testing**: ngrok Reverse Proxy

## Getting Started

### Installation

```bash
# Install dependencies with pnpm
pnpm install

# Set up the database
pnpm db:push

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Progressive Web App (PWA)

This app is a fully functional PWA that can be installed on any device:

**Desktop Installation:**
1. Visit `http://localhost:3000`
2. Click the install button in the address bar (if available)
3. Or use browser menu → "Install app"

**Mobile Installation:**
1. Open the app in your phone's browser
2. Tap the menu button (three dots or share icon)
3. Tap "Install app" or "Add to Home Screen"
4. Tap "Install"

The app will work offline using the service worker cache!

### Mobile Testing with ngrok

Test your PWA on your phone without deploying to Vercel:

**Prerequisites:**
- Install [ngrok](https://ngrok.com/download) (free account required)
- Have the dev server running: `pnpm dev`

**Quick Start:**

```bash
# macOS/Linux
./scripts/ngrok-tunnel.sh

# Windows
scripts\ngrok-tunnel.bat

# Or manually
ngrok http 3000
```

Then:
1. Copy the `https://...ngrok-free.app` URL
2. Open it on your phone
3. Install as PWA
4. Test the animations and features!

### Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Create optimized production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:push` - Sync database schema
- `pnpm db:studio` - Open Prisma Studio for database management

## Project Structure

```
gait-daily/
├── app/
│   ├── components/
│   │   ├── SplashScreen.tsx    # Animated splash screen
│   │   └── SlideUpMenu.tsx     # Slide-up menu component
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── layout-client.tsx       # Client-side layout with animations
│   └── page.tsx                # Landing page
├── prisma/
│   └── schema.prisma           # Database schema
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## Animation Timeline

The splash screen animation runs for 3 seconds with a beautiful morph/fade effect:

1. **0-1000ms**: Blank black screen (anticipation)
2. **1000-1500ms**: Icon fades in and scales up (from 30% to 100%)
3. **1500-2500ms**: Icon stays visible with glow effects
4. **2500-3000ms**: Icon fades out and scales down as splash screen exits
5. **3000ms+**: Menu slides up and main content becomes visible

## Customization

### Update the Splash Icon

Edit `app/components/SplashScreen.tsx` and replace the `⚡` emoji or update the styling:

```tsx
<motion.div className="...">
  ⚡ {/* Change this emoji or add your custom SVG */}
</motion.div>
```

### Modify Menu Items

Edit `app/components/SlideUpMenu.tsx` to add or customize menu buttons.

### Change Color Scheme

All colors are defined in `app/globals.css` and use Tailwind classes. The dark theme is applied globally.

### Database Models

Edit `prisma/schema.prisma` to add your data models, then run:

```bash
pnpm db:push
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com)
3. Vercel will auto-detect Next.js and configure the build
4. Set the `DATABASE_URL` environment variable for production database
5. Deploy!

### Using Vercel Postgres (Optional)

To migrate from SQLite to Vercel Postgres:

1. Create a Postgres database in Vercel
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run `pnpm db:push`
4. Set the `DATABASE_URL` environment variable in Vercel dashboard

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

## License

MIT License - feel free to use this project for your own purposes.
