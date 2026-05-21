import { useState } from 'react'

export function useAuthFormState(storeError, clearStoreError) {
	const [formError, setFormError] = useState('')

	const hasError = Boolean(formError || storeError)
	const errorMessage = formError || storeError

	const clearErrors = () => {
		setFormError('')
		if (clearStoreError) {
			clearStoreError()
		}
	}

	const setSubmissionError = (message) => {
		setFormError(message || '')
	}

	return {
		formError,
		hasError,
		errorMessage,
		setFormError,
		setSubmissionError,
		clearErrors,
	}
}
