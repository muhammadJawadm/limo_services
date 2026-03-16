export default function BookingSuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[400px] rounded-[30px] bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-[85px] w-[85px] items-center justify-center rounded-full bg-[#1b2d5d]/10 relative">
          {/* Decorative small circles */}
          <div className="absolute top-1 left-2 h-2 w-2 rounded-full bg-[#8b9bc8]" />
          <div className="absolute top-4 right-1 h-1.5 w-1.5 rounded-full bg-[#8b9bc8]" />
          <div className="absolute top-1/2 -left-2 h-1 w-1 rounded-full bg-[#8b9bc8]" />
          <div className="absolute bottom-2 left-4 h-1.5 w-1.5 rounded-full bg-[#8b9bc8]" />
          <div className="absolute bottom-3 -right-1 h-1 w-1 rounded-full bg-[#8b9bc8]" />

          {/* Main blue jagged shape background behind icon */}
          <div className="flex h-[75px] w-[75px] items-center justify-center rounded-[20px] bg-[#1b2d5d] rotate-45 relative">
             <svg className="absolute w-[80px] h-[80px] -rotate-45" viewBox="0 0 100 100" fill="#1b2d5d" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0L57 15L72 10L75 25L90 28L86 43L100 50L86 57L90 72L75 75L72 90L57 85L50 100L43 85L28 90L25 75L10 72L14 57L0 50L14 43L10 28L25 25L28 10L43 15Z" />
             </svg>
             <div className="-rotate-45 z-10 text-white">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
             </div>
          </div>
        </div>

        <h3 className="mb-2 text-[26px] font-bold text-[#111111]">Ride Booked</h3>
        <p className="mb-4 text-sm font-medium text-[#666]">
          787878, 4848
        </p>
        
        <p className="text-[15px] text-[#666666] leading-relaxed mb-8">
           Your reservation has been received.<br />
           You can see details on ride details screen.
        </p>

        <div className="mx-auto max-w-[300px]">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
          >
            Back to Ride Details
          </button>
        </div>
      </div>
    </div>
  );
}
