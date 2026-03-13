import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsCheck2, BsWifi, BsBriefcase, BsPeopleFill, BsLightningCharge } from 'react-icons/bs';
import { MdAcUnit } from 'react-icons/md';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { LuCalendarDays, LuClock3 } from 'react-icons/lu';
import { MdOutlineLocationOn, MdCircle } from 'react-icons/md';
import { TbArrowRight } from 'react-icons/tb';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import RouteMap from '../../components/RouteMap';
import usericon from "../../assets/profileuser.png"
import briefcase from "../../assets/briefcase.png"
import usericonblack from "../../assets/profile2userblack.png"
import briefcaseblack from "../../assets/briefcaseblack.png"
import seat from "../../assets/seat.png"
import wifi from "../../assets/wifi.png"
import drink from "../../assets/drink.png"
import plane from "../../assets/plane.png"
import seatblack from "../../assets/seatblack.png"
import wifiblack from "../../assets/wifiblack.png"
import drinkblack from "../../assets/drinkblack.png"
import planeblack from "../../assets/planeblack.png"
import arowswap from "../../assets/arrow-swap.png"
import businessSedanImg from '../../assets/business-class-car.png';
import premiumSedanImg from '../../assets/premium-class-car.png';
import luxurySuvImg from '../../assets/Luxury-SUV.png';
import premiumSuvImg from '../../assets/rangerower-premium.png';

const vehicles = [
  {
    id: 'business',
    name: 'Business Sedan',
    subtitle: 'Cadillac CT6, Lyric or similar',
    image: businessSedanImg,
    price: 95.0,
    passengers: 3,
    luggage: 3,
  },
  {
    id: 'premium-sedan',
    name: 'Premium Sedan',
    subtitle: 'Cadillac Escalade ESV, Lincoln Navigator or similar',
    image: premiumSedanImg,
    price: 95.0,
    passengers: 3,
    luggage: 3,
  },
  {
    id: 'luxury-suv',
    name: 'Luxury SUV',
    subtitle: 'Cadillac Escalade ESV, Lincoln Navigator or similar',
    image: luxurySuvImg,
    price: 95.0,
    passengers: 6,
    luggage: 4,
  },
  {
    id: 'premium-suv',
    name: 'Premium SUV',
    subtitle: 'Ultimate luxury and comfort.',
    image: premiumSuvImg,
    price: 95.0,
    passengers: 6,
    luggage: 4,
  },
];

const stops = [
  { label: 'USA Hockey Arena', address: 'Beck Road, Plymouth, MI, USA', type: 'pickup' },
  { label: 'USA Vein Clinics', address: 'Telegraph Road, Southfield, MI, USA', type: 'stop' },
  { label: 'USA Paper & Ribbon', address: 'Eight Mile West, Southfield, MI, USA', type: 'dropoff' },
];

const FeatureIcons = ({ passengers, luggage, Selected }) => {
  if (Selected) {
    return (
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1.5">
          <span className="flex items-center gap-1 text-xs text-white">
            <img src={usericon} alt="User" className="w-5 h-5" /> {passengers}
          </span>
          <span className="flex items-center gap-1 text-xs text-white">
            <img src={briefcase} alt="Luggage" className="w-5 h-5" /> {luggage}
          </span>
        </div>
        <img src={seat} alt="Features" className="w-6 h-6" />
        <img src={wifi} alt="Features" className="w-6 h-6" />
        <img src={drink} alt="Features" className="w-6 h-6" />
        <img src={plane} alt="Features" className="w-6 h-6" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-3  border rounded-full px-3 py-1.5">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <img src={usericonblack} alt="User" className="w-4 h-4" /> {passengers}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <img src={briefcaseblack} alt="Luggage" className="w-4 h-4" /> {luggage}
        </span>
      </div>
      <img src={seatblack} alt="Features" className="w-6 h-6" />
      <img src={wifiblack} alt="Features" className="w-6 h-6" />
      <img src={drinkblack} alt="Features" className="w-6 h-6" />
      <img src={planeblack} alt="Features" className="w-6 h-6" />
    </div>
  );
};

export default function SelectVehiclePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState('business');
  const [passengerCount, setPassengerCount] = useState(3);
  const [luggageCount, setLuggageCount] = useState(3);

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
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <StepperNavbar currentStep={1} />

      {/* Page header */}
      <div className="flex items-center justify-between px-8 md:px-16 py-4 border-b bg-[#EAEAEA] max=w-7xl">
        <h1 className="text-lg font-bold text-gray-900">Select Your Vehicle</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-6 px-8 md:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT PANEL */}
        <div className="w-full md:w-[42%] flex flex-col gap-4">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <RouteMap />

            {/* Route summary bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100 text-sm text-gray-900">
              <img src={arowswap} alt="Arrow Swap" className="w-5 h-5" />
              <span className="font-semibold">16.2 km</span>
              <span></span>
              <LuClock3 size={18} />
              <span>35 mins</span>
            </div>
          </div>

          {/* Trip details card */}
          <div className="bg-white/60 rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TbArrowRight size={16} className="text-[#1a2b5e]" />
              <span className="text-sm font-bold text-gray-800">Pickup Trip Details</span>
            </div>

            {/* Stops list */}
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
            <div className="flex items-center gap-3 border-gray-100 pb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-6 py-2.5">
                <LuCalendarDays size={16} className="text-gray-400" />
                <span>Wed, Feb 18th 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500  rounded-full bg-white px-6 py-2.5">
                <LuClock3 size={16} className="text-gray-400" />
                <span>03:20</span>
                
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 rounded-full bg-white px-4 py-2.5 w-32">
              <LuClock3 size={16} className="text-gray-400" />
            {isHourlyRide ? (
                  <span>3 hours</span>
                ) : (
                  <span>12:11 pm</span>
                )}
                </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[55%] flex flex-col gap-3">
          {vehicles.map((v) => {
            const isSelected = selectedId === v.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                className={`relative rounded-2xl border cursor-pointer transition-all overflow-hidden
                  ${isSelected ? 'bg-[#1a2b5e] border-[#1a2b5e] shadow-lg' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}
                `}
              >
                {/* Check / radio icon — top right corner */}
                <div className="absolute top-3 right-3 z-10">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <BsCheck2 size={12} className="text-[#1a2b5e]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                {/* Main card row */}
                <div className="flex items-center gap-4 px-4 py-4">
                  {/* Car image */}
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-28 h-16 object-contain flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className={`text-md font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{v.name}</p>
                    <p className={`text-sm mt-0.5 leading-snug ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>{v.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <FeatureIcons passengers={v.passengers} luggage={v.luggage} Selected={isSelected} />
                      <p className={`pr-5 text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        ${v.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded controls — only for selected */}
                {isSelected && (
                  <div className="px-4 pb-4 flex flex-col gap-3">
                    <div className="border-t ml-4  w-[92%] border-dashed border-white/50" />
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Passengers counter */}
                      <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                        <img src={usericon} className="w-4 h-4" />
                        <span className="text-xs text-blue-200 whitespace-nowrap">Passengers (S)</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setPassengerCount(c => Math.max(1, c - 1)); }}
                          className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
                        >−</button>
                        <span className="text-white text-xs font-semibold w-4 text-center">{passengerCount}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setPassengerCount(c => c + 1); }}
                          className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
                        >+</button>
                      </div>

                      {/* Luggage counter */}
                      <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                        <img src={briefcase} className="w-4 h-4" />
                        <span className="text-xs text-blue-200 whitespace-nowrap">Luggage (S)</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setLuggageCount(c => Math.max(0, c - 1)); }}
                          className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
                        >−</button>
                        <span className="text-white text-xs font-semibold w-4 text-center">{luggageCount}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setLuggageCount(c => c + 1); }}
                          className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
                        >+</button>
                      </div>

                      {/* Continue button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate('/additional-details'); }}
                        className="ml-auto flex items-center gap-2 bg-white text-[#1a2b5e] text-xs font-bold px-5 py-2 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        Continue <FiChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
