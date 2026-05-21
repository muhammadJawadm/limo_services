import { useEffect, useState } from 'react'
import {
	readBookingDraft,
	resolveBookingContext,
	resolveBookingId,
} from '../utils/bookingSession'

export function useBookingFlow(locationState) {
	const bookingContext = resolveBookingContext(locationState)
	const isHourlyRide = bookingContext.rideType === 'hourly'
	const bookingId = resolveBookingId(bookingContext)
	const [bookingDetails, setBookingDetails] = useState(null)

	useEffect(() => {
		setBookingDetails(readBookingDraft())
	}, [])

	return {
		bookingContext,
		isHourlyRide,
		bookingId,
		bookingDetails,
		setBookingDetails,
	}
}
