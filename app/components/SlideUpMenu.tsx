"use client";

import { motion } from "framer-motion";

interface SlideUpMenuProps {
  isVisible: boolean;
}

export default function SlideUpMenu({ isVisible }: SlideUpMenuProps) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-white/10"
      initial={{ y: 100, opacity: 0 }}
      animate={
        isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
        delay: isVisible ? 0.8 : 0,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Welcome</h2>

        <nav className="space-y-4">
          <button className="block w-full text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
            Dashboard
          </button>
          <button className="block w-full text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
            Settings
          </button>
          <button className="block w-full text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
            Help
          </button>
          <button className="block w-full text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
            About
          </button>
        </nav>

        <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/60">
          <p>© 2026 Gait Daily. All rights reserved.</p>
        </div>
      </div>
    </motion.div>
  );
}
