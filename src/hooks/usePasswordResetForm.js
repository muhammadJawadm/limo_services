import { useState } from 'react'
import { useAuthFormState } from './useAuthFormState'

export function usePasswordResetForm({
	storeError,
	clearStoreError,
	email,
	sessionExpiredMessage = 'Session expired. Please start the reset flow again.',
}) {
	const [form, setForm] = useState({ password: '', confirmPassword: '' })
	const [success, setSuccess] = useState(false)
	const { hasError, errorMessage, setSubmissionError, clearErrors } = useAuthFormState(storeError, clearStoreError)

	const updateField = (key) => (event) => {
		setForm((previous) => ({ ...previous, [key]: event.target.value }))
		clearErrors()
	}

	const validateResetForm = () => {
		if (!form.password) {
			setSubmissionError('Password is required.')
			return false
		}
		if (form.password.length < 8) {
			setSubmissionError('Password must be at least 8 characters.')
			return false
		}
		if (form.password !== form.confirmPassword) {
			setSubmissionError('Passwords do not match.')
			return false
		}
		if (!email) {
			setSubmissionError(sessionExpiredMessage)
			return false
		}
		return true
	}

	return {
		form,
		success,
		setSuccess,
		hasError,
		errorMessage,
		updateField,
		validateResetForm,
		setSubmissionError,
	}
}
