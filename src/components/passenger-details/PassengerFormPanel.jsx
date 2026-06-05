import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { LuUser } from 'react-icons/lu';
import { FloatingInput, PhoneInput } from './FormInputs';
import { updateBookingStep4 } from '../../services/bookingService';
import { persistBookingSession } from '../../utils/bookingSession';

export default function PassengerFormPanel({ bookingId }) {
  const navigate = useNavigate();

  const [bFirstName, setBFirstName] = useState('');
  const [bLastName, setBLastName] = useState('');
  const [bEmail, setBEmail] = useState('');
  const [bPhone, setBPhone] = useState('');
  const [bDial, setBDial] = useState('+1');

  const [notes, setNotes] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getBookerDetails = () => ({
    firstName: bFirstName.trim(),
    lastName: bLastName.trim(),
    email: bEmail.trim(),
    phone: `${bDial}${bPhone}`.trim(),
  });

  const validateBookerDetails = (details) => {
    const missingFields = [];

    if (!details.firstName) missingFields.push('first name');
    if (!details.lastName) missingFields.push('last name');
    if (!details.email) missingFields.push('email');
    if (!details.phone || details.phone === bDial) missingFields.push('phone');

    if (missingFields.length > 0) {
      setSubmitError(`Please fill in your ${missingFields.join(', ')}.`);
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (!bookingId) {
      setSubmitError('Booking id is missing. Please start a new booking.');
      return;
    }

    setSubmitError('');

    const bookerDetails = getBookerDetails();

    if (!validateBookerDetails(bookerDetails)) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      bookerDetails,
      specialInstructions: notes.trim(),
    };

    const result = await updateBookingStep4(bookingId, payload);

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
    <div className="w-full md:w-[62%] flex flex-col gap-5 rounded-2xl">
      <div className="bg-white/50 rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Guest Booker Details
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Please enter your contact details to continue as a guest.
        </p>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FloatingInput
              icon={<LuUser size={16} />}
              placeholder="First Name"
              value={bFirstName}
              onChange={(e) => setBFirstName(e.target.value)}
              required
            />

            <FloatingInput
              icon={<LuUser size={16} />}
              placeholder="Last Name"
              value={bLastName}
              onChange={(e) => setBLastName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FloatingInput
              icon={<MdOutlineEmail size={17} />}
              placeholder="Email"
              type="email"
              value={bEmail}
              onChange={(e) => setBEmail(e.target.value)}
              required
            />

            <PhoneInput
              value={bPhone}
              onChange={(e) => setBPhone(e.target.value)}
              dialCode={bDial}
              onDialChange={setBDial}
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mt-5 mb-2">
          Trip Notes
        </h3>

        <textarea
          rows={3}
          placeholder="Any special requests or notes for the driver..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2b5e] resize-none bg-white transition-colors"
        />

        {submitError ? (
          <p className="text-sm text-red-500 mt-3">{submitError}</p>
        ) : null}

        <div className="flex justify-end mt-4">
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Continue to Payment'}
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}