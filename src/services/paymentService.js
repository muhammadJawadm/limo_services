import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData } from './apiRequest'

function buildPaymentPayload(bookingId, { bookerEmail = null, bookerPhone = null } = {}) {
	const payload = { bookingId }
	if (bookerEmail) payload.bookerEmail = bookerEmail
	if (bookerPhone) payload.bookerPhone = bookerPhone
	return payload
}

export async function createPaymentIntent(bookingId, options = {}) {
	try {
		const response = await api.post(
			'/api/payments/create-payment-intent',
			buildPaymentPayload(bookingId, options),
		)
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data,
			message: data.message ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to create payment intent.',
			data: null,
			raw: error?.response?.data ?? null,
		}
	}
}

export async function confirmPayment(bookingId, paymentIntentId, options = {}) {
	try {
		const response = await api.post('/api/payments/confirm', {
			...buildPaymentPayload(bookingId, options),
			paymentIntentId,
		})
		const data = parseApiData(response)
		const payoutData = data.data?.payout ?? data.payout ?? null
		return {
			success: isApiSuccess(data),
			data: data.data ?? null,
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
