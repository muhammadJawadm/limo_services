import { AUTH_STORAGE_KEY } from '../services/api'
import { parseStoredJson } from './parseStorage'

export function hasAuthToken() {
	const parsedAuth = parseStoredJson(localStorage.getItem(AUTH_STORAGE_KEY))
	return Boolean(parsedAuth?.token)
}
