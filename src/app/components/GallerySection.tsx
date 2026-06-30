import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X, Maximize2 } from 'lucide-react';

const images = [
  {
    url: 'https://pix8.agoda.net/property/56103951/873551558/cce164215cb8da0ffdb42467a34db33c.jpeg?ce=0&s=1024x',
    alt: 'Luxury Room',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/0/0d5c72dfd85446ab541dc37dd1f1c227.jpeg?ce=0&s=1024x',
    alt: 'Dining',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/5ae7b5bb70c8b519d17de93e7b0b0d9d.png?ca=9&ce=1&s=1024x',
    alt: 'Restaurant',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/f95d158dafbd0e1a46d3495c72acdb9e.jpg?ca=9&ce=1&s=1024x',
    alt: 'Play area',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/426bebcb8bcfe03b24cdc5e52923dae6.png?ca=9&ce=1&s=1024x',
    alt: 'Fitness Center',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/1f36263cb9145b23f60d108ba451954f.png?ca=9&ce=1&s=1024x',
    alt: 'theatre',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/bf49c1123258db0a399e6c0987a11c5f.png?ca=8&ce=1&s=1024x',
    alt: 'rooms',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/a6ccc5fde6a393d6ac4ff7dd1815df1c.jpg?ca=0&ce=1&s=1024x',
    alt: 'Deluxe Room',
  },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section id="gallery" ref={ref} className="py-24 md:py-32 bg-[#FAFAF7]">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Explore</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
              Our Gallery
            </h2>
            <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
              A visual journey through the beauty and luxury of Tall Tree Nest
            </p>
          </motion.div>

          <Masonry columnsCount={3} gutter="20px">
            {images.map((image, index) => (
              <GalleryImage
                key={index}
                image={image}
                index={index}
                isInView={isInView}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </Masonry>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors z-10 bg-transparent border-0 cursor-pointer"
            >
              <X className="w-10 h-10" />
            </button>

            <motion.img
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface GalleryImageProps {
  image: typeof images[0];
  index: number;
  isInView: boolean;
  onClick: () => void;
}

function GalleryImage({ image, index, isInView, onClick }: GalleryImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden group"
      style={{ borderRadius: '28px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.img
        src={image.url}
        alt={image.alt}
        className="w-full h-auto object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      >
        <motion.div
          className="p-4 rounded-full bg-white/20 backdrop-blur-md"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Maximize2 className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
