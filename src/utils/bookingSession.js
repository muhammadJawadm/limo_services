import { parseStoredJson, readSessionJson, writeSessionJson } from './parseStorage'

const BOOKING_CONTEXT_KEY = 'bookingContext'
const BOOKING_DRAFT_KEY = 'bookingDraft'
const BOOKING_ID_KEY = 'bookingId'

export function readBookingContext() {
	return readSessionJson(BOOKING_CONTEXT_KEY)
}

export function readBookingDraft() {
	return readSessionJson(BOOKING_DRAFT_KEY)
}

export function readBookingId() {
	return sessionStorage.getItem(BOOKING_ID_KEY)
}

export function resolveBookingContext(locationState) {
	return locationState ?? readBookingContext() ?? {}
}

export function resolveBookingId(bookingContext = {}) {
	return bookingContext.bookingId || readBookingId()
}

export function persistBookingSession({ bookingId, bookingDraft, bookingContext }) {
	if (bookingId) {
		sessionStorage.setItem(BOOKING_ID_KEY, bookingId)
	}

	if (bookingDraft !== undefined) {
		writeSessionJson(BOOKING_DRAFT_KEY, bookingDraft)
	}

	if (bookingContext !== undefined) {
		writeSessionJson(BOOKING_CONTEXT_KEY, bookingContext)
	}
}

export function parseBookingDraftFromRaw(raw) {
	return parseStoredJson(raw)
}
