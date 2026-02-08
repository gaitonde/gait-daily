# Mobile Testing Guide - Gait Daily PWA

Quick reference for testing the app on your phone with LocalTunnel (no account required!).

## Prerequisites

1. **LocalTunnel** - Installed via npm
   - No account needed
   - Completely free
   - Auto-installs if missing

## Quick Start (5 minutes)

### Step 1: Start Dev Server
```bash
cd /Users/dayal/dev/gait-daily
pnpm dev
```
You should see:
```
✓ Ready in 2.3s
- Local:        http://localhost:3000
```

### Step 2: Launch LocalTunnel Tunnel
In a **new terminal window**:

**macOS/Linux:**
```bash
./scripts/ngrok-tunnel.sh
```

**Windows:**
```bash
scripts\ngrok-tunnel.bat
```

**Manual (any OS):**
```bash
npm install -g localtunnel  # (one time only)
lt --port 3000
```

You should see something like:
```
your url is: https://blue-panda-123.loca.lt
```

### Step 3: Test on Phone

1. **Copy the HTTPS URL** (e.g., `https://blue-panda-123.loca.lt`)
2. **Open on your phone** - Type the URL in your phone's browser
3. **Watch the animation** - 3-second splash with morphing icon
4. **Install as PWA**:
   - **Android**: Wait for "Install" prompt at bottom, tap it
   - **iOS**: Tap Share → Add to Home Screen → Add
5. **Test offline** - After installing, turn off WiFi and test!

## What to Look For

### Animation Quality
- ✅ 1 second blank black screen (anticipation)
- ✅ Icon fades in while scaling up (30% → 100%)
- ✅ Icon glows with two rings that expand
- ✅ Icon stays visible for 1 second
- ✅ Icon fades out while scaling down
- ✅ Smooth menu slide-up as splash exits

### PWA Features
- ✅ "Install app" prompt appears
- ✅ App icon appears on home screen after install
- ✅ App launches in full screen (no URL bar)
- ✅ Can test offline (after caching)
- ✅ Smooth performance on 60fps

### Responsiveness
- ✅ Animation looks good on small screen
- ✅ Menu buttons are touch-friendly
- ✅ No layout shifts or jank
- ✅ Text is readable without zoom

## Troubleshooting

### LocalTunnel Command Not Found
```bash
# Install LocalTunnel (one time)
npm install -g localtunnel

# Verify installation
lt --version
```

### Tunnel Connection Fails
- Make sure `pnpm dev` is running on localhost:3000
- Check that port 3000 is not blocked by firewall
- Try restarting both dev server and LocalTunnel
- Make sure npm is installed: `npm --version`

### PWA Won't Install
- Make sure you're using HTTPS (ngrok provides this)
- Check browser console for errors (F12)
- Try in incognito/private mode
- Some browsers require app to be on HTTPS for 30 seconds first

### Animation Looks Jittery
- Check phone's performance (might be CPU usage)
- Close other apps
- Check 60fps in DevTools
- Reduce screen brightness (sometimes helps)

### Service Worker Issues
- Check Application tab in DevTools
- Look for "Service Workers" section
- Unregister old versions if multiple are registered
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+Del)

## Keyboard Shortcuts

**In ngrok terminal:**
- `q` - Quit ngrok
- `Ctrl+C` - Stop tunnel

**In phone browser:**
- `F12` or `Ctrl+Shift+I` - DevTools
- `Ctrl+Shift+M` - Mobile view
- `Ctrl+Shift+Del` - Clear cache

## Tips for Best Results

1. **Use Chrome/Brave on Android** - Best PWA support
2. **Use Safari on iOS** - Only option for iOS PWA
3. **Strong WiFi** - Smooth animation requires good connection
4. **Close other apps** - Reduces jank
5. **Don't rotate screen** - During animation, after is fine
6. **Test on multiple devices** - iPhone, Android, tablet

## LocalTunnel URL Format

Each time you restart LocalTunnel, you get a new URL. Examples:
- `https://blue-panda-123.loca.lt`
- `https://green-tiger-456.loca.lt`

**LocalTunnel features:**
- ✅ No account required
- ✅ No rate limits
- ✅ No time limits
- ✅ Unlimited bandwidth
- ✅ URL changes on restart (that's fine!)

## File Structure

```
/scripts/
├── ngrok-tunnel.sh   (macOS/Linux launcher)
└── ngrok-tunnel.bat  (Windows launcher)

/public/
├── manifest.json     (PWA manifest)
├── sw.js            (Service worker)
└── icon.svg         (App icon)

/app/
├── components/
│   ├── SplashScreen.tsx  (3-second animation)
│   └── SlideUpMenu.tsx
├── layout.tsx        (Server layout)
├── layout-client.tsx (PWA setup)
└── page.tsx          (Home page)
```

## Next Steps

1. Test the app as PWA on your phone
2. Verify offline functionality works
3. Replace ⚡ emoji with your logo
4. When ready: Deploy to Vercel
5. Share URL with others for testing

## More Info

- **README.md** - User guide
- **CLAUDE.md** - Developer guide
- **PWA docs** - https://web.dev/progressive-web-apps/
- **ngrok docs** - https://ngrok.com/docs

---

**Happy testing! 🚀**
