import { FiEdit2, FiPlus, FiChevronDown } from 'react-icons/fi';
import { RiEdit2Line } from "react-icons/ri";

const STORED_CARDS = [
   { id: 1, name: 'Jason smith', number: 'CC**7458', expiry: '1451', billing: 'Usaquen. Bogota, Colombia' },
];

export default function AccountInfoView({ onEditAccount }) {
   return (
      <section className="flex-1 text-[#111111] bg-[#f5f5f5] min-h-screen">
         <div className="mb-6 flex items-center justify-between bg-[#EAEAEA] px-4 py-3.5 sm:px-8">
            <h2 className="text-[26px] font-bold font-sans text-[#111]">Account Info</h2>
            <button className="flex items-center gap-2 rounded-full bg-[#1b2d5d] px-6 py-2.5 text-[15px] font-medium text-white hover:bg-[#132042] transition-colors shadow-sm">
               <FiPlus size={18} />
               New Reservation
            </button>
         </div>

         <div className="px-4 pb-8 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

               {/* Passenger Info Card */}
               <div className="rounded-2xl border border-gray-200 bg-white p-6 relative">
                  <button onClick={() => onEditAccount('passenger')} className="absolute right-6 top-6 text-[#8c8c8c] hover:text-[#111] transition-colors cursor-pointer">
                     <RiEdit2Line size={20} />
                  </button>

                  <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     Passenger Info
                     <span className="rounded-full border border-[#ff4a40] px-4 py-1 text-sm font-normal text-[#ff4a40] ml-2">
                        Acc# 4411
                     </span>
                  </h3>

                  <div className="grid grid-cols-[140px_1fr] gap-y-4 text-[15px]">
                     <div className="text-[#666]">First Name:</div>
                     <div className="font-medium text-gray-400">Jayson</div>

                     <div className="text-[#666]">Last Name:</div>
                     <div className="font-medium text-gray-400">Smith</div>

                     <div className="text-[#666]">Company Name:</div>
                     <div className="font-medium text-gray-400 capitalize">ux pilot</div>

                     <div className="text-[#666]">Email Address</div>
                     <div className="font-medium text-gray-400">jaysonsmith@gmail.com</div>

                     <div className="text-[#666]">Password</div>
                     <button className="text-left text-gray-400 hover:underline font-medium">Reset Password</button>
                  </div>
               </div>

               {/* Address Info Card */}
               <div className="rounded-2xl border border-gray-200 bg-white p-6 relative">
                  <button onClick={() => onEditAccount('address')} className="absolute right-6 top-6 text-[#8c8c8c] hover:text-[#111] transition-colors cursor-pointer">
                     <RiEdit2Line size={20} />
                  </button>

                  <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     Address Info
                  </h3>

                  <div className="grid grid-cols-[140px_1fr] gap-y-4 text-[15px]">
                     <div className="text-[#666]">Address Type:</div>
                     <div className="font-medium text-gray-400">Jayson</div>

                     <div className="text-[#666]">Primary Address</div>
                     <div className="font-medium text-gray-400">Eight Mile West. Southfield, MI. USA</div>

                     <div className="text-[#666]">Apartment: /Street:</div>
                     <div className="font-medium text-gray-400">1451</div>

                     <div className="text-[#666]">City:</div>
                     <div className="font-medium text-gray-400">Southfield</div>

                     <div className="text-[#666]">State/Province:</div>
                     <div className="font-medium text-gray-400">USA</div>
                  </div>
               </div>
            </div>

            {/* Contact Info Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 relative mb-6">
               <button onClick={() => onEditAccount('contact')} className="absolute right-6 top-6 text-[#8c8c8c] hover:text-[#111] transition-colors cursor-pointer">
                  <RiEdit2Line size={20} />
               </button>

               <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Contact Info
               </h3>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                  <div>
                     <label className="text-sm text-[#8c8c8c] block mb-2">Email Address</label>
                     <div className="rounded-full bg-[#fcfcfc] border border-gray-100 px-5 py-3 text-[15px] text-[#111] font-medium shadow-sm w-full">
                        jaysonsmith@gmail.com
                     </div>
                  </div>
                  <div>
                     <label className="text-sm text-[#8c8c8c] block mb-2">Phone Number</label>
                     <div className="flex w-full items-center gap-3 rounded-full bg-[#fcfcfc] border border-gray-100 px-3 py-1 shadow-sm">
                        <div className='flex items-center gap-2 bg-gray-200 p-1 rounded-full'>
                           <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-5 object-cover rounded-full" />
                           <span className="text-[#4d4d4d] text-sm whitespace-nowrap"><FiChevronDown /></span>
                        </div>
                        <span className="text-[#4d4d4d] ml-1">+1</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Stored Cards Table Layout */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="flex items-center gap-3 text-xl font-bold">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                     Stored Cards
                  </h3>
                  <button onClick={() => onEditAccount('card')} className="text-[#111] font-semibold flex items-center hover:underline">
                     + Add New Card
                  </button>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse bg-white">
                     <thead>
                        <tr className="bg-black text-center text-[15px] text-white">
                           <th className="rounded-tl-[16px] px-5 py-4 font-semibold text-center border-r border-[#333]">Cardholder Name</th>
                           <th className="px-5 py-4 font-semibold border-r border-[#333]">Card Number</th>
                           <th className="px-5 py-4 font-semibold border-r border-[#333]">Expiry Date</th>
                           <th className="px-5 py-4 font-semibold border-r border-[#333]">Billing Information</th>
                           <th className="rounded-tr-[16px] px-5 py-4 font-semibold text-center">Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {STORED_CARDS.map((card) => (
                           <tr key={card.id} className="border-b border-gray-100 text-[15px] text-[#666] text-center last:border-0">
                              <td className="px-5 py-5 text-center text-[#111]">{card.name}</td>
                              <td className="px-5 py-5">{card.number}</td>
                              <td className="px-5 py-5">{card.expiry}</td>
                              <td className="px-5 py-5">{card.billing}</td>
                              <td className="px-5 py-5 text-center">
                                 <button onClick={() => onEditAccount('card')} className="inline-flex items-center gap-2 text-[#4d4d4d] hover:text-[#111] transition-colors">
                                    <FiEdit2 size={16} className="text-[#1b2d5d]" />
                                    <span className="italic block font-[300]">Edit</span>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

         </div>
      </section>
   );
}
