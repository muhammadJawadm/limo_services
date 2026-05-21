import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData, withDataResponse, withMessageResponse } from './apiRequest'

export async function getDriverProfile() {
	return withDataResponse(() => api.get('/api/driver/profile'), 'Failed to fetch driver profile.', {
		includeMessage: false,
	})
}

export async function updateDriverProfile(payload) {
	return withDataResponse(() => api.patch('/api/driver/profile', payload), 'Failed to update driver profile.')
}

export async function getDriverOnboarding() {
	return withDataResponse(() => api.get('/api/driver/onboarding'), 'Failed to fetch onboarding data.', {
		includeMessage: false,
	})
}

export async function getDriverOnboardingStep(step) {
	return withDataResponse(() => api.get(`/api/driver/onboarding/${step}`), 'Failed to fetch onboarding step.', {
		includeMessage: false,
	})
}

export async function updateOnboardingStep(step, payload) {
	return withDataResponse(
		() => api.patch(`/api/driver/onboarding/${step}`, payload),
		'Failed to update onboarding step.',
	)
}

export async function updateDriverOnboarding(payload) {
	return withDataResponse(() => api.patch('/api/driver/onboarding', payload), 'Failed to update onboarding.')
}

export async function createDriverConnectLink() {
	try {
		const response = await api.post('/api/payments/driver/connect')
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: data.data ?? null,
			url: data.url ?? data.data?.url ?? '',
			message: data.message ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to create onboarding link.',
			data: null,
			url: '',
			raw: error?.response?.data ?? null,
		}
	}
}

export async function getDriverConnectStatus() {
	try {
		const response = await api.get('/api/payments/driver/connect/status')
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: data.data ?? null,
			onboarded: Boolean(data.onboarded ?? data.data?.onboarded ?? false),
			message: data.message ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to fetch onboarding status.',
			data: null,
			onboarded: false,
			raw: error?.response?.data ?? null,
		}
	}
}

export async function submitOnboarding() {
	return withMessageResponse(() => api.post('/api/driver/onboarding/submit'), 'Failed to submit onboarding.')
}

export async function uploadOnboardingDocument({ file, folder = 'driver_onboarding', docType = '' }) {
	try {
		const formData = new FormData()
		formData.append('file', file)
		if (folder) formData.append('folder', folder)
		if (docType) formData.append('docType', docType)

		const response = await api.post('/api/driver/onboarding/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			url: data.url ?? '',
			publicId: data.publicId ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to upload document.',
			raw: error?.response?.data ?? null,
		}
	}
}

export async function getDriverRides({ page = 1, limit = 10, tab = 'upcoming', scope = 'all' } = {}) {
	try {
		const response = await api.get('/api/driver/rides', {
			params: { page, limit, tab, scope },
		})
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: data.data ?? [],
			pagination: {
				page: data.page ?? page,
				limit: data.limit ?? limit,
				total: data.total ?? 0,
				totalPages: data.totalPages ?? 0,
			},
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to fetch rides.',
			data: [],
			pagination: null,
			raw: error?.response?.data ?? null,
		}
	}
}

export async function getDriverRideById(rideId) {
	return withDataResponse(() => api.get(`/api/driver/rides/${rideId}`), 'Failed to fetch ride.', {
		includeMessage: false,
	})
}

export async function assignRideToMe(rideId) {
	return withDataResponse(() => api.patch(`/api/driver/rides/${rideId}/assign`), 'Failed to assign ride.')
}

export async function confirmDriverRidePickup(rideId) {
	return withDataResponse(
		() => api.patch(`/api/driver/rides/${rideId}/confirm-pickup`),
		'Failed to confirm ride pickup.',
	)
}

export async function updateRideStatus(rideId, rideStatus) {
	return withDataResponse(
		() => api.patch(`/api/driver/rides/${rideId}/status`, { rideStatus }),
		'Failed to update ride status.',
	)
}

export async function cancelDriverRide(rideId) {
	return withDataResponse(
		() => api.patch(`/api/driver/rides/${rideId}/cancel-trip`),
		'Failed to cancel ride.',
	)
}
