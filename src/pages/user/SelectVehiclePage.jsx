import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import TripDetailsPanel from '../../components/select-vehicle/TripDetailsPanel';
import VehicleCard from '../../components/select-vehicle/VehicleCard';
import { getVehicleCategories } from '../../services/vehicleCategoryService';
import { updateBookingStep2, updateBookingStep3 } from '../../services/bookingService';
import fallbackVehicleImage from '../../assets/business-class-car.png';
import childSeatIcon from '../../assets/childicon.png';
import {
  persistBookingSession,
  readBookingDraft,
  resolveBookingContext,
  resolveBookingId,
} from '../../utils/bookingSession';

const countOptions = Array.from({ length: 11 }, (_, index) => index);

const vehicleSubtitleByClassification = {
  sedan: 'Comfortable sedan ride',
  suv: 'Spacious SUV option',
  van: 'Roomy van for groups',
  limo: 'Luxury limo experience',
};

export default function SelectVehiclePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedId, setSelectedId] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [luggageCount, setLuggageCount] = useState(1);

  const [childSeats, setChildSeats] = useState(false);
  const [infant, setInfant] = useState(0);
  const [toddler, setToddler] = useState(0);
  const [booster, setBooster] = useState(0);

  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehiclesError, setVehiclesError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [fareBreakdown, setFareBreakdown] = useState(null);

  const bookingContext = useMemo(() => resolveBookingContext(location.state), [location.state]);
  const isHourlyRide = bookingContext.rideType === 'hourly';
  const bookingId = useMemo(() => resolveBookingId(bookingContext), [bookingContext]);
  const storedBookingDraft = useMemo(() => readBookingDraft(), []);

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
        subtitle:
          vehicleSubtitleByClassification[category.classification] ||
          'Premium ride experience',
        image: category.picture || fallbackVehicleImage,
        price: Number(category.baseFare ?? 0),
        passengers: Number(category.passengerCapacity ?? 0),
        luggage: Number(category.luggageCapacity ?? 0),
        raw: category,
      }));

      setVehicleOptions(mappedVehicles);

      if (mappedVehicles.length === 0 || !bookingId) return;

      // Prefer the vehicle stored in the session draft; fall back to the first vehicle
      const initialVehicleId = storedBookingDraft?.vehicleCategoryId || mappedVehicles[0].id;
      const initPassengers = Number(storedBookingDraft?.noOfPassengers ?? 1);
      const initLuggage = Number(storedBookingDraft?.luggage ?? 1);

      setSelectedId(initialVehicleId);
      setPassengerCount(initPassengers);
      setLuggageCount(initLuggage);

      // Auto-fetch price for the initially selected vehicle
      setIsUpdatingBooking(true);
      const priceResult = await updateBookingStep2(bookingId, {
        vehicleCategoryId: initialVehicleId,
        noOfPassengers: initPassengers,
        luggage: initLuggage,
      });
      setIsUpdatingBooking(false);

      if (priceResult?.success) {
        setBookingDetails(priceResult?.data ?? null);
        setFareBreakdown(priceResult?.raw?.fareBreakdown ?? null);
        persistBookingSession({ bookingDraft: priceResult?.data ?? null });
      }
    };

    loadVehicleCategories();
    // storedBookingDraft and bookingId are memos computed once — safe in [] effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore child seat choices from session on mount (separate from vehicle/price init)
  useEffect(() => {
    if (!storedBookingDraft) return;
    setChildSeats(Boolean(storedBookingDraft.childSeatRequired));
    setInfant(Number(storedBookingDraft.childSeats?.infant ?? storedBookingDraft.childSeatInfant ?? 0));
    setToddler(Number(storedBookingDraft.childSeats?.toddler ?? storedBookingDraft.childSeatToddler ?? 0));
    setBooster(Number(storedBookingDraft.childSeats?.booster ?? storedBookingDraft.childSeatBooster ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        address: typeof stop === 'string' ? stop : stop?.location || '',
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

  const clampCountsByVehicle = (vehicleId, counts = {}) => {
    const vehicle = vehicleOptions.find((v) => v.id === vehicleId);

    let newPassengers = Number(counts.noOfPassengers ?? passengerCount ?? 1);
    let newLuggage = Number(counts.luggage ?? luggageCount ?? 0);

    if (vehicle) {
      newPassengers = Math.min(newPassengers, vehicle.passengers || newPassengers);
      newPassengers = Math.max(1, newPassengers);

      newLuggage = Math.min(newLuggage, vehicle.luggage || newLuggage);
      newLuggage = Math.max(0, newLuggage);
    }

    return {
      noOfPassengers: newPassengers,
      luggage: newLuggage,
    };
  };

  const handleVehicleSelect = async (vehicleId, bookingCounts = {}) => {
    setSelectedId(vehicleId);
    setBookingError('');

    const nextCounts = clampCountsByVehicle(vehicleId, bookingCounts);

    setPassengerCount(nextCounts.noOfPassengers);
    setLuggageCount(nextCounts.luggage);

    if (!bookingId) {
      setBookingError('Booking id is missing. Please start a new booking.');
      return false;
    }

    setIsUpdatingBooking(true);

    const result = await updateBookingStep2(bookingId, {
      vehicleCategoryId: vehicleId,
      noOfPassengers: nextCounts.noOfPassengers,
      luggage: nextCounts.luggage,
    });

    if (!result?.success) {
      setBookingError(result?.message || 'Failed to update vehicle selection.');
      setIsUpdatingBooking(false);
      return false;
    }

    setBookingDetails(result?.data ?? null);
    setFareBreakdown(result?.raw?.fareBreakdown ?? null);
    persistBookingSession({ bookingDraft: result?.data ?? null });
    setIsUpdatingBooking(false);

    return true;
  };

  const saveChildSeatDetails = async () => {
    const payload = {
      childSeatRequired: Boolean(childSeats),
      childSeats: {
        infant: childSeats ? Number(infant) : 0,
        toddler: childSeats ? Number(toddler) : 0,
        booster: childSeats ? Number(booster) : 0,
      },
    };

    const result = await updateBookingStep3(bookingId, payload);

    if (!result?.success) {
      setBookingError(result?.message || 'Failed to update child seat details.');
      return false;
    }

    setBookingDetails(result?.data ?? null);
    persistBookingSession({ bookingDraft: result?.data ?? null });

    return true;
  };

  const handleContinue = async () => {
    if (!selectedId) {
      setBookingError('Please select a vehicle to continue.');
      return;
    }

    if (!bookingId) {
      setBookingError('Booking id is missing. Please start a new booking.');
      return;
    }

    setBookingError('');
    setIsUpdatingBooking(true);

    const vehicleSaved = await handleVehicleSelect(selectedId, {
      noOfPassengers: passengerCount,
      luggage: luggageCount,
    });

    if (!vehicleSaved) {
      setIsUpdatingBooking(false);
      return;
    }

    const childSeatsSaved = await saveChildSeatDetails();

    setIsUpdatingBooking(false);

    if (!childSeatsSaved) {
      return;
    }

    navigate('/passenger-details');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <StepperNavbar currentStep={1} />

      <div className="flex items-center justify-between px-4 md:px-16 py-4 border-b bg-[#EAEAEA]">
        <h1 className="text-base md:text-lg font-bold text-gray-900">
          Select Your Vehicle
        </h1>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">
        <TripDetailsPanel
          stops={stopsForPanel}
          isHourlyRide={isHourlyRide}
          bookingDetails={bookingDetails}
          fareBreakdown={fareBreakdown}
          isFetchingPrice={isUpdatingBooking}
        />

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
              onSelect={(vehicleId) =>
                handleVehicleSelect(vehicleId, {
                  noOfPassengers: passengerCount,
                  luggage: luggageCount,
                })
              }
              passengerCount={passengerCount}
              setPassengerCount={setPassengerCount}
              luggageCount={luggageCount}
              setLuggageCount={setLuggageCount}
              onContinue={handleContinue}
            />
          ))}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img src={childSeatIcon} className="w-6 h-6" alt="child seat" />
                  </div>

                  <span className="text-sm font-semibold text-gray-800">
                    Do you want Child Seats?
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setChildSeats((value) => !value)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    childSeats ? 'bg-[#1a2b5e]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      childSeats ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {childSeats && (
                <div className="flex items-center gap-3 flex-wrap pt-2">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 text-xs text-gray-500 font-medium bg-white px-1 leading-none">
                      Infant
                    </label>
                    <select
                      value={infant}
                      onChange={(event) => setInfant(Number(event.target.value))}
                      className="border border-gray-300 rounded-lg px-3 pt-3 pb-2 text-sm text-gray-700 outline-none focus:border-[#1a2b5e] bg-white min-w-[90px]"
                    >
                      {countOptions.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 text-xs text-gray-500 font-medium bg-white px-1 leading-none">
                      Toddler
                    </label>
                    <select
                      value={toddler}
                      onChange={(event) => setToddler(Number(event.target.value))}
                      className="border border-gray-300 rounded-lg px-3 pt-3 pb-2 text-sm text-gray-700 outline-none focus:border-[#1a2b5e] bg-white min-w-[90px]"
                    >
                      {countOptions.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 text-xs text-gray-500 font-medium bg-white px-1 leading-none">
                      Booster
                    </label>
                    <select
                      value={booster}
                      onChange={(event) => setBooster(Number(event.target.value))}
                      className="border border-gray-300 rounded-lg px-3 pt-3 pb-2 text-sm text-gray-700 outline-none focus:border-[#1a2b5e] bg-white min-w-[90px]"
                    >
                      {countOptions.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleContinue}
                  disabled={isUpdatingBooking}
                  className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isUpdatingBooking ? 'Saving...' : 'Continue'}
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}