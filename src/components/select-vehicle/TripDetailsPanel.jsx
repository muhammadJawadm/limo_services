import { LuCalendarDays, LuClock3 } from 'react-icons/lu';
import { MdOutlineLocationOn, MdCircle } from 'react-icons/md';
import { TbArrowRight } from 'react-icons/tb';
import { BsReceipt } from 'react-icons/bs';
import RouteMap from '../RouteMap';
import arowswap from "../../assets/arrow-swap.png";
import { formatBookingDate, formatBookingTime } from '../../utils/bookingFormatters';

const fmt = (v) => `$${Number(v ?? 0).toFixed(2)}`;

export default function TripDetailsPanel({ stops, isHourlyRide, bookingDetails, fareBreakdown, isFetchingPrice }) {
  const displayDate = formatBookingDate(bookingDetails?.date);
  const displayTime = formatBookingTime(bookingDetails?.time);
  const displayHours = bookingDetails?.hours ? `${bookingDetails.hours} hours` : 'Point to point';

  return (
    <div className="w-full md:w-[42%] flex flex-col gap-4">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <RouteMap
          pickupLocation={bookingDetails?.pickupLocation}
          dropoffLocation={bookingDetails?.dropoffLocation}
        />

        {/* Route summary bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100 text-sm text-gray-900">
          <img src={arowswap} alt="Arrow Swap" className="w-5 h-5" />
          <span className="font-semibold">{bookingDetails?.distanceMiles ? `${bookingDetails.distanceMiles} miles` : 'Distance'}</span>
          <span className="text-gray-300">•</span>
          {isHourlyRide && (
            <>
              <LuClock3 size={18} />
              <span>{displayHours}</span>
            </>
          )}
        </div>
      </div>

      {/* Trip details card */}
      <div className="bg-white/60 rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TbArrowRight size={16} className="text-[#1a2b5e]" />
          <span className="text-sm font-bold text-gray-800">Pickup Trip Details</span>
        </div>

        {/* Stops list */}
        <div className="flex flex-col gap-3 mb-3 border-t pt-2 border-gray-300 ">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="relative w-5 flex justify-center flex-shrink-0">
                {stop.type === 'pickup' && <MdOutlineLocationOn size={18} className="text-green-500 mt-0.5" />}
                {stop.type === 'stop' && <MdCircle size={10} className="text-gray-400 mt-1.5" />}
                {stop.type === 'dropoff' && <MdOutlineLocationOn size={18} className="text-red-400 mt-0.5" />}
                {i < stops.length - 1 && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-6 h-[calc(100%+12px)] border-l border-dashed border-gray-300" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{stop.label}</p>
                <p className="text-xs text-gray-400">{stop.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Date & time */}
        <div className="flex flex-wrap items-center gap-2 border-gray-100 pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-4 py-2.5">
            <LuCalendarDays size={16} className="text-gray-400 flex-shrink-0" />
            <span className="whitespace-nowrap text-xs md:text-sm">{displayDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-4 py-2.5">
            <LuClock3 size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs md:text-sm">{displayTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-4 py-2.5">
            {isHourlyRide && <LuClock3 size={16} className="text-gray-400" />}
            {isHourlyRide && 
              <span className="text-xs md:text-sm">{displayHours}</span>
           }
          </div>
        </div>
      </div>

      {/* Price Summary Card — shown as soon as a vehicle is auto-selected or clicked */}
      {(fareBreakdown || isFetchingPrice) && (
        <div className="bg-white/60 rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BsReceipt size={15} className="text-[#1a2b5e]" />
            <span className="text-sm font-bold text-gray-800">Price Summary</span>
          </div>

          {isFetchingPrice ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-7 h-7 border-[3px] border-[#1a2b5e] border-t-transparent rounded-full animate-spin" />
              <span className="text-xl font-bold text-gray-400">Updating...</span>
            </div>
          ) : fareBreakdown && (
            <div className="flex flex-col gap-2.5">
              {fareBreakdown.baseFare > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Base Fare</span>
                  <span className="text-gray-700 font-medium">{fmt(fareBreakdown.baseFare)}</span>
                </div>
              )}
              {fareBreakdown.mileageCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mileage Charge</span>
                  <span className="text-gray-700 font-medium">{fmt(fareBreakdown.mileageCharge)}</span>
                </div>
              )}
              {fareBreakdown.hourlyCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Hourly Charge</span>
                  <span className="text-gray-700 font-medium">{fmt(fareBreakdown.hourlyCharge)}</span>
                </div>
              )}
              {fareBreakdown.subtotal > 0 && (
                <div className="flex justify-between text-sm border-t border-dashed border-gray-200 pt-2.5">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700 font-medium">{fmt(fareBreakdown.subtotal)}</span>
                </div>
              )}
              {fareBreakdown.tollCharges > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Toll Charges</span>
                  <span className="text-gray-700 font-medium">{fmt(fareBreakdown.tollCharges)}</span>
                </div>
              )}
              {fareBreakdown.taxAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Tax{fareBreakdown.taxRate ? ` (${fareBreakdown.taxRate}%)` : ''}
                  </span>
                  <span className="text-gray-700 font-medium">{fmt(fareBreakdown.taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-1">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-[#1a2b5e]">{fmt(fareBreakdown.total)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
