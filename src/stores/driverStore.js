import { create } from 'zustand'
import {
	getDriverRides as getDriverRidesRequest,
	getDriverRideById as getDriverRideByIdRequest,
	
	updateRideStatus as updateRideStatusRequest,
	cancelDriverRide as cancelDriverRideRequest,
	getDriverProfile as getDriverProfileRequest,
	getDriverOnboarding as getDriverOnboardingRequest,
	updateOnboardingStep as updateOnboardingStepRequest,
	submitOnboarding as submitOnboardingRequest,
	uploadOnboardingDocument as uploadOnboardingDocumentRequest,
} from '../services/driverService'
import { STEP_SLUG_BY_NUMBER } from './driver/constants'
import { buildStepPayload } from './driver/onboardingPayload'
import { mapOnboardingToFormData } from './driver/onboardingForm'
import { driverStoreInitialState } from './driver/initialState'

export const useDriverStore = create((set, get) => ({
	...driverStoreInitialState,

	fetchProfile: async () => {
		set({ isLoading: true, error: null })
		const result = await getDriverProfileRequest()
		if (result.success) {
			set({ profile: result.data, isLoading: false })
		} else {
			set({ isLoading: false, error: result.message || 'Failed to load profile.' })
		}
		return result
	},

	fetchOnboarding: async () => {
		set({ isOnboardingLoading: true, onboardingError: null })
		const result = await getDriverOnboardingRequest()
		if (result.success) {
			set({
				onboarding: result.data,
				onboardingForm: mapOnboardingToFormData(result.data),
				isOnboardingLoading: false,
			})
		} else {
			set({
				isOnboardingLoading: false,
				onboardingError: result.message || 'Failed to load onboarding.',
			})
		}
		return result
	},

	setOnboardingForm: (nextForm) => set({ onboardingForm: nextForm }),

	updateOnboardingForm: (key, value) =>
		set((state) => ({ onboardingForm: { ...state.onboardingForm, [key]: value } })),

	clearOnboardingError: () => set({ onboardingError: null }),

	setRequiredDocument: (docKey, value) =>
		set((state) => ({
			onboardingForm: {
				...state.onboardingForm,
				requiredDocuments: {
					...state.onboardingForm.requiredDocuments,
					[docKey]: {
						...state.onboardingForm.requiredDocuments[docKey],
						...value,
					},
				},
			},
		})),

	setOnboardingUploadState: (uploadKey, nextState) =>
		set((state) => ({
			onboardingUploads: {
				...state.onboardingUploads,
				[uploadKey]: {
					...state.onboardingUploads[uploadKey],
					...nextState,
				},
			},
		})),

	uploadRequiredDocument: async ({ docKey, file, docType }) => {
		set((state) => ({
			onboardingUploads: {
				...state.onboardingUploads,
				[docKey]: { isUploading: true, error: null },
			},
		}))

		const result = await uploadOnboardingDocumentRequest({
			file,
			folder: 'driver_onboarding',
			docType,
		})

		if (result.success) {
			set((state) => ({
				onboardingForm: {
					...state.onboardingForm,
					requiredDocuments: {
						...state.onboardingForm.requiredDocuments,
						[docKey]: {
							...state.onboardingForm.requiredDocuments[docKey],
							fileUrl: result.url,
							publicId: result.publicId,
							status: 'uploaded',
						},
					},
				},
				onboardingUploads: {
					...state.onboardingUploads,
					[docKey]: { isUploading: false, error: null },
				},
			}))
		} else {
			set((state) => ({
				onboardingUploads: {
					...state.onboardingUploads,
					[docKey]: { isUploading: false, error: result.message || 'Upload failed' },
				},
			}))
		}

		return result
	},

	saveOnboardingStep: async (stepNumber) => {
		const slug = STEP_SLUG_BY_NUMBER[stepNumber]
		if (!slug) return { success: true }

		const payload = buildStepPayload(stepNumber, get().onboardingForm)
		if (!payload) return { success: true }

		set({ isOnboardingSaving: true, onboardingError: null })
		const result = await updateOnboardingStepRequest(slug, payload)

		if (result.success) {
			set({ isOnboardingSaving: false })
		} else {
			set({
				isOnboardingSaving: false,
				onboardingError: result.message || 'Failed to save onboarding step.',
			})
		}
		return result
	},

	submitOnboardingForm: async () => {
		set({ isOnboardingSaving: true, onboardingError: null })
		const result = await submitOnboardingRequest()
		if (result.success) {
			set({ isOnboardingSaving: false })
		} else {
			set({
				isOnboardingSaving: false,
				onboardingError: result.message || 'Failed to submit onboarding.',
			})
		}
		return result
	},

	fetchRides: async (overrides = {}) => {
		const filter = { ...get().ridesFilter, ...overrides }
		set({ isLoading: true, error: null, ridesFilter: filter })

		const result = await getDriverRidesRequest(filter)
		if (result.success) {
			const tabFromResponse = result.raw?.tab ?? filter.tab
			set({ rides: result.data, pagination: result.pagination, currentRideTab: tabFromResponse, isLoading: false })
		} else {
			set({ isLoading: false, error: result.message || 'Failed to load rides.' })
		}
		return result
	},

	fetchRideById: async (rideId) => {
		set({ isLoading: true, error: null })
		const result = await getDriverRideByIdRequest(rideId)
		if (result.success) {
			set({ selectedRide: result.data, isLoading: false })
		} else {
			set({ isLoading: false, error: result.message || 'Failed to load ride.' })
		}
		return result
	},

	

	updateRideStatus: async (rideId, rideStatus) => {
		set({ isLoading: true, error: null })
		const result = await updateRideStatusRequest(rideId, rideStatus)
		if (result.success) {
			set((state) => ({
				isLoading: false,
				rides: state.rides.map((r) =>
					r._id === rideId || r.id === rideId ? { ...r, rideStatus } : r
				),
			}))
		} else {
			set({ isLoading: false, error: result.message || 'Failed to update ride status.' })
		}
		return result
	},

	cancelRide: async (rideId) => {
		set({ isLoading: true, error: null })
		const result = await cancelDriverRideRequest(rideId)
		if (result.success) {
			set((state) => ({
				isLoading: false,
				rides: state.rides.map((r) =>
					r._id === rideId || r.id === rideId ? { ...r, rideStatus: 'cancelled' } : r
				),
			}))
		} else {
			set({ isLoading: false, error: result.message || 'Failed to cancel ride.' })
		}
		return result
	},

	setSelectedRide: (ride) => set({ selectedRide: ride }),
	clearError: () => set({ error: null }),
	reset: () => set({ ...driverStoreInitialState }),
}))
