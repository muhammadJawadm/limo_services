import { toTimeInputValue } from './formTransforms'
import { getRequiredDocumentsDefaults, normalizeRequiredDocuments } from './requiredDocuments'

export const initialOnboardingForm = {
	companyName: '',
	companyType: '',
	country: '',
	street: '',
	zipCode: '',
	city: '',
	stateProvince: '',
	taxId: '',
	businessRegistration: '',
	priorExp: '',
	electricVehicles: '',
	femaleChauffeurs: '',
	chauffeurCount: '',
	firstClassCount: '',
	businessVansCount: '',
	fleetDescription: '',
	sameAsRep: false,
	chauffeurFirstName: '',
	chauffeurLastName: '',
	chauffeurEmail: '',
	chauffeurPhone: '',
	driverLicenseId: '',
	vehicleYear: '',
	vehicleBrand: '',
	vehicleClass: '',
	vehicleColor: '',
	passengerCount: '',
	luggageCount: '',
	wifi: '',
	numberPlate: '',
	vin: '',
	contractPlace: '',
	contractAgreed: false,
	cardHolderName: '',
	cardNumber: '',
	cardExpiry: '',
	cardCvc: '',
	availabilityNotes: '',
	availability: {
		Mon: true,
		Tue: false,
		Wed: true,
		Thu: true,
		Fri: true,
		Sat: false,
		Sun: true,
		MonStart: '09:00',
		MonEnd: '18:00',
		TueStart: '09:00',
		TueEnd: '18:00',
		WedStart: '09:00',
		WedEnd: '18:00',
		ThuStart: '09:00',
		ThuEnd: '18:00',
		FriStart: '09:00',
		FriEnd: '18:00',
		SatStart: '09:00',
		SatEnd: '18:00',
		SunStart: '09:00',
		SunEnd: '18:00',
	},
	requiredDocuments: getRequiredDocumentsDefaults(),
	showErrors: false,
}

const notPending = (v) => {
	if (!v) return ''
	const s = String(v).trim()
	return s.toLowerCase() === 'pending' ? '' : s
}

export const mapOnboardingToFormData = (data) => {
	if (!data) return initialOnboardingForm

	const address = data.companyAddress || {}
	const fleet = data.fleetInformation || {}
	const chauffeur = data.firstChauffeurInformation || {}
	const vehicle = data.firstVehicleInformation || {}
	const contract = data.contractAgreement || {}
	const avail = data.availability || {}
	const weekly = avail.weeklySchedule || {}

	return {
		companyName: notPending(data.companyName),
		companyType: notPending(data.companyType),
		country: notPending(address.country),
		street: notPending(address.street),
		zipCode: notPending(address.postalCode),
		city: notPending(address.city),
		stateProvince: notPending(address.state),
		taxId: notPending(data.taxIdentificationNumber),
		businessRegistration: notPending(data.businessRegistrationNumber),

		priorExp: typeof fleet.priorLimoExperience === 'boolean' ? (fleet.priorLimoExperience ? 'yes' : 'no') : '',
		electricVehicles: typeof fleet.electricVehicleFleet === 'boolean' ? (fleet.electricVehicleFleet ? 'yes' : 'no') : '',
		femaleChauffeurs: typeof fleet.femaleChauffeurs === 'boolean' ? (fleet.femaleChauffeurs ? 'yes' : 'no') : '',
		chauffeurCount: fleet.numberOfChauffeurs != null ? String(fleet.numberOfChauffeurs) : '',
		firstClassCount: fleet.numberOfFirstClassVehicles != null ? String(fleet.numberOfFirstClassVehicles) : '',
		businessVansCount: fleet.numberOfBusinessClassVans != null ? String(fleet.numberOfBusinessClassVans) : '',
		fleetDescription: notPending(fleet.businessClassVansDescription),

		sameAsRep: Boolean(chauffeur.useAuthorizedRepresentativeDetails),
		chauffeurFirstName: notPending(chauffeur.firstName),
		chauffeurLastName: notPending(chauffeur.lastName),
		chauffeurEmail: notPending(chauffeur.email),
		chauffeurPhone: notPending(chauffeur.phone),
		driverLicenseId: notPending(chauffeur.driverLicenseId),

		vehicleYear: notPending(vehicle.yearOfManufacture),
		vehicleBrand: notPending(vehicle.brandAndModel),
		vehicleClass: notPending(vehicle.vehicleClass),
		vehicleColor: notPending(vehicle.color),
		passengerCount: vehicle.passengerCapacity != null ? String(vehicle.passengerCapacity) : '',
		luggageCount: vehicle.luggageCapacity != null ? String(vehicle.luggageCapacity) : '',
		wifi: typeof vehicle.wifi === 'boolean' ? (vehicle.wifi ? 'yes' : 'no') : '',
		numberPlate: notPending(vehicle.vehicleNumberPlate),
		vin: notPending(vehicle.vehicleVIN),

		contractPlace: notPending(contract.place),
		contractAgreed: Boolean(contract.confirmationAgreement),

		cardHolderName: '',
		cardNumber: '',
		cardExpiry: '',
		cardCvc: '',

		availabilityNotes: avail.notes || '',
		availability: {
			Mon: weekly.monday?.enabled ?? true,
			Tue: weekly.tuesday?.enabled ?? false,
			Wed: weekly.wednesday?.enabled ?? true,
			Thu: weekly.thursday?.enabled ?? true,
			Fri: weekly.friday?.enabled ?? true,
			Sat: weekly.saturday?.enabled ?? false,
			Sun: weekly.sunday?.enabled ?? true,
			MonStart: toTimeInputValue(weekly.monday?.startTime, '09:00'),
			MonEnd: toTimeInputValue(weekly.monday?.endTime, '18:00'),
			TueStart: toTimeInputValue(weekly.tuesday?.startTime, '09:00'),
			TueEnd: toTimeInputValue(weekly.tuesday?.endTime, '18:00'),
			WedStart: toTimeInputValue(weekly.wednesday?.startTime, '09:00'),
			WedEnd: toTimeInputValue(weekly.wednesday?.endTime, '18:00'),
			ThuStart: toTimeInputValue(weekly.thursday?.startTime, '09:00'),
			ThuEnd: toTimeInputValue(weekly.thursday?.endTime, '18:00'),
			FriStart: toTimeInputValue(weekly.friday?.startTime, '09:00'),
			FriEnd: toTimeInputValue(weekly.friday?.endTime, '18:00'),
			SatStart: toTimeInputValue(weekly.saturday?.startTime, '09:00'),
			SatEnd: toTimeInputValue(weekly.saturday?.endTime, '18:00'),
			SunStart: toTimeInputValue(weekly.sunday?.startTime, '09:00'),
			SunEnd: toTimeInputValue(weekly.sunday?.endTime, '18:00'),
		},

		requiredDocuments: normalizeRequiredDocuments(data),

		showErrors: false,
	}
}
