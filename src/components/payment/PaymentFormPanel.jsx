import { useState } from 'react';
import { BsCreditCard, BsShieldCheck, BsInfoCircle, BsCheck2 } from 'react-icons/bs';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import wallet from '../../assets/wallet.png';
import { confirmPayment } from '../../services/paymentService';

export default function PaymentFormPanel({ bookingId, bookingDetails, onProceed }) {
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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setSubmitError(error.message || 'Payment failed.');
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      console.log('Payment succeeded with PaymentIntent:', paymentIntent);
      // Extract booker email/phone for guest bookings
      const bookerEmail = bookingDetails?.bookerDetails?.email || bookingDetails?.email;
      const bookerPhone = bookingDetails?.bookerDetails?.phone || bookingDetails?.phone;

      const confirmResult = await confirmPayment(bookingId, paymentIntent.id, {
        bookerEmail: bookerEmail || null,
        bookerPhone: bookerPhone || null,
      });
      if (!confirmResult?.success) {
        console.error('Error confirming payment:', confirmResult);
        setSubmitError(confirmResult?.message || 'Failed to confirm payment.');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      // Pass booking details with payout status
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
        <div className="border-2 border-[#1a2b5e] rounded-xl px-4 py-3 flex  gap-3 mb-5 bg-blue-50/30">
          <div className="w-9 h-9 bg-[#1a2b5e] rounded-lg flex items-center justify-center flex-shrink-0">
            <BsCreditCard size={17} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Debit Card</p>
            <p className="text-xs text-gray-400">Pay directly form your bank</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#1a2b5e] flex items-center justify-center flex-shrink-0">
            <BsCheck2 size={12} className="text-white" />
          </div>
        </div>

        {/* Stripe Payment Element */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="rounded-xl border border-gray-200/80 bg-white p-4">
            <PaymentElement />
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
            <p className="text-sm font-semibold text-gray-900">Created card</p>
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
        {submitError ? (
          <p className="text-sm text-red-500 mb-3">{submitError}</p>
        ) : null}
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
