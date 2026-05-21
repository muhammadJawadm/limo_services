import { useState } from 'react'
import { useAuthFormState } from './useAuthFormState'

export function useEmailForm({ storeError, clearStoreError }) {
	const [email, setEmail] = useState('')
	const { hasError, errorMessage, setSubmissionError, clearErrors } = useAuthFormState(storeError, clearStoreError)

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
		clearErrors()
	}

	const validateEmail = () => {
		if (!email.trim()) {
			setSubmissionError('Please enter your email address.')
			return false
		}
		return true
	}

	return {
		email,
		hasError,
		errorMessage,
		handleEmailChange,
		validateEmail,
		setSubmissionError,
		getTrimmedEmail: () => email.trim(),
	}
}
