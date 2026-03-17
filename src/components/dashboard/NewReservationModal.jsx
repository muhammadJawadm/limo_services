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
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative flex h-full max-h-[90vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-[30px] bg-[#fafafa] shadow-2xl">

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">

              {/* Left Column */}
              <div className="space-y-6">
                {/* Trip Details Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    onClick={() => toggleSection('tripDetails')}
                    className="flex w-full items-center justify-between bg-black px-5 py-3.5 text-white"
                  >
                    <h3 className="font-semibold text-lg">Trip Details</h3>
                    {openSections.tripDetails ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openSections.tripDetails && (
                    <div className="p-5 bg-gray-50">
                      <div className="mb-6 flex overflow-hidden rounded-xl border border-[#1b2d5d] bg-white text-[#111]">
                        <button
                          onClick={() => setTripType('point-to-point')}
                          className={`flex-1 py-3 text-[15px] font-medium transition-colors ${tripType === 'point-to-point' ? 'bg-[#1b2d5d] text-white' : 'hover:bg-gray-50'}`}
                        >
                          Point -to-Point
                        </button>
                        <button
                          onClick={() => setTripType('hourly')}
                          className={`flex-1 py-3 text-[15px] font-medium transition-colors ${tripType === 'hourly' ? 'bg-[#1b2d5d] text-white' : 'hover:bg-gray-50'}`}
                        >
                          Hourly
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Pickup */}
                        <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                          <FiMapPin className="text-[#20c997] shrink-0" size={18} />
                          <input type="text" placeholder="Pickup Location" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                        </div>

                        {/* Dynamic Stops */}
                        {stops.map((stop, index) => (
                          <div key={stop.id} className="flex items-center gap-3">
                            <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                              <FiMapPin className="text-yellow-500 shrink-0" size={18} />
                              <input
                                type="text"
                                placeholder="Stop location"
                                defaultValue={stop.value}
                                className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]"
                              />
                            </div>

                            <button onClick={() => handleRemoveStop(stop.id)} className="flex shrink-0 items-center justify-center h-12 w-12 rounded-full bg-[#ff4a40]/10 text-[#ff4a40] transition-colors hover:bg-[#ff4a40]/20">
                              <FiTrash2 size={18} />
                            </button>

                          </div>
                        ))}

                        {/* Active Stop Input (always shows after the last stop, or is the last stop) */}
                        <div className="flex items-center gap-3">
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiMapPin className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="Stop location" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                          <div className=" shrink-0"></div> {/* Spacer to align with buttons above */}
                          <button onClick={handleAddStop} className="flex shrink-0 items-center justify-center h-12 w-12 rounded-full bg-[#fdb022] text-white transition-opacity hover:opacity-90">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </button>
                        </div>
                        <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-2 bg-white">
                          <button onClick={handleAddStop} className="w-full flex justify-center items-center py-2 text-[#8c8c8c] text-sm hover:text-[#111] transition-colors">
                            + Add Stop
                          </button>
                        </div>
                        {tripType === 'hourly' ? (
                          <> 
                          <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiMapPin className="text-[#ff4a40] shrink-0" size={18} />
                            <input type="text" placeholder="Drop-off Location" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                            <button className="absolute right-2 rounded-full bg-[#1b2d5d] px-4 py-1.5 text-xs text-white hover:bg-[#132042] transition-colors">Same as pickup</button>
                          </div>
                          <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiClock className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="Duration" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                          </>
                        ) : (
                          <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiMapPin className="text-[#ff4a40] shrink-0" size={18} />
                            <input type="text" placeholder="Drop-off Location" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                            {/* <button className="absolute right-2 rounded-full bg-[#1b2d5d] px-4 py-1.5 text-xs text-white hover:bg-[#132042] transition-colors">Same as pickup</button> */}
                          </div>
                        )}

                        {/* Date / Time */}
                        <div className="flex gap-4">
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            {/* <FiCalendar className="text-gray-400 shrink-0" size={18} /> */}
                            <input type="date" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            {/* <FiClock className="text-gray-400 shrink-0" size={18} /> */}
                            <input type="time" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                        </div>

                        {/* Passengers / Luggage */}
                        <div className="flex gap-4">
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiUsers className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="3" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                            <FiBriefcase className="text-gray-400 shrink-0" size={18} />
                            <input type="text" placeholder="2" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Information Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    onClick={() => toggleSection('additionalInfo')}
                    className="flex w-full items-center justify-between bg-black px-5 py-3.5 text-white"
                  >
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                    {openSections.additionalInfo ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openSections.additionalInfo && (
                    <div className="p-5 space-y-4 bg-gray-50">
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                        <LuPlane className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Airline Name or Code" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                        <input type="text" placeholder="Flight" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                        <input type="text" placeholder="Curbside Pickup" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="flex w-full items-center gap-2 rounded-full border border-gray-200 px-2 py-1 bg-white focus-within:border-[#1b2d5d]">
                        <div className='flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors'>
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-5 object-cover rounded-full" />
                          <FiChevronDown className="text-[#4d4d4d]" />
                        </div>
                        <span className="text-[#4d4d4d] text-[15px]">+1</span>
                        <input type="text" className="flex-1 bg-transparent border-none text-[15px] text-[#111] outline-none px-2 py-2" />
                      </div>

                      <div className="flex items-center gap-3 px-2 py-1 cursor-pointer group">
                        <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#1b2d5d] transition-colors"></div>
                        <span className="text-[15px] text-[#8c8c8c] group-hover:text-[#111] transition-colors">I don't have flight details yet</span>
                      </div>

                      {/* Child Seats */}
                      <div className="pt-2">
                        <label className="block text-[15px] font-semibold text-[#111] mb-3">Child Seats:</label>
                        <div className="flex flex-wrap gap-3">
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 bg-white hover:border-[#1b2d5d] transition-colors">
                            <select className="w-full bg-transparent outline-none text-[#666] text-[15px] appearance-none cursor-pointer py-3 pl-4 pr-10 rounded-full h-full">
                              <option>0 Infant</option>
                              <option>1 Infant</option>
                              <option>2 Infant</option>
                            </select>
                            <FiChevronDown className="absolute right-4 text-gray-400 pointer-events-none" />
                          </div>
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 bg-white hover:border-[#1b2d5d] transition-colors">
                            <select className="w-full bg-transparent outline-none text-[#666] text-[15px] appearance-none cursor-pointer py-3 pl-4 pr-10 rounded-full h-full">
                              <option>0 Toddler</option>
                              <option>1 Toddler</option>
                              <option>2 Toddler</option>
                              <option>3 Toddler</option>
                            </select>
                            <FiChevronDown className="absolute right-4 text-gray-400 pointer-events-none" />
                          </div>
                          <div className="relative flex flex-1 items-center rounded-full border border-gray-200 bg-white hover:border-[#1b2d5d] transition-colors">
                            <select className="w-full bg-transparent outline-none text-[#666] text-[15px] appearance-none cursor-pointer py-3 pl-4 pr-10 rounded-full h-full">
                              <option>0 Booster</option>
                              <option>1 Booster</option>
                              <option>2 Booster</option>
                            </select>
                            <FiChevronDown className="absolute right-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Vehicle Information Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    onClick={() => toggleSection('vehicleInfo')}
                    className="flex w-full items-center justify-between bg-black px-5 py-3.5 text-white"
                  >
                    <h3 className="font-semibold text-lg">Vehicle Information</h3>
                    {openSections.vehicleInfo ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openSections.vehicleInfo && (
                    <div className="p-5 space-y-3 bg-gray-50">
                      {['Business Sedan', 'Premium Sedan', 'Luxury SUV', 'Premium SUV'].map((type, i) => (
                        <div
                          key={type}
                          onClick={() => setSelectedVehicle(type)}
                          className={`flex items-center justify-between rounded-full border px-5 py-3.5 bg-white cursor-pointer transition-colors ${selectedVehicle === type ? 'border-[#1b2d5d]' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <span className={`text-[15px] font-medium ${selectedVehicle === type ? 'text-[#111]' : 'text-[#8c8c8c]'}`}>{type}</span>
                          <div className="flex items-center gap-4 text-[15px] text-[#8c8c8c]">
                            <span className="flex items-center gap-1.5"><FiUsers size={18} className='text-black' /> {i > 1 ? '6' : '3'}</span>
                            <span className="flex items-center gap-1.5"><img src= {briefcaseicon} alt="" /> {i > 1 ? '4' : '3'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Passenger Information Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    onClick={() => toggleSection('passengerInfo')}
                    className="flex w-full items-center justify-between bg-black px-5 py-3.5 text-white"
                  >
                    <h3 className="font-semibold text-lg">Passenger Information</h3>
                    {openSections.passengerInfo ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openSections.passengerInfo && (
                    <div className="p-5 space-y-4 bg-gray-50">
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                        <FiUser className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="First Name" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                        <FiUser className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Last Name" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <input type="email" defaultValue="jaysonsmith@gmail.com" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="flex w-full items-center gap-2 rounded-full border border-gray-200 px-2 py-1 bg-white focus-within:border-[#1b2d5d]">
                        <div className='flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors'>
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-5 object-cover rounded-full" />
                          <FiChevronDown className="text-[#4d4d4d]" />
                        </div>
                        <span className="text-[#4d4d4d] text-[15px]">+1</span>
                        <input type="text" className="flex-1 bg-transparent border-none text-[15px] text-[#111] outline-none px-2 py-2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Information Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    onClick={() => toggleSection('cardInfo')}
                    className="flex w-full items-center justify-between bg-black px-5 py-3.5 text-white"
                  >
                    <h3 className="font-semibold text-lg">Card Information</h3>
                    {openSections.cardInfo ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openSections.cardInfo && (
                    <div className="p-5 space-y-4 bg-gray-50">
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white focus-within:border-[#1b2d5d] transition-colors">
                        <FiUser className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Card Holder Name" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white focus-within:border-[#1b2d5d] transition-colors">
                        <FiCreditCard className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Card Number" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="flex gap-4">
                        <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white focus-within:border-[#1b2d5d] transition-colors">
                          <FiCalendar className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="MM/YY Expiry" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                        </div>
                        <div className="relative flex flex-1 items-center rounded-full border border-gray-200 px-4 py-3 bg-white focus-within:border-[#1b2d5d] transition-colors">
                          <FiCreditCard className="text-gray-400 shrink-0" size={18} />
                          <input type="text" placeholder="CVC" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                        </div>
                      </div>
                      <div className="relative flex items-center rounded-full border border-gray-200 px-4 py-3 bg-white focus-within:border-[#1b2d5d] transition-colors">
                        <FiMapPin className="text-gray-400 shrink-0" size={18} />
                        <input type="text" placeholder="Billing Address" className="ml-3 w-full bg-transparent text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]" />
                      </div>
                      <div className="relative flex items-center justify-between rounded-full border border-gray-200 bg-white hover:border-[#1b2d5d] focus-within:border-[#1b2d5d] transition-colors">
                        <div className="flex items-center w-full relative">
                          <FiCreditCard className="absolute left-4 text-gray-400 pointer-events-none" size={18} />
                          <select className="w-full bg-transparent outline-none text-[#8c8c8c] text-[15px] appearance-none cursor-pointer py-3 pl-11 pr-10 rounded-full h-full">
                            <option value=""defaultValue >Card Status:</option>
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

            {/* Notes Section */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
              <textarea
                className="h-[100px] w-full resize-none text-[15px] text-[#111] outline-none placeholder:text-[#8c8c8c]"
                placeholder="Specific Priority for this passenger Notes:"
              />
            </div>

          </div>

          {/* Footer Bar */}
          <div className="border-t border-gray-200 bg-white px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-6">
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setIsReturnTrip(!isReturnTrip)}
                >
                  <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-gray-400 group-hover:border-[#111] transition-colors overflow-hidden p-[3px]">
                    {isReturnTrip && <div className="h-full w-full bg-[#1b2d5d] rounded-full"></div>}
                  </div>
                  <span className="text-[20px] font-semibold text-[#111]">Return Trip</span>
                </div>

                <div className="text-[32px] font-bold text-[#111] flex flex-wrap items-center gap-y-2 gap-x-6">
                  $450.00
                  {isReturnTrip && (
                    <div className="flex flex-wrap items-center gap-4 text-[#8c8c8c] text-[16px] font-medium sm:ml-4 sm:border-l sm:pl-6 border-gray-300">
                      <span className="flex items-center gap-2"><div className="bg-[#1b2d5d] text-white p-1 rounded-md"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div> <span className="text-[#111]">Pickup:</span> <span className="font-normal">$450.00</span></span>
                      <span className="flex items-center gap-2"><div className="bg-[#1b2d5d] text-white p-1 rounded-md"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 8 9 12 5"></polyline><polyline points="12 19 8 15 12 19"></polyline><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div> <span className="text-[#111]">Return:</span> <span className="font-normal">$450.00</span></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 sm:w-[400px]">
                <button
                  onClick={onClose}
                  className="w-1/2 rounded-full bg-[#7a7a7a] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleBook}
                  className="w-1/2 rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
                >
                  Book
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
