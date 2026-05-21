import { getApiErrorMessage } from './api'

export function parseApiData(response) {
	return response?.data ?? {}
}

export function isApiSuccess(data) {
	return Boolean(data.success ?? true)
}

export function buildDataSuccess(data, { dataFallback = null, includeMessage = true } = {}) {
	const result = {
		success: isApiSuccess(data),
		data: data.data ?? dataFallback,
		raw: data,
	}

	if (includeMessage) {
		result.message = data.message ?? ''
	}

	return result
}

export function buildDataFailure(error, errorMessage, { dataFallback = null, includeMessage = true } = {}) {
	const result = {
		success: false,
		message: getApiErrorMessage(error) || errorMessage,
		data: dataFallback,
		raw: error?.response?.data ?? null,
	}

	if (!includeMessage) {
		delete result.message
	}

	return result
}

export async function withDataResponse(requestFn, errorMessage, options = {}) {
	const { dataFallback = null, includeMessage = true } = options

	try {
		const response = await requestFn()
		const data = parseApiData(response)
		return buildDataSuccess(data, { dataFallback, includeMessage })
	} catch (error) {
		return buildDataFailure(error, errorMessage, { dataFallback, includeMessage })
	}
}

export async function withMessageResponse(requestFn, errorMessage) {
	try {
		const response = await requestFn()
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			message: data.message ?? '',
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || errorMessage,
			raw: error?.response?.data ?? null,
		}
	}
}
