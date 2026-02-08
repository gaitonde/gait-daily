#!/bin/bash

# Gait Daily - LocalTunnel Reverse Proxy Setup
# This script creates a public tunnel to your local development server
# so you can test on your phone (no account required!)

echo "🚀 Gait Daily - Mobile Testing with LocalTunnel"
echo "=============================================="
echo ""

# Check if localtunnel is installed
if ! command -v lt &> /dev/null; then
    echo "📦 LocalTunnel is not installed yet."
    echo ""
    echo "Installing LocalTunnel globally..."
    npm install -g localtunnel
    echo ""
    if ! command -v lt &> /dev/null; then
        echo "❌ Installation failed. Please try:"
        echo "   npm install -g localtunnel"
        exit 1
    fi
fi

echo "✅ LocalTunnel is ready!"
echo ""
echo "ℹ️  Make sure your dev server is running:"
echo "   pnpm dev"
echo ""
echo "Starting LocalTunnel to localhost:3000..."
echo ""

# Check if PORT is specified, otherwise default to 3000
PORT=${1:-3000}

# Start localtunnel
lt --port $PORT

echo ""
echo "✅ Tunnel is ready!"
echo ""
echo "📱 To test on your phone:"
echo "   1. Copy the URL shown above (https://xxxx-xxxx-xx.loca.lt)"
echo "   2. Open it in your phone's browser"
echo "   3. Watch the animation!"
echo "   4. Install as PWA (look for 'Install' or '+' button)"
echo ""
echo "Press Ctrl+C to stop the tunnel"
