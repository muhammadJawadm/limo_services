import { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { FaArrowLeft } from "react-icons/fa6";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CancelTripModal from './CancelTripModal';

export default function DriverDetailsModal({
  isOpen,
  onClose,
  hasFlightInfo = true,
  isViewMode = false,
  onOpenMessage,
}) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="relative flex max-h-[90vh] w-full max-w-[1100px] flex-col rounded-[20px] bg-white text-[#111111] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={onClose}>
            <FaArrowLeft size={16} className="text-[#666] group-hover:text-[#111] transition-colors" />
            <span className="text-[15px] font-medium text-[#666] group-hover:text-[#111] transition-colors">Back</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMessage}
              className="rounded-full bg-[#1b2d5d] px-6 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#132042]"
            >
              Message
            </button>
            {!isViewMode && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="rounded-full border border-gray-200 px-5 py-2 text-[14px] font-medium text-[#666] transition-colors hover:bg-gray-50 bg-white"
              >
                Cancel Trip
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="flex flex-col gap-5 sm:gap-6">

            {/* ROW 1: 3 cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              
              {/* Booking Details */}
              <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                <h3 className="mb-5 text-[17px] font-bold text-[#111]">Booking Details</h3>
                <div className="grid grid-cols-[115px_1fr] gap-y-3.5 text-[14px]">
                  <div className="text-[#666]">Confirmation#</div>
                  <div className="text-[#111]">45854</div>
                  <div className="text-[#666]">Booking Type:</div>
                  <div className="text-[#111]">Point to Point</div>
                  <div className="text-[#666]">Trip Status:</div>
                  <div className="text-[#111]">Cancelled</div>
                  <div className="text-[#666]">Created At:</div>
                  <div className="text-[#111]">02/2/2026</div>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#111]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Passenger Info
                </h3>
                <div className="grid grid-cols-[90px_1fr] gap-y-3.5 text-[14px]">
                  <div className="text-[#666]">First Name:</div>
                  <div className="text-[#111]">Jayson</div>
                  <div className="text-[#666]">Last Name:</div>
                  <div className="text-[#111]">Smith</div>
                  <div className="text-[#666]">Contract No:</div>
                  <div className="text-[#111]">01 (444) 784-4547</div>
                  <div className="text-[#666]">Email</div>
                  <div className="text-[#111] break-all">jaysonsmith@gmail.com</div>
                </div>
              </div>

              {/* Charges & Fees */}
              <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                  <AiOutlineDollarCircle className="w-[22px] h-[22px] text-[#111]" />
                  Charges & Fees
                </h3>
                <div className="flex flex-col text-[14px]">
                  <div className="flex justify-between mb-3.5">
                    <span className="text-[#666]">Trip Price</span>
                    <span className="text-[#111] text-[15px]">$95.00</span>
                  </div>
                  <div className="flex justify-between mb-3.5">
                    <span className="text-[#666]">Child</span>
                    <span className="text-[#111] text-[15px]">$15.00</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-[#666]">Others:</span>
                    <span className="text-[#111] text-[15px]">$30.00</span>
                  </div>
                  <div className="h-px bg-gray-200 w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666]">Payment</span>
                    <span className="text-[20px] font-bold text-[#111]">$130.00</span>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              
              {/* LEFT COLUMN (Spans 8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
                {/* Trip Info Card */}
                <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white flex-1 min-h-[300px]">
                  <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                    <CiLocationOn className="w-[22px] h-[22px] text-[#111]" strokeWidth={0.5} />
                    Trip Info
                  </h3>
                  <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-y-4 text-[14px]">
                    <div className="text-[#111] font-medium">Pick-up</div>
                    <div className="text-[#666]">USA Vein Clinics, Telegraph Road, USA</div>
                    
                    <div className="text-[#111] font-medium">Stop:</div>
                    <div className="text-[#666]">USA Vein Clinics, Telegraph Road, USA</div>
                    
                    <div className="text-[#111] font-medium">Stop:</div>
                    <div className="text-[#888] text-right cursor-pointer hover:underline">+ Add Stop</div>
                    
                    <div className="text-[#111] font-medium">Drop-off:</div>
                    <div className="text-[#666]">USA Vein Clinics, Telegraph Road, USA</div>
                    
                    <div className="text-[#111] font-medium">Duration:</div>
                    <div className="text-[#666]">3 hours</div>
                    
                    <div className="text-[#111] font-medium">Luggage:</div>
                    <div className="text-[#666]">3</div>
                    
                    <div className="text-[#111] font-medium">Child Seats:</div>
                    <div className="text-[#666]">1 Toddler</div>
                    
                    <div className="text-[#111] font-medium">Date:</div>
                    <div className="text-[#666]">02/12/2026</div>
                    
                    <div className="text-[#111] font-medium">Time:</div>
                    <div className="text-[#666]">12:00 AM</div>
                  </div>
                </div>

                {/* Chauffeur / Trip Notes Card (Only inside Left Col if hasFlightInfo is true) */}
                {hasFlightInfo && (
                  <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                    <h3 className="mb-4 text-[17px] font-bold text-[#111] flex items-center gap-2">
                      <FiFileText className="w-[18px] h-[18px] text-[#111]" />
                      Chauffeur / Trip Notes
                    </h3>
                    <div className="text-[#666] text-[14px]">
                      lorem impsum...
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN (Spans 4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
                {/* Guest Info Card */}
                <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                  <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#111]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Guest Info
                  </h3>
                  <div className="grid grid-cols-[90px_1fr] gap-y-3.5 text-[14px]">
                    <div className="text-[#666]">First Name:</div>
                    <div className="text-[#111]">Jayson</div>
                    <div className="text-[#666]">Last Name:</div>
                    <div className="text-[#111]">Smith</div>
                    <div className="text-[#666]">Contract No:</div>
                    <div className="text-[#111]">01 (444) 784-4547</div>
                    <div className="text-[#666]">Email</div>
                    <div className="text-[#111] break-all">jaysonsmith@gmail.com</div>
                  </div>
                </div>

                {/* Second Card in Right Column */}
                {hasFlightInfo ? (
                  <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white min-h-[220px]">
                    <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#111]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      Flight Information
                    </h3>
                    <div className="grid grid-cols-[145px_1fr] gap-y-3.5 text-[14px]">
                      <div className="text-[#666]">First Name:</div>
                      <div className="text-[#111]">Jayson</div>
                      <div className="text-[#666]">Last Name:</div>
                      <div className="text-[#111]">Smith</div>
                      <div className="text-[#666]">Airline Name or Code:</div>
                      <div className="text-[#111]">4512</div>
                      <div className="text-[#666]">Contract No:</div>
                      <div className="text-[#111]">01 (444) 784-4547</div>
                      <div className="text-[#666]">Email</div>
                      <div className="text-[#111] break-all">jaysonsmith@gmail.com</div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white min-h-[140px]">
                    <h3 className="mb-4 text-[17px] font-bold text-[#111] flex items-center gap-2">
                      <FiFileText className="w-[18px] h-[18px] text-[#111]" />
                      Chauffeur / Trip Notes
                    </h3>
                    <div className="text-[#666] text-[14px]">
                      lorem impsum...
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Footer */}
        {!isViewMode && (
          <div className="flex shrink-0 bg-white justify-end px-6 py-5 sm:px-8 sm:py-6">
            <button onClick={onClose} className="rounded-full bg-[#1b2d5d] px-8 py-3 w-full sm:w-auto text-[15px] font-medium text-white transition-all hover:bg-[#132042] shadow-sm">
              Confirm Pickup
            </button>
          </div>
        )}

      </div>

      <CancelTripModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => setIsCancelModalOpen(false)}
      />
    </div>
  );
}
