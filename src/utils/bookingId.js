export function resolveBookingEntityId(booking) {
	return booking?.id || booking?._id || booking?.bookingId || null
}
