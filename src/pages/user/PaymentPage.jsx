import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsCreditCard, BsShieldCheck, BsInfoCircle, BsCheck2, BsCheckLg } from 'react-icons/bs';
import { LuUser, LuCalendarDays } from 'react-icons/lu';
import { MdDeleteOutline, MdLockOutline } from 'react-icons/md';
import { TbArrowRight } from 'react-icons/tb';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import childSeatIcon from '../../assets/childicon.png';
import wallet from '../../assets/wallet.png';

const tripDetails = [
  { label: 'Pick Up', value: 'Beck Road, Plymouth, MI, USA' },
  { label: 'Stop 1', value: 'Telegraph Road, Southfield, MI, USA' },
  { label: 'Drop-Off', value: 'Eight Mile West, Southfield, MI, USA' },
  { label: 'Date & Time', value: 'Wed, Feb 18th, 2026 11:00 PM' },
  { label: 'Vichicle', value: 'Business Sedan' },
  { label: 'Breakdown', value: '30 mint' },
  { label: 'Passenger', value: '3' },
  { label: 'Luggage', value: '3' },
  { label: 'Child Seats', value: '1 Toddler' },
];

function FormInput({ icon, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-full px-3 py-3 gap-2 bg-white focus-within:border-[#1a2b5e] transition-colors">
      {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400 min-w-0"
      />
    </div>
  );
}

export default function PaymentPage() {
  const navigate = useNavigate();

  const storedBookingContext = (() => {
    const raw = sessionStorage.getItem('bookingContext');
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  })();

  const bookingContext = location.state ?? storedBookingContext ?? {};
  const isHourlyRide = bookingContext.rideType === 'hourly';

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={3} />

      {/* Page header */}
      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-gray-100 border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">Payment Information</h1>
        <button
          onClick={() => navigate('/passenger-details')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT PANEL */}
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
                          <button onClick={() => setShowDeleteConfirm(true)} className="ml-1 text-red-400 hover:text-red-600 transition-colors">
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

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[62%]">
          <div className="bg-white/70 rounded-2xl shadow-sm border border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold text-gray-900 mb-3">Payment Information</h2>

            {/* Security message */}
            <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
              <BsShieldCheck size={17} className="text-green-500 flex-shrink-0" />
              <span>All transactions are secure and encrypted. Safe and secure payments.</span>
            </div>

            {/* Debit Card option (selected) */}
            <div className="border-2 border-[#1a2b5e] rounded-xl px-4 py-3 flex  gap-3 mb-5 bg-blue-50/30">
              <div className="w-9 h-9 bg-[#1a2b5e] rounded-lg flex items-center justify-center flex-shrink-0">
                <BsCreditCard size={17} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Dabit Cart</p>
                <p className="text-xs text-gray-400">Pay directly form your bank</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#1a2b5e] flex items-center justify-center flex-shrink-0">
                <BsCheck2 size={12} className="text-white" />
              </div>
            </div>

            {/* Card form fields */}
            <div className="flex flex-col gap-3 mb-5">
              <FormInput icon={<LuUser size={16} />} placeholder="Card Holder Name" value={cardName} onChange={e => setCardName(e.target.value)} />
              <FormInput icon={<BsCreditCard size={16} />} placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormInput icon={<LuCalendarDays size={16} />} placeholder="Date Expiry" value={expiry} onChange={e => setExpiry(e.target.value)} />
                <FormInput icon={<BsShieldCheck size={16} />} placeholder="CVC" value={cvc} onChange={e => setCvc(e.target.value)} />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-5" />

            {/* Save card info */}
            <div className="flex bg-white items-center gap-3 mb-5 border border-gray-100 rounded-lg px-2 py-1">
              <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={wallet} alt="Wallet" className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Created card</p>
                <p className="text-xs text-gray-400 mt-0.5">Save your info for faster booking</p>
                <div className="flex items-center gap-1 mt-1 bg-gray-200 px-2 py-1 rounded-lg w-[50%]">
                  <BsInfoCircle size={11} className="text-[#1a2b5e] flex-shrink-0" />
                  <p className="text-xs text-[#1a2b5e]">ID verification required for credit card payments.</p>
                </div>
              </div>
            </div>

            {/* Billing note */}
            <p className="text-md text-gray-800 mb-4">Billing address is used to verify the credit or debit card</p>

            {/* Policy checkboxes */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <BsInfoCircle size={13} className="flex-shrink-0 mt-0.5 text-[#1a2b5e]" />
                <span>Please review out cancellation policy before proceeding.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <BsInfoCircle size={13} className="flex-shrink-0 mt-0.5 text-[#1a2b5e]" />
                <span>I agree to the terms and authorize the payment (optional...</span>
              </div>
            </div>

            {/* Proceed to checkout */}
            <div className="flex justify-end">
              <button
                onClick={() => setBookingDone(true)}
                className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Completed Modal */}
      {bookingDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full px-8 py-10">

            {/* Checkmark badge with decorative dots */}
            <div className="flex justify-center mb-5">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <span className="absolute top-0 left-6 w-3 h-3 rounded-full bg-gray-200" />
                <span className="absolute top-3 right-1 w-2 h-2 rounded-full bg-gray-200" />
                <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="absolute bottom-0 left-3 w-2 h-2 rounded-full bg-gray-200" />
                <span className="absolute bottom-2 right-3 w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="w-16 h-16 bg-[#1a2b5e] rounded-full flex items-center justify-center z-10">
                  <BsCheckLg size={28} className="text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Booking completed</h1>
            <p className="text-sm text-gray-800 text-center mb-6 max-w-md mx-auto leading-relaxed">
              Your request has been submitted. Our customer service representative will get back to you shortly. Thank you for choosing prestige and have a safe trip.
            </p>

            <div className="border-t border-gray-100 mb-6" />

            {/* Booking details */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Left column */}
              <div className="flex flex-col gap-3 sm:w-32 sm:flex-shrink-0 sm:border-r border-gray-100 sm:pr-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Passenger Name</p>
                  <p className="text-sm font-bold text-gray-900">Jayson Smith</p>
                </div>
                <div className='mt-[95%]'>
                  <p className="text-xs text-gray-400 mb-0.5">Vehicle</p>
                  <p className="text-sm font-bold text-gray-900">Business Sedan</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Luggage</p>
                  <p className="text-sm font-bold text-gray-900">2</p>
                </div>
              </div>

              {/* Middle column */}
              <div className="flex-1 flex flex-col gap-3 sm:border-r border-gray-100 sm:pr-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Pick Up</p>
                  <p className="text-sm font-semibold text-gray-900">Beck Road, Plymouth, MI, USA</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Stop</p>
                  <p className="text-sm font-semibold text-gray-900">Telegraph Road, Southfield, MI, USA</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Drop of location</p>
                  <p className="text-sm font-semibold text-gray-900">Eight Mile West, Southfield, MI, USA</p>
                </div>
                <div className="flex gap-6 pt-1 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Passengers</p>
                    <p className="text-sm font-bold text-gray-900">2</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Pick Up Date</p>
                    <p className="text-sm font-bold text-gray-900">Feb 18th, 2026</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Child Seats</p>
                    <p className="text-sm font-bold text-gray-900">1</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Pick Up &amp; Estimated Arrived</p>
                    <p className="text-sm font-bold text-gray-900">11:00pm to 01:00pm</p>
                  </div>
                </div>
              </div>

              {/* Right column — QR code */}
              <div className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0 pl-2 pt-5">
                <div className="border border-gray-200 rounded-lg p-1.5 bg-white">
                  <svg viewBox="0 0 21 21" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
                    {[
                      [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
                      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
                      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
                      [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
                      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
                      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
                      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
                      [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
                      [1,0,1,1,0,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1],
                      [0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0],
                      [1,1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,0,1,1],
                      [0,0,1,0,0,1,1,0,1,0,1,0,0,1,0,0,1,0,1,0,0],
                      [1,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,1,0,1,0],
                      [0,0,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1],
                      [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,0,0,1,1],
                      [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,0],
                      [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1],
                      [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0],
                      [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,0,0,1],
                      [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,0],
                      [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,1,0,0,1,0],
                    ].flatMap((row, r) =>
                      row.map((cell, c) =>
                        cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#111827" /> : null
                      )
                    )}
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Booking Number</p>
                  <p className="text-xl font-bold text-gray-900">46982</p>
                </div>
              </div>
            </div>

            {/* Back to home */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate('/')}
                className="bg-[#1a2b5e] text-white text-sm font-bold px-14 py-3 rounded-full hover:bg-[#253576] transition-colors"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
