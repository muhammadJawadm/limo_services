import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useAuthStore } from '../../stores/authStore';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isHourlyRide, bookingId, bookingDetails } = useBookingFlow(location.state);
  const { isAuthenticated } = useAuthStore();

  const stripePromise = useMemo(() => getStripePromise(), []);

  const [bookingDone, setBookingDone] = useState(false);
  const [completedBookingDetails, setCompletedBookingDetails] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [intentError, setIntentError] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  const lastIntentKeyRef = useRef('');

  const bookerEmail =
    bookingDetails?.bookerDetails?.email ||
    bookingDetails?.bookerEmail ||
    '';

  const bookerPhone =
    bookingDetails?.bookerDetails?.phone ||
    bookingDetails?.bookerPhone ||
    '';

  useEffect(() => {
    const initIntent = async () => {
      if (!bookingId) {
        return;
      }

      // Important: do not call payment API until bookingDetails is actually loaded.
      if (!bookingDetails) {
        return;
      }

      const isGuestCheckout = !isAuthenticated;

      // Guest must have booker email and phone before creating payment intent.
      if (isGuestCheckout && (!bookerEmail || !bookerPhone)) {
        setClientSecret('');
        setIntentError('Booker email and phone are required before payment.');
        return;
      }

      const intentKey = `${bookingId}-${isGuestCheckout ? 'guest' : 'auth'}-${bookerEmail}-${bookerPhone}`;

      // Prevent repeated calls for the same valid data.
      if (lastIntentKeyRef.current === intentKey) {
        return;
      }

      lastIntentKeyRef.current = intentKey;

      setIsCreatingIntent(true);
      setIntentError('');
      setClientSecret('');

      const result = await createPaymentIntent(bookingId, {
        bookerDetails: isGuestCheckout
          ? {
              email: bookerEmail,
              phone: bookerPhone,
            }
          : null,
      });

      if (result.success && result.clientSecret) {
        setClientSecret(result.clientSecret);
        setIntentError('');
      } else {
        setClientSecret('');
        setIntentError(result.message || 'Failed to initialize payment.');
      }

      setIsCreatingIntent(false);
    };

    initIntent();
  }, [bookingId, bookingDetails, isAuthenticated, bookerEmail, bookerPhone]);

  const handleProceed = (updatedBookingDetails) => {
    setCompletedBookingDetails(updatedBookingDetails);
    setBookingDone(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={3} />

      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-gray-100 border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">
          Payment Information
        </h1>

        <button
          onClick={() => navigate('/passenger-details')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a2b5e] font-medium transition-colors"
        >
          <FiChevronLeft size={18} /> Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 gap-6 px-4 md:px-16 py-6 max-w-7xl mx-auto w-full">
        <BookingSummaryPanel
          isHourlyRide={isHourlyRide}
          bookingDetails={bookingDetails}
        />

        <div className="w-full md:w-[62%]">
          {intentError ? (
            <p className="text-sm text-red-500 mb-3">{intentError}</p>
          ) : null}

          {isCreatingIntent ? (
            <div className="w-full flex items-center justify-center text-sm text-gray-500">
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
            <div className="w-full flex items-center justify-center text-sm text-gray-500">
              Payment is not available yet.
            </div>
          )}
        </div>
      </div>

      <Footer />

      <BookingSuccessModal
        show={bookingDone}
        bookingDetails={completedBookingDetails || bookingDetails}
      />
    </div>
  );
}