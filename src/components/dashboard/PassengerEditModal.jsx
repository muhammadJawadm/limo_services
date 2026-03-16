import { FiX, FiChevronDown } from 'react-icons/fi';

export default function PassengerEditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[650px] rounded-[30px] bg-white p-8 text-[#111111] shadow-2xl relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {/* Column 1 */}
          <div className="space-y-4">
             <div>
               <label className="mb-2 block text-sm text-[#666]">First Name:</label>
               <input
                 type="text"
                 defaultValue="Jayson"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Last Name:</label>
               <input
                 type="text"
                 defaultValue="Smith"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Contract No:</label>
               <input
                 type="text"
                 defaultValue="01 (445) 787-454"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Email</label>
               <input
                 type="email"
                 defaultValue="jayson@gmail.com"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
             <div>
               <label className="mb-2 block text-sm text-[#666]">Priority</label>
               {/* Concept dropdown visual - to behave functionally state would be needed, keeping simple for UI matching */}
               <div className="relative">
                 <div className="flex w-full items-center justify-between rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none cursor-pointer">
                   <span>VIP</span>
                   <FiChevronDown className="text-gray-400" />
                 </div>
                 {/* 
                   // Dropdown menu mock. Typically conditionally rendered via state:
                   <div className="absolute right-0 top-full mt-2 w-[160px] rounded-xl bg-white shadow-lg border border-gray-100 z-10 py-2">
                      <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer">Normal <div className="h-4 w-4 rounded-full border border-gray-300"></div></div>
                      <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#1b2d5d]">VIP <div className="h-4 w-4 rounded-full bg-[#1b2d5d]"></div></div>
                      <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer">VVIP <div className="h-4 w-4 rounded-full border border-gray-300"></div></div>
                   </div>
                 */}
               </div>
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Employee ID:</label>
               <input
                 type="text"
                 defaultValue="Smith"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Status</label>
               <input
                 type="text"
                 defaultValue="01 (445) 787-454"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Linked Card (s):</label>
               <div className="flex w-full items-center justify-between rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111]">
                 <span>CC** 7874</span>
                 <FiX className="text-gray-400 cursor-pointer hover:text-red-500" />
               </div>
             </div>
          </div>
        </div>

        {/* Full Width Row */}
        <div className="mt-5">
           <label className="mb-2 block text-sm text-[#666]">Specific Priority for this passenger Notes:</label>
           <textarea
             className="h-[100px] w-full resize-none rounded-2xl border border-gray-200 p-4 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
             defaultValue="Lorem ipsum"
           />
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center gap-4 px-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-full bg-gray-500 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-gray-600"
          >
            Back
          </button>
          <button
            className="flex-1 rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
          >
            Save Passenger
          </button>
        </div>
      </div>
    </div>
  );
}
