"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import SlideUpMenu from "./components/SlideUpMenu";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Register service worker for PWA support
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowMenu(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <SlideUpMenu isVisible={showMenu} />
      <main className="pb-64 pt-8">
        {children}
      </main>
    </>
  );
}
