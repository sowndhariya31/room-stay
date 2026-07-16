import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Users, Home, User, Phone, MapPin, IdCard } from 'lucide-react';
import { toast } from 'sonner';

const roomTypeLabels: Record<string, string> = {
  deluxe: 'Super Deluxe AC Room',
  premium: 'Deluxe Non-AC',
  royal: 'Standard Non-AC',
};

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const matchMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(matchMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    place: '',
    idProof: '',
    arrival: '',
    departure: '',
    guests: '2',
    room: 'deluxe',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    place: '',
    idProof: '',
    arrival: '',
    departure: '',
    guests: '',
  });

  // Clear errors when user changes inputs
  useEffect(() => {
    setErrors((prev) => ({ ...prev, name: '' }));
  }, [formData.name]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, phone: '' }));
  }, [formData.phone]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, place: '' }));
  }, [formData.place]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, idProof: '' }));
  }, [formData.idProof]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, arrival: '' }));
  }, [formData.arrival]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, departure: '' }));
  }, [formData.departure]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const validate = (): boolean => {
    const newErrors = {
      name: '',
      phone: '',
      place: '',
      idProof: '',
      arrival: '',
      departure: '',
      guests: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.place.trim()) {
      newErrors.place = 'Customer place is required';
      isValid = false;
    }

    if (!formData.idProof.trim()) {
      newErrors.idProof = 'ID proof is required';
      isValid = false;
    }

    // Get today with local midnight time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.arrival) {
      newErrors.arrival = 'Arrival date is required';
      isValid = false;
    } else {
      const arrival = new Date(formData.arrival);
      arrival.setHours(0, 0, 0, 0);
      if (arrival < today) {
        newErrors.arrival = 'Arrival date cannot be in the past';
        isValid = false;
      }
    }

    if (!formData.departure) {
      newErrors.departure = 'Departure date is required';
      isValid = false;
    } else {
      const departure = new Date(formData.departure);
      departure.setHours(0, 0, 0, 0);
      if (departure < today) {
        newErrors.departure = 'Departure date cannot be in the past';
        isValid = false;
      }

      if (formData.arrival) {
        const arrival = new Date(formData.arrival);
        arrival.setHours(0, 0, 0, 0);
        if (departure <= arrival) {
          newErrors.departure = 'Departure date must be after check-in';
          isValid = false;
        }
      }
    }

    const guestNum = parseInt(formData.guests, 10);
    if (!formData.guests || (isNaN(guestNum) && formData.guests !== '5+') || guestNum < 1) {
      newErrors.guests = 'Minimum 1 guest is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      // Find the first error to toast it
      const errorMsg =
        newErrors.name ||
        newErrors.phone ||
        newErrors.place ||
        newErrors.idProof ||
        newErrors.arrival ||
        newErrors.departure ||
        newErrors.guests;
      toast.error(errorMsg || 'Please fix the errors in the booking form.');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedArrival = formatDate(formData.arrival);
    const formattedDeparture = formatDate(formData.departure);
    const guestCount = formData.guests;
    const roomLabel = roomTypeLabels[formData.room] || formData.room;

    const message = `Hello! I would like to enquire about booking a stay. Here are my details:
- Property of Interest: ${roomLabel}
- No. of Guests: ${guestCount}
- Check-in Date: ${formattedArrival}
- Check-out Date: ${formattedDeparture}
- Customer Name: ${formData.name.trim()}
- Mobile Number: ${formData.phone.trim()}
- Customer Place: ${formData.place.trim()}
- ID Proof: ${formData.idProof.trim()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919894624989?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show Success notification
    toast.success('Your booking request was generated! Connecting to WhatsApp...');

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      place: '',
      idProof: '',
      arrival: '',
      departure: '',
      guests: '2',
      room: 'deluxe',
    });
    setErrors({
      name: '',
      phone: '',
      place: '',
      idProof: '',
      arrival: '',
      departure: '',
      guests: '',
    });
  };

  return (
    <section id="booking" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Animated Mountain Background and leaves — Disabled on mobile/touch screens for performance */}
      {(!isMobile) && (
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
      )}

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#5D8C58] uppercase tracking-widest font-semibold text-sm mb-4">Reserve Your Stay</p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-[#234F2A] mb-6">
            Book Your Escape
          </h2>
          <p className="text-base sm:text-lg text-[#111111]/70 max-w-2xl mx-auto font-light">
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
            className={`p-8 md:p-12 border border-white/40 shadow-2xl rounded-[28px] ${isMobile ? 'bg-white' : 'bg-white/70 backdrop-blur-xl'
              }`}
            style={{
              boxShadow: '0 20px 50px -25px rgba(35, 79, 42, 0.15)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    Customer Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`border transition-all duration-300 rounded-[18px] h-12 bg-white/50 focus:bg-white text-base ${errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#234F2A]/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/25'
                      }`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 font-medium pl-2"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    Mobile Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`border transition-all duration-300 rounded-[18px] h-12 bg-white/50 focus:bg-white text-base ${errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#234F2A]/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/25'
                      }`}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 font-medium pl-2"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Place */}
                <div className="space-y-2">
                  <Label htmlFor="place" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    Customer Place
                  </Label>
                  <Input
                    id="place"
                    type="text"
                    placeholder="Enter your town/city"
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    className={`border transition-all duration-300 rounded-[18px] h-12 bg-white/50 focus:bg-white text-base ${errors.place
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#234F2A]/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/25'
                      }`}
                  />
                  {errors.place && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 font-medium pl-2"
                    >
                      {errors.place}
                    </motion.p>
                  )}
                </div>

                {/* ID Proof */}
                <div className="space-y-2">
                  <Label htmlFor="idProof" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <IdCard className="w-4 h-4 text-[#D4AF37]" />
                    ID Proof
                  </Label>
                  <Input
                    id="idProof"
                    type="text"
                    placeholder="e.g., Aadhaar / Passport / Voter ID"
                    value={formData.idProof}
                    onChange={(e) => setFormData({ ...formData, idProof: e.target.value })}
                    className={`border transition-all duration-300 rounded-[18px] h-12 bg-white/50 focus:bg-white text-base ${errors.idProof
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#234F2A]/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/25'
                      }`}
                  />
                  {errors.idProof && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 font-medium pl-2"
                    >
                      {errors.idProof}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Arrival Date */}
                <div className="space-y-2">
                  <Label htmlFor="arrival" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    Arrival Date
                  </Label>
                  <Input
                    id="arrival"
                    type="date"
                    value={formData.arrival}
                    onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                    className={`border transition-all duration-300 rounded-[18px] h-12 bg-white/50 focus:bg-white text-base ${errors.arrival
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#234F2A]/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/25'
                      }`}
                  />
                  {errors.arrival && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 font-medium pl-2"
                    >
                      {errors.arrival}
                    </motion.p>
                  )}
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <Label htmlFor="departure" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    Departure Date
                  </Label>
                  <Input
                    id="departure"
                    type="date"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    className={`border transition-all duration-300 rounded-[18px] h-12 bg-white/50 focus:bg-white text-base ${errors.departure
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#234F2A]/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/25'
                      }`}
                  />
                  {errors.departure && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 font-medium pl-2"
                    >
                      {errors.departure}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Number of Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                    Number of Guests
                  </Label>
                  <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                    <SelectTrigger className="border-[#234F2A]/15 focus:border-[#D4AF37] rounded-[18px] h-12 bg-white/50 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5 Guests</SelectItem>
                      <SelectItem value="6">6+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <Label htmlFor="room" className="text-[#234F2A] font-medium flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#D4AF37]" />
                    Room Type
                  </Label>
                  <Select value={formData.room} onValueChange={(value) => setFormData({ ...formData, room: value })}>
                    <SelectTrigger className="border-[#234F2A]/15 focus:border-[#D4AF37] rounded-[18px] h-12 bg-white/50 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deluxe">Super Deluxe AC Room</SelectItem>
                      <SelectItem value="premium">Deluxe Non-AC</SelectItem>
                      <SelectItem value="royal">Standard Non-AC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  className="w-full bg-[#234F2A] text-white hover:bg-[#D4AF37] hover:text-black rounded-[18px] py-6 text-lg transition-all duration-300 font-serif font-medium"
                  style={{
                    boxShadow: '0 8px 32px rgba(35, 79, 42, 0.25)',
                  }}
                >
                  Book Your Stay
                </Button>
              </motion.div>
            </form>

            {/* Additional Info */}
            <p className="text-center text-sm text-[#111111]/60 mt-6 font-light">
              Our team will review your WhatsApp details and confirm your reservation shortly.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

