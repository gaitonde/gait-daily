# Gait Daily

A beautiful React web app with a Luma-inspired launch experience, featuring smooth animations and a modern dark theme.

## Features

- 🎨 **Beautiful Launch Experience** - Animated splash screen with emanating icon effect
- ✨ **Smooth Animations** - Powered by Framer Motion with spring physics
- 🌙 **Dark Theme** - Modern, eye-friendly dark interface
- ⚡ **Built with Next.js** - Optimized for performance and Vercel deployment
- 📱 **Fully Responsive** - Works perfectly on all devices
- 💾 **Database Ready** - SQLite with Prisma ORM
- 🚀 **Easy Deployment** - One-click Vercel deployment

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: SQLite + Prisma ORM
- **Package Manager**: pnpm
- **Deployment**: Vercel

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

The splash screen animation runs for 1.5 seconds:

1. **0-600ms**: Icon emanates outward with scale and glow effect
2. **600-1000ms**: Splash screen fades out
3. **800-1300ms**: Menu slides up from bottom
4. **1500ms+**: Main content fully visible

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
