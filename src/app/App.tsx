import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingParticles } from './components/FloatingParticles';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { RoomSection } from './components/RoomSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { GallerySection } from './components/GallerySection';
import { NearbySection } from './components/NearbySection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { Toaster } from './components/ui/sonner';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scroll during loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
  }, [isLoading]);

  // Lenis smooth scroll — starts after loading completes
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="relative">
        <CustomCursor />
        <FloatingParticles />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <RoomSection />
          <AmenitiesSection />
          <ExperienceSection />
          <GallerySection />
          <NearbySection />
          <ReviewsSection />
          <BookingSection />
        </main>
        <Footer />
        <FloatingContactButtons />
        <Toaster position="top-right" />
      </div>
    </>
  );
}

export default App;
