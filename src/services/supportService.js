import api from './api'
import { withDataResponse } from './apiRequest'

export function normalizeSupportRequestPayload(payload = {}) {
	return {
		firstName: payload.firstName?.trim() || '',
		lastName: payload.lastName?.trim() || '',
		email: payload.email?.trim() || '',
		phone: payload.phone?.trim() || '',
		description: payload.description?.trim() || '',
	}
}

export async function createSupportRequest(payload) {
	return withDataResponse(
		() => api.post('/api/support/', normalizeSupportRequestPayload(payload)),
		'Failed to submit support request.',
	)
}
