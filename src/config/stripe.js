import { loadStripe } from '@stripe/stripe-js'

let stripePromise = null

export function getStripePromise() {
	if (stripePromise) {
		return stripePromise
	}

	const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
	stripePromise = key ? loadStripe(key) : null
	return stripePromise
}
