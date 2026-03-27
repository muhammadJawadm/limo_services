import { FiChevronDown } from 'react-icons/fi';
import { LuCar } from 'react-icons/lu';
import { useState } from 'react';
import CancelTripModal from './CancelTripModal';
import { FaArrowLeft } from "react-icons/fa6";
import blackcaricon from '../../assets/blackcaricon.png'
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { FiFileText } from "react-icons/fi";

export default function RideDetailsModal({
  isOpen,
  onClose,
  isReturnTrip = false,
  hasFlightInfo = true,
  onOpenMessage,
}) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="relative flex h-full sm:h-auto max-h-none sm:max-h-[90vh] w-full max-w-[1000px] flex-col rounded-none sm:rounded-[30px] bg-white text-[#111111] shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header (Sticky if scrolled) */}
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-100 bg-[#fdfdfd] sm:bg-white px-5 sm:px-8 py-4 sm:py-5 rounded-t-none sm:rounded-t-[30px] shadow-sm sm:shadow-none">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center justify-center p-2 -ml-2 text-[#4d4d4d] hover:bg-gray-100 hover:text-[#111] rounded-full transition-colors font-medium sm:p-0 sm:ml-0 sm:hover:bg-transparent"
            >
              <FaArrowLeft size={20} className="text-[#111] sm:w-[24px] sm:h-[24px]" />
            </button>
            {isReturnTrip && <h2 className="ml-1 text-xl sm:text-2xl font-bold">Back</h2>}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenMessage}
              className="rounded-full bg-[#1b2d5d] px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-sm font-medium text-white transition-colors hover:bg-[#132042]"
            >
              Message
            </button>
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="rounded-full border border-gray-200 px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-sm font-medium text-[#666] transition-colors hover:bg-gray-50 focus:border-[#1b2d5d]"
            >
              Cancel <span className="hidden sm:inline">Trip</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-6 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-[#111] [&::-webkit-scrollbar-thumb]:rounded-full pb-10 sm:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">

            {/* Row 1 */}

            {/* Booking Details Card */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-full">
              <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                Booking Details
              </h3>
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[100px_1fr] sm:gap-y-3 text-[13px] sm:text-[14px]">
                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">Confirmation#</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left">45854</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">Booking Type:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left">Point to Point</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">Trip Status:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Cancelled
                  </div>
                </div>

                <div className="flex flex-col sm:contents pt-1 sm:pt-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">Created At:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left">02/2/2026</div>
                </div>
              </div>
            </div>

            {/* Passenger / Guest Info Card */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-full">
              <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#222]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                {isReturnTrip ? 'Guest Info' : 'Passenger Info'}
              </h3>
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[85px_1fr] md:grid-cols-[90px_1fr] sm:gap-y-3 text-[13px] sm:text-[14px]">
                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">First Name:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left">Jayson</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">Last Name:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left">Smith</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                  <div className="text-[#666] font-medium sm:font-normal mb-1 sm:mb-0">Contract No:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left">01 (444) 784-4547</div>
                </div>

                <div className="flex flex-col sm:contents pt-1 sm:pt-0">
                  <div className="text-[#666] font-medium sm:font-normal sm:self-center mb-1 sm:mb-0">Email:</div>
                  <div className="text-[#111] font-semibold sm:font-medium text-left break-all">jaysonsmith@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Vehicle Info Card */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white border-t-4 sm:border-t-2 sm:border-t-[#dfdfdf] h-full">
              <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                <img src={blackcaricon} alt="" className='w-6 h-6 sm:w-7 sm:h-7 opacity-80' />
                Vehicle Info
              </h3>
              <div className="space-y-4 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <span className="text-[13px] sm:text-[14px] font-medium sm:font-normal text-[#111]">Vehicle Type:</span>
                  <div className="flex items-center justify-between rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-4 py-2 sm:py-1.5 w-full sm:w-[160px] text-[13px] text-[#666] shadow-sm hover:border-gray-300 transition-colors cursor-pointer">
                    <span>Business Sedan</span>
                    <FiChevronDown />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row  sm:items-start justify-between gap-3 sm:gap-0">
                  <div className="flex items-center justify-between sm:justify-start gap-4 lg:gap-1 flex-1">
                    <span className="text-[13px] sm:text-[14px] text-[#111] whitespace-nowrap font-medium sm:font-normal">No. of Pax:</span>
                    <div className="flex items-center justify-between rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-4 py-2 sm:py-1 min-w-[70px] sm:w-[65px] text-[13px] text-[#222] font-medium sm:font-normal shadow-sm cursor-pointer hover:border-gray-300">
                      <span>3</span>
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-1 flex-1">
                    <span className="text-[13px] sm:text-[14px] text-[#111] font-medium sm:font-normal">Luggage:</span>
                    <div className="flex items-center justify-between rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-4 py-2 sm:py-1 min-w-[70px] sm:w-[65px] text-[13px] text-[#222] font-medium sm:font-normal shadow-sm cursor-pointer hover:border-gray-300">
                      <span>3</span>
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1 sm:pt-0 border-t border-gray-100 sm:border-0 mt-3 sm:mt-0">
                  <span className="text-[13px] sm:text-[14px] text-[#111] font-medium sm:font-normal block mb-2 sm:mb-1">Child Seats:</span>
                  <div className="flex flex-col lg:flex-row ">
                    <div className="flex items-center justify-between rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-2 py-2 sm:py-1 flex-1 text-[12px] sm:text-[12px] text-[#666] shadow-sm cursor-pointer hover:border-gray-300">
                      <span className="truncate mr-1">0 Infant</span>
                      <FiChevronDown className="shrink-0" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-2 py-2 sm:py-1 flex-1 text-[12px] sm:text-[12px] text-[#666] shadow-sm cursor-pointer hover:border-gray-300">
                      <span className="truncate mr-1">1 Toddler</span>
                      <FiChevronDown className="shrink-0" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl sm:rounded-full border border-gray-200 bg-white px-3 sm:px-2 py-2 sm:py-1 flex-1 text-[12px] sm:text-[12px] text-[#666] shadow-sm cursor-pointer hover:border-gray-300 col-span-2 sm:col-span-1">
                      <span className="truncate mr-1">0 Booster</span>
                      <FiChevronDown className="shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}

            {/* Trip Info Card (Spans 2 columns) */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 md:col-span-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white">
              <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                <CiLocationOn className='w-6 h-6 sm:w-7 sm:h-7 opacity-80 text-[#222]' />
                Trip Info
              </h3>

              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[80px_1fr] md:grid-cols-[90px_1fr] sm:gap-y-4 text-[13px] sm:text-[14px]">
                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
                  <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Pick-up:</div>
                  <div className="text-gray-700 sm:text-[#666] leading-relaxed relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-500 before:rounded-full">USA Vein Clinics, Telegraph Road, USA</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
                  <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Stop 1:</div>
                  <div className="text-gray-700 sm:text-[#666] leading-relaxed relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-yellow-500 before:rounded-full">USA Vein Clinics, Telegraph Road, USA</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
                  <div className="font-semibold sm:font-medium text-[#111] opacity-100 mb-1 sm:mb-0 hidden sm:block">Stop:</div>
                  <div className="flex items-center justify-start sm:justify-end sm:-mt-6">
                    <button className="text-[#8c8c8c] hover:text-[#1b2d5d] text-sm font-medium hover:underline transition-colors">+ Add Stop</button>
                  </div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
                  <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Drop-off:</div>
                  <div className="text-gray-700 sm:text-[#666] leading-relaxed relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-red-500 before:rounded-full">USA Vein Clinics, Telegraph Road, USA</div>
                </div>

                <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-3 sm:pb-0">
                  <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Date:</div>
                  <div className="text-gray-700 sm:text-[#666]">02/12/2026</div>
                </div>

                <div className="flex flex-col sm:contents pt-1 sm:pt-0">
                  <div className="font-semibold sm:font-medium text-[#111] mb-1 sm:mb-0">Time:</div>
                  <div className="text-gray-700 sm:text-[#666]">12:00 AM</div>
                </div>
              </div>
            </div>

            {/* Charges & Fees Card */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white">
              <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                <AiOutlineDollarCircle className='w-6 h-6 sm:w-7 sm:h-7 opacity-80 text-[#222]' />
                Charges & Fees
              </h3>
              <div className="space-y-4 sm:space-y-4 text-[13px] sm:text-[14px]">
                <div className="flex justify-between items-center group">
                  <span className="text-[#666] font-medium sm:font-normal">Trip Price</span>
                  <span className="font-semibold text-[15px] sm:text-base text-[#111]">$95.00</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-[#666] font-medium sm:font-normal">Child</span>
                  <span className="font-semibold text-[15px] sm:text-base text-[#111]">$15.00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 sm:pb-4 group">
                  <span className="text-[#666] font-medium sm:font-normal">Others:</span>
                  <span className="font-semibold text-[15px] sm:text-base text-[#111]">$30.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 sm:pt-3 text-[#b0b0b0]">
                  <span className="text-gray-700 font-semibold sm:font-normal">Payment</span>
                  <span className="text-[22px] sm:text-2xl font-bold text-[#1b2d5d]">$130.00</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            {/* Conditional flight info or payment mapping dependent on hasFlightInfo */}

            {hasFlightInfo ? (
              // Variation with Flight Information
              <>
                {/* Payment Info Card */}
                <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-full">
                  <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                    <MdOutlinePayment className='w-[22px] h-[22px] sm:w-6 sm:h-6 opacity-80 text-[#222]' />
                    Payment Info
                  </h3>
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[125px_1fr] sm:gap-y-3 text-[13px] sm:text-[14px]">
                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Card Holder Name:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">Jayson smith</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Card Number:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left tracking-wider">4411 4901 **** 7845</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Expiry Date:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">02/28</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">CVC:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">***</div>
                    </div>

                    <div className="flex flex-col sm:contents pt-1 sm:pt-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Billing Address:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left leading-relaxed">Usaquen, Bogota, Colombia</div>
                    </div>
                  </div>
                </div>

                {/* Flight Information Card */}
                <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-full">
                  <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 text-[#222]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Flight Information
                  </h3>
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[140px_1fr] md:grid-cols-[150px_1fr] sm:gap-y-3 text-[13px] sm:text-[14px]">
                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">First Name:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">Jayson</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Last Name:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">Smith</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Airline Name or Code:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">4512</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Contract No:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">01 (444) 784-4547</div>
                    </div>

                    <div className="flex flex-col sm:contents pt-1 sm:pt-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Email:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left break-all">jaysmith@gmail.com</div>
                    </div>
                  </div>
                </div>

                {/* Chauffeur / Trip Notes (Spans all columns) */}
                <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white">
                  <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                    <FiFileText className='w-[20px] h-[20px] sm:w-6 sm:h-6 opacity-80 text-[#222]' />
                    Chauffeur / Trip Notes
                  </h3>
                  <div className="text-gray-700 sm:text-[#8c8c8c] text-[13px] sm:text-[14px] min-h-[50px] bg-gray-50/50 p-3 sm:bg-transparent sm:p-0 rounded-lg sm:rounded-none">
                    lorem impsum...
                  </div>
                </div>
              </>
            ) : (
              // Variation WITHOUT Flight Information
              <>
                {/* Payment Info Card */}
                <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-full">
                  <h3 className="mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                    <MdOutlinePayment className='w-[22px] h-[22px] sm:w-6 sm:h-6 opacity-80 text-[#222]' />
                    Payment Info
                  </h3>
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[125px_1fr] sm:gap-y-3 text-[13px] sm:text-[14px]">
                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Card Holder Name:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">Jayson smith</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Card Number:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left tracking-wider">4411 4901 **** 7845</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Expiry Date:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">02/28</div>
                    </div>

                    <div className="flex flex-col sm:contents border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">CVC:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left">***</div>
                    </div>

                    <div className="flex flex-col sm:contents pt-1 sm:pt-0">
                      <div className="font-medium sm:font-normal text-[#666] mb-1 sm:mb-0">Billing Address:</div>
                      <div className="text-[#111] font-semibold sm:font-medium text-left leading-relaxed">Usaquen, Bogota, Colombia</div>
                    </div>
                  </div>
                </div>

                {/* Chauffeur / Trip Notes */}
                <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-5 col-span-1 md:col-span-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-full">
                  <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold flex items-center gap-2">
                    <FiFileText className='w-[20px] h-[20px] sm:w-6 sm:h-6 opacity-80 text-[#222]' />
                    Chauffeur / Trip Notes
                  </h3>
                  <div className="text-gray-700 sm:text-[#8c8c8c] text-[13px] sm:text-[14px] min-h-[50px] bg-gray-50/50 p-3 sm:bg-transparent sm:p-0 rounded-lg sm:rounded-none">
                    lorem impsum...
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 border-t border-gray-100 sm:border-0 bg-white justify-between sm:justify-end gap-3 px-5 py-4 sm:px-8 sm:pb-8 sm:pt-0">
          <button
            onClick={onClose}
            className="flex-[1] sm:flex-none w-full sm:w-auto rounded-full bg-gray-100 sm:bg-gray-500 px-6 sm:px-10 py-3.5 text-[15px] sm:text-base font-semibold sm:font-medium text-gray-700 sm:text-white transition-colors hover:bg-gray-200 sm:hover:bg-gray-600 sm:mr-3 border border-gray-200 sm:border-0 shadow-sm sm:shadow-md"
          >
            Close
          </button>
          <button className="flex-[1.5] sm:flex-none w-full sm:w-auto rounded-full bg-[#1b2d5d] px-6 sm:px-10 py-3.5 text-[15px] sm:text-base font-semibold sm:font-medium text-white transition-all hover:bg-[#132042] shadow-md hover:shadow-lg active:scale-[0.98]">
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
