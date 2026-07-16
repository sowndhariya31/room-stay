import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Thillai Arasu',
    location: 'India',
    rating: 5,
    comment: 'We stay in this hotel one day... its really a nice place... the  most special thing in this hotel is they having indoor mini theatre with the seating capacity of 20 pax..  its located at the entrance of the valparai... hotel is well maintained... staff mr. Arun and Dharshan are very kind and helpful... rooms are very clean... they having big LED TV in all rooms...  in top floor they having well equipped Gym, those are staying there make use of it... then some indoor games like chess and carrom also there... they arrange home made food on behalf of our request... food is delicious both veg and non veg...  they are arranging night safari to see wild animals... its extra cost...',
  },
  {
    name: 'Santhosh Varghese',
    location: 'Mumbai, India',
    rating: 4,
    comment: 'A hotel with great ambiance..well maintained high quality rooms and fittings.very much reasonable price when booked via app. If needed they will get you home made food if told in advance.. Very much accessible.. The speciality is their dining space and bar counter..which we were allowed to use... Not a quiet place as it is on the road side..but a.very good place..I will definitely suggest this to anyone..',
  },
  {
    name: 'Sivakumar Balasubramanian',
    location: 'London, India',
    rating: 5,
    comment: 'Good cozy rooms in the entrance of valparai Town, At the first floor of Suzuki Two wheeler Show Room, Stayed on 13,14th of Oct 19, Luckily we are the only guest in a approx 12 room Hotel.So parking no issues, Chandru the guy is all in all for room service and reception maintenance and sourcing food from outside amazing.Car parking no issues since we are the only guest food outsourced from laxmi chettinad mess south indian style spicy food, Tea shop are in walkable distance, city centre approx 2 km from this hotel.',
  },
];

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHoveredOrSwiping, setIsHoveredOrSwiping] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay - pauses when user is swiping or hovering
  useEffect(() => {
    if (isHoveredOrSwiping) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHoveredOrSwiping]);

  return (
    <section id="reviews" ref={ref} className="py-24 md:py-32 bg-[#FAFAF7] relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
            What Our Guests Say
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Real experiences from travelers who made Tall Tree Nest their home away from home
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {isDesktop ? (
            /* Desktop Stack Carousel style */
            <div
              className="relative h-[400px] md:h-[350px]"
              onMouseEnter={() => setIsHoveredOrSwiping(true)}
              onMouseLeave={() => setIsHoveredOrSwiping(false)}
            >
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  review={review}
                  index={index}
                  currentIndex={currentIndex}
                  totalReviews={reviews.length}
                  isInView={isInView}
                />
              ))}
            </div>
          ) : (
            /* Mobile Swipe Carousel with Touch Drag */
            <div
              className="relative overflow-visible px-2 min-h-[360px] flex items-center justify-center"
              onTouchStart={() => setIsHoveredOrSwiping(true)}
              onTouchEnd={() => setIsHoveredOrSwiping(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragStart={() => setIsHoveredOrSwiping(true)}
                  onDragEnd={(event, info) => {
                    setIsHoveredOrSwiping(false);
                    const threshold = 60;
                    if (info.offset.x < -threshold) {
                      handleNext();
                    } else if (info.offset.x > threshold) {
                      handlePrev();
                    }
                  }}
                  initial={{ opacity: 0, x: 80, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full cursor-grab active:cursor-grabbing"
                >
                  <div
                    className="w-full p-6 sm:p-10 select-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      borderRadius: '24px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-5">
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-base sm:text-lg text-[#111111]/80 text-center mb-6 leading-relaxed italic px-2">
                      "{reviews[currentIndex].comment}"
                    </p>

                    {/* Author */}
                    <div className="text-center">
                      <h4 className="text-base sm:text-lg text-[#234F2A] font-semibold">{reviews[currentIndex].name}</h4>
                      <p className="text-xs sm:text-sm text-[#111111]/60">{reviews[currentIndex].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-3 h-3 rounded-full transition-all border-0 cursor-pointer"
                style={{
                  background: index === currentIndex ? '#D4AF37' : '#234F2A30',
                  transform: index === currentIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ReviewCardProps {
  review: typeof reviews[0];
  index: number;
  currentIndex: number;
  totalReviews: number;
  isInView: boolean;
}

function ReviewCard({ review, index, currentIndex, totalReviews, isInView }: ReviewCardProps) {
  const getPosition = () => {
    const diff = (index - currentIndex + totalReviews) % totalReviews;

    if (diff === 0) {
      return { x: '0%', scale: 1, opacity: 1, zIndex: 3 };
    } else if (diff === 1) {
      return { x: '30%', scale: 0.85, opacity: 0.5, zIndex: 2 };
    } else if (diff === totalReviews - 1) {
      return { x: '-30%', scale: 0.85, opacity: 0.5, zIndex: 2 };
    } else {
      return { x: '100%', scale: 0.7, opacity: 0, zIndex: 1 };
    }
  };

  const position = getPosition();

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? position : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ zIndex: position.zIndex }}
    >
      <div
        className="w-full max-w-2xl p-8 md:p-10"
        style={{
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Stars */}
        <motion.div
          className="flex justify-center gap-1 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {[...Array(review.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Comment */}
        <p className="text-lg text-[#111111]/80 text-center mb-8 leading-relaxed italic">
          "{review.comment}"
        </p>

        {/* Author */}
        <div className="text-center">
          <h4 className="text-lg text-[#234F2A]">{review.name}</h4>
          <p className="text-sm text-[#111111]/60">{review.location}</p>
        </div>
      </div>
    </motion.div>
  );
}
