import { initialOnboardingForm } from './onboardingForm'

export const driverStoreInitialState = {
	profile: null,
	onboarding: null,
	onboardingForm: initialOnboardingForm,
	isOnboardingLoading: false,
	isOnboardingSaving: false,
	onboardingUploads: {},
	onboardingError: null,
	rides: [],
	pagination: null,
	selectedRide: null,
	currentRideTab: 'upcoming',
	isLoading: false,
	error: null,
	ridesFilter: {
		page: 1,
		limit: 10,
		tab: 'upcoming',
		scope: 'mine',
	},
}
