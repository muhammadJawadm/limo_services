import api from './api'
import { withDataResponse } from './apiRequest'

export async function getCustomerProfile() {
	return withDataResponse(() => api.get('/api/customer/profile'), 'Failed to load customer profile.')
}

export async function updateCustomerProfile(payload) {
	return withDataResponse(
		() => api.patch('/api/customer/profile', payload),
		'Failed to update customer profile.',
	)
}

export async function createGuestBooking(bookingData) {
	return withDataResponse(() => api.post('/api/bookings/guest', bookingData), 'Failed to create guest booking.')
}

export function getBookerDetailsFromForm(formData) {
	return {
		firstName: formData?.firstName || formData?.bookerFirstName || '',
		lastName: formData?.lastName || formData?.bookerLastName || '',
		email: formData?.email || formData?.bookerEmail || '',
		phone: formData?.phone || formData?.bookerPhone || '',
	}
}

export function getPassengerDetailsFromForm(formData) {
	return {
		firstName: formData?.passengerFirstName || formData?.firstName || '',
		lastName: formData?.passengerLastName || formData?.lastName || '',
		email: formData?.passengerEmail || formData?.email || '',
		phone: formData?.passengerPhone || formData?.phone || '',
	}
}
