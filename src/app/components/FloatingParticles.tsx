import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

function TeaLeaf({ scale = 1 }: { scale?: number }) {
  return (
    <svg width={22 * scale} height={32 * scale} viewBox="0 0 22 32" fill="none">
      <path
        d="M11 1 Q 20 9 17 19 Q 13 28 11 31 Q 9 28 5 19 Q 2 9 11 1Z"
        fill="#5D8C58"
        opacity="0.55"
      />
      <path
        d="M11 1 Q 11 16 11 31"
        stroke="#234F2A"
        strokeWidth="0.6"
        opacity="0.3"
      />
    </svg>
  );
}

const leafData = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  delay: i * 2.1 + Math.random() * 4,
  duration: 14 + Math.random() * 16,
  scale: 0.5 + Math.random() * 0.9,
  rotateInit: Math.random() * 360,
  driftX: (Math.random() - 0.5) * 220,
}));

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {leafData.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{ left: `${leaf.startX}%`, top: '105%' }}
          animate={{
            y: [0, -2000],
            x: [0, leaf.driftX],
            rotate: [leaf.rotateInit, leaf.rotateInit + 720],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1],
            repeatDelay: Math.random() * 8,
          }}
        >
          <TeaLeaf scale={leaf.scale} />
        </motion.div>
      ))}
      <GoldenDust />
    </div>
  );
}

function GoldenDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      life: number; maxLife: number;
    };

    const particles: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.35 - 0.1,
      size: 0.8 + Math.random() * 1.8,
      life: 0,
      maxLife: 180 + Math.random() * 260,
    });

    for (let i = 0; i < 60; i++) {
      const p = spawn();
      p.life = Math.floor(Math.random() * p.maxLife);
      particles.push(p);
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.18) particles.push(spawn());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        const opacity = t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity * 0.32})`;
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
