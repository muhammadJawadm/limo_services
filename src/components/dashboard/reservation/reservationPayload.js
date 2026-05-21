export function buildReservationPayload({ tripType, selectedVehicleId, specialInstructions }) {
	const pickupInput = document.querySelector('input[placeholder="Pickup Location"]')
	const dropoffInputs = document.querySelectorAll('input[placeholder="Drop-off Location"]')
	const dateInput = document.querySelector('input[type="date"]')
	const timeInput = document.querySelector('input[type="time"]')
	const passengerInputs = document.querySelectorAll('input[type="number"]')
	const hoursInput = document.querySelector('input[placeholder="Duration"]')
	const firstNameInput = Array.from(document.querySelectorAll('input[placeholder="First Name"]')).find((input) => input.value)
	const lastNameInput = Array.from(document.querySelectorAll('input[placeholder="Last Name"]')).find((input) => input.value)
	const emailInput = document.querySelector('input[type="email"]')
	const phoneInput = Array.from(document.querySelectorAll('input[type="tel"]')).find((input) => input.value)

	return {
		type: tripType,
		pickupLocation: pickupInput?.value?.trim() || '',
		dropoffLocation: (dropoffInputs?.[dropoffInputs.length - 1]?.value || '').trim(),
		date: dateInput?.value ? new Date(dateInput.value).toISOString() : '',
		time: timeInput?.value || '',
		hours: tripType === 'hourly' ? Number(hoursInput?.value || 0) : undefined,
		vehicleCategoryId: selectedVehicleId,
		noOfPassengers: Number(passengerInputs?.[0]?.value || 3),
		luggage: Number(passengerInputs?.[1]?.value || 0),
		isGuest: true,
		bookerDetails: {
			firstName: firstNameInput?.value?.trim() || '',
			lastName: lastNameInput?.value?.trim() || '',
			email: emailInput?.value?.trim() || '',
			phone: phoneInput?.value?.trim() || '',
		},
		passengerDetails: {
			firstName: firstNameInput?.value?.trim() || '',
			lastName: lastNameInput?.value?.trim() || '',
			email: emailInput?.value?.trim() || '',
			phone: phoneInput?.value?.trim() || '',
		},
		stopLocations: Array.from(document.querySelectorAll('input[placeholder="Stop location"]'))
			.map((input) => input.value?.trim())
			.filter(Boolean),
		specialInstructions: specialInstructions?.trim() || '',
	}
}
