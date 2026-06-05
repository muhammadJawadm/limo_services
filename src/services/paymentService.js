import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData } from './apiRequest'

function buildPaymentPayload(
	bookingId,
	{
		bookerDetails = null,
		bookerEmail = null,
		bookerPhone = null,
	} = {},
) {
	const payload = { bookingId }

	const resolvedBookerEmail =
		bookerDetails?.email ||
		bookerEmail ||
		null

	const resolvedBookerPhone =
		bookerDetails?.phone ||
		bookerPhone ||
		null

	// New clean format
	if (resolvedBookerEmail || resolvedBookerPhone) {
		payload.bookerDetails = {}

		if (resolvedBookerEmail) {
			payload.bookerDetails.email = resolvedBookerEmail
		}

		if (resolvedBookerPhone) {
			payload.bookerDetails.phone = resolvedBookerPhone
		}
	}

	// Optional backward compatibility
	if (resolvedBookerEmail) {
		payload.bookerEmail = resolvedBookerEmail
	}

	if (resolvedBookerPhone) {
		payload.bookerPhone = resolvedBookerPhone
	}

	return payload
}

function getClientSecret(data) {
	return (
		data?.data?.clientSecret ||
		data?.clientSecret ||
		''
	)
}

export async function createPaymentIntent(bookingId, options = {}) {
	try {
		if (!bookingId) {
			return {
				success: false,
				message: 'Booking id is required.',
				data: null,
				clientSecret: '',
				raw: null,
			}
		}

		const response = await api.post(
			'/api/payments/create-payment-intent',
			buildPaymentPayload(bookingId, options),
		)

		const data = parseApiData(response)
		const clientSecret = getClientSecret(data)

		return {
			success: isApiSuccess(data) && Boolean(clientSecret),
			data,
			clientSecret,
			message: data.message ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to create payment intent.',
			data: null,
			clientSecret: '',
			raw: error?.response?.data ?? null,
		}
	}
}

export async function confirmPayment(bookingId, paymentIntentId, options = {}) {
	try {
		if (!bookingId) {
			return {
				success: false,
				message: 'Booking id is required.',
				data: null,
				payout: null,
				raw: null,
			}
		}

		if (!paymentIntentId) {
			return {
				success: false,
				message: 'Payment intent id is required.',
				data: null,
				payout: null,
				raw: null,
			}
		}

		const response = await api.post('/api/payments/confirm', {
			...buildPaymentPayload(bookingId, options),
			paymentIntentId,
		})

		const data = parseApiData(response)
		const payoutData = data?.data?.payout ?? data?.payout ?? null

		return {
			success: isApiSuccess(data),
			data: data?.data ?? data ?? null,
			payout: payoutData,
			message: data.message ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to confirm payment.',
			data: null,
			payout: null,
			raw: error?.response?.data ?? null,
		}
	}
}