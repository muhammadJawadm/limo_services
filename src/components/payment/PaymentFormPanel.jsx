import { useState } from 'react';
import { BsCreditCard, BsShieldCheck, BsInfoCircle, BsCheck2 } from 'react-icons/bs';
import { LuUser, LuCalendarDays } from 'react-icons/lu';
import { FormInput } from './FormInputs';
import wallet from '../../assets/wallet.png';

export default function PaymentFormPanel({ onProceed }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
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
            <div className="flex items-center gap-1 mt-1 bg-gray-200 px-2 py-1 rounded-lg w-full xl:w-[60%]">
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
            onClick={onProceed}
            className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
