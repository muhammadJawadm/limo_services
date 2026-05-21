export function mapProfileLocalData(onboarding, profile) {
  if (!onboarding) return null

  const data = onboarding
  const address = data.companyAddress || {}
  const fleet = data.fleetInformation || {}
  const chauffeur = data.firstChauffeurInformation || {}
  const vehicle = data.firstVehicleInformation || {}
  const contract = data.contractAgreement || {}
  const availability = data.availability || {}
  const weekly = availability.weeklySchedule || {}
  const training = data.partnerTraining || {}
  const docs = data.requiredDocuments || {}
  const user = profile?.user || {}

  return {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    companyName: data.companyName || '',
    companyType: data.companyType || '',
    country: address.country || '',
    street: address.street || '',
    zipCode: address.postalCode || '',
    city: address.city || '',
    stateProvince: address.state || '',
    taxId: data.taxIdentificationNumber || '',
    businessRegistration: data.businessRegistrationNumber || '',
    priorLimoExperience: fleet.priorLimoExperience,
    electricVehicleFleet: fleet.electricVehicleFleet,
    femaleChauffeurs: fleet.femaleChauffeurs,
    numberOfChauffeurs: fleet.numberOfChauffeurs ?? '',
    numberOfFirstClassVehicles: fleet.numberOfFirstClassVehicles ?? '',
    numberOfBusinessClassVans: fleet.numberOfBusinessClassVans ?? '',
    businessClassVansDescription: fleet.businessClassVansDescription || '',
    chauffeurFirstName: chauffeur.firstName || '',
    chauffeurLastName: chauffeur.lastName || '',
    chauffeurEmail: chauffeur.email || '',
    chauffeurPhone: chauffeur.phone || '',
    driverLicenseId: chauffeur.driverLicenseId || '',
    vehicleYear: vehicle.yearOfManufacture || '',
    vehicleBrand: vehicle.brandAndModel || '',
    vehicleClass: vehicle.vehicleClass || '',
    vehicleColor: vehicle.color || '',
    passengerCapacity: vehicle.passengerCapacity ?? '',
    luggageCapacity: vehicle.luggageCapacity ?? '',
    wifi: vehicle.wifi,
    smokingAllowed: vehicle.smokingAllowed,
    vehicleNumberPlate: vehicle.vehicleNumberPlate || '',
    vehicleVIN: vehicle.vehicleVIN || '',
    contractPlace: contract.place || '',
    contractAgreed: Boolean(contract.confirmationAgreement),
    weeklySchedule: {
      Mon: weekly.monday?.enabled ?? true,
      Tue: weekly.tuesday?.enabled ?? false,
      Wed: weekly.wednesday?.enabled ?? true,
      Thu: weekly.thursday?.enabled ?? true,
      Fri: weekly.friday?.enabled ?? true,
      Sat: weekly.saturday?.enabled ?? false,
      Sun: weekly.sunday?.enabled ?? true,
      mondayStart: weekly.monday?.startTime || '09:00 AM',
      mondayEnd: weekly.monday?.endTime || '06:00 PM',
      tuesdayStart: weekly.tuesday?.startTime || '09:00 AM',
      tuesdayEnd: weekly.tuesday?.endTime || '06:00 PM',
      wednesdayStart: weekly.wednesday?.startTime || '09:00 AM',
      wednesdayEnd: weekly.wednesday?.endTime || '06:00 PM',
      thursdayStart: weekly.thursday?.startTime || '09:00 AM',
      thursdayEnd: weekly.thursday?.endTime || '06:00 PM',
      fridayStart: weekly.friday?.startTime || '09:00 AM',
      fridayEnd: weekly.friday?.endTime || '06:00 PM',
      saturdayStart: weekly.saturday?.startTime || '09:00 AM',
      saturdayEnd: weekly.saturday?.endTime || '06:00 PM',
      sundayStart: weekly.sunday?.startTime || '09:00 AM',
      sundayEnd: weekly.sunday?.endTime || '06:00 PM',
    },
    training: training.modules || [],
    trainingCompleted: training.completedModules || 0,
    trainingTotal: training.totalModules || 15,
    docs,
  }
}
