export const normalizeBoolean = (value) => {
	if (typeof value === 'boolean') return value
	if (typeof value !== 'string') return false
	const v = value.trim().toLowerCase()
	if (['yes', 'true', '1', 'available', 'allowed'].includes(v)) return true
	return false
}

export const toNumber = (value) => {
	if (typeof value === 'number') return Number.isFinite(value) ? value : null
	if (typeof value !== 'string') return null
	const parsed = Number.parseInt(value, 10)
	return Number.isNaN(parsed) ? null : parsed
}

export const formatPhone = (value) => {
	if (!value) return ''
	const trimmed = value.trim()
	return trimmed.startsWith('+') ? trimmed : `+1${trimmed}`
}

export const resolveTimeZone = () => {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
	} catch {
		return 'UTC'
	}
}

export const toTimeInputValue = (value, fallback) => {
	if (!value) return fallback
	if (typeof value !== 'string') return fallback
	if (value.includes('AM') || value.includes('PM')) {
		const [time, period] = value.split(' ')
		const [h, m] = time.split(':')
		if (!h || !m) return fallback
		let hour = Number.parseInt(h, 10)
		if (Number.isNaN(hour)) return fallback
		if (period === 'PM' && hour !== 12) hour += 12
		if (period === 'AM' && hour === 12) hour = 0
		return `${String(hour).padStart(2, '0')}:${m}`
	}

	return value
}

export const to12HourTime = (value, fallback) => {
	if (!value) return fallback
	if (typeof value !== 'string') return fallback
	if (value.includes('AM') || value.includes('PM')) return value
	const [h, m] = value.split(':')
	if (!h || !m) return fallback
	let hour = Number.parseInt(h, 10)
	if (Number.isNaN(hour)) return fallback
	const period = hour >= 12 ? 'PM' : 'AM'
	const hour12 = ((hour + 11) % 12) + 1
	return `${String(hour12).padStart(2, '0')}:${m} ${period}`
}
