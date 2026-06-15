import {
	formatPhone,
	normalizeBoolean,
	resolveTimeZone,
	to12HourTime,
	toNumber,
} from './formTransforms'
import { buildRequiredDocumentsPayload } from './requiredDocuments'

export const buildStepPayload = (stepNumber, formData) => {
	switch (stepNumber) {
		case 1:
			return {
				companyName: formData.companyName || '',
				companyType: formData.companyType || '',
				companyAddress: {
					country: formData.country || '',
					city: formData.city || '',
					street: formData.street || '',
					postalCode: formData.zipCode || '',
					state: formData.stateProvince || '',
				},
				taxIdentificationNumber: formData.taxId || '',
				businessRegistrationNumber: formData.businessRegistration || '',
			}

		case 2:
			return {
				priorLimoExperience: normalizeBoolean(formData.priorExp),
				electricVehicleFleet: normalizeBoolean(formData.electricVehicles),
				femaleChauffeurs: normalizeBoolean(formData.femaleChauffeurs),
				numberOfChauffeurs: toNumber(formData.chauffeurCount),
				numberOfFirstClassVehicles: toNumber(formData.firstClassCount),
				numberOfBusinessClassVans: toNumber(formData.businessVansCount || formData.businessVansCount2),
				businessClassVansDescription: formData.fleetDescription || '',
			}

		case 3:
			return {
				useAuthorizedRepresentativeDetails: Boolean(formData.sameAsRep),
				firstName: formData.chauffeurFirstName || '',
				lastName: formData.chauffeurLastName || '',
				email: formData.chauffeurEmail || '',
				phone: formatPhone(formData.chauffeurPhone),
				driverLicenseId: formData.driverLicenseId || '',
			}

		case 4:
			return {
				yearOfManufacture: formData.vehicleYear || '',
				brandAndModel: formData.vehicleBrand || '',
				vehicleClass: formData.vehicleClass || '',
				color: formData.vehicleColor || '',
				passengerCapacity: toNumber(formData.passengerCount),
				luggageCapacity: toNumber(formData.luggageCount),
				wifi: normalizeBoolean(formData.wifi),
				vehicleNumberPlate: formData.numberPlate || '',
				vehicleVIN: formData.vin || '',
			}

		case 6:
			return buildRequiredDocumentsPayload(formData.requiredDocuments)

		case 7:
			return {
				modules: [],
			}

		case 8:
			return {
				signed: true,
				confirmationAgreement: Boolean(formData.contractAgreed),
				place: formData.contractPlace || '',
			}

		case 9:
			return {
				stripeOnboarded: Boolean(formData.stripeOnboarded),
				stripeAccountId: formData.stripeAccountId || '',
			}

		case 10: {
			const avail = formData.availability || {}
			return {
				timeZone: resolveTimeZone(),
				notes: formData.availabilityNotes || '',
				weeklySchedule: {
					monday: {
						enabled: Boolean(avail.Mon),
						startTime: to12HourTime(avail.MonStart, '09:00 AM'),
						endTime: to12HourTime(avail.MonEnd, '06:00 PM'),
					},
					tuesday: {
						enabled: Boolean(avail.Tue),
						startTime: to12HourTime(avail.TueStart, '09:00 AM'),
						endTime: to12HourTime(avail.TueEnd, '06:00 PM'),
					},
					wednesday: {
						enabled: Boolean(avail.Wed),
						startTime: to12HourTime(avail.WedStart, '09:00 AM'),
						endTime: to12HourTime(avail.WedEnd, '06:00 PM'),
					},
					thursday: {
						enabled: Boolean(avail.Thu),
						startTime: to12HourTime(avail.ThuStart, '09:00 AM'),
						endTime: to12HourTime(avail.ThuEnd, '06:00 PM'),
					},
					friday: {
						enabled: Boolean(avail.Fri),
						startTime: to12HourTime(avail.FriStart, '09:00 AM'),
						endTime: to12HourTime(avail.FriEnd, '06:00 PM'),
					},
					saturday: {
						enabled: Boolean(avail.Sat),
						startTime: to12HourTime(avail.SatStart, '09:00 AM'),
						endTime: to12HourTime(avail.SatEnd, '06:00 PM'),
					},
					sunday: {
						enabled: Boolean(avail.Sun),
						startTime: to12HourTime(avail.SunStart, '09:00 AM'),
						endTime: to12HourTime(avail.SunEnd, '06:00 PM'),
					},
				},
			}
		}

		default:
			return null
	}
}
