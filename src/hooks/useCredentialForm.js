import { useState } from 'react'
import { useAuthFormState } from './useAuthFormState'

export function useCredentialForm({ storeError, clearStoreError }) {
	const [form, setForm] = useState({ email: '', password: '' })
	const { hasError, errorMessage, setSubmissionError, clearErrors } = useAuthFormState(storeError, clearStoreError)

	const updateField = (key) => (event) => {
		setForm((previous) => ({ ...previous, [key]: event.target.value }))
		clearErrors()
	}

	const validateCredentials = () => {
		if (!form.email || !form.password) {
			setSubmissionError('Email and password are required.')
			return false
		}
		return true
	}

	return {
		form,
		hasError,
		errorMessage,
		updateField,
		validateCredentials,
		setSubmissionError,
	}
}
