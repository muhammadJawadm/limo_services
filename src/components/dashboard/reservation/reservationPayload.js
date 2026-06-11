import { normalizeBookingTime } from '../../../utils/bookingFormUtils'

export function buildReservationPayload({
	tripType,
	selectedVehicleId,
	specialInstructions = '',
	pickupLocation = '',
	dropoffLocation = '',
	stopLocations = [],
	date = '',
	time = '',
	noOfPassengers = 3,
	luggage = 0,
	hours,
}) {
	return {
		type: tripType,
		pickupLocation: pickupLocation.trim(),
		dropoffLocation: dropoffLocation.trim(),
		date: date ? new Date(date).toISOString() : '',
		time: normalizeBookingTime(time),
		hours: tripType === 'hourly' ? Number(hours || 0) : undefined,
		vehicleCategoryId: selectedVehicleId,
		noOfPassengers: Number(noOfPassengers || 3),
		luggage: Number(luggage || 0),
		stopLocations: stopLocations.filter(Boolean),
		specialInstructions: specialInstructions.trim(),
	}
}
