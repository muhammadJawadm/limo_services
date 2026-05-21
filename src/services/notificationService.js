import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData } from './apiRequest'

async function fetchNotifications(endpoint, errorMessage) {
	try {
		const response = await api.get(endpoint)
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: data.data ?? [],
			count: data.count ?? 0,
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || errorMessage,
			data: [],
			count: 0,
			raw: error?.response?.data ?? null,
		}
	}
}

export async function getDriverNotifications() {
	return fetchNotifications('/api/notifications/driver', 'Failed to fetch driver notifications.')
}

export async function getCustomerNotifications() {
	return fetchNotifications('/api/notifications/customer', 'Failed to fetch customer notifications.')
}
