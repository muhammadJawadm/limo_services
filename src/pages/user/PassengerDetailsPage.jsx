import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import TripSummaryPanel from '../../components/passenger-details/TripSummaryPanel';
import PassengerFormPanel from '../../components/passenger-details/PassengerFormPanel';
import DeleteConfirmModal from '../../components/passenger-details/DeleteConfirmModal';
import { useBookingFlow } from '../../hooks/useBookingFlow';

export default function PassengerDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isHourlyRide, bookingId, bookingDetails } = useBookingFlow(location.state);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={2} />

      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-[#EAEAEA] border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">Passenger Information</h1>
        <button
          onClick={() => navigate('/additional-details')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">
        <TripSummaryPanel
          isHourlyRide={isHourlyRide}
          setShowDeleteConfirm={setShowDeleteConfirm}
          bookingDetails={bookingDetails}
        />

        <PassengerFormPanel bookingId={bookingId} bookingDetails={bookingDetails} />
      </div>

      <Footer />

      <DeleteConfirmModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
