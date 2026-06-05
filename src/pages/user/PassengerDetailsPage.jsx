import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import StepperNavbar from '../../components/StepperNavbar';
import Footer from '../../components/Footer';
import TripSummaryPanel from '../../components/passenger-details/TripSummaryPanel';
import PassengerFormPanel from '../../components/passenger-details/PassengerFormPanel';
import DeleteConfirmModal from '../../components/passenger-details/DeleteConfirmModal';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { useAuthStore } from '../../stores/authStore';
import { updateBookingStep4 } from '../../services/bookingService';
import { persistBookingSession } from '../../utils/bookingSession';

export default function PassengerDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isHourlyRide, bookingId, bookingDetails } = useBookingFlow(location.state);
  const { user, isAuthenticated } = useAuthStore();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLoggedInContinue = async () => {
    if (!termsAccepted) {
      setSubmitError('Please accept the Terms and Conditions before continuing.');
      return;
    }

    if (!bookingId) {
      setSubmitError('Booking id is missing. Please start a new booking.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    const result = await updateBookingStep4(bookingId, {
      bookerDetails: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
      },
    });

    if (!result?.success) {
      setSubmitError(result?.message || 'Failed to update booker details.');
      setIsSubmitting(false);
      return;
    }

    persistBookingSession({ bookingDraft: result?.data ?? null });
    setIsSubmitting(false);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepperNavbar currentStep={2} />

      <div className="flex items-center justify-between px-4 md:px-16 py-4 bg-[#EAEAEA] border-b border-gray-200">
        <h1 className="text-base md:text-lg font-bold text-gray-900">
          {isAuthenticated ? 'Review Booking' : 'Booker Information'}
        </h1>

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

        {isAuthenticated ? (
          <div className="w-full md:w-[62%] flex flex-col gap-5 rounded-2xl">
            <div className="bg-white/70 rounded-2xl shadow-sm border border-gray-100 px-6 py-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Continue as {user?.firstName || 'Logged-in User'}
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Your account details will be used for this booking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Name</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {[user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'N/A'}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <p className="text-sm font-semibold text-gray-800 break-all">
                    {user?.email || 'N/A'}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.phone || 'N/A'}
                  </p>
                </div>
              </div>

              {submitError ? (
                <p className="text-sm text-red-500 mb-3">{submitError}</p>
              ) : null}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (submitError) setSubmitError('');
                    }}
                    className="w-4 h-4 accent-[#1a2b5e]"
                  />

                  <span>
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      target="_blank"
                      className="font-semibold text-[#1a2b5e] underline hover:text-[#253576]"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </label>

                <button
                  onClick={handleLoggedInContinue}
                  disabled={isSubmitting || !termsAccepted}
                  className={`flex items-center justify-center gap-2 text-sm font-bold px-8 py-3 rounded-full transition-colors ${
                    isSubmitting || !termsAccepted
                      ? 'bg-[#1a2b5e]/40 text-white cursor-not-allowed blur-[0.3px]'
                      : 'bg-[#1a2b5e] text-white hover:bg-[#253576]'
                  }`}
                >
                  {isSubmitting ? 'Saving...' : 'Continue to Payment'}
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <PassengerFormPanel bookingId={bookingId} bookingDetails={bookingDetails} />
        )}
      </div>

      <Footer />

      <DeleteConfirmModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}