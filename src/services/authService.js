import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData, withMessageResponse } from './apiRequest'

function normalizeLoginResponse(data) {
	return {
		token: data?.token ?? null,
		user: data?.user ?? null,
		message: data?.message ?? '',
		destination: data?.destination ?? null,
		raw: data ?? null,
	}
}

async function registerWithRole(payload, role) {
	try {
		const response = await api.post('/api/auth/register', {
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			phone: payload.phone,
			password: payload.password,
			location: payload.location || 'Houston',
			role,
		})
		const data = parseApiData(response)
		return { success: isApiSuccess(data), message: data.message ?? '', raw: data }
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Registration failed. Please try again.',
			raw: error?.response?.data ?? null,
		}
	}
}

export async function registerUser(payload) {
	return registerWithRole(payload, 'customer')
}

export async function registerDriver(payload) {
	return registerWithRole(payload, 'driver')
}

export async function verifyOtp(email, otp) {
	return withMessageResponse(() => api.post('/api/auth/verify-otp', { email, otp }), 'OTP verification failed.')
}

export async function resendOtp(email) {
	return withMessageResponse(() => api.post('/api/auth/resend-otp', { email }), 'Failed to resend OTP.')
}

async function loginWithCredentials(credentials) {
	try {
		const response = await api.post('/api/auth/login', {
			email: credentials.email,
			password: credentials.password,
		})
		const data = parseApiData(response)
		return { success: isApiSuccess(data), ...normalizeLoginResponse(data) }
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Login failed. Please try again.',
			token: null,
			user: null,
			destination: null,
			raw: error?.response?.data ?? null,
		}
	}
}

export async function loginUser(credentials) {
	return loginWithCredentials(credentials)
}

export async function loginDriver(credentials) {
	return loginWithCredentials(credentials)
}

export async function forgotPassword(email) {
	return withMessageResponse(() => api.post('/api/auth/forgot-password', { email }), 'Failed to send reset code.')
}

export async function verifyResetOtp(email, otp) {
	return withMessageResponse(
		() => api.post('/api/auth/verify-reset-otp', { email, otp }),
		'OTP verification failed.',
	)
}

export async function resetPassword(email, password, confirmPassword) {
	return withMessageResponse(
		() => api.post('/api/auth/reset-password', { email, password, confirmPassword }),
		'Password reset failed.',
	)
}
