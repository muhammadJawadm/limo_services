import { FiSearch, FiEdit2, FiPlus, FiChevronDown } from 'react-icons/fi';

const PASSENGERS = [
  { id: 1, name: 'Jason smith', phone: '+ 145 125 451', priority: 'VIP', empId: '1451', route: '2' },
];

export default function PassengerView({ onEditPassenger }) {
  return (
    <section className="flex-1 text-[#111111]">
      <div className="flex flex-col gap-3 rounded-xl bg-white px-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button className="flex items-center gap-2 self-start rounded-full bg-[#1b2d5d] px-6 py-2.5 text-sm font-medium text-white sm:self-auto hover:bg-[#132042] transition">
          <FiPlus size={18} />
          Add New Passenger
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex w-[200px] cursor-pointer items-center justify-between rounded-full border border-gray-200 px-4 py-2.5 text-sm text-[#4d4d4d] bg-white">
              <span>Active Passenger</span>
              <FiChevronDown />
            </div>
            {/* 
            // Mock visualization of the dropdown the user opens
            <div className="absolute right-0 top-full mt-2 w-[220px] rounded-xl bg-white shadow-lg border border-gray-100 z-10 py-2">
              <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#4d4d4d]">All Passengers <div className="h-4 w-4 rounded-full bg-[#1b2d5d]"></div></div>
              <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#4d4d4d]">Active Passengers <div className="h-4 w-4 rounded-full border border-gray-300"></div></div>
              <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#4d4d4d]">Inactive Passengers <div className="h-4 w-4 rounded-full border border-gray-300"></div></div>
            </div>
            */}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 w-[160px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none text-sm text-[#4d4d4d] outline-none"
            />
            <FiSearch className="text-gray-400" size={18} />
          </label>
        </div>
      </div>

      <div className="px-2 pb-8 sm:px-6 mt-4">
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-100">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-black text-center text-sm text-white">
                <th className="rounded-tl-xl px-5 py-4 font-semibold text-left border-r border-[#333]">Name</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Phone</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Priority</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Employee ID</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Total Ride</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Notes</th>
                <th className="rounded-tr-xl px-5 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {PASSENGERS.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 text-sm text-[#666] text-center">
                  <td className="px-5 py-5 text-left font-medium text-[#111]">{p.name}</td>
                  <td className="px-5 py-5">{p.phone}</td>
                  <td className="px-5 py-5">{p.priority}</td>
                  <td className="px-5 py-5">{p.empId}</td>
                  <td className="px-5 py-5">{p.route}</td>
                  <td className="px-5 py-5">
                    <div className="flex justify-center">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4d4d4d]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <button
                      onClick={onEditPassenger}
                      className="inline-flex items-center gap-1.5 text-[#1b2d5d] hover:text-[#132042] font-medium"
                    >
                      <FiEdit2 size={15} />
                      <span className="text-[#4d4d4d] font-normal underline">Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
              {PASSENGERS.length === 0 && (
                 <tr>
                    <td colSpan="7" className="py-10 text-center text-gray-500">No passengers found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
