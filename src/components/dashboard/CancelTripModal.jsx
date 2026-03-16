import { FiX } from 'react-icons/fi';
import cancelicon from '../../assets/crossiconred.png'

export default function CancelTripModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[500px] rounded-[30px] bg-white p-8 text-center shadow-2xl">
        <img src={cancelicon} alt="" className='w-32 h-32 mx-auto' />

        <h3 className="mb-4 text-[22px] font-bold text-[#111111]">Cancel this trip?</h3>

        <div className="space-y-4 text-sm text-[#666666] leading-relaxed mb-8">
          <p>
            Cancellation Fees: <br />
            More than 2 hours before the trip: o Full refund (100%) with no cancellation fee.<br />
            o Driver is notified immediately via email.<br />
            o Trip is marked as "Cancelled - No Fee" by system.
          </p>
          <p>
            Between 2 hours and 30 minutes before the trip: o Partial cancellation fee<br />
            o Remaining amount refunded. o Driver is notified immediately.<br />
            o Trip is marked as "Cancelled - Partial Fee."
          </p>
          <p className="italic">
            *Note: Percentage of fee manage by admin.
          </p>
          <p>
            Less than 30 minutes before the trip:<br />
            o 50% cancellation fee.<br />
            o Remaining 50% refunded (or not charged if not yet captured).<br />
            o Driver is notified immediately.<br />
            o Trip is marked as "Cancelled - Late / En-Route."
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-[300px] mx-auto">
          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
          >
            Yes, Cancel Trip
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full border border-[#1b2d5d] bg-white py-3.5 text-[15px] font-medium text-[#1b2d5d] transition-colors hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
