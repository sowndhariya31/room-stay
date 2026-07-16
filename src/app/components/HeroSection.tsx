import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const TITLE = "Tall Tree Nest";
const SUBTITLE = "Luxury Stay in Valparai";

function TeaLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 80 C 30 75, 45 55, 60 50 C 75 45, 90 40, 95 30 C 85 45, 65 50, 50 60 C 35 70, 20 80, 10 80 Z"
        fill="#5D8C58"
        fillOpacity="0.35"
      />
      <path
        d="M10 80 Q 52.5 55 95 30"
        stroke="#234F2A"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <path
        d="M30 68 Q 38 65 42 66"
        stroke="#234F2A"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      <path
        d="M50 56 Q 58 53 62 54"
        stroke="#234F2A"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
    </svg>
  );
}

const leafClusters = [
  { id: 'leaves-1', left: '7%', top: '25%', width: '130px', rotation: 25 },
  { id: 'leaves-2', left: '80%', top: '20%', width: '150px', rotation: -30 },
  { id: 'leaves-3', left: '72%', top: '65%', width: '110px', rotation: 45 },
  { id: 'leaves-4', left: '12%', top: '70%', width: '140px', rotation: -15 },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleOuterRef = useRef<HTMLDivElement>(null);
  const ctaOuterRef = useRef<HTMLDivElement>(null);
  const leavesContainerRef = useRef<HTMLDivElement>(null);
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

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -40]);
  const leafScrollY = useTransform(scrollY, [0, 600], [0, -30]);

  useEffect(() => {
    // Initial entry animations via GSAP
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Stagger character animations
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char-span');
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.05,
        duration: 0.8,
        delay: 0.3,
      });
    }

    if (subtitleOuterRef.current) {
      tl.to(subtitleOuterRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }, '-=0.4');
    }

    if (ctaOuterRef.current) {
      tl.to(ctaOuterRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }, '-=0.5');
    }

    // Skip continuous slow leaves animation loop on mobile viewports for performance
    const isMobileDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isMobileDevice) return;

    // GSAP slow leaves floating motion loops
    if (leavesContainerRef.current) {
      const items = leavesContainerRef.current.children;
      Array.from(items).forEach((item, index) => {
        gsap.to(item, {
          y: '+=20',
          x: index % 2 === 0 ? '+=12' : '-=12',
          rotation: index % 2 === 0 ? '+=12' : '-=12',
          duration: 4.5 + index * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <img
          src="https://images.pixels.com/images/artworkimages/mediumlarge/2/valparai-mahesh.jpg"
          alt="Tall Tree Nest Forest View"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center',
          }}
        />
      </div>
      {/* Floating leaves with GSAP loops — Disabled on mobile/touch screens for graphics optimization */}
      {isMobile === false && (
        <motion.div
          ref={leavesContainerRef}
          className="absolute inset-0 pointer-events-none z-20"
          style={{ y: leafScrollY }}
        >
          {leafClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="absolute"
              style={{
                left: cluster.left,
                top: cluster.top,
                width: cluster.width,
                transform: `rotate(${cluster.rotation}deg)`,
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
              }}
            >
              <TeaLeaf className="w-full h-auto" />
            </div>
          ))}
        </motion.div>
      )}

      {/* Main Content Area */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="text-center max-w-5xl px-6 flex flex-col items-center">

          {/* Accent header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <p className="text-[#111111] uppercase tracking-[0.4em] text-xs sm:text-sm font-semibold mb-6">
              Valparai · Tamil Nadu
            </p>
          </motion.div>

          {/* Letter Reveal Title */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#111111] mb-6 leading-none font-serif tracking-tight"
          >
            {TITLE.split('').map((char, i) => (
              <span
                key={i}
                className="char-span inline-block opacity-0 translate-y-[40px] -rotate-x-[60deg]"
                style={{
                  whiteSpace: char === ' ' ? 'pre' : undefined,
                  transformOrigin: 'bottom center',
                  perspective: '1000px',
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div className="overflow-hidden mb-10 h-auto min-h-[2rem] py-1 flex justify-center items-center">
            <div
              ref={subtitleOuterRef}
              className="opacity-0 translate-y-[20px]"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-[#111111]/90 tracking-widest font-serif italic">
                {SUBTITLE}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaOuterRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 translate-y-[20px]"
          >
            <Button
              onClick={() => scrollToSection('booking')}
              className="bg-[#D4AF37] text-[#111111] hover:bg-white hover:text-black rounded-[18px] px-10 py-6 text-lg font-semibold transition-all duration-350 min-w-[200px]"
              style={{ boxShadow: '0 8px 32px rgba(212, 175, 55, 0.45)' }}
            >
              Book Your Stay
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              className="bg-[#D4AF37] text-[#111111] hover:bg-white hover:text-black rounded-[18px] px-10 py-6 text-lg font-semibold transition-all duration-350 min-w-[200px]"
              style={{ boxShadow: '0 8px 32px rgba(212, 175, 55, 0.45)' }}
            >
              Explore Resort
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-30 flex flex-col items-center gap-1.5 focus:outline-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: contentOpacity }}
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[#111111]/60 text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#111111]/70" />
      </motion.div>
    </section>
  );
}

