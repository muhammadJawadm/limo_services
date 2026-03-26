import { FiChevronDown, FiX } from 'react-icons/fi';
import { GoArrowSwitch } from "react-icons/go";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function ReturnTripModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="relative flex h-full sm:h-auto max-h-none sm:max-h-[90vh] w-full max-w-[700px] flex-col rounded-none sm:rounded-[30px] bg-white text-[#111111] shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4 border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6 bg-[#fdfdfd] sm:bg-transparent rounded-t-none sm:rounded-t-[30px]">
          <FaArrowRightArrowLeft size={20} className="text-[#111] sm:w-6 sm:h-6" />
          <h2 className="text-xl sm:text-[26px] font-bold">Return Trip</h2>
          
          {/* Mobile Close Button (Optional but good UX for full screen) */}
          <button onClick={onClose} className="sm:hidden ml-auto p-2 -mr-2 text-gray-400 hover:text-[#111] transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-[#111] [&::-webkit-scrollbar-thumb]:rounded-full transition-colors pb-10 sm:pb-6">
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] sm:gap-y-5 text-[14px] sm:text-[15px]">
            
            {/* Row: Pickup Time */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Pickup Time:</div>
               <div className="text-gray-600 sm:text-[#666]">12:00 AM</div>
            </div>

            {/* Row: Pickup Date */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Pickup Date:</div>
               <div className="text-gray-600 sm:text-[#666]">02/12/2026</div>
            </div>

            {/* Row: Routing Info */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-1.5 sm:mb-0">Routing Info:</div>
               <div className="flex flex-col gap-1.5 sm:gap-2 text-gray-600 sm:text-[#666]">
                 <p className="leading-snug relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-green-500 before:rounded-full">USA Vein Clinics, Telegraph Road, USA</p>
                 <p className="leading-snug relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-red-500 before:rounded-full">USA Vein Clinics, Telegraph Road, USA</p>
               </div>
            </div>

            {/* Row: Stop */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] hidden sm:block">Stop:</div>
               <div className="flex items-center justify-start sm:justify-end text-[#666] pt-1 sm:pt-0">
                 <button className="text-[#8c8c8c] hover:text-[#1b2d5d] transition-colors font-medium sm:font-normal hover:underline">+ Add Stop</button>
               </div>
            </div>

            {/* Row: Trip Duration */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0 mt-2 sm:mt-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0 sm:mt-2">Trip Duration:</div>
               <div className="text-gray-600 sm:text-[#666] sm:mt-2">25 mints</div>
            </div>

            {/* Row: Passenger */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Passenger:</div>
               <div className="text-gray-600 sm:text-[#666] break-all">jaysonsmith@gmail.com</div>
            </div>

            {/* Row: Child Seats */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-4 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-2 sm:mb-0 flex items-center">Child Seats:</div>
               <div className="flex flex-wrap gap-2 sm:gap-3">
                 <div className="flex flex-1 min-w-[120px] items-center justify-between sm:justify-start gap-2 rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 bg-white shadow-sm cursor-pointer hover:border-[#1b2d5d] transition-colors">
                   <span className="text-[#444] text-[13px] sm:text-[14px]">0 Infant</span>
                   <FiChevronDown className="text-gray-400" />
                 </div>
                 <div className="flex flex-1 min-w-[120px] items-center justify-between sm:justify-start gap-2 rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 bg-white shadow-sm cursor-pointer hover:border-[#1b2d5d] transition-colors">
                   <span className="text-[#444] text-[13px] sm:text-[14px]">1 Toddler</span>
                   <FiChevronDown className="text-gray-400" />
                 </div>
                 <div className="flex flex-1 min-w-[120px] items-center justify-between sm:justify-start gap-2 rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 bg-white shadow-sm cursor-pointer hover:border-[#1b2d5d] transition-colors">
                   <span className="text-[#444] text-[13px] sm:text-[14px]">0 Booster</span>
                   <FiChevronDown className="text-gray-400" />
                 </div>
               </div>
            </div>

            {/* Row: Vehicle Type Dropdown */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-4 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-2 sm:mb-0 flex items-center">Vehicle Type:</div>
               <div className="w-full sm:w-[220px]">
                 <div className="flex w-full items-center justify-between rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-[#444] bg-white shadow-sm cursor-pointer hover:border-[#1b2d5d] transition-colors text-[13px] sm:text-[14px]">
                   <span>Business Sedan</span>
                   <FiChevronDown className="text-gray-400" />
                 </div>
               </div>
            </div>

            {/* Row: Victual Info */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-4 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-2 sm:mb-0 flex items-center">Victual Info:</div>
               <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-5">
                 <div className="flex flex-1 items-center justify-between sm:justify-start gap-2 text-[#222] bg-gray-50/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                   <span className="text-[13px] sm:text-[15px]">Passengers</span>
                   <div className="flex items-center gap-2 rounded-xl sm:rounded-full border border-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 sm:ml-2 bg-white shadow-sm cursor-pointer hover:border-[#1b2d5d] transition-colors">
                     <span className="text-[#444] font-medium sm:font-normal text-[13px] sm:text-[14px]">3</span>
                     <FiChevronDown className="text-gray-400" />
                   </div>
                 </div>
                 <div className="flex flex-1 items-center justify-between sm:justify-start gap-2 text-[#222] bg-gray-50/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                   <span className="text-[13px] sm:text-[15px]">Luggage</span>
                   <div className="flex items-center gap-2 rounded-xl sm:rounded-full border border-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 sm:ml-2 bg-white shadow-sm cursor-pointer hover:border-[#1b2d5d] transition-colors">
                     <span className="text-[#444] font-medium sm:font-normal text-[13px] sm:text-[14px]">3</span>
                     <FiChevronDown className="text-gray-400" />
                   </div>
                 </div>
               </div>
            </div>

            {/* Row: Payment From */}
            <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-4 sm:pb-0">
               <div className="font-semibold sm:font-medium text-[#111] mb-2 sm:mb-0 flex items-center">Payment From:</div>
               <div className="w-full sm:w-[220px]">
                 <div className="flex w-full items-center justify-between rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 text-[#444] bg-white shadow-sm text-[13px] sm:text-[14px]">
                   <span className="truncate">Debit ****8454-02/28</span>
                 </div>
               </div>
            </div>

            {/* Row: Trip Notes */}
            <div className="flex flex-col sm:contents mt-1 sm:mt-2">
               <div className="font-semibold sm:font-medium text-[#111] mb-2 sm:mb-0 sm:mt-2">Trip Notes:</div>
               <textarea
                 className="sm:mt-2 h-[80px] sm:h-[100px] w-full resize-none rounded-xl border border-gray-200 p-3 sm:p-4 text-[#444] text-[13px] sm:text-[14px] outline-none placeholder:text-gray-400 bg-white shadow-sm focus:border-[#1b2d5d] transition-colors focus:ring-1 focus:ring-[#1b2d5d]/10"
                 placeholder="Specific priority for this passenger notes..."
                 defaultValue="Lorem Ipsum...."
               />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end px-5 sm:px-8 pb-5 sm:pb-8 pt-3 sm:pt-4 border-t border-gray-100 sm:border-0 bg-white">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-full bg-[#1b2d5d] px-10 py-3.5 sm:py-3 text-[15px] sm:text-base font-semibold sm:font-medium text-white shadow-md transition-all hover:bg-[#132042] hover:shadow-lg active:scale-[0.98]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
