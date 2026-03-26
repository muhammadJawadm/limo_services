import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import TripDetailsPanel from '../../components/select-vehicle/TripDetailsPanel';
import VehicleCard from '../../components/select-vehicle/VehicleCard';
import { vehicles, stops } from '../../components/select-vehicle/constants';

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
      <div className="flex items-center justify-between px-4 md:px-16 py-4 border-b bg-[#EAEAEA]">
        <h1 className="text-base md:text-lg font-bold text-gray-900">Select Your Vehicle</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT PANEL */}
        <TripDetailsPanel stops={stops} isHourlyRide={isHourlyRide} />

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[55%] flex flex-col gap-3">
          {vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              isSelected={selectedId === v.id}
              onSelect={setSelectedId}
              passengerCount={passengerCount}
              setPassengerCount={setPassengerCount}
              luggageCount={luggageCount}
              setLuggageCount={setLuggageCount}
              onContinue={() => navigate('/additional-details')}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
