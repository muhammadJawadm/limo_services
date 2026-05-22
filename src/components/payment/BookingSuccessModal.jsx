import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';

export default function BookingSuccessModal({ show, bookingDetails }) {
  const navigate = useNavigate();
  const passengerName = useMemo(() => {
    const passenger = bookingDetails?.passengerDetails;
    if (passenger?.firstName || passenger?.lastName) {
      return `${passenger?.firstName || ''} ${passenger?.lastName || ''}`.trim();
    }

    const user = bookingDetails?.user;
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    }

    return 'Passenger';
  }, [bookingDetails]);

  const pickupDate = useMemo(() => {
    if (!bookingDetails?.date) {
      return 'Select date';
    }

    const parsed = new Date(bookingDetails.date);
    if (Number.isNaN(parsed.getTime())) {
      return bookingDetails.date;
    }

    return parsed.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [bookingDetails]);

  const childSeatsCount = useMemo(() => {
    const seats = bookingDetails?.childSeats;
    if (!seats) {
      return 0;
    }

    return Number(seats.infant ?? 0) + Number(seats.toddler ?? 0) + Number(seats.booster ?? 0);
  }, [bookingDetails]);

  const stops = bookingDetails?.stopLocations || [];
  const payout = bookingDetails?.payout;

  // Map payout reason to user-friendly message
  const getPayoutMessage = () => {
    if (!payout) return null;
    const reason = payout.reason || (payout.transferred ? 'transferred' : null);
    switch (reason) {
      case 'driver_not_assigned':
        return 'Driver will be assigned soon';
      case 'driver_not_ready':
        return 'Driver needs to complete Stripe setup';
      case 'booking_not_paid':
        return 'Payment pending';
      case 'already_transferred':
        return 'Payout already processed';
      case 'transferred':
      case true:
        return 'Payout transferred to driver';
      default:
        return null;
    }
  };

  const payoutMessage = getPayoutMessage();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:px-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:px-8 sm:py-10 max-h-[95vh] overflow-y-auto">

        {/* Checkmark badge with decorative dots */}
        <div className="flex justify-center mb-5 md:mb-5">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <span className="absolute top-0 left-5 sm:left-6 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-gray-200" />
            <span className="absolute top-2 sm:top-3 right-0 sm:right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gray-200" />
            <span className="absolute top-1 left-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gray-300" />
            <span className="absolute bottom-0 left-2 sm:left-3 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gray-200" />
            <span className="absolute bottom-1 sm:bottom-2 right-2 sm:right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gray-300" />
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1a2b5e] rounded-full flex items-center justify-center z-10">
              <BsCheckLg size={24} className="text-white sm:text-[28px]" />
            </div>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">Payment successful</h1>
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm text-gray-600 sm:text-gray-800 mb-2 max-w-md mx-auto leading-relaxed">
            Your payment has been confirmed. Your booking is being processed.
          </p>
          {payoutMessage && (
            <p className="text-xs sm:text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2 inline-block mt-2">
              {payoutMessage}
            </p>
          )}
        </div>

        <div className="border-t border-gray-100 mb-4 sm:mb-6" />

        {/* Booking details */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
          {/* Left column */}
          <div className="flex flex-row sm:flex-col justify-between sm:justify-start flex-wrap gap-4 sm:gap-3 sm:w-32 sm:flex-shrink-0 sm:border-r border-gray-100 sm:pr-4 pb-4 sm:pb-0 border-b sm:border-b-0">
            <div className="w-[45%] sm:w-auto">
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Passenger Name</p>
              <p className="text-sm font-bold text-gray-900">{passengerName}</p>
            </div>
            <div className="w-[45%] sm:w-auto sm:mt-[95%]">
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Vehicle</p>
              <p className="text-sm font-bold text-gray-900">{bookingDetails?.vehicleCategory?.name || 'Vehicle'}</p>
            </div>
            <div className="w-[45%] sm:w-auto">
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Luggage</p>
              <p className="text-sm font-bold text-gray-900">{bookingDetails?.luggage ?? 0}</p>
            </div>
          </div>

          {/* Middle column */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-3 sm:border-r border-gray-100 sm:pr-4 pb-4 sm:pb-0 border-b sm:border-b-0">
            <div>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Pick Up</p>
              <p className="text-sm font-semibold text-gray-900">{bookingDetails?.pickupLocation || 'Pickup location'}</p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Stop</p>
              <p className="text-sm font-semibold text-gray-900">{stops[0] || 'No stops'}</p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Drop of location</p>
              <p className="text-sm font-semibold text-gray-900">{bookingDetails?.dropoffLocation || 'Drop-off location'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-1 sm:pt-1 border-t border-gray-100">
              <div>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Passengers</p>
                <p className="text-sm font-bold text-gray-900">{bookingDetails?.noOfPassengers ?? 0}</p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Pick Up Date</p>
                <p className="text-sm font-bold text-gray-900">{pickupDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Child Seats</p>
                <p className="text-sm font-bold text-gray-900">{childSeatsCount}</p>
              </div>
              <div className="pr-2 sm:pr-0">
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 uppercase sm:normal-case font-medium sm:font-normal">Pick Up &amp; Estimated Arrival</p>
                <p className="text-sm font-bold text-gray-900">{bookingDetails?.time || 'Time pending'}</p>
              </div>
            </div>
          </div>

          {/* Right column — QR code */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0 sm:pl-2 sm:pt-5">
            <div className="border border-gray-200 rounded-lg p-1.5 bg-white">
              <svg viewBox="0 0 21 21" width="110" height="110" className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px]" xmlns="http://www.w3.org/2000/svg">
                {[
                  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
                  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
                  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
                  [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
                  [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
                  [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
                  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
                  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
                  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
                  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
                  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
                  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
                  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
                ].flatMap((row, r) =>
                  row.map((cell, c) =>
                    cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#111827" /> : null
                  )
                )}
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[11px] sm:text-xs text-gray-400 uppercase sm:normal-case font-medium sm:font-normal">Booking Number</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{bookingDetails?.confNumber || '—'}</p>
            </div>
          </div>
        </div>

        {/* Go to Dashboard */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-[#1a2b5e] text-white text-sm font-bold px-10 sm:px-14 py-3.5 sm:py-3 w-full sm:w-auto rounded-xl sm:rounded-full hover:bg-[#253576] transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
