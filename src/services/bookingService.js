import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData, withDataResponse, withMessageResponse } from './apiRequest'

export async function createGuestBooking(payload) {
	return withDataResponse(() => api.post('/api/bookings/guest', payload), 'Failed to create booking.')
}

export async function createBooking(payload) {
	return withDataResponse(() => api.post('/api/bookings', payload), 'Failed to create booking.')
}

export async function createFullBooking(payload) {
	return withDataResponse(() => api.post('/api/bookings/full', payload), 'Failed to create booking.')
}

export async function createBookingStep1(payload) {
	return withDataResponse(() => api.post('/api/bookings/step1', payload), 'Failed to create booking draft.')
}

export async function getMyBookings({ tab = 'upcoming', page = 1, limit = 10 } = {}) {
	try {
		const response = await api.get('/api/bookings/me', {
			params: { tab, page, limit },
		})
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: data.data ?? [],
			tab: data.tab ?? tab,
			pagination: data.pagination ?? null,
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to fetch bookings.',
			data: [],
			tab: 'upcoming',
			pagination: null,
			raw: error?.response?.data ?? null,
		}
	}
}

export async function getBookingById(id) {
	return withDataResponse(() => api.get(`/api/bookings/${id}`), 'Failed to fetch booking.', {
		includeMessage: false,
	})
}

export async function updateBooking(id, payload) {
	return withDataResponse(() => api.patch(`/api/bookings/${id}`, payload), 'Failed to update booking.')
}

export async function updateBookingStep2(id, payload) {
	return withDataResponse(
		() => api.patch(`/api/bookings/${id}/step2`, payload),
		'Failed to update booking vehicle selection.',
	)
}

export async function updateBookingStep3(id, payload) {
	return withDataResponse(
		() => api.patch(`/api/bookings/${id}/step3`, payload),
		'Failed to update child seat details.',
	)
}

export async function updateBookingStep4(id, payload) {
  return withDataResponse(
    () => api.patch(`/api/bookings/${id}/step4`, payload),
    'Failed to update booker details.',
  )
}

export async function updateBookingStep5(id, payload) {
	return withDataResponse(
		() => api.patch(`/api/bookings/${id}/step5`, payload),
		'Failed to update payment details.',
	)
}

export async function deleteBooking(id) {
	return withMessageResponse(() => api.delete(`/api/bookings/${id}`), 'Failed to cancel booking.')
}

export async function cancelBooking(id) {
	return withDataResponse(
		() => api.patch(`/api/bookings/${id}`, { rideStatus: 'cancelled' }),
		'Failed to cancel booking.',
	)
}

export async function updateBookingFull(id, payload) {
	return withDataResponse(() => api.patch(`/api/bookings/${id}/full`, payload), 'Failed to update booking.')
}
