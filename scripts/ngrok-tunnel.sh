#!/bin/bash

# Gait Daily - ngrok Reverse Proxy Setup
# This script creates a public tunnel to your local development server
# so you can test on your phone

echo "🚀 Gait Daily - ngrok Mobile Testing Setup"
echo "=========================================="
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed."
    echo ""
    echo "Install ngrok from: https://ngrok.com/download"
    echo ""
    echo "macOS with Homebrew:"
    echo "  brew install ngrok"
    echo ""
    echo "Or download directly from: https://ngrok.com/download"
    exit 1
fi

echo "ℹ️  Make sure your dev server is running:"
echo "   pnpm dev"
echo ""
echo "Starting ngrok tunnel to localhost:3000..."
echo ""

# Check if PORT is specified, otherwise default to 3000
PORT=${1:-3000}

# Start ngrok
ngrok http $PORT

echo ""
echo "✅ Tunnel is ready!"
echo ""
echo "📱 To test on your phone:"
echo "   1. Copy the forwarding URL above (https://xxxx-xx-xxx-xx-x.ngrok-free.app)"
echo "   2. Open it in your phone's browser"
echo "   3. Install as PWA (look for 'Install' or '+' button)"
echo ""
echo "Press Ctrl+C to stop the tunnel"
