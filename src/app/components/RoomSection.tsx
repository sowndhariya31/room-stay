import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: 'Super Deluxe AC Room',
    image: 'https://pix8.agoda.net/property/56103951/873551559/4bebb26a8f4d9a6e1366de7edae20bb1.jpeg?ce=0&s=1024x',
    price: '₹3,000-₹3,500',
    features: ['Mountain View', 'King Bed', 'Wi-Fi', 'AC'],
    description: 'Elegant room with stunning mountain views',
    tag: 'FAMILIES & COUPLES',
  },
  {
    id: 2,
    name: 'Standard Non-AC',
    image: '/image/bed.jpg',
    price: '₹2,635',
    features: ['Private Balcony', 'Jacuzzi', 'Fitness Center', '24-hot water'],
    description: 'Spacious suite with premium amenities',
    tag: 'TRAVELLERS & GROUPS',
  },
  {
    id: 3,
    name: 'Deluxe Non-AC',
    image: 'https://pix8.agoda.net/property/56103951/873551559/116b091983eca43e133b03c88abcc2d7.jpeg?ce=0&s=1024x',
    price: '₹2,800-₹3,000',
    features: ['2 Bedrooms', 'Private Garden', 'Butler Service', 'Kitchen'],
    description: 'Ultimate luxury villa experience',
    tag: 'EXCLUSIVE EXPERIENCE',
  },
];

export function RoomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4 font-semibold">Luxury Stays</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6 font-serif">
            Our Rooms & Suites
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Each room is thoughtfully designed to offer comfort, elegance, and breathtaking views
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              isInView={isInView}
              onImageClick={(imgUrl) => setSelectedImage(imgUrl)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for full screen view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-[#D4AF37] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 pointer-events-auto border-0 focus:outline-none"
              aria-label="Close full screen image"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2 rounded-2xl overflow-hidden pointer-events-none"
            >
              <img
                src={selectedImage}
                alt="Full preview"
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface RoomCardProps {
  room: typeof rooms[0];
  index: number;
  isInView: boolean;
  onImageClick: (imgUrl: string) => void;
}

function RoomCard({ room, index, isInView, onImageClick }: RoomCardProps) {
  return (
    <motion.div
      className="group cursor-pointer h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
    >
      <div
        className="bg-white overflow-hidden relative flex flex-col h-full border border-[#234F2A]/8 p-6"
        style={{
          borderRadius: '24px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Image Container - framed styling with padding */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onImageClick(room.image);
          }}
          className="relative aspect-[16/10] overflow-hidden rounded-[16px] w-full bg-neutral-100 select-none cursor-zoom-in group-hover:shadow-md transition-shadow duration-300"
        >
          {/* Badge Tag */}
          <span className={`absolute top-4 left-4 ${room.id === 1 ? 'bg-[#0E7490]' : room.id === 2 ? 'bg-[#B45309]' : 'bg-[#15803D]'
            } text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-[6px] z-10 shadow-sm`}>
            {room.tag}
          </span>

          <motion.img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#234F2A]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
          >
            <p className="text-white text-xs font-semibold leading-relaxed">Zoom In Image</p>
          </motion.div>
        </div>

        {/* Content Container (flex-grow) */}
        <div className="flex flex-col flex-grow justify-between mt-6">
          <div className="space-y-4">
            {/* Title - Fixed height to align cards perfectly */}
            <h3 className="text-2xl font-serif text-[#234F2A] font-semibold h-16 flex items-start line-clamp-2 leading-tight">
              {room.name}
            </h3>

            {/* Description quote block */}
            <div className="flex gap-3 pl-3 border-l-2 border-[#D4AF37]">
              <p className="text-sm italic text-[#111111]/70 leading-relaxed font-serif">
                "{room.description}"
              </p>
            </div>

            {/* Features (Amenities) - Fixed height for uniform alignment */}
            <div className="h-[76px] flex flex-wrap gap-2 content-start overflow-hidden pt-2">
              {room.features.map((feature) => (
                <span
                  key={feature}
                  className="px-2.5 py-1 bg-[#5D8C58]/8 text-[#234F2A] text-[10px] font-semibold tracking-wider uppercase rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Booking CTA - Pinned to bottom */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#111111]/8">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-[#111111]/50 font-semibold mb-0.5">
                Starts at
              </span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-[#234F2A] font-serif">
                  {room.price}
                </span>
                <span className="text-xs text-[#111111]/50">/ night</span>
              </div>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-[#234F2A] text-[#234F2A] hover:text-white border-2 border-[#234F2A] hover:border-[#234F2A] rounded-[18px] px-6 py-5 text-sm font-semibold transition-all duration-300 shadow-sm"
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Subtle Hover Glow Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"
          style={{
            boxShadow: '0 20px 50px rgba(35, 79, 42, 0.08)',
          }}
        />
      </div>
    </motion.div>
  );
}
