import axios from 'axios'

export const AUTH_STORAGE_KEY = 'limoServicesAuthState'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || '',
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use((config) => {
	if (config.headers?.Authorization) {
		return config
	}

	const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY)

	if (!rawAuth) {
		return config
	}

	try {
		const parsedAuth = JSON.parse(rawAuth)
		const token = parsedAuth?.token

		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			}
		}
	} catch {
		return config
	}

	return config
})

export function setAuthToken(token) {
	if (token) {
		api.defaults.headers.common.Authorization = `Bearer ${token}`
		return
	}

	delete api.defaults.headers.common.Authorization
}

export function getApiErrorMessage(error) {
	if (!error) {
		return null
	}

	if (typeof error === 'string') {
		return error
	}

	const responseMessage = error?.response?.data?.message

	if (responseMessage) {
		return responseMessage
	}

	return error?.message || 'Request failed'
}

export default api
