import { useCallback, useEffect, useRef, useState } from 'react'

export const OTP_RESEND_COOLDOWN = 60

export function useOtpVerification({
	email,
	flow,
	verifyOtp,
	verifyResetOtp,
	resendOtp,
	storeError,
	clearStoreError,
	startCooldownOnMount = true,
	initialCooldown = null,
}) {
	const [otp, setOtp] = useState(['', '', '', '', '', ''])
	const [formError, setFormError] = useState('')
	const [cooldown, setCooldown] = useState(
		initialCooldown ?? (startCooldownOnMount ? OTP_RESEND_COOLDOWN : 0),
	)
	const inputRefs = useRef([])

	const hasError = Boolean(formError || storeError)
	const errorMessage = formError || storeError

	useEffect(() => {
		if (startCooldownOnMount) {
			setCooldown(OTP_RESEND_COOLDOWN)
		}
	}, [startCooldownOnMount])

	useEffect(() => {
		if (cooldown <= 0) {
			return undefined
		}

		const timer = window.setTimeout(() => setCooldown((current) => current - 1), 1000)
		return () => window.clearTimeout(timer)
	}, [cooldown])

	const clearErrors = () => {
		setFormError('')
		if (clearStoreError) {
			clearStoreError()
		}
	}

	const handleChange = (index, value) => {
		if (Number.isNaN(Number(value))) {
			return
		}

		const nextOtp = [...otp]
		nextOtp[index] = value
		setOtp(nextOtp)
		clearErrors()

		if (value !== '' && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (index, event) => {
		if (event.key === 'Backspace' && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	const getOtpCode = () => otp.join('')

	const verifyCode = useCallback(async () => {
		const otpCode = getOtpCode()
		if (otpCode.length < 6) {
			setFormError('Please enter the full 6-digit code.')
			return { success: false }
		}
		if (!email) {
			setFormError('Session expired. Please go back and try again.')
			return { success: false }
		}

		if (flow === 'reset') {
			return verifyResetOtp(email, otpCode)
		}

		return verifyOtp(email, otpCode)
	}, [email, flow, otp, verifyOtp, verifyResetOtp])

	const resendCode = async () => {
		if (cooldown > 0) {
			return { success: false }
		}

		const result = await resendOtp(email)
		if (result?.success) {
			setCooldown(OTP_RESEND_COOLDOWN)
			clearErrors()
		}
		return result
	}

	return {
		otp,
		setOtp,
		inputRefs,
		cooldown,
		hasError,
		errorMessage,
		handleChange,
		handleKeyDown,
		verifyCode,
		resendCode,
		setFormError,
		clearErrors,
	}
}
