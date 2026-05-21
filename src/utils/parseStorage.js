export function parseStoredJson(raw) {
	if (!raw) return null

	try {
		return JSON.parse(raw)
	} catch {
		return null
	}
}

export function readSessionJson(key) {
	return parseStoredJson(sessionStorage.getItem(key))
}

export function writeSessionJson(key, value) {
	sessionStorage.setItem(key, JSON.stringify(value))
}
