import { useState } from 'react';
import { BsCreditCard, BsShieldCheck, BsInfoCircle, BsCheck2 } from 'react-icons/bs';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import wallet from '../../assets/wallet.png';
import { confirmPayment } from '../../services/paymentService';

const STRIPE_STYLE = {
  style: {
    base: {
      fontSize: '15px',
      color: '#111111',
      fontFamily: 'inherit',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444', iconColor: '#ef4444' },
  },
};

const StripeField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] font-medium text-gray-500">{label}</label>
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#1a2b5e] focus-within:ring-1 focus-within:ring-[#1a2b5e] transition-all">
      {children}
    </div>
  </div>
);

export default function PaymentFormPanel({ bookingId, bookingDetails, clientSecret, onProceed }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProceed = async () => {
    if (!bookingId) {
      setSubmitError('Booking id is missing. Please start a new booking.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    if (!stripe || !elements) {
      setSubmitError('Stripe is not ready yet. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardNumberElement },
    });

    if (error) {
      setSubmitError(error.message || 'Payment failed.');
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      const confirmResult = await confirmPayment(bookingId, paymentIntent.id, {
        bookerDetails: bookingDetails?.bookerDetails,
      });
      if (!confirmResult?.success) {
        setSubmitError(confirmResult?.message || 'Failed to confirm payment.');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      onProceed({ ...bookingDetails, payout: confirmResult.payout });
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full md:w-[62%]">
      <div className="bg-white/70 rounded-2xl shadow-sm border border-gray-100 px-6 py-5">

        <h2 className="text-xl font-bold text-gray-900 mb-3">Payment Information</h2>

        {/* Security message */}
        <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
          <BsShieldCheck size={17} className="text-green-500 flex-shrink-0" />
          <span>All transactions are secure and encrypted. Safe and secure payments.</span>
        </div>

        {/* Debit Card option (selected) */}
        <div className="border-2 border-[#1a2b5e] rounded-xl px-4 py-3 flex gap-3 mb-5 bg-blue-50/30">
          <div className="w-9 h-9 bg-[#1a2b5e] rounded-lg flex items-center justify-center flex-shrink-0">
            <BsCreditCard size={17} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Debit / Credit Card</p>
            <p className="text-xs text-gray-400">Pay securely with your card</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#1a2b5e] flex items-center justify-center flex-shrink-0">
            <BsCheck2 size={12} className="text-white" />
          </div>
        </div>

        {/* Split card fields */}
        <div className="flex flex-col gap-4 mb-5">
          <StripeField label="Card Number">
            <CardNumberElement options={STRIPE_STYLE} />
          </StripeField>

          <div className="grid grid-cols-2 gap-4">
            <StripeField label="Expiry Date">
              <CardExpiryElement options={STRIPE_STYLE} />
            </StripeField>
            <StripeField label="CVC">
              <CardCvcElement options={STRIPE_STYLE} />
            </StripeField>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-5" />

        {/* Save card info */}
        <div className="flex bg-white items-center gap-3 mb-5 border border-gray-100 rounded-lg px-2 py-1">
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <img src={wallet} alt="Wallet" className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Debit / Credit Card</p>
            <p className="text-xs text-gray-400 mt-0.5">Save your info for faster booking</p>
            <div className="flex items-center gap-1 mt-1 bg-gray-200 px-2 py-1 rounded-lg w-full xl:w-[60%]">
              <BsInfoCircle size={11} className="text-[#1a2b5e] flex-shrink-0" />
              <p className="text-xs text-[#1a2b5e]">ID verification required for credit card payments.</p>
            </div>
          </div>
        </div>

        {/* Billing note */}
        <p className="text-md text-gray-800 mb-4">Billing address is used to verify the credit or debit card.</p>

        {/* Policy checkboxes */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <BsInfoCircle size={13} className="flex-shrink-0 mt-0.5 text-[#1a2b5e]" />
            <span>Please review out cancellation policy before proceeding.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <BsInfoCircle size={13} className="flex-shrink-0 mt-0.5 text-[#1a2b5e]" />
            <span>I agree to the terms and authorize the payment (optional...</span>
          </div>
        </div>

        {/* Proceed to checkout */}
        {submitError && (
          <p className="text-sm text-red-500 mb-3">{submitError}</p>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleProceed}
            className="flex items-center gap-2 bg-[#1a2b5e] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[#253576] transition-colors disabled:opacity-60"
            disabled={isSubmitting || !stripe || !elements}
          >
            {isSubmitting ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
