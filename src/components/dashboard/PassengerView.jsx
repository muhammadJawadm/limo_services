import { FiSearch, FiEdit2, FiPlus, FiChevronDown } from 'react-icons/fi';
import { CiEdit } from "react-icons/ci";
import { useState, useRef, useEffect } from 'react';

const PASSENGERS = [
  { id: 1, name: 'Jason smith', phone: '+ 145 125 451', priority: 'VIP', empId: '1451', route: '2' },
];

export default function PassengerView({ onEditPassenger }) {
  const [filterType, setFilterType] = useState('All Passengers');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="flex-1 text-[#111111] bg-transparent min-h-screen">
      {/* Header Row */}
      <div className="mb-4 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-[#EAEAEA] px-4 py-4 sm:px-6 lg:px-8 rounded-none sm:rounded-tl-lg sm:rounded-tr-lg">
        <h2 className="text-2xl sm:text-[26px] lg:text-[32px] font-semibold text-[#111]">Passenger</h2>
        <button className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-[#1b2d5d] px-6 py-3 text-[15px] sm:text-[16px] font-medium text-white hover:bg-[#132042] transition-colors shadow-sm">
          <FiPlus size={20} />
          New Reservation
        </button>
      </div>

      <div className="px-0 sm:px-4 lg:px-6">
        {/* Filter Row */}
        <div className="mb-4 flex flex-col sm:flex-row items-center sm:justify-end gap-3 w-full">
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full sm:w-[200px] cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] text-[#4d4d4d] shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-colors hover:border-[#1b2d5d]"
            >
              <span className="truncate mr-2">{filterType}</span>
              <FiChevronDown className={`flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 left-0 sm:left-auto top-full mt-2 w-full sm:w-[220px] rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 z-10 py-2">
                <div
                  onClick={() => { setFilterType('All Passengers'); setIsDropdownOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[#4d4d4d] text-[14px] sm:text-[15px]"
                >
                  All Passengers
                  <div className={`h-[18px] w-[18px] flex-shrink-0 rounded-full border-2 transition-colors ${filterType === 'All Passengers' ? 'bg-[#1b2d5d] border-[#1b2d5d]' : 'border-gray-400 bg-transparent'}`}></div>
                </div>
                <div
                  onClick={() => { setFilterType('Active Passengers'); setIsDropdownOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[#4d4d4d] text-[14px] sm:text-[15px]"
                >
                  Active Passengers
                  <div className={`h-[18px] w-[18px] flex-shrink-0 rounded-full border-2 transition-colors ${filterType === 'Active Passengers' ? 'bg-[#1b2d5d] border-[#1b2d5d]' : 'border-gray-400 bg-transparent'}`}></div>
                </div>
                <div
                  onClick={() => { setFilterType('Inactive Passengers'); setIsDropdownOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[#4d4d4d] text-[14px] sm:text-[15px]"
                >
                  Inactive Passengers
                  <div className={`h-[18px] w-[18px] flex-shrink-0 rounded-full border-2 transition-colors ${filterType === 'Inactive Passengers' ? 'bg-[#1b2d5d] border-[#1b2d5d]' : 'border-gray-400 bg-transparent'}`}></div>
                </div>
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 sm:py-3 w-full sm:w-[200px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] focus-within:border-[#1b2d5d] transition-colors">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none text-[14px] sm:text-[15px] text-gray-700 outline-none bg-transparent placeholder-gray-400"
            />
            <FiSearch className="text-gray-400 flex-shrink-0" size={18} />
          </label>
        </div>

        {/* Table Block */}
        <div className="pb-8">
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
            <table className="w-full min-w-[900px] border-collapse bg-white">
              <thead>
                <tr className="bg-[#111] text-center text-xs sm:text-[15px] text-white">
                  <th className="rounded-tl-xl px-4 lg:px-5 py-4 font-medium text-left border-r border-[#333] whitespace-nowrap">Name</th>
                  <th className="px-4 lg:px-5 py-4 font-medium border-r border-[#333] whitespace-nowrap">Phone</th>
                  <th className="px-4 lg:px-5 py-4 font-medium border-r border-[#333] whitespace-nowrap">Priority</th>
                  <th className="px-4 lg:px-5 py-4 font-medium border-r border-[#333] whitespace-nowrap">Employee ID</th>
                  <th className="px-4 lg:px-5 py-4 font-medium border-r border-[#333] whitespace-nowrap">Total Ride</th>
                  <th className="px-4 lg:px-5 py-4 font-medium border-r border-[#333] whitespace-nowrap">Notes</th>
                  <th className="rounded-tr-xl px-4 lg:px-5 py-4 font-medium text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody>
                {PASSENGERS.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 last:border-0 text-xs sm:text-[14px] text-gray-600 text-center hover:bg-gray-50 transition-colors">
                    <td className="px-4 lg:px-5 py-4 sm:py-5 text-left font-medium text-[#111] whitespace-nowrap">{p.name}</td>
                    <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap">{p.phone}</td>
                    <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap">{p.priority}</td>
                    <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap">{p.empId}</td>
                    <td className="px-4 lg:px-5 py-4 sm:py-5 whitespace-nowrap">{p.route}</td>
                    <td className="px-4 lg:px-5 py-4 sm:py-5">
                      <div className="flex justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4d4d4d] sm:w-[20px] sm:h-[20px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-4 sm:py-5 text-center">
                      <button
                        onClick={onEditPassenger}
                        className="group relative inline-flex items-center gap-1.5 text-[#1b2d5d] hover:text-[#132042] font-medium transition-colors"
                      >
                        <CiEdit size={18} className="sm:text-[20px]" />
                        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                          Edit
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
                {PASSENGERS.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-gray-500 text-sm">No passengers found.</td>
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
