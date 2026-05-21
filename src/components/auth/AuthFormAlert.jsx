import { FiInfo } from 'react-icons/fi'

export default function AuthFormAlert({ message }) {
	if (!message) {
		return null
	}

	return (
		<div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
			<FiInfo className="mt-0.5 flex-shrink-0" />
			<span>{message}</span>
		</div>
	)
}
