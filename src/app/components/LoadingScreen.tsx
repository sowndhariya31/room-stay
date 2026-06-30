import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timings = [300, 800, 1200, 1800, 2000];
    
    const timeouts = timings.map((delay, index) =>
      setTimeout(() => setStage(index + 1), delay)
    );

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#234F2A] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Fog animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"
          initial={{ y: '100%' }}
          animate={{ y: stage >= 1 ? '-100%' : '100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* Bird flies */}
        <motion.div
          className="absolute text-white/30 text-2xl"
          initial={{ x: '-100vw', y: '50vh', rotate: -45 }}
          animate={{
            x: stage >= 2 ? '120vw' : '-100vw',
            y: stage >= 2 ? '-20vh' : '50vh',
            rotate: stage >= 2 ? 45 : -45,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          🦅
        </motion.div>

        {/* Logo appears */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.5,
          }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          <Mountain className="w-20 h-20 text-[#D4AF37] mb-4" />
          <h1 className="text-4xl md:text-5xl text-white tracking-wider">
            Tall Tree Nest
          </h1>
          <p className="text-white/70 mt-2">Luxury Stay in Valparai</p>
        </motion.div>

        {/* Mountain fades in */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 0.2 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <svg
            viewBox="0 0 1200 400"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,400 L0,200 L200,100 L400,180 L600,60 L800,140 L1000,100 L1200,200 L1200,400 Z"
              fill="#1a3d21"
              opacity="0.5"
            />
            <path
              d="M0,400 L0,250 L300,150 L600,100 L900,180 L1200,220 L1200,400 Z"
              fill="#152f19"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
