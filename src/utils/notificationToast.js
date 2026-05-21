import toast from 'react-hot-toast'

export function showAppNotificationToast(notification = {}, { preset = 'default' } = {}) {
	const { type, title, body, message } = notification || {}
	const text = [title, body].filter(Boolean).join(': ') || message || body || title || 'New notification'
	const options = { duration: 4000 }

	if (preset === 'driverChat') {
		if (type === 'alert') {
			toast.error(text, options)
			return
		}

		if (type === 'message') {
			toast(text, { ...options, icon: '💬' })
			return
		}

		toast.success(text, options)
		return
	}

	if (type === 'booking') {
		toast(text, { ...options, icon: '🚗' })
		return
	}

	if (type === 'message') {
		toast(text, { ...options, icon: '💬' })
		return
	}

	if (type === 'alert') {
		toast.error(text, options)
		return
	}

	toast.success(text, options)
}
