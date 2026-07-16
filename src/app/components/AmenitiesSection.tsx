import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Wifi, Dumbbell, Coffee, Wind, Car, Utensils, Waves, Leaf } from 'lucide-react';

const amenities = [
  { icon: <Wifi className="w-8 h-8" />, label: 'Free WiFi' },
  { icon: <Dumbbell className="w-8 h-8" />, label: 'Fitness Center' },
  { icon: <Coffee className="w-8 h-8" />, label: 'Cafe & Bar' },
  { icon: <Wind className="w-8 h-8" />, label: 'Air Conditioning' },
  { icon: <Car className="w-8 h-8" />, label: 'Free Parking' },
  { icon: <Utensils className="w-8 h-8" />, label: 'Restaurant' },
  { icon: <Waves className="w-8 h-8" />, label: 'kids club' },
  { icon: <Leaf className="w-8 h-8" />, label: 'Front desk [24-hour]' },
];

export function AmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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

  return (
    <section id="amenities" ref={ref} className="py-24 md:py-32 bg-[#FAFAF7] relative overflow-hidden">
      {/* Background Pattern — Disabled on mobile to reduce rasterization load */}
      {(!isMobile) && (
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-[#5D8C58]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Premium Facilities</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
            World-Class Amenities
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Everything you need for a perfect stay, from wellness to entertainment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {amenities.map((amenity, index) => (
            <AmenityCircle key={index} amenity={amenity} index={index} isInView={isInView} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface AmenityCircleProps {
  amenity: typeof amenities[0];
  index: number;
  isInView: boolean;
  isMobile: boolean | null;
}

function AmenityCircle({ amenity, index, isInView, isMobile }: AmenityCircleProps) {
  return (
    <motion.div
      className="flex flex-col items-center group cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
      }}
      whileHover={{ y: -10 }}
    >
      {/* Glass Circle / Solid Circle on Mobile */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4"
        style={{
          background: isMobile ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.18)',
          backdropFilter: isMobile ? undefined : 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 12px 48px rgba(212, 175, 55, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          className="text-[#234F2A]"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          {amenity.icon}
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 blur-xl"
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-center text-[#234F2A]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {amenity.label}
      </motion.p>
    </motion.div>
  );
}
