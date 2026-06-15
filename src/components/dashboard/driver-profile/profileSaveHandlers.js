export function buildPersonalInfoPayload(localData) {
  return {
    firstName: localData.firstName,
    lastName: localData.lastName,
    email: localData.email,
    phone: localData.phone,
    location: localData.location,
  }
}

export function getOnboardingSaveEntry(activeTab, localData) {
  const slugMap = {
    'Company Info': {
      slug: 'company-information',
      payload: {
        companyName: localData.companyName,
        companyType: localData.companyType,
        companyAddress: {
          country: localData.country,
          city: localData.city,
          street: localData.street,
          postalCode: localData.zipCode,
          state: localData.stateProvince,
        },
        taxIdentificationNumber: localData.taxId,
        businessRegistrationNumber: localData.businessRegistration,
      },
    },
    'Fleet Info': {
      slug: 'fleet-information',
      payload: {
        priorLimoExperience: Boolean(localData.priorLimoExperience),
        electricVehicleFleet: Boolean(localData.electricVehicleFleet),
        femaleChauffeurs: Boolean(localData.femaleChauffeurs),
        numberOfChauffeurs: Number(localData.numberOfChauffeurs) || null,
        numberOfFirstClassVehicles: Number(localData.numberOfFirstClassVehicles) || null,
        numberOfBusinessClassVans: Number(localData.numberOfBusinessClassVans) || null,
        businessClassVansDescription: localData.businessClassVansDescription,
      },
    },
    'Chauffeur Info': {
      slug: 'first-chauffeur-information',
      payload: {
        firstName: localData.chauffeurFirstName,
        lastName: localData.chauffeurLastName,
        email: localData.chauffeurEmail,
        phone: localData.chauffeurPhone,
        driverLicenseId: localData.driverLicenseId,
      },
    },
    'Vehicle Info': {
      slug: 'first-vehicle-information',
      payload: {
        yearOfManufacture: localData.vehicleYear,
        brandAndModel: localData.vehicleBrand,
        vehicleClass: localData.vehicleClass,
        color: localData.vehicleColor,
        passengerCapacity: Number(localData.passengerCapacity) || null,
        luggageCapacity: Number(localData.luggageCapacity) || null,
        wifi: Boolean(localData.wifi),
        vehicleNumberPlate: localData.vehicleNumberPlate,
        vehicleVIN: localData.vehicleVIN,
      },
    },
    'Partner Contract': {
      slug: 'contract-agreement',
      payload: {
        signed: true,
        confirmationAgreement: localData.contractAgreed,
        place: localData.contractPlace,
      },
    },
    'Weekly Schedule': {
      slug: 'availability',
      payload: {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        weeklySchedule: {
          monday: { enabled: localData.weeklySchedule.Mon, startTime: localData.weeklySchedule.mondayStart, endTime: localData.weeklySchedule.mondayEnd },
          tuesday: { enabled: localData.weeklySchedule.Tue, startTime: localData.weeklySchedule.tuesdayStart, endTime: localData.weeklySchedule.tuesdayEnd },
          wednesday: { enabled: localData.weeklySchedule.Wed, startTime: localData.weeklySchedule.wednesdayStart, endTime: localData.weeklySchedule.wednesdayEnd },
          thursday: { enabled: localData.weeklySchedule.Thu, startTime: localData.weeklySchedule.thursdayStart, endTime: localData.weeklySchedule.thursdayEnd },
          friday: { enabled: localData.weeklySchedule.Fri, startTime: localData.weeklySchedule.fridayStart, endTime: localData.weeklySchedule.fridayEnd },
          saturday: { enabled: localData.weeklySchedule.Sat, startTime: localData.weeklySchedule.saturdayStart, endTime: localData.weeklySchedule.saturdayEnd },
          sunday: { enabled: localData.weeklySchedule.Sun, startTime: localData.weeklySchedule.sundayStart, endTime: localData.weeklySchedule.sundayEnd },
        },
      },
    },
  }

  return slugMap[activeTab] || null
}
