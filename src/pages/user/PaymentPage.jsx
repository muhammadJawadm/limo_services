import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Elements } from '@stripe/react-stripe-js';
import { getStripePromise } from '../../config/stripe';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import { createPaymentIntent } from '../../services/paymentService';
import BookingSummaryPanel from '../../components/payment/BookingSummaryPanel';
import PaymentFormPanel from '../../components/payment/PaymentFormPanel';
import BookingSuccessModal from '../../components/payment/BookingSuccessModal';
import { useBookingFlow } from '../../hooks/useBookingFlow';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isHourlyRide, bookingId, bookingDetails } = useBookingFlow(location.state);

  const stripePromise = useMemo(() => getStripePromise(), []);

  const [bookingDone, setBookingDone] = useState(false);
  const [completedBookingDetails, setCompletedBookingDetails] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [intentError, setIntentError] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  useEffect(() => {
    const initIntent = async () => {
      if (!bookingId) {
        return;
      }

      setIsCreatingIntent(true);
      setIntentError('');

      const bookerEmail = bookingDetails?.bookerDetails?.email || bookingDetails?.email || null;
      const bookerPhone = bookingDetails?.bookerDetails?.phone || bookingDetails?.phone || null;

      const result = await createPaymentIntent(bookingId, {
        bookerEmail,
        bookerPhone,
      });

      if (result.success) {
        setClientSecret(result?.data?.clientSecret || '');
      } else {
        setIntentError(result.message || 'Failed to initialize payment.');
      }

      setIsCreatingIntent(false);
    };

    initIntent();
  }, [bookingId, bookingDetails]);

  const handleProceed = (updatedBookingDetails) => {
    setCompletedBookingDetails(updatedBookingDetails);
    setBookingDone(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={3} />

      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-gray-100 border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">Payment Information</h1>
        <button
          onClick={() => navigate('/passenger-details')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">
        <BookingSummaryPanel isHourlyRide={isHourlyRide} bookingDetails={bookingDetails} />

        {intentError ? (
          <p className="text-sm text-red-500">{intentError}</p>
        ) : null}

        {isCreatingIntent ? (
          <div className="w-full md:w-[62%] flex items-center justify-center text-sm text-gray-500">
            Preparing payment...
          </div>
        ) : stripePromise && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentFormPanel
              bookingId={bookingId}
              bookingDetails={bookingDetails}
              onProceed={handleProceed}
            />
          </Elements>
        ) : (
          <div className="w-full md:w-[62%] flex items-center justify-center text-sm text-gray-500">
            Payment is not available yet.
          </div>
        )}
      </div>

      <Footer />

      <BookingSuccessModal
        show={bookingDone}
        bookingDetails={completedBookingDetails || bookingDetails}
      />
    </div>
  );
}
