import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsCheck2 } from 'react-icons/bs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { LuCalendarDays, LuClock3 } from 'react-icons/lu';
import { MdOutlineLocationOn, MdCircle } from 'react-icons/md';
import { TbArrowRight } from 'react-icons/tb';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import usericonblack from "../../assets/profile2userblack.png";
import briefcaseblack from "../../assets/briefcaseblack.png";
import usericon from "../../assets/profileuser.png";
import briefcase from "../../assets/briefcase.png";
import seat from "../../assets/seat.png";
import wifi from "../../assets/wifi.png";
import drink from "../../assets/drink.png";
import plane from "../../assets/plane.png";

import businessSedanImg from '../../assets/business-class-car.png';
import childSeatIcon from '../../assets/childicon.png';

const stops = [
  { label: 'USA Hockey Arena', address: 'Beck Road, Plymouth, MI, USA', type: 'pickup' },
  { label: 'USA Vein Clinics', address: 'Telegraph Road, Southfield, MI, USA', type: 'stop' },
  { label: 'USA Paper & Ribbon', address: 'Eight Mile West, Southfield, MI, USA', type: 'dropoff' },
];

const countOptions = [0, 1, 2, 3, 4];

export default function AdditionalDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [childSeats, setChildSeats] = useState(false);
  const [infant, setInfant] = useState(0);
  const [toddler, setToddler] = useState(1);
  const [booster, setBooster] = useState(0);

  const storedBookingContext = (() => {
    const raw = sessionStorage.getItem('bookingContext');
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  })();

  const bookingContext = location.state ?? storedBookingContext ?? {};
  const isHourlyRide = bookingContext.rideType === 'hourly';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={1} />

      {/* Page header */}
      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-[#EAEAEA] border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">Additional Details</h1>
        <button
          onClick={() => navigate('/select-vehicle')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT PANEL — Trip details */}
        <div className="w-full md:w-[42%]">
          <div className="bg-white/10 rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TbArrowRight size={16} className="text-[#1a2b5e]" />
              <span className="text-sm font-bold text-gray-800">Pickup Trip Details</span>
            </div>

            {/* Stops */}
            <div className="flex flex-col gap-3 mb-3 border-t pt-2 border-gray-300 ">
              {stops.map((stop, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="relative w-5 flex justify-center flex-shrink-0">
                    {stop.type === 'pickup' && <MdOutlineLocationOn size={18} className="text-green-500 mt-0.5" />}
                    {stop.type === 'stop' && <MdCircle size={10} className="text-gray-400 mt-1.5" />}
                    {stop.type === 'dropoff' && <MdOutlineLocationOn size={18} className="text-red-400 mt-0.5" />}
                    {i < stops.length - 1 && (
                      <span className="absolute left-1/2 -translate-x-1/2 top-6 h-[calc(100%+12px)] border-l border-dashed border-gray-300" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{stop.label}</p>
                    <p className="text-xs text-gray-400">{stop.address}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Date & time */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 rounded-full bg-white px-3 py-2">
                <LuCalendarDays size={15} className="text-gray-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Wed, Feb 18th 2026</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 rounded-full bg-white px-3 py-2">
                <LuClock3 size={15} className="text-gray-400 flex-shrink-0" />
                <span>12:11</span>
              </div>
              {isHourlyRide && (
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 rounded-full bg-white px-3 py-2">
                  <LuClock3 size={15} className="text-gray-400" />
                  <span>3 hours</span>
                </div>
              )}
            </div>

            {/* Passengers & luggage */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 rounded-full bg-white px-3 py-2">
                <img src={usericonblack} className="w-4 h-4" alt="passengers" />
                <span>3 Passengers</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 rounded-full bg-white px-3 py-2">
                <img src={briefcaseblack} className="w-4 h-4" alt="luggage" />
                <span>3 Luggage</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 rounded-full bg-white px-3 py-2">
                <img src={childSeatIcon} className="w-5 h-5" alt="child" />
                <span>1 Toddler</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[55%] flex flex-col gap-4">

          {/* Selected vehicle card */}
          <div className="bg-[#1a2b5e] rounded-2xl px-5 py-4">
            <div className="flex items-center gap-4">
              {/* Car image */}
              <img src={businessSedanImg} alt="Business Sedan" className="w-20 h-12 md:w-28 md:h-16 object-contain flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <p className="text-white font-bold text-sm md:text-base">Business Sedan</p>
                  <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    <BsCheck2 size={11} /> Selected
                  </span>
                </div>
                <p className="text-blue-200 text-xs">Cadillac CT6, Lyric or similar</p>
                {/* Feature icons row + price */}
                <div className="flex lg:flex-row flex-col items-center justify-between mt-2">
                  <div className="flex items-center gap-3 ">
                    <div className='flex items-center gap-3 border rounded-full px-3 py-1 bg-white/10'>
                      <span className="flex items-center gap-1 text-xs text-white">
                        <img src={usericon} className="w-4 h-4" alt="passengers" /> 3
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white">
                        <img src={briefcase} className="w-4 h-4" alt="luggage" /> 3
                      </span>
                    </div>
                    <img src={seat} className="w-6 h-6" alt="seat" />
                    <img src={wifi} className="w-6 h-6" alt="wifi" />
                    <img src={drink} className="w-6 h-6" alt="drink" />
                    <img src={plane} className="w-6 h-6" alt="plane" />
                  </div>
                  <p className="text-white font-bold text-lg">$95.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Child Seats card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            {/* Toggle row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                {/* Child seat icon circle */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <img src={childSeatIcon} className="w-6 h-6" alt="child seat" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Do you want Child Seats?</span>
                {/* Toggle switch */}
                <button
                  onClick={() => setChildSeats(v => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${childSeats ? 'bg-[#1a2b5e]' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${childSeats ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </button>
                {/* Dropdowns — only when toggle is on */}
                {childSeats && (
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {/* Infant */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 text-xs text-gray-500 font-medium bg-white px-1 leading-none">Infant</label>
                      <select
                        value={infant}
                        onChange={e => setInfant(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 pt-3 pb-2 text-sm text-gray-700 outline-none focus:border-[#1a2b5e] bg-white min-w-[80px]"
                      >
                        {countOptions.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>

                    {/* Toddler */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 text-xs text-gray-500 font-medium bg-white px-1 leading-none">Toddler</label>
                      <select
                        value={toddler}
                        onChange={e => setToddler(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 pt-3 pb-2 text-sm text-gray-700 outline-none focus:border-[#1a2b5e] bg-white min-w-[80px]"
                      >
                        {countOptions.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>

                    {/* Booster */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 text-xs text-gray-500 font-medium bg-white px-1 leading-none">Booster</label>
                      <select
                        value={booster}
                        onChange={e => setBooster(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 pt-3 pb-2 text-sm text-gray-700 outline-none focus:border-[#1a2b5e] bg-white min-w-[80px]"
                      >
                        {countOptions.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Continue button */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate('/passenger-details')}
                className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors"
              >
                Continue <FiChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
