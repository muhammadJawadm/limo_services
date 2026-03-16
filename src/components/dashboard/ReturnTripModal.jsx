import { FiChevronDown, FiX } from 'react-icons/fi';
import { GoArrowSwitch } from "react-icons/go";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function ReturnTripModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[700px] rounded-[30px] bg-white text-[#111111] shadow-2xl h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 px-8 py-6">
          <FaArrowRightArrowLeft size={24} className="text-[#111]" />
          <h2 className="text-[26px] font-bold">Return Trip</h2>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-[140px_1fr] gap-y-5 text-[15px]">
            {/* Row: Pickup Time */}
            <div className="font-medium text-[#111]">Pickup Time:</div>
            <div className="text-[#666]">12:00 AM</div>

            {/* Row: Pickup Date */}
            <div className="font-medium text-[#111]">Pickup Date:</div>
            <div className="text-[#666]">02/12/2026</div>

            {/* Row: Routing Info */}
            <div className="font-medium text-[#111]">Routing Info:</div>
            <div className="flex flex-col gap-2 text-[#666]">
              <p>USA Vein Clinics, Telegraph Road, USA</p>
              <p>USA Vein Clinics, Telegraph Road, USA</p>
            </div>

            {/* Row: Stop */}
            <div className="font-medium text-[#111]">Stop:</div>
            <div className="flex items-center justify-end text-[#666]">
              <button className="text-[#8c8c8c] hover:text-[#111]">+ Add Stop</button>
            </div>

            {/* Row: Trip Duration */}
            <div className="font-medium text-[#111] mt-2">Trip Duration</div>
            <div className="text-[#666] mt-2">25 mints</div>

            {/* Row: Passenger */}
            <div className="font-medium text-[#111]">Passenger:</div>
            <div className="text-[#666]">jaysonsmith@gmail.com</div>

            {/* Row: Child Seats */}
            <div className="font-medium text-[#111] flex items-center">Child Seats</div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2">
                <span className="text-[#666]">0 Infant</span>
                <FiChevronDown className="text-gray-400" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2">
                <span className="text-[#666]">1 Toddler</span>
                <FiChevronDown className="text-gray-400" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2">
                <span className="text-[#666]">0 Booster</span>
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>

            {/* Row: Child Seats (Vehicle Type Dropdown) */}
            <div className="font-medium text-[#111] flex items-center">Child Seats</div>
            <div className="w-[180px]">
              <div className="flex w-full items-center justify-between rounded-full border border-gray-200 px-4 py-2 text-[#666]">
                <span>Business Sedan</span>
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>

            {/* Row: Victual Info */}
            <div className="font-medium text-[#111] flex items-center">Victual Info</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#111]">
                Passengers
                <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 ml-2">
                  <span className="text-[#666]">3</span>
                  <FiChevronDown className="text-gray-400" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#111]">
                Luggage
                <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 ml-2">
                  <span className="text-[#666]">3</span>
                  <FiChevronDown className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Row: Payment From */}
            <div className="font-medium text-[#111] flex items-center">Payment From:</div>
            <div className="w-[180px]">
              <div className="flex w-full items-center justify-between rounded-full border border-gray-200 px-4 py-2 text-[#666]">
                <span>Debit ****8454-02/28</span>
              </div>
            </div>

            {/* Row: Trip Notes */}
            <div className="font-medium text-[#111] mt-2">Trip Notes:</div>
            <textarea
              className="mt-2 h-[100px] w-full resize-none rounded-xl border border-gray-200 p-4 text-[#666] outline-none placeholder:text-gray-400"
              placeholder="Lorem Ipsum...."
              defaultValue="Lorem Ipsum...."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-8 pb-8 pt-2">
          <button
            onClick={onClose}
            className="rounded-full bg-[#1b2d5d] px-10 py-3 text-base font-medium text-white transition-colors hover:bg-[#132042]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
