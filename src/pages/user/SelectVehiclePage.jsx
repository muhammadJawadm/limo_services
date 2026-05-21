import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import TripDetailsPanel from '../../components/select-vehicle/TripDetailsPanel';
import VehicleCard from '../../components/select-vehicle/VehicleCard';
import { getVehicleCategories } from '../../services/vehicleCategoryService';
import { updateBookingStep2 } from '../../services/bookingService';
import fallbackVehicleImage from '../../assets/business-class-car.png';
import {
  persistBookingSession,
  readBookingDraft,
  resolveBookingContext,
  resolveBookingId,
} from '../../utils/bookingSession';

export default function SelectVehiclePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState('');
  const [passengerCount, setPassengerCount] = useState(3);
  const [luggageCount, setLuggageCount] = useState(3);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehiclesError, setVehiclesError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const bookingContext = resolveBookingContext(location.state);
  const isHourlyRide = bookingContext.rideType === 'hourly';
  const bookingId = resolveBookingId(bookingContext);
  const storedBookingDraft = readBookingDraft();

  const vehicleSubtitleByClassification = {
    sedan: 'Comfortable sedan ride',
    suv: 'Spacious SUV option',
    van: 'Roomy van for groups',
    limo: 'Luxury limo experience',
  };

  useEffect(() => {
    const loadVehicleCategories = async () => {
      setVehiclesError('');
      const result = await getVehicleCategories();
      if (!result?.success) {
        setVehiclesError(result?.message || 'Failed to load vehicles.');
        return;
      }

      const mappedVehicles = (result?.data ?? []).map((category) => ({
        id: category.id,
        name: category.name,
        subtitle: vehicleSubtitleByClassification[category.classification] || 'Premium ride experience',
        image: category.picture || fallbackVehicleImage,
        price: Number(category.baseFare ?? 0),
        passengers: Number(category.passengerCapacity ?? 0),
        luggage: Number(category.luggageCapacity ?? 0),
        raw: category,
      }));

      setVehicleOptions(mappedVehicles);
      if (!selectedId && mappedVehicles.length > 0) {
        setSelectedId(mappedVehicles[0].id);
      }
    };

    loadVehicleCategories();
  }, []);

  useEffect(() => {
    if (!bookingDetails && storedBookingDraft) {
      setBookingDetails(storedBookingDraft);
    }
  }, [bookingDetails, storedBookingDraft]);

  const stopsForPanel = useMemo(() => {
    if (!bookingDetails) {
      return [];
    }

    const mappedStops = [];
    if (bookingDetails.pickupLocation) {
      mappedStops.push({
        label: 'Pickup',
        address: bookingDetails.pickupLocation,
        type: 'pickup',
      });
    }

    (bookingDetails.stopLocations || []).forEach((stop) => {
      mappedStops.push({
        label: 'Stop',
        address: stop,
        type: 'stop',
      });
    });

    if (bookingDetails.dropoffLocation) {
      mappedStops.push({
        label: 'Drop-off',
        address: bookingDetails.dropoffLocation,
        type: 'dropoff',
      });
    }

    return mappedStops;
  }, [bookingDetails]);

  const handleVehicleSelect = async (vehicleId, bookingCounts = {}) => {
    setSelectedId(vehicleId);
    setBookingError('');

    if (!bookingId) {
      setBookingError('Booking id is missing. Please start a new booking.');
      return false;
    }

    setIsUpdatingBooking(true);
    const result = await updateBookingStep2(bookingId, {
      vehicleCategoryId: vehicleId,
      noOfPassengers: bookingCounts.noOfPassengers ?? passengerCount,
      luggage: bookingCounts.luggage ?? luggageCount,
    });
    if (!result?.success) {
      setBookingError(result?.message || 'Failed to update vehicle selection.');
      setIsUpdatingBooking(false);
      return false;
    }

    setBookingDetails(result?.data ?? null);
    persistBookingSession({ bookingDraft: result?.data ?? null });
    setIsUpdatingBooking(false);
    return true;
  };

  const handleContinue = async () => {
    if (!selectedId) {
      setBookingError('Please select a vehicle to continue.');
      return;
    }

    if (!bookingDetails?.vehicleCategoryId) {
      const updated = await handleVehicleSelect(selectedId, {
        noOfPassengers: passengerCount,
        luggage: luggageCount,
      });
      if (!updated) {
        return;
      }
    }

    navigate('/additional-details');
  };

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
        <TripDetailsPanel stops={stopsForPanel} isHourlyRide={isHourlyRide} bookingDetails={bookingDetails} />

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[55%] flex flex-col gap-3">
          {vehiclesError ? (
            <p className="text-sm text-red-500">{vehiclesError}</p>
          ) : null}
          {bookingError ? (
            <p className="text-sm text-red-500">{bookingError}</p>
          ) : null}
          {vehicleOptions.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              isSelected={selectedId === v.id}
              onSelect={(vehicleId) => handleVehicleSelect(vehicleId, {
                noOfPassengers: passengerCount,
                luggage: luggageCount,
              })}
              passengerCount={passengerCount}
              setPassengerCount={setPassengerCount}
              luggageCount={luggageCount}
              setLuggageCount={setLuggageCount}
              onContinue={handleContinue}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
