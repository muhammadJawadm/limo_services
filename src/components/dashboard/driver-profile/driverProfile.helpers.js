export const boolToYesNo = (value) => (value === true ? 'yes' : value === false ? 'no' : '')
export const yesNoToBool = (value) => value === 'yes'

export function mapApiToDriverProfileForm(data) {
	const user = data.user || {}
	const onboarding = data.onboarding || {}
	const address = onboarding.companyAddress || {}
	const fleet = onboarding.fleetInformation || {}
	const chauffeur = onboarding.firstChauffeurInformation || {}
	const vehicle = onboarding.firstVehicleInformation || {}

	return {
		userFirstName: user.firstName || '',
		userLastName: user.lastName || '',
		userEmail: user.email || '',
		userMobile: user.phone || '',
		userAddress: user.location || '',
		country: address.country || onboarding.companyCountry || '',
		street: address.street || onboarding.companyStreet || '',
		zipCode: address.postalCode || onboarding.companyPostalCode || '',
		city: address.city || onboarding.companyCity || '',
		stateProvince: address.state || onboarding.companyState || '',
		companyType: onboarding.companyType || '',
		companyName: onboarding.companyName || '',
		taxId: onboarding.taxIdentificationNumber || '',
		businessRegistration: onboarding.businessRegistrationNumber || '',
		priorLimoExperience: boolToYesNo(fleet.priorLimoExperience ?? onboarding.priorLimoExperience),
		electricVehicleFleet: boolToYesNo(fleet.electricVehicleFleet ?? onboarding.electricVehicleFleet),
		femaleChauffeurs: boolToYesNo(fleet.femaleChauffeurs ?? onboarding.femaleChauffeurs),
		numberOfChauffeurs: String(fleet.numberOfChauffeurs ?? onboarding.numberOfChauffeurs ?? ''),
		numberOfFirstClassVehicles: String(fleet.numberOfFirstClassVehicles ?? onboarding.numberOfFirstClassVehicles ?? ''),
		numberOfBusinessClassVans: String(fleet.numberOfBusinessClassVans ?? onboarding.numberOfBusinessClassVans ?? ''),
		businessClassVansDescription: fleet.businessClassVansDescription || onboarding.businessClassVansDescription || '',
		useAuthorizedRepresentativeDetails: boolToYesNo(chauffeur.useAuthorizedRepresentativeDetails ?? onboarding.useAuthorizedRepresentativeDetails),
		chauffeurFirstName: chauffeur.firstName || onboarding.chauffeurFirstName || '',
		chauffeurLastName: chauffeur.lastName || onboarding.chauffeurLastName || '',
		chauffeurEmail: chauffeur.email || onboarding.chauffeurEmail || '',
		chauffeurPhone: chauffeur.phone || onboarding.chauffeurPhone || '',
		chauffeurDriverLicenseId: chauffeur.driverLicenseId || onboarding.chauffeurDriverLicenseId || '',
		vehicleYearOfManufacture: vehicle.yearOfManufacture || onboarding.vehicleYearOfManufacture || '',
		vehicleBrandAndModel: vehicle.brandAndModel || onboarding.vehicleBrandAndModel || '',
		vehicleClass: vehicle.vehicleClass || onboarding.vehicleClass || '',
		vehicleColor: vehicle.color || onboarding.vehicleColor || '',
		vehiclePassengerCapacity: String(vehicle.passengerCapacity ?? onboarding.vehiclePassengerCapacity ?? ''),
		vehicleLuggageCapacity: String(vehicle.luggageCapacity ?? onboarding.vehicleLuggageCapacity ?? ''),
		vehicleWifi: boolToYesNo(vehicle.wifi ?? onboarding.vehicleWifi),
		vehicleSmokingAllowed: boolToYesNo(vehicle.smokingAllowed ?? onboarding.vehicleSmokingAllowed),
		vehicleNumberPlate: vehicle.vehicleNumberPlate || onboarding.vehicleNumberPlate || '',
		vehicleVIN: vehicle.vehicleVIN || onboarding.vehicleVIN || '',
	}
}

export function buildDriverPersonalPayload(formData) {
	return {
		firstName: formData.userFirstName,
		lastName: formData.userLastName,
		email: formData.userEmail,
		phone: formData.userMobile,
		location: formData.userAddress,
	}
}

export function buildDriverOnboardingPayload(formData) {
	return {
		companyName: formData.companyName,
		companyType: formData.companyType,
		taxIdentificationNumber: formData.taxId,
		businessRegistrationNumber: formData.businessRegistration,
		companyAddress: {
			country: formData.country,
			state: formData.stateProvince,
			city: formData.city,
			street: formData.street,
			postalCode: formData.zipCode,
		},
		fleetInformation: {
			priorLimoExperience: yesNoToBool(formData.priorLimoExperience),
			electricVehicleFleet: yesNoToBool(formData.electricVehicleFleet),
			femaleChauffeurs: yesNoToBool(formData.femaleChauffeurs),
			numberOfChauffeurs: Number(formData.numberOfChauffeurs) || 0,
			numberOfFirstClassVehicles: Number(formData.numberOfFirstClassVehicles) || 0,
			numberOfBusinessClassVans: Number(formData.numberOfBusinessClassVans) || 0,
			businessClassVansDescription: formData.businessClassVansDescription,
		},
		firstChauffeurInformation: {
			useAuthorizedRepresentativeDetails: yesNoToBool(formData.useAuthorizedRepresentativeDetails),
			firstName: formData.chauffeurFirstName,
			lastName: formData.chauffeurLastName,
			email: formData.chauffeurEmail,
			phone: formData.chauffeurPhone,
			driverLicenseId: formData.chauffeurDriverLicenseId,
		},
		firstVehicleInformation: {
			yearOfManufacture: formData.vehicleYearOfManufacture,
			brandAndModel: formData.vehicleBrandAndModel,
			vehicleClass: formData.vehicleClass,
			color: formData.vehicleColor,
			passengerCapacity: Number(formData.vehiclePassengerCapacity) || 0,
			luggageCapacity: Number(formData.vehicleLuggageCapacity) || 0,
			wifi: yesNoToBool(formData.vehicleWifi),
			smokingAllowed: yesNoToBool(formData.vehicleSmokingAllowed),
			vehicleNumberPlate: formData.vehicleNumberPlate,
			vehicleVIN: formData.vehicleVIN,
		},
	}
}
