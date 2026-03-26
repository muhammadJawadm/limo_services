import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TbArrowRight } from 'react-icons/tb';
import { BsInfoCircle } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import childSeatIcon from '../../assets/childicon.png';
import { tripDetails } from './constants';

export default function BookingSummaryPanel({ isHourlyRide }) {
  const [summaryOpen, setSummaryOpen] = useState(false);

  return (
    <div className="w-full md:w-[38%] flex flex-col gap-4">

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setSummaryOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        >
          <span className="text-xl font-bold text-gray-900">Booking summary</span>
          {summaryOpen ? <FiChevronUp size={18} className="text-gray-500" /> : <FiChevronDown size={18} className="text-gray-500" />}
        </button>

        {/* Always visible row */}
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <TbArrowRight size={15} className="text-[#1a2b5e]" />
            <span>Pickup Trip Details</span>
          </div>
          <span className="text-lg font-bold text-gray-900">$110</span>
        </div>

        {/* Expanded trip details */}
        {summaryOpen && (
          <div className="border-t border-gray-100 px-5 py-4">
            <div className="flex flex-col gap-2">
              {tripDetails.map((row, i) => {
                if (row.label === 'No. of Hours' && !isHourlyRide) {
                  return null;
                }

                return (
                  <div key={i} className="flex items-start justify-start gap-4 mt-1">
                    <span className="text-xs font-bold text-black w-24 flex-shrink-0">{row.label}</span>
                    <span className="text-xs text-gray-700 text-left">
                      {isHourlyRide && row.label === 'No. of Hours' ? '3 hours' : row.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Price Breakdown</h2>

        {/* Pickup */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-md text-gray-900 font-semibold">
            <TbArrowRight size={15} className="text-[#1a2b5e]" />
            <span>Pickup</span>
          </div>
          <span className="text-lg font-bold text-gray-900">$110</span>
        </div>

        {/* Child Seat */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <img src={childSeatIcon} className="w-4 h-4" alt="child seat" />
            <span>Child Seat x 1</span>
            <button className="ml-1 text-red-400 hover:text-red-600 transition-colors">
              <MdDeleteOutline size={20} />
            </button>
          </div>
          <span className="text-md  text-gray-400">$15</span>
        </div>

        {/* Tolls */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-sm text-gray-700">Tolls Charges</span>
          <span className="text-md  text-gray-400">$15</span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between pt-3 mt-1 border-b pb-2">
          <span className="text-sm text-gray-700">Total Price</span>
          <span className="text-2xl font-bold text-gray-900">
            <span className="text-base font-semibold mr-0.5">$</span>160.64
          </span>
        </div>

        {/* All-inclusive note */}
        <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500 ">
          <BsInfoCircle size={13} />
          <span>All-inclusive price</span>
        </div>
      </div>
    </div>
  );
}
