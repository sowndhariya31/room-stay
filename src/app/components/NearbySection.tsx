import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

const attractions = [
  {
    name: 'Athirapally Waterfalls',
    distance: '45 km',
    image: 'https://images.unsplash.com/photo-1514509353532-1419c0935d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmUlMjB3YWxrfGVufDF8fHx8MTc4MjcyNTM3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Majestic waterfall surrounded by lush greenery, perfect for nature photography',
  },
  {
    name: 'Sholayar Dam',
    distance: '20 km',
    image: 'https://images.unsplash.com/photo-1657707419206-1ee02449a7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydCUyMG5hdHVyZXxlbnwxfHx8fDE3ODI3MjUzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Scenic dam with panoramic mountain views and serene surroundings',
  },
  {
    name: 'Monkey Falls',
    distance: '8 km',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyZWtraW5nJTIwaGlraW5nfGVufDF8fHx8MTc4MjcyNTM3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Natural waterfall ideal for swimming and picnics in a pristine setting',
  },
  {
    name: 'Balaji Temple',
    distance: '12 km',
    image: 'https://images.unsplash.com/photo-1699629632375-64be611af6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwd2F0Y2hpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzgyNzI1MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ancient temple with spiritual significance and beautiful architecture',
  },
];

export function NearbySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nearby" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,60 Q300,0 600,60 T1200,60 L1200,0 L0,0 Z"
            fill="#FAFAF7"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Explore Nearby</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
            Local Attractions
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Discover the natural wonders and cultural treasures around Valparai
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {attractions.map((attraction, index) => (
            <AttractionCard
              key={index}
              attraction={attraction}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface AttractionCardProps {
  attraction: typeof attractions[0];
  index: number;
  isInView: boolean;
}

function AttractionCard({ attraction, index, isInView }: AttractionCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        y: -10,
      }}
    >
      <div
        className="bg-white overflow-hidden flex flex-col md:flex-row"
        style={{
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <motion.img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Distance Badge */}
          <div
            className="absolute top-4 right-4 px-4 py-2 text-white backdrop-blur-md flex items-center gap-2"
            style={{
              background: 'rgba(35, 79, 42, 0.8)',
              borderRadius: '18px',
            }}
          >
            <MapPin className="w-4 h-4" />
            <span>{attraction.distance}</span>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl text-[#234F2A] mb-3">{attraction.name}</h3>
            <p className="text-[#111111]/70 leading-relaxed">{attraction.description}</p>
          </div>

          <motion.div
            className="flex items-center gap-2 text-[#D4AF37] mt-4 group-hover:gap-4 transition-all"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
