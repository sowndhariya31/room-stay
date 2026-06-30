import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

type CursorState = 'default' | 'button' | 'image';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [state, setState] = useState<CursorState>('default');
  const [angle, setAngle] = useState(0);
  const [stretch, setStretch] = useState(1);
  const lastPos = useRef({ x: 0, y: 0 });
  const stretchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      if (speed > 2) {
        setAngle(Math.atan2(dy, dx) * (180 / Math.PI));
        setStretch(Math.min(1 + speed / 10, 2.2));
        if (stretchTimeout.current) clearTimeout(stretchTimeout.current);
        stretchTimeout.current = setTimeout(() => setStretch(1), 120);
      }

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.closest('a')
      ) {
        setState('button');
      } else if (
        target.tagName === 'IMG' ||
        target.closest('[data-cursor-image]')
      ) {
        setState('image');
      } else {
        setState('default');
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  const outerSize = state === 'image' ? 60 : state === 'button' ? 44 : 32;

  return (
    <>
      {/* Outer ring — lagged spring follows position */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - outerSize / 2,
          y: pos.y - outerSize / 2,
          width: outerSize,
          height: outerSize,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, mass: 0.6 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: state === 'button'
              ? '2px solid rgba(212, 175, 55, 0.85)'
              : '2px solid rgba(255, 255, 255, 0.7)',
            boxShadow: state === 'button'
              ? '0 0 22px rgba(212,175,55,0.5), inset 0 0 10px rgba(212,175,55,0.15)'
              : state === 'image'
              ? '0 0 20px rgba(255,255,255,0.2)'
              : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        />
      </motion.div>

      {/* Inner dot — instant, stretches with velocity */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full"
        style={{
          x: pos.x - 4,
          y: pos.y - 4,
          background: state === 'button' ? '#D4AF37' : 'white',
          scaleX: stretch,
          scaleY: 1 / stretch,
          rotate: angle,
          transformOrigin: 'center',
        }}
        animate={{ opacity: state === 'image' ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
