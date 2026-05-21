import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
	loginUser as loginUserRequest,
	loginDriver as loginDriverRequest,
	registerUser as registerUserRequest,
	registerDriver as registerDriverRequest,
	verifyOtp as verifyOtpRequest,
	resendOtp as resendOtpRequest,
	forgotPassword as forgotPasswordRequest,
	verifyResetOtp as verifyResetOtpRequest,
	resetPassword as resetPasswordRequest,
} from '../services/authService'
import { AUTH_STORAGE_KEY, setAuthToken } from '../services/api'
import { authInitialState, buildAuthState } from './auth/authState'

export const useAuthStore = create(
	persist(
		(set) => ({
			...authInitialState,

			registerUser: async (payload) => {
				set({ isLoading: true, error: null })
				const result = await registerUserRequest(payload)
				if (result.success) {
					set({ isLoading: false, error: null, email: payload.email })
					return result
				}
				set({ isLoading: false, error: result.message || 'Registration failed.' })
				return result
			},

			registerDriver: async (payload) => {
				set({ isLoading: true, error: null })
				const result = await registerDriverRequest(payload)
				if (result.success) {
					set({ isLoading: false, error: null, email: payload.email })
					return result
				}
				set({ isLoading: false, error: result.message || 'Registration failed.' })
				return result
			},

			verifyOtp: async (email, otp) => {
				set({ isLoading: true, error: null })
				const result = await verifyOtpRequest(email, otp)
				set({ isLoading: false, error: result.success ? null : result.message || 'OTP verification failed.' })
				return result
			},

			resendOtp: async (email) => {
				set({ isLoading: true, error: null })
				const result = await resendOtpRequest(email)
				set({ isLoading: false, error: result.success ? null : result.message || 'Failed to resend OTP.' })
				return result
			},

			loginUser: async (credentials) => {
				set({ isLoading: true, error: null })
				const result = await loginUserRequest(credentials)
				if (result.success && result.token) {
					setAuthToken(result.token)
					set(buildAuthState(result, credentials.email))
					return result
				}
				set({ isLoading: false, error: result.message || 'Login failed. Please try again.' })
				return result
			},

			loginDriver: async (credentials) => {
				set({ isLoading: true, error: null })
				const result = await loginDriverRequest(credentials)
				if (result.success && result.token) {
					setAuthToken(result.token)
					set({ ...buildAuthState(result, credentials.email), role: result.user?.role ?? 'driver' })
					return result
				}
				set({ isLoading: false, error: result.message || 'Login failed. Please try again.' })
				return result
			},

			forgotPassword: async (email) => {
				set({ isLoading: true, error: null })
				const result = await forgotPasswordRequest(email)
				if (result.success) {
					set({ isLoading: false, error: null, resetEmail: email })
					return result
				}
				set({ isLoading: false, error: result.message || 'Failed to send reset code.' })
				return result
			},

			verifyResetOtp: async (email, otp) => {
				set({ isLoading: true, error: null })
				const result = await verifyResetOtpRequest(email, otp)
				set({ isLoading: false, error: result.success ? null : result.message || 'OTP verification failed.' })
				return result
			},

			resetPassword: async (email, password, confirmPassword) => {
				set({ isLoading: true, error: null })
				const result = await resetPasswordRequest(email, password, confirmPassword)
				if (result.success) {
					set({ isLoading: false, error: null, resetEmail: null })
					return result
				}
				set({ isLoading: false, error: result.message || 'Password reset failed.' })
				return result
			},

			clearError: () => set({ error: null }),

			logout: () => {
				setAuthToken(null)
				set({ ...authInitialState })
			},
		}),
		{
			name: AUTH_STORAGE_KEY,
			partialize: (state) => ({
				user: state.user,
				email: state.email,
				token: state.token,
				role: state.role,
				destination: state.destination,
				isAuthenticated: state.isAuthenticated,
			}),
			onRehydrateStorage: () => (state) => {
				if (state?.token) {
					setAuthToken(state.token)
				}
			},
		},
	),
)
