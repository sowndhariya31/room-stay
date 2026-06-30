import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mountain, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        transition={{ delay: 2.5, duration: 0.6 }}
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.18)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.12)'
            : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group cursor-pointer border-0 bg-transparent p-0"
          >
            <Mountain className={`w-8 h-8 ${scrolled ? 'text-[#234F2A]' : 'text-white'} transition-colors`} />
            <span className={`text-xl ${scrolled ? 'text-[#234F2A]' : 'text-white'} transition-colors`}>
              Tall Tree Nest
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative ${scrolled ? 'text-[#111111]' : 'text-white'} transition-colors cursor-pointer border-0 bg-transparent group`}
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#D4AF37]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('booking')}
              className="bg-[#D4AF37] text-[#111111] hover:bg-[#D4AF37]/90 rounded-[18px] px-6"
              style={{
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
              }}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-0 bg-transparent cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-[#111111]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-[#111111]' : 'text-white'}`} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-[72px] left-0 right-0 z-[999] md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-[#111111] py-2 border-0 bg-transparent cursor-pointer"
                >
                  {item}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('booking')}
                className="bg-[#D4AF37] text-[#111111] hover:bg-[#D4AF37]/90 rounded-[18px] w-full"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
