import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Users, Home } from 'lucide-react';
import { toast } from 'sonner';

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    arrival: '',
    departure: '',
    guests: '2',
    room: 'deluxe',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request submitted! We will contact you shortly.');
  };

  return (
    <section id="booking" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Animated Mountain Background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,400 L0,200 L200,100 L400,180 L600,60 L800,140 L1000,100 L1200,200 L1200,400 Z"
            fill="#234F2A"
            animate={{
              d: [
                'M0,400 L0,200 L200,100 L400,180 L600,60 L800,140 L1000,100 L1200,200 L1200,400 Z',
                'M0,400 L0,220 L200,120 L400,200 L600,80 L800,160 L1000,120 L1200,220 L1200,400 Z',
                'M0,400 L0,200 L200,100 L400,180 L600,60 L800,140 L1000,100 L1200,200 L1200,400 Z',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
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
          <p className="text-[#5D8C58] uppercase tracking-wider mb-4">Reserve Your Stay</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#234F2A] mb-6">
            Book Your Escape
          </h2>
          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Experience luxury in the heart of nature. Reserve your perfect getaway today.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="p-8 md:p-12"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Arrival Date */}
                <div className="space-y-2">
                  <Label htmlFor="arrival" className="text-[#234F2A] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Arrival Date
                  </Label>
                  <Input
                    id="arrival"
                    type="date"
                    value={formData.arrival}
                    onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                    required
                    className="border-[#234F2A]/20 focus:border-[#D4AF37] rounded-[18px]"
                  />
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <Label htmlFor="departure" className="text-[#234F2A] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Departure Date
                  </Label>
                  <Input
                    id="departure"
                    type="date"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    required
                    className="border-[#234F2A]/20 focus:border-[#D4AF37] rounded-[18px]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Number of Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-[#234F2A] flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Number of Guests
                  </Label>
                  <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                    <SelectTrigger className="border-[#234F2A]/20 focus:border-[#D4AF37] rounded-[18px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <Label htmlFor="room" className="text-[#234F2A] flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Room Type
                  </Label>
                  <Select value={formData.room} onValueChange={(value) => setFormData({ ...formData, room: value })}>
                    <SelectTrigger className="border-[#234F2A]/20 focus:border-[#D4AF37] rounded-[18px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deluxe">Deluxe Room</SelectItem>
                      <SelectItem value="premium">Premium Suite</SelectItem>
                      <SelectItem value="royal">Royal Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-[#111111] hover:bg-[#D4AF37]/90 rounded-[18px] py-6 text-lg"
                  style={{
                    boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
                  }}
                >
                  Book Your Stay
                </Button>
              </motion.div>
            </form>

            {/* Additional Info */}
            <p className="text-center text-sm text-[#111111]/60 mt-6">
              Our team will contact you within 24 hours to confirm your reservation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
