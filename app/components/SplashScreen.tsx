"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total animation duration: 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {/* Animated icon container */}
          <motion.div className="relative w-24 h-24">
            {/* Glow effect layers */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />

            {/* Main icon */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white flex items-center justify-center text-black font-bold text-4xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
              }}
            >
              ⚡
            </motion.div>

            {/* Secondary glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
