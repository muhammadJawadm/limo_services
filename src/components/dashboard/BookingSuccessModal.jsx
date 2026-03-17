import successicon from '../../assets/successicon.png';
export default function BookingSuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[400px] rounded-[30px] bg-white p-8 text-center shadow-2xl">
        <img src={successicon} alt="Success" className="mx-auto w-48 mb-2" />

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
