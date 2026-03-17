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
    <section className="flex-1 text-[#111111] bg-[#f5f5f5] min-h-screen">
      {/* Header Row */}
      <div className="mb-6 flex items-center justify-between bg-[#EAEAEA] px-4 py-3.5 sm:px-8">
        <h2 className="text-[26px] font-bold font-sans text-[#111]">Passenger</h2>
        <button className="flex items-center gap-2 rounded-full bg-[#1b2d5d] px-6 py-2.5 text-[15px] font-medium text-white hover:bg-[#132042] transition-colors shadow-sm">
          <FiPlus size={18} />
          New Reservation
        </button>
      </div>

      <div className="px-4 sm:px-8">
      {/* Filter Row */}
      <div className="mb-4 flex items-center justify-end gap-3">
        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-[200px] cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px] text-[#4d4d4d] shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-colors hover:border-[#1b2d5d]"
            >
              <span>{filterType}</span>
              <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-[220px] rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 z-10 py-2">
                <div
                  onClick={() => { setFilterType('All Passengers'); setIsDropdownOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[#4d4d4d] text-[15px]"
                >
                  All Passengers
                  <div className={`h-[18px] w-[18px] rounded-full border-2 ${filterType === 'All Passengers' ? 'bg-[#1b2d5d] border-[#1b2d5d]' : 'border-gray-400 bg-transparent'}`}></div>
                </div>
                <div
                  onClick={() => { setFilterType('Active Passengers'); setIsDropdownOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[#4d4d4d] text-[15px]"
                >
                  Active Passengers
                  <div className={`h-[18px] w-[18px] rounded-full border-2 ${filterType === 'Active Passengers' ? 'bg-[#1b2d5d] border-[#1b2d5d]' : 'border-gray-400 bg-transparent'}`}></div>
                </div>
                <div
                  onClick={() => { setFilterType('Inactive Passengers'); setIsDropdownOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-[#4d4d4d] text-[15px]"
                >
                  Inactive Passengers
                  <div className={`h-[18px] w-[18px] rounded-full border-2 ${filterType === 'Inactive Passengers' ? 'bg-[#1b2d5d] border-[#1b2d5d]' : 'border-gray-400 bg-transparent'}`}></div>
                </div>
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 w-[200px] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none text-[15px] text-[#4d4d4d] outline-none"
            />
            <FiSearch className="text-gray-400" size={18} />
          </label>
        </div>
      </div>

      <div className="pb-8">
        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="w-full min-w-[900px] border-collapse bg-white">
            <thead>
              <tr className="bg-black text-center text-sm text-white">
                <th className="rounded-tl-xl px-5 py-4 font-semibold text-left border-r border-[#333]">Name</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Phone</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Priority</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Employee ID</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Total Ride</th>
                <th className="px-5 py-4 font-semibold border-r border-[#333]">Notes</th>
                <th className="rounded-tr-xl px-5 py-4 font-semibold text-center">Action</th>
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
                  <td className="px-5 py-5 text-center">
                    <button
                      onClick={onEditPassenger}
                      className="inline-flex items-center gap-1.5 text-[#1b2d5d] hover:text-[#132042] font-medium"
                    >
                      <CiEdit size={20} />
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
      </div>
    </section>
  );
}
