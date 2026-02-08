"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    // Show icon after 1 second of blank screen
    const iconTimer = setTimeout(() => {
      setShowIcon(true);
    }, 1000);

    // Total animation duration: 3 seconds
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(iconTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated icon container */}
          <AnimatePresence>
            {showIcon && (
              <motion.div
                className="relative w-24 h-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{
                  duration: 0.5,
                  exit: { duration: 0.5, delay: 0 },
                }}
              >
                {/* Glow effect layers */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />

                {/* Main icon */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white flex items-center justify-center text-black font-bold text-4xl"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  ⚡
                </motion.div>

                {/* Secondary glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
