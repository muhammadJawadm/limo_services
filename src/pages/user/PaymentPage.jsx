import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';

// Payment Components
import BookingSummaryPanel from '../../components/payment/BookingSummaryPanel';
import PaymentFormPanel from '../../components/payment/PaymentFormPanel';
import BookingSuccessModal from '../../components/payment/BookingSuccessModal';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const [bookingDone, setBookingDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={3} />

      {/* Page header */}
      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-gray-100 border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">Payment Information</h1>
        <button
          onClick={() => navigate('/passenger-details')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">

        {/* LEFT PANEL */}
        <BookingSummaryPanel isHourlyRide={isHourlyRide} />

        {/* RIGHT PANEL */}
        <PaymentFormPanel onProceed={() => setBookingDone(true)} />

      </div>

      <Footer />

      {/* Booking Completed Modal */}
      <BookingSuccessModal show={bookingDone} />
    </div>
  );
}
