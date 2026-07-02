import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

const attractions = [
  {
    name: 'Athirapally Waterfalls',
    distance: '45 km',
    image: '/image/Athirapally Waterfalls.jpeg',
    description: 'Majestic waterfall surrounded by lush greenery, perfect for nature photography.',
  },
  {
    name: 'Sholayar Dam',
    distance: '20 km',
    image: '/image/Sholayar Dam.jpeg',
    description: 'Scenic dam with panoramic mountain views and serene surroundings.',
  },
  {
    name: 'Monkey Falls',
    distance: '8 km',
    image: '/image/Monkey Falls.jpeg',
    description: 'Natural waterfall ideal for swimming and picnics in a pristine setting.',
  },
  {
    name: 'Balaji Temple',
    distance: '12 km',
    image: '/image/Balaji Temple.jpeg',
    description: 'Ancient temple with spiritual significance and beautiful architecture.',
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
          <p className="text-[#5D8C58] uppercase tracking-widest font-semibold text-sm mb-4">Explore Nearby</p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-[#234F2A] mb-6">
            Local Attractions
          </h2>
          <p className="text-base sm:text-lg text-[#111111]/70 max-w-2xl mx-auto font-light">
            Discover the natural wonders and cultural treasures around Valparai
          </p>
        </motion.div>

        {/* Desktop: 2 columns, Tablet: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[820px] mx-auto justify-items-center">
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group w-full max-w-[380px] h-[500px] cursor-pointer flex flex-col bg-white overflow-hidden rounded-[24px] transition-shadow duration-300 hover:shadow-2xl border border-[#234F2A]/5"
    >
      {/* Image Container - Height 250px */}
      <div className="relative w-full h-[250px] min-h-[250px] overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Distance Badge */}
        <div
          className="absolute top-4 right-4 px-4 py-1.5 text-white backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold tracking-wide"
          style={{
            background: 'rgba(35, 79, 42, 0.85)',
            borderRadius: '18px',
          }}
        >
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{attraction.distance}</span>
        </div>
      </div>

      {/* Content Container - Height 250px */}
      <div className="flex-1 h-[250px] min-h-[250px] p-6 flex flex-col justify-between bg-white border-t border-[#234F2A]/5">
        <div>
          <h3 className="text-xl md:text-2xl font-serif text-[#234F2A] mb-3 group-hover:text-[#5D8C58] transition-colors duration-300">
            {attraction.name}
          </h3>
          <p className="text-sm text-[#111111]/70 leading-relaxed font-light line-clamp-3">
            {attraction.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-semibold tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}

