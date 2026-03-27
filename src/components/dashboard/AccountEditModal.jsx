import { FiChevronDown } from 'react-icons/fi';
import { CiUser, CiCreditCard1, CiCalendar, CiLocationOn, CiWallet } from "react-icons/ci";

export default function AccountEditModal({ isOpen, onClose, editType = 'passenger' }) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (editType) {
      case 'passenger':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[#666]">First Name:</label>
                <input type="text" defaultValue="Jayson" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#666]">Company Name:</label>
                <input type="text" defaultValue="ux pilot" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#666]">Password:</label>
                <input type="password" defaultValue="secretpassword" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[#666]">Last Name:</label>
                <input type="text" defaultValue="Smith" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#666]">Email Address:</label>
                <input type="email" defaultValue="jaysonsmith@gmail.com" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
            </div>
          </div>
        );
      case 'address':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[#666]">Address Type</label>
                <input type="text" defaultValue="Eight Mile west" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#666]">Apartment: /Street</label>
                <input type="text" defaultValue="4455" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#666]">State/Province</label>
                <input type="text" defaultValue="USA" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[#666]">Primary Address</label>
                <input type="text" defaultValue="Eight Mile west" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#666]">City</label>
                <input type="text" defaultValue="Southfield" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="flex flex-col gap-5 max-w-[500px] mx-auto">
            <div>
              <label className="mb-2 block text-sm text-[#666]">Email Address</label>
              <input type="email" defaultValue="jaysonsmith@gmail.com" className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-[#666]">Phone Number</label>
              <div className="flex w-full items-center gap-2 rounded-full border border-gray-200 px-2 py-1 bg-white focus-within:border-[#1b2d5d]">
                <div className='flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer px-3 py-1.5 rounded-full'>
                  <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-5 object-cover rounded-full" />
                  <FiChevronDown className="text-[#4d4d4d]" />
                </div>
                <span className="text-[#4d4d4d] text-[15px]">+1</span>
                <input type="text" defaultValue="(555) 123-4567" className="flex-1 bg-transparent border-none text-[15px] text-[#111] outline-none px-2 py-2 placeholder:text-gray-400" />
              </div>
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="flex flex-col gap-4 max-w-[550px] mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <CiUser size={20} />
              </div>
              <input type="text" placeholder="Card Holder Name" className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <CiCreditCard1 size={20} />
              </div>
              <input type="text" placeholder="Card Number" className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <CiCalendar size={20} />
                </div>
                <input type="text" placeholder="Date Expiry" className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <CiWallet size={20} />
                </div>
                <input type="text" placeholder="CVC" className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <CiLocationOn size={20} />
              </div>
              <input type="text" placeholder="Billing Address" className="w-full rounded-full border border-gray-200 pl-11 pr-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]" />
            </div>
            <div className="relative cursor-pointer">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <CiCreditCard1 size={20} />
              </div>
              <select className="w-full rounded-full border border-gray-200 pl-11 pr-10 py-3 text-[15px] text-gray-400 outline-none appearance-none bg-white cursor-pointer focus:border-[#1b2d5d]">
                <option value="" disabled selected hidden>Card Status:</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <FiChevronDown size={18} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="min-h-full grid place-items-center py-8">
        <div className="w-full max-w-[650px] rounded-[30px] bg-white p-6 sm:p-8 text-[#111111] shadow-2xl relative">

          {renderContent()}

          {/* Footer actions */}
          <div className="mt-8 flex items-center gap-4 px-2 max-w-[500px] mx-auto">
            <button
              onClick={onClose}
              className="flex-1 rounded-full bg-gray-500 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
