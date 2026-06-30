import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const TITLE = "Tall Tree Nest";
const SUBTITLE = "Luxury Stay in Valparai";

const leafClusters = [
  {
    id: 'leaves-1',
    left: '8%',
    bottom: '12%',
    width: 180,
    height: 120,
    delay: 0.2,
    duration: 14,
    x: 2.2,
    y: 1.6,
    rotate: 2.2,
  },
  {
    id: 'leaves-2',
    left: '70%',
    bottom: '8%',
    width: 210,
    height: 140,
    delay: 1.1,
    duration: 16,
    x: 2.8,
    y: 2.1,
    rotate: 2.8,
  },
  {
    id: 'leaves-3',
    left: '50%',
    bottom: '22%',
    width: 160,
    height: 100,
    delay: 0.7,
    duration: 13,
    x: 1.8,
    y: 1.4,
    rotate: 1.8,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const contentY = useTransform(scrollY, [0, 380], [0, -38]);
  const leafScrollY = useTransform(scrollY, [0, 520], [0, -22]);
  const leafOpacity = useTransform(scrollY, [0, 520], [1, 0.94]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Layer 1 — Background image remains static and unchanged */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1686135899613-0db585a1714c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBwbGFudGF0aW9uJTIwdmFscGFyYWklMjBtb3VudGFpbnN8ZW58MXx8fHwxNzgyNzI1MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Tea Estate Mountains"
          className="w-full h-full object-cover"
          data-cursor-image="1"
        />
      </div>

      {/* Layer 2 — Soft dark gradient over the hero, static camera only */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/72" />

      {/* Layer 3 — Gentle fog wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.06) 0%, transparent 60%)' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.3, 0.62, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'inherit' }}
        />
      </motion.div>

      {/* Layer 4 — Leaf clusters with subtle sway and soft scroll parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: leafScrollY, opacity: leafOpacity }}
      >
        {leafClusters.map((cluster) => (
          <motion.div
            key={cluster.id}
            className="absolute pointer-events-none"
            style={{
              left: cluster.left,
              bottom: cluster.bottom,
              width: cluster.width,
              height: cluster.height,
            }}
            animate={{
              rotate: [0, cluster.rotate, 0],
              x: [0, cluster.x, 0],
              y: [0, -cluster.y, 0],
            }}
            transition={{
              duration: cluster.duration,
              delay: cluster.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <div className="relative w-full h-full">
              <span
                className="absolute rounded-full"
                style={{
                  left: '10%',
                  top: '22%',
                  width: '45%',
                  height: '38%',
                  background: 'radial-gradient(circle at 40% 40%, rgba(226, 238, 213, 0.18), transparent 52%)',
                  filter: 'blur(1px)',
                }}
              />
              <span
                className="absolute rounded-full"
                style={{
                  left: '35%',
                  top: '42%',
                  width: '44%',
                  height: '42%',
                  background: 'radial-gradient(circle at 55% 30%, rgba(199, 214, 180, 0.24), transparent 58%)',
                  filter: 'blur(0.8px)',
                }}
              />
              <span
                className="absolute rounded-full"
                style={{
                  left: '57%',
                  top: '18%',
                  width: '38%',
                  height: '34%',
                  background: 'radial-gradient(circle at 30% 50%, rgba(180, 200, 153, 0.2), transparent 55%)',
                  filter: 'blur(0.8px)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 5 — Foreground content with subtle scroll parallax */}
      <motion.div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center max-w-5xl px-6"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Initial reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            <p className="text-[#D4AF37]/90 uppercase tracking-[0.35em] text-sm mb-6">
              Valparai · Tamil Nadu
            </p>
          </motion.div>

          {/* Letter-by-letter title */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {TITLE.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                initial={{ opacity: 0, y: 70, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 3 + i * 0.065,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle — word by word */}
          <div className="overflow-hidden mb-10">
            <motion.p
              className="text-xl md:text-2xl text-white/80 tracking-wider"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {SUBTITLE}
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.8 }}
          >
            <Button
              onClick={() => scrollToSection('booking')}
              className="bg-[#D4AF37] text-[#111111] hover:bg-[#D4AF37]/90 rounded-[18px] px-10 py-6 text-lg font-medium"
              style={{ boxShadow: '0 8px 32px rgba(212, 175, 55, 0.45)' }}
            >
              Book Now
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 rounded-[18px] px-10 py-6 text-lg"
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(14px)',
              }}
            >
              Explore
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 flex flex-col items-center gap-1"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: contentOpacity }}
        onClick={() => scrollToSection('about')}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  );
}
