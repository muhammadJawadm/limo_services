import { Elements } from '@stripe/react-stripe-js'
import PaymentFormPanel from '../../payment/PaymentFormPanel'
import ReservationAccordion from './ReservationAccordion'

export default function PaymentInfoSection({
	isOpen,
	onToggle,
	showPaymentForm,
	stripePromise,
	paymentClientSecret,
	paymentBookingId,
	paymentBookingDetails,
	onPaymentSuccess,
}) {
	return (
		<ReservationAccordion title="Payment Information" isOpen={isOpen} onToggle={onToggle} contentClassName="p-4 sm:p-5 bg-gray-50/50 min-h-[140px]">
			{!showPaymentForm ? (
				<div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-4 py-8 text-sm text-gray-400">
					Save booking to continue to payment.
				</div>
			) : stripePromise && paymentClientSecret ? (
				<Elements stripe={stripePromise} options={{ clientSecret: paymentClientSecret }}>
					<PaymentFormPanel
						bookingId={paymentBookingId}
						bookingDetails={paymentBookingDetails}
						clientSecret={paymentClientSecret}
						onProceed={onPaymentSuccess}
					/>
				</Elements>
			) : (
				<div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-4 py-8 text-sm text-gray-500">
					Preparing payment...
				</div>
			)}
		</ReservationAccordion>
	)
}
