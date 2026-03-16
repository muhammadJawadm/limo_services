import { useState } from 'react';
import { FiChevronDown, FiPlus, FiTrash2, FiClock, FiMapPin, FiCalendar, FiUsers, FiBriefcase } from 'react-icons/fi';
import { LuPlane } from 'react-icons/lu';
import BookingSuccessModal from './BookingSuccessModal';

export default function NewReservationModal({ isOpen, onClose }) {
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [step, setStep] = useState(1); // 1 = Details, 2 = Return Details (if toggled)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleBook = () => {
    if (isReturnTrip && step === 1) {
      setStep(2); // Proceed to setting up the return trip
    } else {
      // Actually book
      setIsSuccessModalOpen(true);
    }
  };

  const closeAll = () => {
    setIsSuccessModalOpen(false);
    onClose();
    // reset state after closing
    setTimeout(() => {
      setStep(1);
      setIsReturnTrip(false);
    }, 300);
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 sm:p-6 lg:p-8">
        <div className="relative flex h-full max-h-[90vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-[30px] bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
            <h2 className="text-[26px] font-bold text-[#111]">
               {isReturnTrip && step === 2 ? 'Return Trip' : 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
               {/* Decorative pill buttons for context, matching design top right nav */}
               {!isReturnTrip || step === 1 ? (
                 <>
                   <span className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-[#1b2d5d] bg-[#f2f2f2]">
                     <LuPlane size={15} /> Ride Details
                   </span>
                   <span className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-[#666] border border-gray-200">
                     <FiUsers size={15} /> Passenger
                   </span>
                   <span className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-[#666] border border-gray-200">
                     <FiBriefcase size={15} /> Account Info
                   </span>
                 </>
               ) : null}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                 {/* Trip Details Section */}
                 <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
                      <h3 className="font-semibold text-lg">Trip Details</h3>
                      <FiChevronDown />
                    </div>
                    <div className="p-5">
                       <div className="mb-6 flex overflow-hidden rounded-full border border-gray-200">
                         <button className="flex-1 bg-[#1b2d5d] py-3 text-[15px] font-medium text-white">Point-to-Point</button>
                         <button className="flex-1 bg-white py-3 text-[15px] font-medium text-[#666]">Hourly</button>
                       </div>

                       <div className="space-y-4">
                         {/* Pickup */}
                         <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiMapPin className="text-[#20c997] shrink-0" size={18} />
                            <input type="text" placeholder="Pickup Location" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                         </div>
                         
                         {/* Stop Location */}
                         <div className="flex items-center gap-3">
                           <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <div className="h-4 w-4 rounded-full border-2 border-[#fdb022] shrink-0"></div>
                              <input type="text" defaultValue="New York street Bay Four" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                           </div>
                           <button className="flex shrink-0 items-center justify-center h-12 w-12 rounded-full bg-[#ff4a40]/10 text-[#ff4a40]">
                              <FiTrash2 size={18} />
                           </button>
                         </div>

                         {/* Active Stop */}
                         <div className="flex items-center gap-3">
                           <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <FiMapPin className="text-gray-400 shrink-0" size={18} />
                              <input type="text" placeholder="Stop location" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                           </div>
                           <button className="flex shrink-0 items-center justify-center h-12 w-12 rounded-full bg-[#fdb022] text-white">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                           </button>
                         </div>

                         <button className="w-full flex justify-center items-center py-3 text-[#666] text-sm">
                            + Add Stop
                         </button>

                         {/* Duration */}
                         <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiClock className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="Duration" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                         </div>

                         {/* Drop off */}
                         <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiMapPin className="text-[#ff4a40] shrink-0" size={18} />
                            <input type="text" placeholder="Drop-off Location" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                            <button className="absolute right-2 rounded-full bg-[#1b2d5d] px-4 py-1.5 text-xs text-white">Same as pickup</button>
                         </div>

                         {/* Date / Time */}
                         <div className="flex gap-4">
                           <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <FiCalendar className="text-gray-400 shrink-0" size={18} />
                              <input type="text" placeholder="dd----YYYY" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                           </div>
                           <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <FiClock className="text-gray-400 shrink-0" size={18} />
                              <input type="text" placeholder="12:11 pm" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                           </div>
                         </div>

                         {/* Passengers / Luggage */}
                         <div className="flex gap-4">
                           <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <FiUsers className="text-gray-400 shrink-0" size={18} />
                              <input type="text" placeholder="3" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                           </div>
                           <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <FiBriefcase className="text-gray-400 shrink-0" size={18} />
                              <input type="text" placeholder="2" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                           </div>
                         </div>

                       </div>
                    </div>
                 </div>

                 {/* Additional Information Section */}
                 <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
                      <h3 className="font-semibold text-lg">Additional Information</h3>
                      <FiChevronDown />
                    </div>
                    <div className="p-5 space-y-4">
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <LuPlane className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="Airline Name or Code" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <input type="text" placeholder="Flight" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <input type="text" placeholder="Curbside Pickup" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 px-5 py-3 shadow-sm bg-white">
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="h-3.5 w-auto object-cover rounded-sm" />
                          <span className="text-[#4d4d4d] text-sm whitespace-nowrap"><FiChevronDown /></span>
                          <span className="text-[#4d4d4d] ml-1">+1</span>
                       </div>

                       <div className="flex items-center gap-3 px-2 py-2 text-sm text-[#666]">
                          <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                          I don't have flight details yet
                       </div>

                       {/* Child Seats */}
                       <div className="pt-2">
                          <label className="block text-sm font-medium text-[#111] mb-3">Child Seats:</label>
                          <div className="flex flex-wrap gap-3">
                             <div className="flex flex-1 items-center justify-between rounded-full border border-gray-200 px-4 py-3 bg-white">
                               <span className="text-[#666] text-[15px]">0 Infant</span>
                               <FiChevronDown className="text-gray-400" />
                             </div>
                             <div className="flex flex-1 items-center justify-between rounded-full border border-gray-200 px-4 py-3 bg-white">
                               <span className="text-[#666] text-[15px]">1 Toddler</span>
                               <FiChevronDown className="text-gray-400" />
                             </div>
                             <div className="flex flex-1 items-center justify-between rounded-full border border-gray-200 px-4 py-3 bg-white">
                               <span className="text-[#666] text-[15px]">0 Booster</span>
                               <FiChevronDown className="text-gray-400" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                 {/* Vehicle Information Section */}
                 <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
                      <h3 className="font-semibold text-lg">Vehicle Information</h3>
                      <FiChevronDown />
                    </div>
                    <div className="p-5 space-y-3">
                       {['Business Sedan', 'Premium Sedan', 'Luxury SUV', 'Premium SUV'].map((type, i) => (
                         <div key={i} className="flex items-center justify-between rounded-full border border-gray-200 px-5 py-3.5 bg-white cursor-pointer hover:border-[#1b2d5d]">
                            <span className="text-[15px] font-medium text-[#666]">{type}</span>
                            <div className="flex items-center gap-4 text-sm text-[#8c8c8c]">
                              <span className="flex items-center gap-1.5"><FiUsers /> {i > 1 ? '6' : '3'}</span>
                              <span className="flex items-center gap-1.5"><FiBriefcase /> {i > 1 ? '4' : '3'}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Passenger Information Section */}
                 <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
                      <h3 className="font-semibold text-lg">Passenger Information</h3>
                      <FiChevronDown />
                    </div>
                    <div className="p-5 space-y-4">
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <FiUsers className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="First Name" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <FiUsers className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="Last Name" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <input type="email" defaultValue="jaysonsmith@gmail.com" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 px-5 py-3 shadow-sm bg-white">
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="h-3.5 w-auto object-cover rounded-sm" />
                          <span className="text-[#4d4d4d] text-sm whitespace-nowrap"><FiChevronDown /></span>
                          <span className="text-[#4d4d4d] ml-1">+1</span>
                       </div>
                    </div>
                 </div>

                 {/* Card Information Section */}
                 <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
                      <h3 className="font-semibold text-lg">Card Information</h3>
                      <FiChevronDown />
                    </div>
                    <div className="p-5 space-y-4">
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <FiUsers className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="Card Holder Name" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <FiBriefcase className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="Card Number" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="flex gap-4">
                         <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiCalendar className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="Date Expiry" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                         </div>
                         <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiBriefcase className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="CVC" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                         </div>
                       </div>
                       <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <FiMapPin className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="Billing Address" className="ml-3 w-full bg-transparent text-[15px] outline-none" />
                       </div>
                       <div className="relative flex items-center justify-between rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <div className="flex items-center">
                            <FiBriefcase className="text-gray-400 shrink-0" size={18} />
                            <span className="ml-3 text-[#666] text-[15px]">Card Status:</span>
                          </div>
                          <FiChevronDown className="text-gray-400" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
               <textarea
                 className="h-[100px] w-full resize-none text-[15px] text-[#111] outline-none placeholder:text-gray-400"
                 placeholder="Specific Priority for this passenger Notes:"
               />
            </div>

          </div>

          {/* Footer Bar */}
          <div className="border-t border-gray-200 bg-white px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              
              <div className="flex items-center gap-4">
                 <div 
                   className="flex items-center gap-3 cursor-pointer"
                   onClick={() => setIsReturnTrip(!isReturnTrip)}
                 >
                    <div className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 ${isReturnTrip ? 'border-[#1b2d5d] bg-[#1b2d5d]' : 'border-gray-300'}`}>
                      {isReturnTrip && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span className="text-[20px] font-semibold text-[#111]">Return Trip</span>
                 </div>
                 
                 <div className="text-[26px] font-bold text-[#111]">
                   {isReturnTrip && step === 2 ? (
                     <div className="flex items-center gap-4 text-[#8c8c8c] text-[18px]">
                        <span className="flex items-center gap-1.5 font-semibold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> Pickup: <span className="font-normal">$450.00</span></span>
                        <span className="flex items-center gap-1.5 font-semibold text-[#111]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 8 9 12 5"></polyline><polyline points="12 19 8 15 12 19"></polyline><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> Return: <span className="font-normal">$450.00</span></span>
                     </div>
                   ) : (
                     <>$450.00</>
                   )}
                 </div>
              </div>

              <div className="flex items-center gap-3 sm:w-[350px]">
                <button
                  onClick={onClose}
                  className="w-1/2 rounded-full bg-gray-500 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleBook}
                  className="w-1/2 rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
                >
                  {isReturnTrip && step === 1 ? 'Continue to Return' : 'Book'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <BookingSuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={closeAll}
      />
    </>
  );
}
