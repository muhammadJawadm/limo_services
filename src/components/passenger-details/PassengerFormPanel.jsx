import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { LuUser } from 'react-icons/lu';
import { FloatingInput, PhoneInput } from './FormInputs';

export default function PassengerFormPanel() {
  const navigate = useNavigate();

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

  // Info tooltip
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  // Trip notes
  const [notes, setNotes] = useState('');

  return (
    <div className="w-full md:w-[62%] flex flex-col gap-5 rounded-2xl ">
      {/* Continue as Guest */}
      <div className="bg-white/50 rounded-2xl shadow-sm border border-gray-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue as Guest</h2>

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
        <h3 className="text-lg font-bold text-gray-800 mb-3">Passenger Details</h3>

        <div className="flex flex-col gap-3">
          {/* First & Last name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FloatingInput icon={<LuUser size={16} />} placeholder="First Name" value={pFirstName} onChange={e => setPFirstName(e.target.value)} />
            <FloatingInput icon={<LuUser size={16} />} placeholder="Last Name" value={pLastName} onChange={e => setPLastName(e.target.value)} />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FloatingInput icon={<MdOutlineEmail size={17} />} placeholder="jaysonsmith@gmail.com" type="email" value={pEmail} onChange={e => setPEmail(e.target.value)} />
            <PhoneInput value={pPhone} onChange={e => setPPhone(e.target.value)} dialCode={pDial} onDialChange={setPDial} />
          </div>
        </div>

        {/* Booker Details — only when toggle is on */}
        {bookForSomeoneElse && (
          <>
            <h3 className="text-lg font-bold text-gray-800 mb-3 mt-5">Booker Details</h3>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FloatingInput icon={<LuUser size={16} />} placeholder="First Name" value={bFirstName} onChange={e => setBFirstName(e.target.value)} />
                <FloatingInput icon={<LuUser size={16} />} placeholder="Last Name" value={bLastName} onChange={e => setBLastName(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div className="absolute left-auto right-0 sm:left-6 sm:right-auto top-0 z-50 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
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
        <h3 className="text-lg font-bold text-gray-800 mt-5 mb-2">Trip Notes</h3>
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
  );
}
