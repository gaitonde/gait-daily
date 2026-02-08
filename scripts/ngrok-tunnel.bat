@echo off
REM Gait Daily - ngrok Reverse Proxy Setup
REM This script creates a public tunnel to your local development server
REM so you can test on your phone

echo.
echo 🚀 Gait Daily - ngrok Mobile Testing Setup
echo ==========================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ngrok is not installed.
    echo.
    echo Install ngrok from: https://ngrok.com/download
    echo.
    echo After installation, restart your terminal and try again.
    echo.
    pause
    exit /b 1
)

echo ℹ️  Make sure your dev server is running:
echo    pnpm dev
echo.
echo Starting ngrok tunnel to localhost:3000...
echo.

REM Default to port 3000 if not specified
if "%1"=="" (
    ngrok http 3000
) else (
    ngrok http %1
)

echo.
echo ✅ Tunnel is ready!
echo.
echo 📱 To test on your phone:
echo    1. Copy the forwarding URL above (https://xxxx-xx-xxx-xx-x.ngrok-free.app)
echo    2. Open it in your phone's browser
echo    3. Install as PWA (look for 'Install' or '+' button)
echo.
echo Press Ctrl+C to stop the tunnel
echo.
pause
