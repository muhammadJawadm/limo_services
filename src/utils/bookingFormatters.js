export const countOptions = [0, 1, 2, 3, 4]

export const buildStops = (bookingDetails) => {
	if (!bookingDetails) {
		return []
	}

	const items = []
	if (bookingDetails.pickupLocation) {
		items.push({ label: 'Pickup', address: bookingDetails.pickupLocation, type: 'pickup' })
	}
	;(bookingDetails.stopLocations || []).forEach((stop) => {
		items.push({ label: 'Stop', address: stop, type: 'stop' })
	})
	if (bookingDetails.dropoffLocation) {
		items.push({ label: 'Drop-off', address: bookingDetails.dropoffLocation, type: 'dropoff' })
	}
	return items
}

export const formatBookingDate = (value) => {
	if (!value) {
		return 'Select a date'
	}

	const parsed = new Date(value)
	if (Number.isNaN(parsed.getTime())) {
		return value
	}

	return parsed.toLocaleDateString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

export const formatTableDate = (value, fallback = '--') => {
	if (!value) {
		return fallback
	}

	const parsed = new Date(value)
	if (Number.isNaN(parsed.getTime())) {
		return value
	}

	return parsed.toLocaleDateString()
}

export const formatBookingTime = (value, fallback = 'Select a time') => {
	if (!value) {
		return fallback
	}

	return value
}
