import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { X, Maximize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const images = [
  {
    url: 'https://pix8.agoda.net/hotelImages/216/2167387/2167387_17041513070052418049.jpg?ca=13&ce=1&s=1024x',
    alt: 'Luxury Suite Bedroom',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/0/0d5c72dfd85446ab541dc37dd1f1c227.jpeg?ce=0&s=1024x',
    alt: 'Fine Dining Buffet',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/5ae7b5bb70c8b519d17de93e7b0b0d9d.png?ca=9&ce=1&s=1024x',
    alt: 'Glass House Restaurant',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/f95d158dafbd0e1a46d3495c72acdb9e.jpg?ca=9&ce=1&s=1024x',
    alt: 'Kids Play Zone',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/426bebcb8bcfe03b24cdc5e52923dae6.png?ca=9&ce=1&s=1024x',
    alt: 'Modern Fitness Center',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/1f36263cb9145b23f60d108ba451954f.png?ca=9&ce=1&s=1024x',
    alt: 'Mini Cinema Theatre',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/bf49c1123258db0a399e6c0987a11c5f.png?ca=8&ce=1&s=1024x',
    alt: 'Deluxe Cozy Room Vibe',
  },
  {
    url: 'https://pix8.agoda.net/hotelImages/2167387/-1/a6ccc5fde6a393d6ac4ff7dd1815df1c.jpg?ca=0&ce=1&s=1024x',
    alt: 'Executive Suite Lounge',
  },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Embla Carousel Setup for Mobile Slider
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [mobileIndex, setMobileIndex] = useState(0);

  // Mobile Autoplay & Sync Index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setMobileIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(autoplay);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handlePrevMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    emblaApi?.scrollPrev();
  };

  const handleNextMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    emblaApi?.scrollNext();
  };

  // Keyboard navigation & resets
  useEffect(() => {
    setIsZoomed(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : null));
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Touch Swipe for Lightbox (Mobile Gestures)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    const minSwipeDist = 55;

    if (diff > minSwipeDist) {
      // Swipe Left -> Next
      setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : null));
    } else if (diff < -minSwipeDist) {
      // Swipe Right -> Prev
      setSelectedImage((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
  };

  return (
    <>
      <section id="gallery" ref={ref} className="py-24 md:py-32 bg-[#FAFAF7] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#5D8C58] uppercase tracking-widest font-semibold text-sm mb-4">Explore</p>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-[#234F2A] mb-6">
              Our Gallery
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/70 max-w-2xl mx-auto font-light">
              A visual journey through the beauty and luxury of Tall Tree Nest
            </p>
          </motion.div>

          {/* Desktop & Tablet Grid - Visible only on md screens and up */}
          <motion.div
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="relative cursor-pointer overflow-hidden rounded-[20px] shadow-lg group aspect-[4/3] bg-neutral-200 border border-[#234F2A]/5"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                  <div className="p-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 transition-transform duration-350 translate-y-2 group-hover:translate-y-0 scale-90 group-hover:scale-100">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold tracking-widest uppercase transition-all duration-350 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    View Image
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Swiper/Carousel - Visible below md */}
          <div className="block md:hidden w-full relative">
            <div className="overflow-hidden w-full rounded-[20px] shadow-xl group border border-[#234F2A]/5" ref={emblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="flex-[0_0_100%] min-w-0 relative aspect-[4/3]"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <p className="text-white text-sm font-serif">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev / Next buttons inside slider */}
              <button
                onClick={handlePrevMobile}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-[#D4AF37]"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextMobile}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-[#D4AF37]"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Pagination Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${mobileIndex === idx ? 'w-5 bg-[#234F2A]' : 'w-1.5 bg-neutral-300'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* Top Toolbar panel */}
            <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center text-white z-20 pointer-events-none">
              <span className="text-xs sm:text-sm font-light tracking-widest uppercase">
                {selectedImage + 1} / {images.length} — {images[selectedImage].alt}
              </span>

              <div className="flex items-center gap-4 pointer-events-auto">
                {/* Zoom toggle button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-white transition-all bg-transparent border-0 cursor-pointer"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-white transition-all bg-transparent border-0 cursor-pointer"
                  title="Close Gallery"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full border border-white/10 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white backdrop-blur-md transition-all duration-300 z-10 focus:outline-none hidden sm:block pointer-events-auto"
              aria-label="Previous product image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center interactive image view */}
            <div className="relative w-full h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
              <motion.img
                key={selectedImage}
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className={`max-w-full max-h-full object-contain transition-transform duration-300 select-none ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={nextLightbox}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full border border-white/10 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white backdrop-blur-md transition-all duration-300 z-10 focus:outline-none hidden sm:block pointer-events-auto"
              aria-label="Next product image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile swipe helper text */}
            <span className="absolute bottom-6 text-[10px] text-white/40 tracking-[0.2em] uppercase sm:hidden font-light pointer-events-none">
              Swipe Left / Right
            </span>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

