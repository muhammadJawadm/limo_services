import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData } from './apiRequest'

export async function getRideChatMessages(rideId) {
	if (!rideId) {
		return { success: false, message: 'Ride id is required.', data: [] }
	}

	try {
		const response = await api.get(`/api/chat/messages/${rideId}`)
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: Array.isArray(data.data) ? data.data : [],
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to fetch chat messages.',
			data: [],
			raw: error?.response?.data ?? null,
		}
	}
}
