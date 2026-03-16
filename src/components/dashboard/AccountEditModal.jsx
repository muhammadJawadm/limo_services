export default function AccountEditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[650px] rounded-[30px] bg-white p-8 text-[#111111] shadow-2xl relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {/* Column 1 */}
          <div className="space-y-4">
             <div>
               <label className="mb-2 block text-sm text-[#666]">First Name:</label>
               <input
                 type="text"
                 defaultValue="Jayson"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Company Name</label>
               <input
                 type="text"
                 defaultValue="ux pilot"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Password</label>
               <input
                 type="password"
                 defaultValue="secret"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
             <div>
               <label className="mb-2 block text-sm text-[#666]">Last Name</label>
               <input
                 type="text"
                 defaultValue="Smith"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">Email Address</label>
               <input
                 type="email"
                 defaultValue="jays@gmail.com"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
             <div>
               <label className="mb-2 block text-sm text-[#666]">State/Province</label>
               <input
                 type="text"
                 defaultValue="USA"
                 className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
               />
             </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center gap-4 px-2">
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
            Updated
          </button>
        </div>
      </div>
    </div>
  );
}
