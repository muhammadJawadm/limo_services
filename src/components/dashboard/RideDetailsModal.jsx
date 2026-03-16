import { FiChevronDown } from 'react-icons/fi';
import { LuCar } from 'react-icons/lu';
import { useState } from 'react';
import CancelTripModal from './CancelTripModal';
import { FaArrowLeft } from "react-icons/fa6";
import blackcaricon from '../../assets/blackcaricon.png'

export default function RideDetailsModal({
  isOpen,
  onClose,
  isReturnTrip = false,
  hasFlightInfo = false,
  onOpenMessage,
}) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[1000px] flex-col rounded-[30px] bg-white text-[#111111] shadow-2xl">
        {/* Header (Sticky if scrolled) */}
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 py-5 sm:px-8 rounded-t-[30px]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[#4d4d4d] hover:text-[#111] transition-colors font-medium"
            >
              <FaArrowLeft size={24} className="text-[#111] " />
            </button>
            {isReturnTrip && <h2 className="ml-1 text-2xl font-bold">Back</h2>}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenMessage}
              className="rounded-full bg-[#1b2d5d] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#132042]"
            >
              Message
            </button>
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-[#666] transition-colors hover:bg-gray-50"
            >
              Cancel Trip
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Row 1 */}

            {/* Booking Details Card */}
            <div className="rounded-2xl border border-gray-200 p-5 col-span-1">
              <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                Booking Details
              </h3>
              <div className="grid grid-cols-[100px_1fr] gap-y-3 text-[14px]">
                <div className="text-[#666]">Confirmation#</div>
                <div className="text-[#111] font-medium text-right sm:text-left">45854</div>

                <div className="text-[#666]">Booking Type:</div>
                <div className="text-[#111] font-medium text-right sm:text-left">Point to Point</div>

                <div className="text-[#666]">Trip Status:</div>
                <div className="text-[#111] font-medium text-right sm:text-left">Cancelled</div>

                <div className="text-[#666]">Created At:</div>
                <div className="text-[#111] font-medium text-right sm:text-left">02/2/2026</div>
              </div>
            </div>

            {/* Passenger / Guest Info Card */}
            <div className="rounded-2xl border border-gray-200 p-5 col-span-1">
              <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                {isReturnTrip ? 'Guest Info' : 'Passenger Info'}
              </h3>
              <div className="grid grid-cols-[85px_1fr] gap-y-3 text-[14px]">
                <div className="text-[#666]">First Name:</div>
                <div className="text-[#111] font-medium text-right sm:text-left">Jayson</div>

                <div className="text-[#666]">Last Name:</div>
                <div className="text-[#111] font-medium text-right sm:text-left">Smith</div>

                <div className="text-[#666]">Contract No:</div>
                <div className="text-[#111] font-medium text-right sm:text-left">01 (444) 784-4547</div>

                <div className="text-[#666] self-center">Email</div>
                <div className="text-[#111] font-medium break-all text-right sm:text-left">jaysonsmith@gmail.com</div>
              </div>
            </div>

            {/* Vehicle Info Card */}
            <div className="rounded-2xl border border-gray-200 bg-[#fbfbfb] p-5 col-span-1 border-t-2 border-t-[#dfdfdf]">
              <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                <img src={blackcaricon} alt="" className='w-7 h-7' />
                Vehicle Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#111]">Vehicle Type:</span>
                  <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-1.5 w-[160px] text-[13px] text-[#666]">
                    <span>Business Sedan</span>
                    <FiChevronDown />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#111] whitespace-nowrap">No. of Pax:</span>
                    <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-1.5 w-[65px] text-[13px] text-[#666]">
                      <span>3</span>
                      <FiChevronDown />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#111]">Luggage</span>
                    <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-1.5 w-[65px] text-[13px] text-[#666]">
                      <span>3</span>
                      <FiChevronDown />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[14px] text-[#111]">Child Seats:</span>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-1 py-1 flex-1 text-[12px] text-[#666]">
                      <span>0 Infant</span>
                      <FiChevronDown />
                    </div>
                    <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-1 py-1 flex-1 text-[12px] text-[#666]">
                      <span>1 Toddler</span>
                      <FiChevronDown />
                    </div>
                    <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-1 py-1 flex-1 text-[12px] text-[#666]">
                      <span>0 Booster</span>
                      <FiChevronDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}

            {/* Trip Info Card (Spans 2 columns) */}
            <div className="rounded-2xl border border-gray-200 p-5 md:col-span-2">
              <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Trip Info
              </h3>

              <div className="grid grid-cols-[70px_1fr] gap-y-4 text-[14px]">
                <div className="font-medium text-[#111]">Pick-up</div>
                <div className="text-[#666]">USA Vein Clinics, Telegraph Road, USA</div>

                <div className="font-medium text-[#111]">Stop:</div>
                <div className="text-[#666]">USA Vein Clinics, Telegraph Road, USA</div>

                <div className="font-medium text-[#111] opacity-0 -translate-y-[10px]">Stop:</div>
                <div className="flex items-center justify-end -mt-6">
                  <button className="text-[#8c8c8c] hover:text-[#111] text-sm">+ Add Stop</button>
                </div>

                <div className="font-medium text-[#111]">Drop-off:</div>
                <div className="text-[#666]">USA Vein Clinics, Telegraph Road, USA</div>

                <div className="font-medium text-[#111]">Date:</div>
                <div className="text-[#666]">02/12/2026</div>

                <div className="font-medium text-[#111]">Time:</div>
                <div className="text-[#666]">12:00 AM</div>
              </div>
            </div>

            {/* Charges & Fees Card */}
            <div className="rounded-2xl border border-gray-200 p-5 col-span-1">
              <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                Charges & Fees
              </h3>
              <div className="space-y-4 text-[14px]">
                <div className="flex justify-between items-center">
                  <span className="text-[#8c8c8c]">Trip Price</span>
                  <span className="font-semibold text-base text-[#111]">$95.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8c8c8c]">Child</span>
                  <span className="font-semibold text-base text-[#111]">$15.00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-[#8c8c8c]">Others:</span>
                  <span className="font-semibold text-base text-[#111]">$30.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-[#b0b0b0]">
                  <span className="text-[#8c8c8c]">Payment</span>
                  <span className="text-xl font-bold text-[#111]">$130.00</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            {/* Conditional flight info or payment mapping dependent on hasFlightInfo */}

            {hasFlightInfo ? (
              // Variation with Flight Information
              <>
                {/* Payment Info Card */}
                <div className="rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-1">
                  <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                    Payment Info
                  </h3>
                  <div className="grid grid-cols-[125px_1fr] gap-y-3 text-[14px]">
                    <div className="text-[#8c8c8c]">Card Holder Name</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">Jayson smith</div>

                    <div className="text-[#8c8c8c]">Card Number</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">4411 4901 1145 7845</div>

                    <div className="text-[#8c8c8c]">Expiry Date</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">02/28</div>

                    <div className="text-[#8c8c8c]">CVC</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">441</div>

                    <div className="text-[#8c8c8c]">Billing Address</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">Usaquen, Bogota, Colombia</div>
                  </div>
                </div>

                {/* Flight Information Card */}
                <div className="rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-2">
                  <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Flight Information
                  </h3>
                  <div className="grid grid-cols-[130px_1fr] gap-y-3 text-[14px]">
                    <div className="text-[#8c8c8c]">First Name:</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">Jayson</div>

                    <div className="text-[#8c8c8c]">Last Name:</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">Smith</div>

                    <div className="text-[#8c8c8c]">Airline Name or Code:</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">4512</div>

                    <div className="text-[#8c8c8c]">Contract No:</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">01 (444) 784-4547</div>

                    <div className="text-[#8c8c8c]">Email</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">jaysmith@gmail.com</div>
                  </div>
                </div>

                {/* Chauffeur / Trip Notes (Spans all 3 columns) */}
                <div className="rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-3">
                  <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Chauffeur / Trip Notes
                  </h3>
                  <div className="text-[#8c8c8c] text-[14px] min-h-[50px]">
                    lorem impsum...
                  </div>
                </div>
              </>
            ) : (
              // Variation WITHOUT Flight Information
              <>
                {/* Payment Info Card */}
                <div className="rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-1">
                  <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                    Payment Info
                  </h3>
                  <div className="grid grid-cols-[125px_1fr] gap-y-3 text-[14px]">
                    <div className="text-[#8c8c8c]">Card Holder Name</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">Jayson smith</div>

                    <div className="text-[#8c8c8c]">Card Number</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">4411 4901 1145 7845</div>

                    <div className="text-[#8c8c8c]">Expiry Date</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">02/28</div>

                    <div className="text-[#8c8c8c]">CVC</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">441</div>

                    <div className="text-[#8c8c8c]">Billing Address</div>
                    <div className="text-[#111] font-medium text-right sm:text-left">Usaquen, Bogota, Colombia</div>
                  </div>
                </div>

                {/* Chauffeur / Trip Notes */}
                <div className="rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-2">
                  <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Chauffeur / Trip Notes
                  </h3>
                  <div className="text-[#8c8c8c] text-[14px] min-h-[50px]">
                    lorem impsum...
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end px-6 py-4 sm:px-8">
          <button
            onClick={onClose}
            className="rounded-full bg-gray-500 px-10 py-3.5 text-base font-medium text-white transition-colors hover:bg-gray-600 mr-3"
          >
            Close
          </button>
          <button className="rounded-full bg-[#1b2d5d] px-10 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#132042]">
            Confirm
          </button>
        </div>

      </div>

      <CancelTripModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => setIsCancelModalOpen(false)}
      />
    </div>
  );
}
