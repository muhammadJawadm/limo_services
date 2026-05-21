import { useState, useEffect } from 'react'
import { updateCustomerProfile, getCustomerProfile } from '../../services/customerService'
import PassengerEditForm from './account-edit/PassengerEditForm'
import ContactEditForm from './account-edit/ContactEditForm'
import AddressEditForm from './account-edit/AddressEditForm'

export default function AccountEditModal({ isOpen, onClose, editType = 'passenger', onSave }) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		location: '',
		companyName: '',
	})
	const [isSaving, setIsSaving] = useState(false)
	const [saveError, setSaveError] = useState('')
	const [saveSuccess, setSaveSuccess] = useState(false)

	useEffect(() => {
		if (isOpen) {
			const loadProfile = async () => {
				setSaveSuccess(false)
				setSaveError('')

				try {
					const result = await getCustomerProfile()
					if (result?.success && result?.data) {
						const profileData = result.data
						setFormData({
							firstName: profileData.firstName || '',
							lastName: profileData.lastName || '',
							email: profileData.email || '',
							phone: profileData.phone || '',
							location: profileData.location || '',
							companyName: profileData.companyName || '',
						})
					}
				} catch (error) {
					console.error('Failed to load profile:', error)
					setSaveError('Failed to load profile data')
				}
			}

			loadProfile()
		}
	}, [isOpen])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSaving(true)
		setSaveError('')
		setSaveSuccess(false)

		let payload = {}

		if (editType === 'passenger') {
			payload = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				companyName: formData.companyName,
			}
		} else if (editType === 'contact') {
			payload = {
				email: formData.email,
				phone: formData.phone,
			}
		} else if (editType === 'address') {
			payload = {
				location: formData.location,
			}
		}

		const result = await updateCustomerProfile(payload)

		if (result.success) {
			setSaveSuccess(true)
			if (onSave) onSave()
			setTimeout(() => {
				onClose()
			}, 1000)
		} else {
			setSaveError(result.message || 'Failed to update profile.')
		}
		setIsSaving(false)
	}

	if (!isOpen) return null

	const formProps = {
		formData,
		onInputChange: handleInputChange,
		onSubmit: handleSubmit,
		onClose,
		isSaving,
		saveError,
		saveSuccess,
	}

	const renderContent = () => {
		switch (editType) {
			case 'passenger':
				return <PassengerEditForm {...formProps} />
			case 'contact':
				return <ContactEditForm {...formProps} />
			case 'address':
				return <AddressEditForm {...formProps} />
			default:
				return null
		}
	}

	return (
		<div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			<div className="min-h-full grid place-items-center py-8">
				<div className="w-full max-w-[650px] rounded-[30px] bg-white p-6 sm:p-8 text-[#111111] shadow-2xl relative">
					{renderContent()}
				</div>
			</div>
		</div>
	)
}
