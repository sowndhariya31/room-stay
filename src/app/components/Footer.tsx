import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const STAR_COUNT = 90;
const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 65,
  size: 0.5 + Math.random() * 1.8,
  delay: Math.random() * 5,
  duration: 1.5 + Math.random() * 3.5,
  maxOpacity: 0.3 + Math.random() * 0.7,
}));

const FIREFLY_COUNT = 18;
const fireflies = Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
  id: i,
  startX: 5 + Math.random() * 90,
  startY: 15 + Math.random() * 75,
  pathX: [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 140, 0],
  pathY: [(Math.random() - 0.5) * 90, (Math.random() - 0.5) * 70, 0],
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 9,
}));

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const matchMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(matchMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden text-white"
      style={{ background: 'linear-gradient(to bottom, #050c06, #08120a)' }}
    >
      {/* Animated stars — Disabled on mobile/touch screens for buttery smooth performance */}
      {isMobile === false && (
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{ opacity: [0.1, star.maxOpacity, 0.1] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Moon */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '6%',
          right: '12%',
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #fffde8 0%, #ffeea0 35%, rgba(255,235,140,0.3) 65%, transparent 80%)',
          boxShadow: '0 0 40px 20px rgba(255,240,160,0.12), 0 0 80px 40px rgba(255,235,120,0.06)',
        }}
      />

      {/* Fireflies — Disabled on mobile/touch screens for performance */}
      {isMobile === false && fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${fly.startX}%`,
            top: `${fly.startY}%`,
            width: 5,
            height: 5,
            background: 'rgba(180, 255, 80, 0.9)',
            boxShadow: '0 0 8px 3px rgba(160, 240, 60, 0.7)',
          }}
          animate={{
            x: fly.pathX,
            y: fly.pathY,
            opacity: [0, 0.9, 0.5, 0.9, 0],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 220" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,220 L0,130 L140,65 L280,115 L420,45 L560,95 L700,28 L840,78 L980,48 L1120,90 L1200,110 L1200,220 Z"
            fill="#0d1e0f"
            opacity="0.9"
          />
          <path
            d="M0,220 L0,160 L180,110 L360,148 L540,118 L720,138 L900,108 L1080,130 L1200,150 L1200,220 Z"
            fill="#070f08"
            opacity="1"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10">
        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              className="flex items-center gap-2 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/image/l.png"
                alt="Tall Tree Nest Logo"
                className="h-20 w-auto object-contain select-none pointer-events-none"
              />
              <span className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Tall Tree Nest
              </span>
            </motion.div>
            <p className="text-white/50 leading-relaxed text-sm">
              Luxury stay in the heart of Valparai&apos;s pristine nature. Where mountains meet luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-[#D4AF37] tracking-wider uppercase text-xs">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Rooms', 'Amenities', 'Experience', 'Gallery', 'Reviews'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-white/50 hover:text-[#D4AF37] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[#D4AF37] tracking-wider uppercase text-xs">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5D8C58]" />
                <span>Valparai Hills, Tamil Nadu, India — 642127</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-[#5D8C58]" />
                <span>+91 98946 24989</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-[#5D8C58]" />
                <span>info@talltreenest.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-5 text-[#D4AF37] tracking-wider uppercase text-xs">Follow Us</h4>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>© 2026 Tall Tree Nest. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-[#D4AF37] transition-colors bg-transparent border-0 cursor-pointer">
              Privacy Policy
            </button>
            <button className="hover:text-[#D4AF37] transition-colors bg-transparent border-0 cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
