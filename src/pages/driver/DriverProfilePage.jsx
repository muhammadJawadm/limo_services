import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import { getDriverProfile, updateDriverOnboarding, updateDriverProfile } from '../../services/driverService'
import { INITIAL_DRIVER_PROFILE_FORM, DRIVER_PROFILE_COUNTRIES, YES_NO_OPTIONS } from '../../components/dashboard/driver-profile/driverProfile.constants'
import { mapApiToDriverProfileForm, buildDriverPersonalPayload, buildDriverOnboardingPayload } from '../../components/dashboard/driver-profile/driverProfile.helpers'
import DriverProfileHeader from '../../components/dashboard/driver-profile/DriverProfileHeader'
import DriverLogoutModal from '../../components/dashboard/driver-profile/DriverLogoutModal'
import DriverCustomerSection from '../../components/dashboard/driver-profile/DriverCustomerSection'
import DriverCompanySection from '../../components/dashboard/driver-profile/DriverCompanySection'
import DriverFleetSection from '../../components/dashboard/driver-profile/DriverFleetSection'
import DriverChauffeurSection from '../../components/dashboard/driver-profile/DriverChauffeurSection'
import DriverVehicleSection from '../../components/dashboard/driver-profile/DriverVehicleSection'

export default function DriverProfilePage() {
	const [formData, setFormData] = useState(INITIAL_DRIVER_PROFILE_FORM)
	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [loadError, setLoadError] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [showLogoutModal, setShowLogoutModal] = useState(false)
	const navigate = useNavigate()

	const updateDoc = (key, value) => {
		setFormData((prev) => ({ ...prev, [key]: value }))
	}

	useEffect(() => {
		let isMounted = true

		const loadProfile = async () => {
			setIsLoading(true)
			setLoadError('')

			const result = await getDriverProfile()
			if (!isMounted) return

			if (!result?.success) {
				setLoadError(result?.message || 'Failed to load profile.')
				setIsLoading(false)
				return
			}

			setFormData((prev) => ({ ...prev, ...mapApiToDriverProfileForm(result.data || {}) }))
			setIsLoading(false)
		}

		loadProfile()

		return () => {
			isMounted = false
		}
	}, [])

	const handleSave = async () => {
		setIsSaving(true)
		setLoadError('')

		const personalResult = await updateDriverProfile(buildDriverPersonalPayload(formData))

		if (!personalResult?.success) {
			setIsSaving(false)
			setLoadError(personalResult?.message || 'Failed to save personal info.')
			return
		}

		const result = await updateDriverOnboarding(buildDriverOnboardingPayload(formData))
		setIsSaving(false)

		if (!result?.success) {
			setLoadError(result?.message || 'Failed to save profile.')
			return
		}

		setIsEditing(false)
	}

	return (
		<div className="relative min-h-screen flex flex-col bg-[#Fcfcfc] font-sans overflow-x-hidden w-full">
			<DriverProfileHeader onLogoutClick={() => setShowLogoutModal(true)} />

			<main className="flex-1 flex justify-center py-10 md:py-16 px-4">
				<div className="w-full max-w-[1000px]">
					<div className="mb-10">
						<h1 className="text-[28px] md:text-[32px] font-semibold text-[#111]">Profile</h1>
					</div>

					{isLoading && (
						<div className="mb-6 rounded-xl border border-gray-100 bg-white px-5 py-4 text-[14px] text-gray-500">
							Loading profile details...
						</div>
					)}
					{loadError && (
						<div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-[14px] text-red-600">
							{loadError}
						</div>
					)}

					<div className="space-y-12">
						<DriverCustomerSection
							formData={formData}
							updateDoc={updateDoc}
							isEditing={isEditing}
							onEditClick={() => setIsEditing(true)}
							countries={DRIVER_PROFILE_COUNTRIES}
						/>

						<div className="w-full h-px bg-gray-100"></div>

						<DriverCompanySection formData={formData} updateDoc={updateDoc} isEditing={isEditing} />

						<div className="w-full h-px bg-gray-100"></div>

						<DriverFleetSection formData={formData} updateDoc={updateDoc} isEditing={isEditing} yesNoOptions={YES_NO_OPTIONS} />

						<DriverChauffeurSection formData={formData} updateDoc={updateDoc} isEditing={isEditing} yesNoOptions={YES_NO_OPTIONS} />

						<DriverVehicleSection formData={formData} updateDoc={updateDoc} isEditing={isEditing} yesNoOptions={YES_NO_OPTIONS} />

						<div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full">
							<button className="px-10 py-3.5 rounded-full border border-gray-300 bg-white text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto sm:min-w-[160px] flex-1 sm:flex-none">
								Cancel
							</button>
							<button
								className="px-10 py-3.5 rounded-full bg-[#1b2d5d] text-[15px] font-medium text-white hover:bg-[#132042] transition-colors w-full sm:w-auto sm:min-w-[160px] flex-1 sm:flex-none disabled:opacity-60 disabled:cursor-not-allowed"
								onClick={handleSave}
								disabled={!isEditing || isSaving || isLoading}
							>
								{isSaving ? 'Saving...' : 'Save'}
							</button>
						</div>
					</div>
				</div>
			</main>

			<Footer />

			<DriverLogoutModal
				isOpen={showLogoutModal}
				onCancel={() => setShowLogoutModal(false)}
				onConfirm={() => {
					setShowLogoutModal(false)
					navigate('/driver/login')
				}}
			/>
		</div>
	)
}
