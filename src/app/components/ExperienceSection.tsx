import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Coffee, Flame, Binoculars, Mountain, TreePine } from 'lucide-react';

const experiences = [
  {
    icon: <Coffee className="w-6 h-6" />,
    title: 'Tea Plantation',
    description: 'Explore sprawling tea estates and learn about traditional tea processing',
    color: '#5D8C58',
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: 'Campfire',
    description: 'Cozy evenings under the stars with warm bonfire and stories',
    color: '#D4AF37',
  },
  {
    icon: <Binoculars className="w-6 h-6" />,
    title: 'Bird Watching',
    description: 'Spot rare species in their natural habitat with expert guides',
    color: '#234F2A',
  },
  {
    icon: <Mountain className="w-6 h-6" />,
    title: 'Mountain Trek',
    description: 'Challenging trails through misty peaks and verdant valleys',
    color: '#5D8C58',
  },
  {
    icon: <TreePine className="w-6 h-6" />,
    title: 'Nature Walk',
    description: 'Gentle walks through pristine forests and scenic pathways',
    color: '#234F2A',
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Adventures Await</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
            Unique Experiences
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Immerse yourself in the natural beauty and cultural richness of Valparai
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Large Image */}
          <motion.div
            className="relative h-[500px] md:h-[600px] overflow-hidden"
            style={{ borderRadius: '28px' }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/a1/93/18/20190802-124012-largejpg.jpg?w=1000&h=600&s=1"
              alt="Mountain Experience"
              className="w-full h-full object-cover"
            />
            
            {/* Floating gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#234F2A]/50 to-transparent" />
          </motion.div>

          {/* Floating Cards */}
          <div className="relative h-[600px]">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isInView={isInView}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ExperienceCard({ experience, index, isInView, isHovered, onHover, onLeave }: ExperienceCardProps) {
  const positions = [
    { top: '0%', left: '0%' },
    { top: '20%', left: '50%' },
    { top: '40%', left: '10%' },
    { top: '60%', left: '45%' },
    { top: '80%', left: '5%' },
  ];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        top: positions[index].top,
        left: positions[index].left,
      }}
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.05,
        zIndex: 10,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="p-6 backdrop-blur-lg"
        style={{
          background: isHovered
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.18)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0, 0, 0, 0.15)'
            : '0 8px 32px rgba(0, 0, 0, 0.12)',
          width: isHovered ? '280px' : '200px',
          transition: 'all 0.3s ease',
        }}
      >
        <motion.div
          className="flex items-center gap-3 mb-2"
          style={{ color: experience.color }}
        >
          {experience.icon}
          <h3 className="text-lg">{experience.title}</h3>
        </motion.div>

        <motion.p
          className="text-sm text-[#111111]/70"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            overflow: 'hidden',
          }}
        >
          {experience.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
