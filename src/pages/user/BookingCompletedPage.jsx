import { useNavigate } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';

const qrMatrix = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
  [1,0,1,1,0,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1],
  [0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0],
  [1,1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,0,1,1],
  [0,0,1,0,0,1,1,0,1,0,1,0,0,1,0,0,1,0,1,0,0],
  [1,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,1,0,1,0],
  [0,0,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,0,0,1,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,0],
  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0],
  [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,0],
  [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,1,0,0,1,0],
];

function QRCode() {
  return (
    <svg viewBox="0 0 21 21" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
      {qrMatrix.flatMap((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#111827" /> : null
        )
      )}
    </svg>
  );
}

export default function BookingCompletedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#374151] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full px-8 py-10">

        {/* Checkmark badge with decorative dots */}
        <div className="flex justify-center mb-5">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Decorative dots */}
            <span className="absolute top-0 left-6 w-3 h-3 rounded-full bg-gray-200" />
            <span className="absolute top-3 right-1 w-2 h-2 rounded-full bg-gray-200" />
            <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="absolute bottom-0 left-3 w-2 h-2 rounded-full bg-gray-200" />
            <span className="absolute bottom-2 right-3 w-1.5 h-1.5 rounded-full bg-gray-300" />
            {/* Main badge */}
            <div className="w-16 h-16 bg-[#1a2b5e] rounded-full flex items-center justify-center z-10">
              <BsCheckLg size={28} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Booking completed</h1>
        <p className="text-sm text-gray-400 text-center mb-6 max-w-md mx-auto leading-relaxed">
          Your request has been submitted. Our customer service representative will get back to you shortly. Thank you for choosing prestige and have a safe trip.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6" />

        {/* Booking details */}
        <div className="flex gap-4">

          {/* Left column */}
          <div className="flex flex-col gap-5 w-36 flex-shrink-0 border-r border-gray-100 pr-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Passenger Name</p>
              <p className="text-sm font-bold text-gray-900">Jayson Smith</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Vehicle</p>
              <p className="text-sm font-bold text-gray-900">Business Sedan</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Luggage</p>
              <p className="text-sm font-bold text-gray-900">2</p>
            </div>
          </div>

          {/* Middle column */}
          <div className="flex-1 flex flex-col gap-3 border-r border-gray-100 pr-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Pick Up</p>
              <p className="text-sm font-semibold text-gray-900">Beck Road, Plymouth, MI, USA</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Stop</p>
              <p className="text-sm font-semibold text-gray-900">Telegraph Road, Southfield, MI, USA</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Drop of location</p>
              <p className="text-sm font-semibold text-gray-900">Eight Mile West, Southfield, MI, USA</p>
            </div>
            <div className="flex gap-6 pt-1 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Passengers</p>
                <p className="text-sm font-bold text-gray-900">2</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Pick Up Date</p>
                <p className="text-sm font-bold text-gray-900">Feb 18th, 2026</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Child Seats</p>
                <p className="text-sm font-bold text-gray-900">1</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Pick Up &amp; Estimated Arrived</p>
                <p className="text-sm font-bold text-gray-900">11:00pm to 01:00pm</p>
              </div>
            </div>
          </div>

          {/* Right column — QR code */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0 pl-2">
            <div className="border border-gray-200 rounded-lg p-1.5 bg-white">
              <QRCode />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Booking Number</p>
              <p className="text-xl font-bold text-gray-900">46982</p>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-[#1a2b5e] text-white text-sm font-bold px-14 py-3 rounded-full hover:bg-[#253576] transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
