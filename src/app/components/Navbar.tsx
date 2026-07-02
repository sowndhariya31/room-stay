import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync scroll-lock for mobile navigation
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Section observer to detect active scroll states
  useEffect(() => {
    const sections = ['hero', 'about', 'rooms', 'amenities', 'experience', 'gallery', 'reviews', 'booking'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Active when element takes center stage
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const menuItems = ['About', 'Rooms', 'Amenities', 'Experience', 'Gallery', 'Reviews'];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(17, 17, 17, 0.15)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(4px)',
          boxShadow: scrolled
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.08)'
            : 'none',
          borderBottom: scrolled ? '1px solid rgba(35, 79, 42, 0.05)' : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group cursor-pointer border-0 bg-transparent p-0 focus:outline-none"
          >
            <img
              src="/image/logoo.png"
              alt="Tall Tree Nest Logo"
              className="h-[42px] md:h-[48px] lg:h-[60px] w-[140px] md:w-[170px] lg:w-[210px] object-fill transition-all duration-300 select-none pointer-events-none"
              style={{
                filter: scrolled
                  ? 'contrast(1.3) brightness(1.05) drop-shadow(0 1px 3px rgba(0,0,0,0.15))'
                  : 'contrast(1.35) brightness(1.08) drop-shadow(0 1px 4px rgba(255, 255, 255, 0.4))',
              }}
            />
          </button>

          {/* Desktop Menu links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const worksAs = item.toLowerCase();
              const isAct = activeSection === worksAs;
              return (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(worksAs)}
                  className={`relative py-1 text-sm tracking-wider uppercase transition-colors duration-300 font-medium cursor-pointer border-0 bg-transparent group focus:outline-none ${isAct
                    ? 'text-[#D4AF37]'
                    : scrolled
                      ? 'text-[#111111]/80 hover:text-[#234F2A]'
                      : 'text-white/80 hover:text-white'
                    }`}
                  whileHover={{ y: -1 }}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isAct ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('booking')}
              className={`rounded-[18px] px-6 py-5 text-sm font-semibold transition-all duration-350 ${scrolled
                ? 'bg-[#234F2A] text-white hover:bg-[#D4AF37] hover:text-black shadow-lg shadow-[#234F2A]/10'
                : 'bg-white text-[#234F2A] hover:bg-[#D4AF37] hover:text-black shadow-lg'
                }`}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-0 bg-transparent cursor-pointer focus:outline-none z-[1300]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${scrolled || mobileMenuOpen ? 'text-[#111111]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-[#111111]' : 'text-white'}`} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-md z-[1100] md:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#FAFAF7] text-[#111111] z-[1200] max-h-screen h-screen flex flex-col p-8 shadow-2xl md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-10 border-b border-[#234F2A]/10 pb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/image/logoo.png"
                    alt="Tall Tree Nest Logo"
                    className="h-12 w-[150px] object-fill select-none pointer-events-none"
                    style={{
                      filter: 'contrast(1.3) brightness(1.05) drop-shadow(0 1px 3px rgba(0,0,0,0.1))',
                    }}
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-black/5 transition-all text-[#234F2A] border-0 bg-transparent focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-6 flex-1 overflow-y-auto pr-2">
                {menuItems.map((item) => {
                  const worksAs = item.toLowerCase();
                  const isAct = activeSection === worksAs;
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(worksAs)}
                      className={`text-left text-lg font-serif py-2 border-b border-black/5 uppercase tracking-wider transition-colors duration-300 w-full bg-transparent border-0 cursor-pointer focus:outline-none ${isAct ? 'text-[#D4AF37] font-semibold pl-2 border-l-2 border-l-[#D4AF37]' : 'text-[#234F2A]'
                        }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-[#234F2A]/10 mt-auto">
                <Button
                  onClick={() => scrollToSection('booking')}
                  className="bg-[#234F2A] hover:bg-[#D4AF37] text-white hover:text-black w-full rounded-[18px] py-6 text-base font-serif font-medium transition-all duration-300"
                >
                  Book Your Escape
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

