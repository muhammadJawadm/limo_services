import { LuCalendarDays, LuClock3 } from 'react-icons/lu';
import { MdOutlineLocationOn, MdCircle } from 'react-icons/md';
import { TbArrowRight } from 'react-icons/tb';
import RouteMap from '../RouteMap';
import arowswap from "../../assets/arrow-swap.png";

export default function TripDetailsPanel({ stops, isHourlyRide }) {
  return (
    <div className="w-full md:w-[42%] flex flex-col gap-4">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <RouteMap />

        {/* Route summary bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100 text-sm text-gray-900">
          <img src={arowswap} alt="Arrow Swap" className="w-5 h-5" />
          <span className="font-semibold">16.2 km</span>
          <span></span>
          <LuClock3 size={18} />
          <span>35 mins</span>
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
            <span className="whitespace-nowrap text-xs md:text-sm">Wed, Feb 18th 2026</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-4 py-2.5">
            <LuClock3 size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs md:text-sm">03:20</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-4 py-2.5">
            <LuClock3 size={16} className="text-gray-400" />
            {isHourlyRide ? (
              <span className="text-xs md:text-sm">3 hours</span>
            ) : (
              <span className="text-xs md:text-sm">12:11 pm</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
