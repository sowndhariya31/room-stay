import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Building, Star } from 'lucide-react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '28px' }}>
              <motion.img
                src="https://www.homestaysvalparai.com/wp-content/uploads/2023/01/Valpari1.jpg"
                alt="Mountain Resort"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            
            {/* Floating Accent */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4AF37] rounded-full blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-[#5D8C58] uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Welcome to Paradise
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              Nature Meets Luxury
            </motion.h2>

            <motion.p
              className="text-lg text-[#111111]/70 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Nestled in the breathtaking hills of Valparai, Tall Tree Nest offers an
              unparalleled luxury experience surrounded by pristine tea estates,
              misty mountains, and untouched nature. Every moment here is designed to
              reconnect you with the beauty of the natural world while indulging in
              world-class comfort.
            </motion.p>

            <motion.p
              className="text-lg text-[#111111]/70 mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              From sunrise views over rolling hills to starlit evenings by the campfire,
              experience the perfect blend of adventure and tranquility.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <CounterCard
                icon={<Users className="w-8 h-8" />}
                value={5000}
                suffix="+"
                label="Guests"
                delay={0.8}
                isInView={isInView}
              />
              <CounterCard
                icon={<Building className="w-8 h-8" />}
                value={20}
                suffix="+"
                label="Luxury Rooms"
                delay={0.9}
                isInView={isInView}
              />
              <CounterCard
                icon={<Star className="w-8 h-8" />}
                value={4.8}
                suffix="★"
                label="Rating"
                delay={1.0}
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
      <div className="text-3xl md:text-4xl text-[#234F2A] mb-1">
        {value < 10 ? count.toFixed(1) : count}
        {suffix}
      </div>
      <div className="text-sm text-[#111111]/60">{label}</div>
    </motion.div>
  );
}
