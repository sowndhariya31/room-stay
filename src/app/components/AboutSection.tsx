import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Users, Building, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  {
    src: '/image/room.jpeg',
    alt: 'Luxury Suite Room',
    title: 'Luxury Suite Room',
  },
  {
    src: 'https://pix8.agoda.net/property/56103951/873551558/cce164215cb8da0ffdb42467a34db33c.jpeg?ce=0&s=1024x/',
    alt: 'Premium Suite Vibe',
    title: 'Premium Suite Vibe',
  },
  {
    src: 'https://pix8.agoda.net/hotelImages/2167387/-1/1af5c989bf5ee3cd8fae024343f95c26.jpg?ca=0&ce=1&s=1024x',
    alt: 'Misty Mountains View',
    title: 'Misty Mountains View',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto swipe every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  // Touch handlers for mobile swipe support
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAF7]"
    >
      {/* Leaf Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 Q 40 20 30 30 Q 20 20 30 10' fill='%23234F2A'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side: Professional Slider */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            {/* Slider Container */}
            <div
              className="relative overflow-hidden rounded-[28px] shadow-2xl h-[320px] sm:h-[400px] md:h-[500px] group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={IMAGES[currentIndex].src}
                    alt={IMAGES[currentIndex].alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Label Details */}
                  <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none z-10">
                    <span className="text-[#D4AF37] uppercase tracking-widest text-xs font-medium block mb-1">
                      Explore Tall Tree Nest
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif">
                      {IMAGES[currentIndex].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
                {IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/50'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Glowing Soft Backdrop Light */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#D4AF37] rounded-full blur-[80px] opacity-20 pointer-events-none" />
          </motion.div>

          {/* Right Side: Existing Content with improved motion styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <motion.p
              className="text-[#5D8C58] uppercase tracking-widest font-semibold text-sm mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Welcome to Paradise
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-5xl font-serif text-[#234F2A] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Nature Meets Luxury
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-[#111111]/75 mb-6 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Nestled in the breathtaking hills of Valparai, Tall Tree Nest offers an
              unparalleled luxury experience surrounded by pristine tea estates,
              misty mountains, and untouched nature. Every moment here is designed to
              reconnect you with the beauty of the natural world while indulging in
              world-class comfort.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-[#111111]/75 mb-10 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              From sunrise views over rolling hills to starlit evenings by the campfire,
              experience the perfect blend of adventure and tranquility.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#234F2A]/10">
              <CounterCard
                icon={<Users className="w-6 h-6 sm:w-8 sm:h-8" />}
                value={5000}
                suffix="+"
                label="Guests"
                delay={0.7}
                isInView={isInView}
              />
              <CounterCard
                icon={<Building className="w-6 h-6 sm:w-8 sm:h-8" />}
                value={20}
                suffix="+"
                label="Luxury Rooms"
                delay={0.8}
                isInView={isInView}
              />
              <CounterCard
                icon={<Star className="w-6 h-6 sm:w-8 sm:h-8" />}
                value={4.8}
                suffix="★"
                label="Rating"
                delay={0.9}
                isInView={isInView}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface CounterCardProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
}

function CounterCard({ icon, value, suffix, label, delay, isInView }: CounterCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
    >
      <div className="text-[#D4AF37] mb-2 flex justify-center">{icon}</div>
      <div className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#234F2A] font-semibold mb-1">
        {value < 10 ? count.toFixed(1) : count}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-[#111111]/60 tracking-wide font-medium">{label}</div>
    </motion.div>
  );
}

