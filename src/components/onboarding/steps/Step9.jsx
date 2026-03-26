import { InputField } from '../FormElements';
import { LuUser } from 'react-icons/lu';
import { FiCheck } from 'react-icons/fi';
import wallet from '../../../assets/wallet.png';
import whitewallet from '../../../assets/whitewallet.png';

export const Step9 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">Payment Details</h2>
      <p className="text-[14px] text-gray-500 mt-2">
        Please Provide the bank details for receiving payments form Limo in the future
      </p>
    </div>

    <div className="space-y-4 max-w-2xl">
      <p className="text-[14px] text-gray-500 mb-2">Preferred Payment Method</p>

      {/* Selected Payment Method Mockup */}
      <div className="border border-[#1b2d5d] rounded-xl p-4 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white">
            <img src={whitewallet} alt="card" className='w-6 h-6' />
          </div>
          <div>
            <div className="text-[15px] font-medium text-[#111]">Dabit Cart</div>
            <div className="text-[13px] text-gray-500">Pay directly form your bank</div>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white">
          <FiCheck size={14} />
        </div>
      </div>

      <div className="pt-2" />

      <InputField label="" icon={<LuUser className="text-gray-400" size={18} />} placeholder="Card Holder Name" value={formData.cardHolderName} onChange={(e) => updateDoc('cardHolderName', e.target.value)} />
      <InputField label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} placeholder="Card Number" value={formData.cardNumber} onChange={(e) => updateDoc('cardNumber', e.target.value)} />

      <div className="grid grid-cols-2 gap-4">
        <InputField label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} placeholder="Date Expiry" value={formData.cardExpiry} onChange={(e) => updateDoc('cardExpiry', e.target.value)} />
        <InputField label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} placeholder="CVC" value={formData.cardCvc} onChange={(e) => updateDoc('cardCvc', e.target.value)} />
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mt-1">
          <img src={wallet} alt="wallet" className='w-6 h-6' />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-medium text-[#111]">Created card</div>
          <div className="text-[13px] text-gray-500 mb-2">Save your info for faster booking</div>
          <div className="flex items-center justify-start text-gray-600 gap-2 bg-[#1B2D5D26] px-4 py-2 rounded-md w-[100%] md:w-[65%] ">
            <div className="w-5 h-5 rounded-full border border-gray-800 flex items-center justify-center text-[12px] text-black">!</div>
            <p className="text-[14px] text-gray-500">ID verification required for credit card payments.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
);
