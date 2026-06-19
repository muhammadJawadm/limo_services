export function getRideStatusMeta(bookingDetails, currentBookingTab) {
	const rideStatus = (bookingDetails?.rideStatus || '').toLowerCase()
	const statusText =
		currentBookingTab === 'past'
			? 'Past'
			: currentBookingTab === 'cancelled'
				? 'Cancelled'
				: bookingDetails?.rideStatus || 'Upcoming'

	const statusColor =
		statusText === 'Cancelled' || statusText === 'cancelled' || bookingDetails?.rideStatus === 'cancelled'
			? 'bg-red-500'
			: statusText === 'Past'
				? 'bg-green-500'
				: 'bg-blue-500'

	const isUpcoming =
		currentBookingTab !== 'past' && currentBookingTab !== 'cancelled' && rideStatus !== 'cancelled'

	return { statusText, statusColor, isUpcoming, rideStatus }
}

export function getNormalizedChildSeats(bookingDetails) {
	return (
		bookingDetails?.childSeats || {
			infant: bookingDetails?.childSeatInfant ?? 0,
			toddler: bookingDetails?.childSeatToddler ?? 0,
			booster: bookingDetails?.childSeatBooster ?? 0,
		}
	)
}

export function getNormalizedCharges(bookingDetails) {
	return (
		bookingDetails?.chargesAndFees || {
			tripPrice: bookingDetails?.tripPrice ?? 0,
			childSeatsFee: bookingDetails?.childSeatsFee ?? 0,
			otherFees: bookingDetails?.otherFees ?? 0,
			taxAmount: bookingDetails?.taxAmount ?? 0,
		}
	)
}

export function buildEditableBookingState(bookingDetails) {
	return {
		pickupLocation: bookingDetails?.pickupLocation || '',
		dropoffLocation: bookingDetails?.dropoffLocation || '',
		date: bookingDetails?.date ? String(bookingDetails.date).split('T')[0] : '',
		time: bookingDetails?.time || '',
		noOfPassengers: bookingDetails?.noOfPassengers ?? 0,
		luggage: bookingDetails?.luggage ?? 0,
		specialInstructions: bookingDetails?.specialInstructions || '',
		passengerFirstName:
			bookingDetails?.passengerDetails?.firstName || bookingDetails?.user?.firstName || '',
		passengerLastName:
			bookingDetails?.passengerDetails?.lastName || bookingDetails?.user?.lastName || '',
		passengerPhone: bookingDetails?.passengerDetails?.phone || bookingDetails?.user?.phone || '',
		passengerEmail: bookingDetails?.passengerDetails?.email || bookingDetails?.user?.email || '',
		childSeats: bookingDetails?.childSeats || {},
	}
}
