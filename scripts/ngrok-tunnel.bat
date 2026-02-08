@echo off
REM Gait Daily - LocalTunnel Reverse Proxy Setup
REM This script creates a public tunnel to your local development server
REM so you can test on your phone (no account required!)

echo.
echo 🚀 Gait Daily - Mobile Testing with LocalTunnel
echo =============================================
echo.

REM Check if localtunnel is installed
where lt >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📦 LocalTunnel is not installed yet.
    echo.
    echo Installing LocalTunnel globally...
    echo.
    call npm install -g localtunnel
    echo.
    where lt >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Installation failed. Please try:
        echo    npm install -g localtunnel
        echo.
        pause
        exit /b 1
    )
)

echo ✅ LocalTunnel is ready!
echo.
echo ℹ️  Make sure your dev server is running:
echo    pnpm dev
echo.
echo Starting LocalTunnel to localhost:3000...
echo.

REM Default to port 3000 if not specified
if "%1"=="" (
    lt --port 3000
) else (
    lt --port %1
)

echo.
echo ✅ Tunnel is ready!
echo.
echo 📱 To test on your phone:
echo    1. Copy the URL shown above (https://xxxx-xxxx-xx.loca.lt)
echo    2. Open it in your phone's browser
echo    3. Watch the animation!
echo    4. Install as PWA (look for 'Install' or '+' button)
echo.
echo Press Ctrl+C to stop the tunnel
echo.
pause
