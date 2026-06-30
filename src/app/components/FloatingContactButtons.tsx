import { Phone } from 'lucide-react';

export function FloatingContactButtons() {
    const whatsappMessage = `Hello Tall Tree Nest,

I would like to enquire about room availability and booking.

Please share:
• Available Rooms
• Room Price
• Check-in & Check-out Details

Thank you.`;

    const whatsappLink = `https://wa.me/919894624989?text=${encodeURIComponent(whatsappMessage)}`;
    const phoneLink = `tel:+919894624989`;

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col gap-4 z-40">
            {/* WhatsApp Button */}
            <div className="relative group">
                {/* Tooltip */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#111111]/90 backdrop-blur-sm border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 pointer-events-none translate-x-2 transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-x-0 whitespace-nowrap">
                    Chat on WhatsApp
                </span>
                {/* Button */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 cursor-pointer transform hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] animate-whatsapp-pulse"
                    aria-label="Chat on WhatsApp"
                >
                    <svg
                        className="w-6 h-6 md:w-7 md:h-7 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.858.002-2.636-1.023-5.114-2.887-6.978a9.789 9.789 0 0 0-6.975-2.883c-5.44 0-9.865 4.425-9.867 9.866-.001 1.63.456 3.226 1.32 4.634l-.999 3.648 3.714-.974zm11.367-7.384c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.206-.604-2.101-1.057-2.934-2.485-.22-.376.22-.35.63-1.17.075-.15.038-.282-.019-.382-.056-.1-.476-1.144-.652-1.569-.172-.414-.347-.359-.476-.365-.123-.006-.264-.007-.406-.007a.78.78 0 0 0-.568.265c-.2.22-.757.74-.757 1.802 0 1.062.772 2.087.88 2.237.108.15 1.52 2.32 3.684 3.251.515.221.916.353 1.229.452.518.165.989.141 1.361.085.414-.062 1.772-.725 2.021-1.425.25-.7.25-1.3.175-1.425-.074-.125-.275-.2-.575-.35z" />
                    </svg>
                </a>
            </div>

            {/* Phone Button */}
            <div className="relative group">
                {/* Tooltip */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#111111]/90 backdrop-blur-sm border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 pointer-events-none translate-x-2 transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-x-0 whitespace-nowrap">
                    Call Now
                </span>
                {/* Button */}
                <a
                    href={phoneLink}
                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2563EB] text-white shadow-lg shadow-black/25 cursor-pointer transform hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                    aria-label="Call Now"
                >
                    <Phone className="w-6 h-6 md:w-7 md:h-7 stroke-[2]" />
                </a>
            </div>
        </div>
    );
}
