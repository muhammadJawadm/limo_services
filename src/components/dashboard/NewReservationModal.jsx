import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiTrash2, FiClock, FiMapPin, FiCalendar, FiUser, FiUsers, FiBriefcase, FiCreditCard, FiActivity } from 'react-icons/fi';
import { LuPlane } from 'react-icons/lu';
import BookingSuccessModal from './BookingSuccessModal';
import briefcaseicon from '../../assets/briefcaseblack.png';

export default function NewReservationModal({ isOpen, onClose }) {
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [tripType, setTripType] = useState('point-to-point'); // 'point-to-point' or 'hourly'
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Accordion states
  const [openSections, setOpenSections] = useState({
    tripDetails: true,
    additionalInfo: true,
    vehicleInfo: true,
    passengerInfo: true,
    cardInfo: true
  });

  // Dynamic Stops
  const [stops, setStops] = useState([{ id: 1, value: 'New York street Bay Four' }]);

  // Selected Vehicle
  const [selectedVehicle, setSelectedVehicle] = useState('Business Sedan');

  if (!isOpen) return null;

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddStop = () => {
    setStops([...stops, { id: Date.now(), value: '' }]);
  };

  const handleRemoveStop = (idToRemove) => {
    setStops(stops.filter(stop => stop.id !== idToRemove));
  };

  const handleBook = () => {
    setIsSuccessModalOpen(true);
  };

  const closeAll = () => {
    setIsSuccessModalOpen(false);
    onClose();
    setTimeout(() => {
      setIsReturnTrip(false);
      setTripType('point-to-point');
      setStops([{ id: 1, value: 'New York street Bay Four' }]);
      setSelectedVehicle('Business Sedan');
    }, 300);
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-0 sm:p-4 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative flex h-full sm:h-[90vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-none sm:rounded-[30px] bg-[#fafafa] shadow-2xl animate-in fade-in zoom-in duration-200">

          {/* Sticky Mobile Header / Close button inside modal on mobile optional, but handled mostly via bottom Back button */}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center justify-between sm:hidden mb-4 px-2">
                <h2 className="text-xl font-bold text-[#111]">New Reservation</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
              
              {/* Left Column */}
              <div className="space-y-5 lg:space-y-6">
                
                {/* Trip Details Section */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <button
                    onClick={() => toggleSection('tripDetails')}
                    className="flex w-full items-center justify-between bg-[#111] px-4 sm:px-5 py-3.5 text-white transition-colors hover:bg-black"
                  >
                    <h3 className="font-semibold text-base sm:text-lg tracking-wide">Trip Details</h3>
                    {openSections.tripDetails ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                  </button>
                  {openSections.tripDetails && (
                    <div className="p-4 sm:p-5 bg-gray-50/50">
                      <div className="mb-5 sm:mb-6 flex overflow-hidden rounded-xl border border-[#1b2d5d] bg-white text-[#111] shadow-sm">
                        <button
                          onClick={() => setTripType('point-to-point')}
                          className={`flex-1 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium transition-colors ${tripType === 'point-to-point' ? 'bg-[#1b2d5d] text-white' : 'hover:bg-gray-50'}`}
                        >
                          Point-to-Point
                        </button>
                        <button
                          onClick={() => setTripType('hourly')}
                          className={`flex-1 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium transition-colors ${tripType === 'hourly' ? 'bg-[#1b2d5d] text-white' : 'hover:bg-gray-50'}`}
                        >
                          Hourly
                        </button>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        {/* Pickup */}
                        <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                          <FiMapPin className="text-[#20c997] shrink-0" size={18} />
                          <input type="text" placeholder="Pickup Location" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                        </div>

                        {/* Dynamic Stops */}
                        {stops.map((stop, index) => (
                          <div key={stop.id} className="flex items-center gap-2 sm:gap-3">
                            <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                              <FiMapPin className="text-yellow-500 shrink-0" size={18} />
                              <input
                                type="text"
                                placeholder="Stop location"
                                defaultValue={stop.value}
                                className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]"
                              />
                            </div>

                            <button onClick={() => handleRemoveStop(stop.id)} className="flex shrink-0 items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#ff4a40]/10 text-[#ff4a40] transition-colors hover:bg-[#ff4a40]/20">
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        ))}

                        {/* Active Stop Input */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                            <FiMapPin className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="Stop location" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                          <button onClick={handleAddStop} className="flex shrink-0 items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#fdb022] text-white shadow-md transition-all hover:bg-[#eaa017] hover:shadow-lg active:scale-95">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                        </div>
                        <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-dashed border-gray-300 px-4 py-1 bg-white hover:bg-gray-50 transition-colors">
                          <button onClick={handleAddStop} className="w-full flex justify-center items-center py-2 sm:py-1.5 text-[#8c8c8c] text-[13px] sm:text-sm font-medium hover:text-[#1b2d5d] transition-colors">
                            + Add Stop
                          </button>
                        </div>

                        {tripType === 'hourly' ? (
                          <>
                            <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                              <FiMapPin className="text-[#ff4a40] shrink-0" size={18} />
                              <input type="text" placeholder="Drop-off Location" className="ml-3 w-[calc(100%-120px)] sm:w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                              <button className="absolute right-2 rounded-full bg-[#1b2d5d] px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs text-white hover:bg-[#132042] transition-colors whitespace-nowrap">Same as pickup</button>
                            </div>
                            <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                              <FiClock className="text-gray-400 shrink-0" size={18} />
                              <input type="text" placeholder="Duration" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                            </div>
                          </>
                        ) : (
                          <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                            <FiMapPin className="text-[#ff4a40] shrink-0" size={18} />
                            <input type="text" placeholder="Drop-off Location" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                        )}

                        {/* Date / Time */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                            <FiCalendar className="text-[#8c8c8c] shrink-0 sm:hidden mr-2" size={18} />
                            <input type="date" className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c] appearance-none" />
                          </div>
                          <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                            <FiClock className="text-[#8c8c8c] shrink-0 sm:hidden mr-2" size={18} />
                            <input type="time" className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c] appearance-none" />
                          </div>
                        </div>

                        {/* Passengers / Luggage */}
                        <div className="flex flex-row gap-3 sm:gap-4">
                          <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                            <FiUsers className="text-gray-400 shrink-0" size={18} />
                            <input type="number" min="1" placeholder="3" className="ml-2 sm:ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                          <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                            <FiBriefcase className="text-gray-400 shrink-0" size={18} />
                            <input type="number" min="0" placeholder="2" className="ml-2 sm:ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Information Section */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <button
                    onClick={() => toggleSection('additionalInfo')}
                    className="flex w-full items-center justify-between bg-[#111] px-4 sm:px-5 py-3.5 text-white transition-colors hover:bg-black"
                  >
                    <h3 className="font-semibold text-base sm:text-lg tracking-wide">Additional Information</h3>
                    {openSections.additionalInfo ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                  </button>
                  {openSections.additionalInfo && (
                    <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gray-50/50">
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                        <LuPlane className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Airline Name or Code" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                        <input type="text" placeholder="Flight Number" className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
                        <input type="text" placeholder="Pickup Details (e.g. Curbside)" className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="flex w-full items-center gap-2 rounded-xl sm:rounded-full border border-gray-200 p-1.5 sm:p-1 bg-white focus-within:border-[#1b2d5d] shadow-sm">
                        <div className='flex items-center gap-1.5 bg-gray-100 px-2 sm:px-3 py-1.5 rounded-[10px] sm:rounded-full cursor-pointer hover:bg-gray-200 transition-colors shrink-0'>
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-[18px] sm:w-5 h-[18px] sm:h-5 object-cover rounded-full shadow-sm" />
                          <FiChevronDown className="text-[#4d4d4d] w-4 mt-[1px]" />
                        </div>
                        <span className="text-[#222] text-[14px] sm:text-[15px] font-medium pl-1">+1</span>
                        <input type="tel" placeholder="Phone Number" className="flex-1 min-w-0 bg-transparent border-none text-[14px] sm:text-[15px] text-[#222] outline-none px-2 py-1.5" />
                      </div>

                      <div className="flex items-center justify-start gap-3 px-2 py-1 pt-2 sm:pt-1 cursor-pointer group">
                        <div className="h-5 w-5 rounded-md sm:rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-[#1b2d5d] transition-colors bg-white"></div>
                        <span className="text-[14px] sm:text-[15px] text-[#666] group-hover:text-[#111] transition-colors font-medium">I don't have flight details yet</span>
                      </div>

                      {/* Child Seats */}
                      <div className="pt-3 sm:pt-4 border-t border-gray-200/60 mt-2">
                        <label className="block text-[14px] sm:text-[15px] font-semibold text-[#111] mb-2 sm:mb-3">Child Seats:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                          <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 bg-white shadow-sm hover:border-[#1b2d5d] transition-colors overflow-hidden">
                            <select className="w-full bg-transparent outline-none text-[#444] text-[13px] sm:text-[14px] appearance-none cursor-pointer py-2.5 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-xl sm:rounded-full h-full font-medium">
                              <option>0 Infant</option>
                              <option>1 Infant</option>
                              <option>2 Infant</option>
                            </select>
                            <FiChevronDown className="absolute right-3 sm:right-4 text-gray-500 pointer-events-none" />
                          </div>
                          <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 bg-white shadow-sm hover:border-[#1b2d5d] transition-colors overflow-hidden">
                            <select className="w-full bg-transparent outline-none text-[#444] text-[13px] sm:text-[14px] appearance-none cursor-pointer py-2.5 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-xl sm:rounded-full h-full font-medium">
                              <option>0 Toddler</option>
                              <option>1 Toddler</option>
                              <option>2 Toddler</option>
                              <option>3 Toddler</option>
                            </select>
                            <FiChevronDown className="absolute right-3 sm:right-4 text-gray-500 pointer-events-none" />
                          </div>
                          <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 bg-white shadow-sm hover:border-[#1b2d5d] transition-colors overflow-hidden col-span-2 sm:col-span-1">
                            <select className="w-full bg-transparent outline-none text-[#444] text-[13px] sm:text-[14px] appearance-none cursor-pointer py-2.5 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-xl sm:rounded-full h-full font-medium">
                              <option>0 Booster</option>
                              <option>1 Booster</option>
                              <option>2 Booster</option>
                            </select>
                            <FiChevronDown className="absolute right-3 sm:right-4 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5 lg:space-y-6">
                
                {/* Vehicle Information Section */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <button
                    onClick={() => toggleSection('vehicleInfo')}
                    className="flex w-full items-center justify-between bg-[#111] px-4 sm:px-5 py-3.5 text-white transition-colors hover:bg-black"
                  >
                    <h3 className="font-semibold text-base sm:text-lg tracking-wide">Vehicle Information</h3>
                    {openSections.vehicleInfo ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                  </button>
                  {openSections.vehicleInfo && (
                    <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 bg-gray-50/50">
                      {['Business Sedan', 'Premium Sedan', 'Luxury SUV', 'Premium SUV'].map((type, i) => (
                        <div
                          key={type}
                          onClick={() => setSelectedVehicle(type)}
                          className={`flex items-center justify-between rounded-xl sm:rounded-full border px-4 sm:px-5 py-3 sm:py-3.5 bg-white cursor-pointer shadow-sm transition-all focus:outline-none ${selectedVehicle === type ? 'border-[#1b2d5d] ring-1 ring-[#1b2d5d]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'}`}
                        >
                          <span className={`text-[14px] sm:text-[15px] font-medium transition-colors ${selectedVehicle === type ? 'text-[#111]' : 'text-[#666]'}`}>{type}</span>
                          <div className={`flex items-center gap-3 sm:gap-4 text-[13px] sm:text-[15px] transition-colors ${selectedVehicle === type ? 'text-[#222]' : 'text-[#8c8c8c]'}`}>
                            <span className="flex items-center gap-1.5 font-medium"><FiUsers size={16} className={selectedVehicle === type ? 'text-[#1b2d5d]' : 'text-[#8c8c8c]'} /> {i > 1 ? '6' : '3'}</span>
                            <span className="flex items-center gap-1.5 font-medium"><img src={briefcaseicon} className={`w-[14px] sm:w-[16px] object-contain ${selectedVehicle === type ? 'opacity-100' : 'opacity-60'}`} alt="briefcase" /> {i > 1 ? '4' : '3'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Passenger Information Section */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <button
                    onClick={() => toggleSection('passengerInfo')}
                    className="flex w-full items-center justify-between bg-[#111] px-4 sm:px-5 py-3.5 text-white transition-colors hover:bg-black"
                  >
                    <h3 className="font-semibold text-base sm:text-lg tracking-wide">Passenger Information</h3>
                    {openSections.passengerInfo ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                  </button>
                  {openSections.passengerInfo && (
                    <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gray-50/50">
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                        <FiUser className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="First Name" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                        <FiUser className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Last Name" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <input type="email" defaultValue="jaysonsmith@gmail.com" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] font-medium outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="flex w-full items-center gap-2 rounded-xl sm:rounded-full border border-gray-200 p-1.5 sm:p-1 bg-white focus-within:border-[#1b2d5d] shadow-sm transition-colors">
                        <div className='flex items-center gap-1.5 bg-gray-100 px-2 sm:px-3 py-1.5 rounded-[10px] sm:rounded-full cursor-pointer hover:bg-gray-200 transition-colors shrink-0'>
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-[18px] sm:w-5 h-[18px] sm:h-5 object-cover rounded-full shadow-sm" />
                          <FiChevronDown className="text-[#4d4d4d] w-4 mt-[1px]" />
                        </div>
                        <span className="text-[#222] text-[14px] sm:text-[15px] font-medium pl-1">+1</span>
                        <input type="tel" placeholder="(145) 125 451" className="flex-1 min-w-0 bg-transparent border-none text-[14px] sm:text-[15px] text-[#222] outline-none px-2 py-1.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Information Section */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <button
                    onClick={() => toggleSection('cardInfo')}
                    className="flex w-full items-center justify-between bg-[#111] px-4 sm:px-5 py-3.5 text-white transition-colors hover:bg-black"
                  >
                    <h3 className="font-semibold text-base sm:text-lg tracking-wide">Card Information</h3>
                    {openSections.cardInfo ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                  </button>
                  {openSections.cardInfo && (
                    <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gray-50/50">
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                        <FiUser className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Card Holder Name" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                        <FiCreditCard className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Card Number" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="flex flex-row gap-3 sm:gap-4">
                        <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                          <FiCalendar className="text-gray-400 shrink-0" size={16} />
                          <input type="text" placeholder="MM/YY Expiry" className="ml-2 sm:ml-3 w-full bg-transparent text-[13px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                        </div>
                        <div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                          <FiCreditCard className="text-gray-400 shrink-0" size={16} />
                          <input type="password" placeholder="CVC" maxLength="4" className="ml-2 sm:ml-3 w-full bg-transparent text-[13px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                        </div>
                      </div>
                      <div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
                        <FiMapPin className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Billing Address" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between rounded-xl sm:rounded-full sm:border sm:border-gray-200 bg-white sm:shadow-sm focus-within:border-[#1b2d5d] transition-colors overflow-visible w-full">
                        <div className="flex items-center w-full relative sm:h-full border border-gray-200 rounded-xl sm:border-0 sm:rounded-full">
                          <FiActivity className="absolute left-3 sm:left-4 text-[#8c8c8c] pointer-events-none" size={18} />
                          <select className="w-full bg-transparent outline-none text-[#555] font-medium text-[14px] sm:text-[15px] appearance-none cursor-pointer py-3 lg:py-3.5 pl-10 pr-10 rounded-xl sm:rounded-full h-full focus:bg-gray-50/50">
                            <option value="" defaultValue disabled hidden>Card Status:</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                          <FiChevronDown className="absolute right-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Section - Optional or Full Width */}
            <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus-within:border-[#1b2d5d] transition-colors">
              <label className="block text-[14px] sm:text-[15px] font-semibold text-[#111] mb-2 px-1">Special Instructions:</label>
              <textarea
                className="h-[80px] sm:h-[100px] w-full resize-none bg-transparent text-[14px] sm:text-[15px] text-[#222] p-2 outline-none placeholder:text-[#8c8c8c]"
                placeholder="Specific Priority for this passenger Notes..."
              />
            </div>

          </div>

          {/* Footer Bar */}
          <div className="border-t border-gray-200 bg-white p-4 sm:px-6 sm:py-5 lg:px-8 z-10 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center xl:gap-6">
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setIsReturnTrip(!isReturnTrip)}
                  >
                    <div className="flex h-6 w-6 sm:h-[26px] sm:w-[26px] items-center justify-center rounded-full border-[1.5px] border-gray-400 group-hover:border-[#111] transition-colors overflow-hidden p-0.5 sm:p-[3px] bg-white">
                      {isReturnTrip && <div className="h-full w-full bg-[#1b2d5d] rounded-full"></div>}
                    </div>
                    <span className="text-[16px] sm:text-[20px] font-semibold text-[#111] whitespace-nowrap">Return Trip</span>
                  </div>
                  
                  {/* Price shown on top line right side on mobile, but next to switch on desktop */}
                  <div className="text-[26px] sm:text-[32px] font-bold text-[#1b2d5d] sm:text-[#111] sm:hidden">$450.00</div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-y-3 lg:gap-x-6 sm:ml-6 xl:ml-0">
                  <span className="text-[26px] sm:text-[32px] font-bold text-[#111] hidden sm:block">$450.00</span>
                  
                  {isReturnTrip && (
                    <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-4 text-[#666] text-[14px] sm:text-[15px] font-medium lg:border-l lg:pl-6 border-gray-300">
                      <span className="flex items-center gap-2.5">
                        <div className="bg-blue-50/80 text-[#1b2d5d] p-1.5 rounded-md border border-[#1b2d5d]/10">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div> 
                        <span className="text-[#333]">Pickup:</span> 
                        <span className="font-semibold text-[#111]">$450.00</span>
                      </span>
                      <span className="flex items-center gap-2.5">
                        <div className="bg-blue-50/80 text-[#1b2d5d] p-1.5 rounded-md border border-[#1b2d5d]/10">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 8 9 12 5"></polyline><polyline points="12 19 8 15 12 19"></polyline><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div> 
                        <span className="text-[#333]">Return:</span> 
                        <span className="font-semibold text-[#111]">$450.00</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 w-full sm:w-[350px] lg:w-[400px]">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-full border border-gray-300 bg-white py-3 sm:py-3.5 text-[15px] font-semibold text-[#444] shadow-sm transition-all hover:bg-gray-50 hover:text-black active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBook}
                  className="flex-[1.5] rounded-full bg-[#1b2d5d] py-3 sm:py-3.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#132042] hover:shadow-lg active:scale-[0.98]"
                >
                  Confirm Book
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeAll}
      />
    </>
  );
}
