export function normalizeBookingDate(value) {
	if (!value) {
		return ''
	}

	const parsed = new Date(value)
	if (Number.isNaN(parsed.getTime())) {
		return value
	}

	return parsed.toISOString()
}

export function normalizeBookingTime(value) {
	if (!value) {
		return ''
	}

	const trimmed = value.trim()
	if (/am|pm/i.test(trimmed)) {
		return trimmed
	}

	const [rawHours, rawMinutes = '00'] = trimmed.split(':')
	const hours = Number(rawHours)
	const minutes = String(rawMinutes).padStart(2, '0')
	if (Number.isNaN(hours)) {
		return trimmed
	}

	const period = hours >= 12 ? 'PM' : 'AM'
	const displayHours = hours % 12 === 0 ? 12 : hours % 12
	return `${displayHours}:${minutes} ${period}`
}

export function normalizeHourlyDuration(value) {
	const parsed = Number(String(value).trim())
	if (Number.isNaN(parsed) || parsed <= 0) {
		return null
	}

	return parsed
}
