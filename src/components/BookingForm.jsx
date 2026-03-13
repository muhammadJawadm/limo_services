import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { BsTrash, BsCheck2, BsAirplane } from 'react-icons/bs';
import { MdOutlineLocationOn } from 'react-icons/md';
import { LuCalendarDays, LuClock3 } from 'react-icons/lu';
import PrimaryButton from './PrimaryButton';
import group from "../assets/groupofpop.png";

export default function BookingForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('point'); // 'point' | 'hourly'
  const [stops, setStops] = useState([{ value: 'New York street Bay Four' }]);
  const [stopLocations, setStopLocations] = useState([{ value: '' }]);
  const [showSwitchPopup, setShowSwitchPopup] = useState(false);
  const [hourlyDuration, setHourlyDuration] = useState('');

  const handleGetQuote = () => {
    const bookingContext = {
      rideType: activeTab,
      hourlyDuration: activeTab === 'hourly' ? hourlyDuration.trim() : '',
    };

    sessionStorage.setItem('bookingContext', JSON.stringify(bookingContext));
    navigate('/select-vehicle', { state: bookingContext });
  };

  const addStop = () => {
    if (stops.length >= 4) {
      setShowSwitchPopup(true);
    } else {
      setStops([...stops, { value: '' }]);
    }
  };
  const removeStop = (i) => setStops(stops.filter((_, idx) => idx !== i));

  return (
    <>
      {/* ── Switch to Hourly Popup ── */}
      {showSwitchPopup && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-3xl shadow-2xl px-10 py-10 flex flex-col items-center max-w-sm w-full mx-4 relative">
            {/* Decorative dots */}
            {/* Icon */}
            <div className="mb-5">
              <img src={group} alt="Group of People" className="w-36 h-24 object-contain" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">Switch to Hourly Ride</h2>

            {/* Description */}
            <p className="text-gray-400 text-sm text-center leading-relaxed mb-7">
              You've added more than 4 stops. An hourly ride may be more suitable and cost-effective for your journey.
            </p>

            {/* Switch button */}
            <button
              onClick={() => {
                setActiveTab('hourly');
                setShowSwitchPopup(false);
              }}
              className="w-full bg-[#1a2b5e] text-white font-semibold py-4 rounded-full text-base hover:bg-[#253576] transition-colors"
            >
              Switch to Hourly
            </button>
          </div>
        </div>,
        document.body
      )}

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm">
      {/* ── Tab Header ── */}
      <div className="flex">
        <button
          onClick={() => setActiveTab('point')}
          className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === 'point'
            ? 'bg-[#1a2b5e] text-white'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
        >
          Point-to-Point
        </button>
        <button
          onClick={() => setActiveTab('hourly')}
          className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === 'hourly'
            ? 'bg-[#1a2b5e] text-white'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
        >
          Hourly
        </button>
      </div>

      {/* ── Form Body ── */}
      <div className="bg-gray-50 p-5 space-y-3">
        {activeTab === 'point' ? (
          <>
            {/* 1. Pickup Location + Add Stop button */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <MdOutlineLocationOn className="text-green-500 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Pickup Location"
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
              <button
                onClick={addStop}
                className="flex items-center gap-1.5 bg-[#1a2b5e] text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#253576] transition-colors"
              >
                <span className="text-base leading-none">+</span> Add Stop
              </button>
            </div>

            {/* 2. Dynamic stops */}
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3 flex-1">
                  <MdOutlineLocationOn className="text-yellow-500 flex-shrink-0" size={20} />
                  <input
                    type="text"
                    defaultValue={stop.value}
                    placeholder="Stop address"
                    className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={() => removeStop(i)}
                  className="w-11 h-11 flex items-center justify-center bg-red-100 text-red-500 rounded-full flex-shrink-0 hover:bg-red-200 transition-colors"
                >
                  <BsTrash size={16} />
                </button>
              </div>
            ))}

            {/* 3. Stop location with gold checkmark */}
            {stopLocations.map((sl, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3 flex-1">
                  <MdOutlineLocationOn className="text-gray-400 flex-shrink-0" size={20} />
                  <input
                    type="text"
                    defaultValue={sl.value}
                    placeholder="Stop location"
                    className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>
                <button className="w-11 h-11 flex items-center justify-center bg-yellow-500 text-white rounded-full flex-shrink-0 hover:bg-yellow-600 transition-colors">
                  <BsCheck2 size={18} />
                </button>
              </div>
            ))}

            {/* 4. Drop-off address */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <MdOutlineLocationOn className="text-red-400 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Drop-off address"
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
            </div>

            {/* 5. Date & Time row */}
            <div className="flex gap-3">
              <div className="flex items-center bg-white rounded-full px-4 py-4 shadow-sm gap-2 flex-1">
                <LuCalendarDays className="text-gray-400 flex-shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="dd----YYYY"
                  className="flex-1 text-xs outline-none bg-transparent placeholder-gray-400 text-gray-700 w-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-4 shadow-sm gap-2 flex-1">
                <LuClock3 className="text-gray-400 flex-shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="12:11 pm"
                  className="flex-1 text-xs outline-none bg-transparent placeholder-gray-400 text-gray-700 w-0"
                />
              </div>
            </div>

            {/* 6. Flight Number */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <BsAirplane className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                placeholder="Flight Number (Option)"
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
            </div>
          </>
        ) : (
          <>
            {/* ── Hourly Tab Fields ── */}

            {/* 1. Pickup Location + Add Stop */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <MdOutlineLocationOn className="text-green-500 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Pickup Location"
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
              <button className="flex items-center gap-1.5 bg-[#1a2b5e] text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#253576] transition-colors">
                <span className="text-base leading-none">+</span> Add Stop
              </button>
            </div>

            {/* 2. Stop row — yellow pin + trash button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3 flex-1">
                <MdOutlineLocationOn className="text-yellow-500 flex-shrink-0" size={20} />
                <input
                  type="text"
                  defaultValue="New York street Bay Four"
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 font-medium"
                />
              </div>
              <button className="w-11 h-11 flex items-center justify-center bg-red-100 text-red-500 rounded-full flex-shrink-0 hover:bg-red-200 transition-colors">
                <BsTrash size={16} />
              </button>
            </div>

            {/* 3. Stop Location — gray pin + gold checkmark */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3 flex-1">
                <MdOutlineLocationOn className="text-gray-400 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Stop Location"
                  className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
                />
              </div>
              <button className="w-11 h-11 flex items-center justify-center bg-yellow-500 text-white rounded-full flex-shrink-0 hover:bg-yellow-600 transition-colors">
                <BsCheck2 size={18} />
              </button>
            </div>

            {/* 4. Duration */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <LuClock3 className="text-gray-400 flex-shrink-0" size={18} />
              <input
                type="text"
                placeholder="Duration"
                value={hourlyDuration}
                onChange={(e) => setHourlyDuration(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
            </div>

            {/* 5. Drop-off Location + "Same as pickup" button */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <MdOutlineLocationOn className="text-red-400 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Drop-off Location"
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
              <button className="flex items-center bg-[#1a2b5e] text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#253576] transition-colors">
                Same as pickup
              </button>
            </div>

            {/* 6. Date & Time row */}
            <div className="flex gap-3">
              <div className="flex items-center bg-white rounded-full px-4 py-4 shadow-sm gap-2 flex-1">
                <LuCalendarDays className="text-gray-400 flex-shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="dd----YYYY"
                  className="flex-1 text-xs outline-none bg-transparent placeholder-gray-400 text-gray-700 w-0"
                />
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-4 shadow-sm gap-2 flex-1">
                <LuClock3 className="text-gray-400 flex-shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="12:11 pm"
                  className="flex-1 text-xs outline-none bg-transparent placeholder-gray-400 text-gray-700 w-0"
                />
              </div>
            </div>

            {/* 7. Flight Number */}
            <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
              <BsAirplane className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                placeholder="Flight Number (Option)"
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
              />
            </div>
          </>
        )}

        {/* ── Get Quote Button ── */}
        <div className="mt-2">
          <PrimaryButton fullWidth size="lg" className="tracking-wide mb-1 mt-5 bg-primary" onClick={handleGetQuote}>
            Get Quote
          </PrimaryButton>
        </div>
      </div>
    </div>
    </>
  );
}
