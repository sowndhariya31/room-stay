import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Wifi, Coffee, Wind, Users } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: 'Super Deluxe AC Room',
    image: 'https://pix8.agoda.net/property/56103951/873551559/4bebb26a8f4d9a6e1366de7edae20bb1.jpeg?ce=0&s=1024x',
    price: '₹8,999',
    features: ['Mountain View', 'King Bed', 'Wi-Fi', 'AC'],
    description: 'Elegant room with stunning mountain views',
  },
  {
    id: 2,
    name: 'Entire 8-Bed Private Dormitory - Mixed',
    image: 'https://pix8.agoda.net/hotelImages/216/2167387/2167387_17062919170054166122.jpg?ca=6&ce=1&s=1024x',
    price: '₹12,999',
    features: ['Private Balcony', 'Jacuzzi', 'Mini Bar', 'AC'],
    description: 'Spacious suite with premium amenities',
  },
  {
    id: 3,
    name: 'Deluxe Room (Super, air conditioner)',
    image: 'https://pix8.agoda.net/property/56103951/873551559/116b091983eca43e133b03c88abcc2d7.jpeg?ce=0&s=1024x',
    price: '₹18,999',
    features: ['2 Bedrooms', 'Private Garden', 'Butler Service', 'Kitchen'],
    description: 'Ultimate luxury villa experience',
  },
];

export function RoomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="rooms" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Wave Divider Top */}
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
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Luxury Stays</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
            Our Rooms & Suites
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Each room is thoughtfully designed to offer comfort, elegance, and breathtaking views
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface RoomCardProps {
  room: typeof rooms[0];
  index: number;
  isInView: boolean;
}

function RoomCard({ room, index, isInView }: RoomCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        y: -15,
        rotateX: 5,
        rotateY: 3,
        scale: 1.03,
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="bg-white overflow-hidden relative"
        style={{
          borderRadius: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#234F2A]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
          >
            <p className="text-white text-sm">{room.description}</p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl text-[#234F2A] mb-4">{room.name}</h3>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-[#5D8C58]/10 text-[#5D8C58] text-sm rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Price & Button */}
          <div className="flex items-center justify-between pt-4 border-t border-[#111111]/10">
            <div>
              <p className="text-sm text-[#111111]/60">Per Night</p>
              <p className="text-2xl text-[#234F2A]">{room.price}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                className="bg-[#D4AF37] text-[#111111] hover:bg-[#D4AF37]/90 rounded-[18px]"
                style={{
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                }}
              >
                Book Now
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius: '24px',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
          }}
        />
      </div>
    </motion.div>
  );
}
