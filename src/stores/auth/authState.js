export const authInitialState = {
	user: null,
	email: null,
	token: null,
	role: 'customer',
	destination: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
	resetEmail: null,
}

export function buildAuthState(result, email) {
	return {
		user: result.user ?? null,
		email: email ?? null,
		token: result.token ?? null,
		role: result.user?.role ?? 'customer',
		destination: result.destination ?? null,
		isAuthenticated: Boolean(result.token),
		isLoading: false,
		error: null,
	}
}
