import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TbAlertTriangle } from 'react-icons/tb';
import { TbArrowRight } from 'react-icons/tb';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineEmail, MdDeleteOutline } from 'react-icons/md';
import { LuUser } from 'react-icons/lu';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import usflag from '../../assets/us.png';
import childSeatIcon from '../../assets/childicon.png';
import briefcaseIcon from '../../assets/briefcase.png';
import usericon from '../../assets/profileuser.png';

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

const COUNTRIES = [
  { code: 'US', dial: '+1', flag: null },
  { code: 'GB', dial: '+44', flag: null },
  { code: 'CA', dial: '+1', flag: null },
  { code: 'AU', dial: '+61', flag: null },
  { code: 'DE', dial: '+49', flag: null },
  { code: 'FR', dial: '+33', flag: null },
  { code: 'IN', dial: '+91', flag: null },
  { code: 'PK', dial: '+92', flag: null },
];

function FloatingInput({ icon, placeholder, value, onChange, type = 'text' }) {
  return (
    <div className="relative flex items-center border border-gray-200 rounded-xl px-3 py-3 gap-2 bg-white focus-within:border-[#1a2b5e] transition-colors">
      {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent min-w-0"
      />
    </div>
  );
}

function PhoneInput({ value, onChange, dialCode, onDialChange }) {
  return (
    <div className="relative flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-[#1a2b5e] transition-colors">
      {/* Country selector */}
      <div className="flex items-center gap-1 px-3 py-3 border-r border-gray-200 bg-white flex-shrink-0">
        <img src={usflag} alt="US" className="w-5 h-3.5 object-cover rounded-sm" />
        <select
          value={dialCode}
          onChange={e => onDialChange(e.target.value)}
          className="text-sm text-gray-700 outline-none bg-transparent cursor-pointer appearance-none pr-1"
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.dial}>{c.code} {c.dial}</option>
          ))}
        </select>
        <FiChevronDown size={12} className="text-gray-400" />
      </div>
      <input
        type="tel"
        placeholder="+1"
        value={value}
        onChange={onChange}
        className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent px-3 py-3 min-w-0"
      />
    </div>
  );
}

export default function PassengerDetailsPage() {
  const navigate = useNavigate();

  // Booking summary accordion
  const [summaryOpen, setSummaryOpen] = useState(true);

  // Book for someone else toggle
  const [bookForSomeoneElse, setBookForSomeoneElse] = useState(false);

  // Create account toggle
  const [createAccount, setCreateAccount] = useState(false);

  // Passenger details
  const [pFirstName, setPFirstName] = useState('');
  const [pLastName, setPLastName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pDial, setPDial] = useState('+1');

  // Booker details
  const [bFirstName, setBFirstName] = useState('');
  const [bLastName, setBLastName] = useState('');
  const [bEmail, setBEmail] = useState('');
  const [bPhone, setBPhone] = useState('');
  const [bDial, setBDial] = useState('+1');

  // Delete child seat confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Info tooltip
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  // Trip notes
  const [notes, setNotes] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={2} />

      {/* Page header */}
      <div className="flex items-center justify-between px-8 md:px-16 py-4 bg-gray-100 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">Passenger Information</h1>
        <button
          onClick={() => navigate('/additional-details')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-6 px-8 md:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT PANEL */}
        <div className="w-full md:w-[38%] flex flex-col gap-4">

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setSummaryOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-base font-bold text-gray-900">Booking summary</span>
              {summaryOpen ? <FiChevronUp size={18} className="text-gray-500" /> : <FiChevronDown size={18} className="text-gray-500" />}
            </button>

            {/* Always visible row */}
            <div className="flex items-center justify-between px-5 pb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <TbArrowRight size={15} className="text-[#1a2b5e]" />
                <span>Pickup Trip Details</span>
              </div>
              <span className="text-sm font-bold text-gray-900">$110</span>
            </div>

            {/* Expanded trip details */}
            {summaryOpen && (
              <div className="border-t border-gray-100 px-5 py-4">
                <div className="flex flex-col gap-2">
                  {tripDetails.map((row, i) => (
                    <div key={i} className="flex items-start justify-start gap-4">
                      <span className="text-xs font-bold text-black w-24 flex-shrink-0">{row.label}</span>
                      <span className="text-xs text-gray-700 text-left">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
            <h2 className="text-base font-bold text-gray-900 mb-4">Price Breakdown</h2>

            {/* Pickup */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <TbArrowRight size={15} className="text-[#1a2b5e]" />
                <span>Pickup</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">$110</span>
            </div>

            {/* Child Seat */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <img src={childSeatIcon} className="w-4 h-4" alt="child seat" />
                <span>Child Seat x 1</span>
                <button onClick={() => setShowDeleteConfirm(true)} className="ml-1 text-red-400 hover:text-red-600 transition-colors">
                  <MdDeleteOutline size={16} />
                </button>
              </div>
              <span className="text-sm font-semibold text-gray-800">$15</span>
            </div>

            {/* Tolls */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Tolls Charges</span>
              <span className="text-sm font-semibold text-gray-800">$15</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 mt-1">
              <span className="text-sm text-gray-700">Total Price</span>
              <span className="text-2xl font-bold text-gray-900">
                <span className="text-base font-semibold mr-0.5">$</span>160.64
              </span>
            </div>

            {/* All-inclusive note */}
            <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
              <BsInfoCircle size={13} />
              <span>All-inclusive price</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[62%] flex flex-col gap-5">

          {/* Continue as Guest */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">

            <h2 className="text-xl font-bold text-gray-900 mb-4">Continue as Guest</h2>

            {/* Book for someone else toggle */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setBookForSomeoneElse(v => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${bookForSomeoneElse ? 'bg-[#1a2b5e]' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${bookForSomeoneElse ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </button>
              <span className="text-sm text-gray-700">Book for someone else</span>
            </div>

            {/* Passenger Details */}
            <h3 className="text-sm font-bold text-gray-800 mb-3">Passenger Details</h3>

            <div className="flex flex-col gap-3">
              {/* First & Last name */}
              <div className="grid grid-cols-2 gap-3">
                <FloatingInput icon={<LuUser size={16} />} placeholder="First Name" value={pFirstName} onChange={e => setPFirstName(e.target.value)} />
                <FloatingInput icon={<LuUser size={16} />} placeholder="Last Name" value={pLastName} onChange={e => setPLastName(e.target.value)} />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <FloatingInput icon={<MdOutlineEmail size={17} />} placeholder="jaysonsmith@gmail.com" type="email" value={pEmail} onChange={e => setPEmail(e.target.value)} />
                <PhoneInput value={pPhone} onChange={e => setPPhone(e.target.value)} dialCode={pDial} onDialChange={setPDial} />
              </div>
            </div>

            {/* Booker Details — only when toggle is on */}
            {bookForSomeoneElse && (
              <>
                <h3 className="text-sm font-bold text-gray-800 mb-3 mt-5">Booker Details</h3>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <FloatingInput icon={<LuUser size={16} />} placeholder="First Name" value={bFirstName} onChange={e => setBFirstName(e.target.value)} />
                    <FloatingInput icon={<LuUser size={16} />} placeholder="Last Name" value={bLastName} onChange={e => setBLastName(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FloatingInput icon={<MdOutlineEmail size={17} />} placeholder="jaysonsmith@gmail.com" type="email" value={bEmail} onChange={e => setBEmail(e.target.value)} />
                    <PhoneInput value={bPhone} onChange={e => setBPhone(e.target.value)} dialCode={bDial} onDialChange={setBDial} />
                  </div>
                </div>
              </>
            )}

            {/* Create account toggle */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => setCreateAccount(v => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${createAccount ? 'bg-[#1a2b5e]' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${createAccount ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </button>
              <span className="text-sm text-gray-700">Check this box to securely create an account</span>
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowAccountInfo(v => !v)}
                  className="text-gray-400 hover:text-[#1a2b5e] transition-colors"
                >
                  <BsInfoCircle size={14} />
                </button>
                {showAccountInfo && (
                  <div className="absolute left-6 top-0 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
                    {/* Close button */}
                    <button
                      onClick={() => setShowAccountInfo(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
                    >×</button>
                    <h3 className="text-base font-bold text-gray-900 mb-1">Why do I need an account?</h3>
                    <p className="text-sm text-gray-400 mb-3">Creating an account gives you access to:</p>
                    <ul className="flex flex-col gap-2">
                      {[
                        { label: 'Ride History:', desc: 'View past, current, and upcoming reservations' },
                        { label: 'Faster bookings:', desc: 'Quickly book rides using saved details' },
                        { label: 'Trip Management:', desc: 'Modify or cancel upcoming trips with ease' },
                        { label: 'Invoices & receipts:', desc: 'Download and track payment history' },
                        { label: 'Exclusive offers:', desc: 'Access member-only discounts and deals' },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-sm">
                          <span className="text-gray-400 flex-shrink-0 mt-0.5">•</span>
                          <span>
                            <span className="font-bold text-gray-900">{item.label}</span>
                            <span className="text-gray-400">  {item.desc}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Trip Notes */}
            <h3 className="text-sm font-bold text-gray-800 mt-5 mb-2">Trip Notes</h3>
            <textarea
              rows={3}
              placeholder="Any special requests or notes for the driver..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2b5e] resize-none bg-white transition-colors"
            />

            {/* Continue to Payment */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate('/payment')}
                className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors"
              >
                Continue to Payment <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Delete child seat confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl shadow-2xl mx-4 w-full max-w-sm px-8 py-8 flex flex-col items-center">

            {/* Warning icon with decorative dots */}
            <div className="relative flex items-center justify-center w-28 h-28 mb-4">
              <span className="absolute top-1 left-6 w-4 h-4 rounded-full bg-red-100" />
              <span className="absolute top-4 right-2 w-2.5 h-2.5 rounded-full bg-red-100" />
              <span className="absolute top-0 left-2 w-2 h-2 rounded-full bg-red-200" />
              <span className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-red-100" />
              <span className="absolute bottom-1 left-5 w-2 h-2 rounded-full bg-red-100" />
              <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-200 z-10">
                <TbAlertTriangle size={38} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Are you Sure?</h2>
            <p className="text-sm text-gray-400 text-center mb-7 leading-relaxed">
              Would you like to delete your child seats.<br />Do you want to continue?
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                No
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-full bg-[#1a2b5e] text-white text-sm font-semibold hover:bg-[#253576] transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
