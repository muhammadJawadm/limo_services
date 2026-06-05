import {normalizeBookingTime} from '../../../utils/bookingFormUtils'
export function buildReservationPayload({ tripType, selectedVehicleId, specialInstructions }) {
	const pickupInput = document.querySelector('input[placeholder="Pickup Location"]')
	const dropoffInputs = document.querySelectorAll('input[placeholder="Drop-off Location"]')
	const dateInput = document.querySelector('input[type="date"]')
	const timeInput = document.querySelector('input[type="time"]')
	const passengerInputs = document.querySelectorAll('input[type="number"]')
	const hoursInput = document.querySelector('input[placeholder="Duration"]')

	return {
		type: tripType,
		pickupLocation: pickupInput?.value?.trim() || '',
		dropoffLocation: (dropoffInputs?.[dropoffInputs.length - 1]?.value || '').trim(),
		date: dateInput?.value ? new Date(dateInput.value).toISOString() : '',
		time: normalizeBookingTime(timeInput?.value || ''),
		hours: tripType === 'hourly' ? Number(hoursInput?.value || 0) : undefined,
		vehicleCategoryId: selectedVehicleId,
		noOfPassengers: Number(passengerInputs?.[0]?.value || 3),
		luggage: Number(passengerInputs?.[1]?.value || 0),
	
		stopLocations: Array.from(document.querySelectorAll('input[placeholder="Stop location"]'))
			.map((input) => input.value?.trim())
			.filter(Boolean),
		specialInstructions: specialInstructions?.trim() || '',
	}
}
