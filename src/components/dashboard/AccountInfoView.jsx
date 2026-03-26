import { FiEdit2, FiPlus, FiChevronDown } from 'react-icons/fi';
import { RiEdit2Line } from "react-icons/ri";

const STORED_CARDS = [
   { id: 1, name: 'Jason smith', number: 'CC**7458', expiry: '1451', billing: 'Usaquen. Bogota, Colombia' },
];

export default function AccountInfoView({ onEditAccount }) {
   return (
      <section className="flex-1 text-[#111111] bg-transparent min-h-screen">
         
         {/* Header Row */}
         <div className="mb-4 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-[#EAEAEA] px-4 py-4 sm:px-6 lg:px-8 rounded-none sm:rounded-tl-lg sm:rounded-tr-lg">
            <h2 className="text-2xl sm:text-[26px] lg:text-[32px] font-semibold text-[#111]">Account Info</h2>
            <button className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-[#1b2d5d] px-6 py-3 text-[15px] sm:text-[16px] font-medium text-white hover:bg-[#132042] transition-colors shadow-sm">
               <FiPlus size={20} />
               New Reservation
            </button>
         </div>

         <div className="px-0 sm:px-4 lg:px-6 pb-8 w-full overflow-hidden">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 px-1 sm:px-0 w-full">

               {/* Passenger Info Card */}
               <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 relative shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md">
                  <button onClick={() => onEditAccount('passenger')} className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[#8c8c8c] hover:text-[#1b2d5d] transition-colors cursor-pointer p-1">
                     <RiEdit2Line size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>

                  <h3 className="mb-5 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold pr-8">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[24px] sm:h-[24px] text-[#222]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     <span className="text-[#111]">Passenger Info</span>
                     <span className="rounded-full border border-[#ff4a40] px-3 py-0.5 sm:px-4 sm:py-1 text-[11px] sm:text-[13px] font-medium text-[#ff4a40] mt-1 sm:mt-0 ml-0 sm:ml-2 whitespace-nowrap bg-red-50">
                        Acc# 4411
                     </span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] md:grid-cols-[150px_1fr] gap-y-3 sm:gap-y-4 text-sm sm:text-[15px]">
                     <div className="text-[#666] hidden sm:block">First Name:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">First Name</div>
                     <div className="font-medium text-gray-700">Jayson</div>

                     <div className="text-[#666] hidden sm:block">Last Name:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Last Name</div>
                     <div className="font-medium text-gray-700">Smith</div>

                     <div className="text-[#666] hidden sm:block">Company Name:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Company Name</div>
                     <div className="font-medium text-gray-700 capitalize">ux pilot</div>

                     <div className="text-[#666] hidden sm:block">Email Address:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Email Address</div>
                     <div className="font-medium text-gray-700 break-all w-full truncate sm:whitespace-normal" title="jaysonsmith@gmail.com">jaysonsmith@gmail.com</div>

                     <div className="text-[#666] hidden sm:block mt-1">Password:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Password</div>
                     <button className="text-left text-[#1b2d5d] hover:text-[#132042] font-semibold transition-colors w-fit sm:mt-1 hover:underline">Reset Password</button>
                  </div>
               </div>

               {/* Address Info Card */}
               <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 relative shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md">
                  <button onClick={() => onEditAccount('address')} className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[#8c8c8c] hover:text-[#1b2d5d] transition-colors cursor-pointer p-1">
                     <RiEdit2Line size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>

                  <h3 className="mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold pr-8">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[24px] sm:h-[24px] text-[#222]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     <span className="text-[#111]">Address Info</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] md:grid-cols-[150px_1fr] gap-y-3 sm:gap-y-4 text-sm sm:text-[15px]">
                     <div className="text-[#666] hidden sm:block">Address Type:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Address Type</div>
                     <div className="font-medium text-gray-700">Jayson</div>

                     <div className="text-[#666] hidden sm:block">Primary Address:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Primary Address</div>
                     <div className="font-medium text-gray-700 w-full break-words">Eight Mile West. Southfield, MI. USA</div>

                     <div className="text-[#666] hidden sm:block w-full break-words">Apt/Street:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">Apt/Street</div>
                     <div className="font-medium text-gray-700">1451</div>

                     <div className="text-[#666] hidden sm:block">City:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">City</div>
                     <div className="font-medium text-gray-700">Southfield</div>

                     <div className="text-[#666] hidden sm:block">State/Province:</div>
                     <div className="text-[#666] sm:hidden text-xs font-semibold uppercase tracking-wider mt-2 border-b border-gray-100 pb-1">State/Province</div>
                     <div className="font-medium text-gray-700">USA</div>
                  </div>
               </div>
            </div>

            {/* Contact Info Card */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 relative mb-4 xl:mb-6 mx-1 sm:mx-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)] w-full block transition-shadow hover:shadow-md">
               <button onClick={() => onEditAccount('contact')} className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[#8c8c8c] hover:text-[#1b2d5d] transition-colors cursor-pointer p-1">
                  <RiEdit2Line size={20} className="sm:w-[22px] sm:h-[22px]" />
               </button>

               <h3 className="mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold pr-8">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[24px] sm:h-[24px] text-[#222]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span className="text-[#111]">Contact Info</span>
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-5">
                  <div>
                     <label className="text-xs sm:text-sm text-[#666] block mb-2 font-medium">Email Address</label>
                     <div className="rounded-xl sm:rounded-full bg-[#fdfdfd] border border-gray-200 px-4 sm:px-5 py-3 text-sm sm:text-[15px] text-[#222] font-medium shadow-[0_2px_4px_rgba(0,0,0,0.01)] w-full break-all">
                        jaysonsmith@gmail.com
                     </div>
                  </div>
                  <div>
                     <label className="text-xs sm:text-sm text-[#666] block mb-2 font-medium">Phone Number</label>
                     <div className="flex w-full items-center gap-3 rounded-xl sm:rounded-full bg-[#fdfdfd] border border-gray-200 px-3 py-2 sm:py-2.5 shadow-[0_2px_4px_rgba(0,0,0,0.01)] focus-within:border-gray-300 transition-colors">
                        <div className='flex items-center gap-2 bg-gray-100 p-[5px] sm:p-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors'>
                           <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-[18px] h-[18px] sm:w-5 sm:h-5 object-cover rounded-full shadow-sm" />
                           <span className="text-[#4d4d4d] text-sm whitespace-nowrap"><FiChevronDown /></span>
                        </div>
                        <span className="text-[#222] font-medium flex-1 text-sm sm:text-[15px] pl-1 tracking-wide">+1 (145) 125-451</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Stored Cards Table Layout */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mx-1 sm:mx-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
                  <h3 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[24px] sm:h-[24px] text-[#222]"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                     <span className="text-[#111]">Stored Cards</span>
                  </h3>
                  <button onClick={() => onEditAccount('card')} className="w-full sm:w-auto text-center text-[#1b2d5d] sm:text-[#111] font-semibold flex items-center justify-center gap-2 hover:underline bg-blue-50/50 hover:bg-blue-50 sm:hover:bg-transparent sm:bg-transparent rounded-full sm:rounded-none py-2.5 sm:py-0 transition-colors text-sm sm:text-[15px]">
                     + Add New Card
                  </button>
               </div>

               <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full min-w-[700px] border-collapse bg-white">
                     <thead>
                        <tr className="bg-[#111] text-center text-xs sm:text-[15px] text-white">
                           <th className="rounded-tl-xl px-4 lg:px-5 py-3.5 sm:py-4 font-medium text-center border-r border-[#333] whitespace-nowrap">Cardholder Name</th>
                           <th className="px-4 lg:px-5 py-3.5 sm:py-4 font-medium border-r border-[#333] whitespace-nowrap">Card Number</th>
                           <th className="px-4 lg:px-5 py-3.5 sm:py-4 font-medium border-r border-[#333] whitespace-nowrap">Expiry Date</th>
                           <th className="px-4 lg:px-5 py-3.5 sm:py-4 font-medium border-r border-[#333] whitespace-nowrap">Billing Information</th>
                           <th className="rounded-tr-xl px-4 lg:px-5 py-3.5 sm:py-4 font-medium text-center whitespace-nowrap">Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {STORED_CARDS.map((card) => (
                           <tr key={card.id} className="border-b border-gray-100 text-xs sm:text-[14px] text-gray-500 text-center last:border-0 hover:bg-gray-50 transition-colors">
                              <td className="px-4 lg:px-5 py-4 sm:py-5 text-center text-[#111] font-medium whitespace-nowrap">{card.name}</td>
                              <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap">{card.number}</td>
                              <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap">{card.expiry}</td>
                              <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap text-gray-400">{card.billing}</td>
                              <td className="px-4 lg:px-5 py-4 sm:py-5 text-center">
                                 <button onClick={() => onEditAccount('card')} className="inline-flex items-center justify-center gap-1.5 text-[#4d4d4d] hover:text-[#111] transition-colors group">
                                    <FiEdit2 size={16} className="text-[#1b2d5d] group-hover:text-[#111] transition-colors" />
                                    <span className="italic block font-medium underline">Edit</span>
                                 </button>
                              </td>
                           </tr>
                        ))}
                        {STORED_CARDS.length === 0 && (
                           <tr>
                              <td colSpan="5" className="py-8 text-center text-gray-400 text-sm">No cards stored yet.</td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

         </div>
      </section>
   );
}
