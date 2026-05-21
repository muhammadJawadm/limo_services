import api from './api'
import { withDataResponse, withMessageResponse } from './apiRequest'

export async function getVehicleCategories({ classification, type, name } = {}) {
	const params = {}
	if (classification) params.classification = classification
	if (type) params.type = type
	if (name) params.name = name

	return withDataResponse(
		() => api.get('/api/vehicle-categories', { params }),
		'Failed to fetch vehicle categories.',
		{ dataFallback: [] },
	)
}

export async function getVehicleCategoryById(id) {
	return withDataResponse(() => api.get(`/api/vehicle-categories/${id}`), 'Failed to fetch vehicle category.', {
		includeMessage: false,
	})
}

export async function createVehicleCategory(payload) {
	return withDataResponse(() => api.post('/api/vehicle-categories', payload), 'Failed to create vehicle category.')
}

export async function updateVehicleCategory(id, payload) {
	return withDataResponse(
		() => api.patch(`/api/vehicle-categories/${id}`, payload),
		'Failed to update vehicle category.',
	)
}

export async function deleteVehicleCategory(id) {
	return withMessageResponse(() => api.delete(`/api/vehicle-categories/${id}`), 'Failed to delete vehicle category.')
}
