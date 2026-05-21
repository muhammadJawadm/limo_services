import { FaPen } from 'react-icons/fa'
import { InputField, SelectField } from './DriverProfileFormFields'

export default function DriverCustomerSection({ formData, updateDoc, isEditing, onEditClick, countries }) {
	return (
		<section>
			<div className="flex items-center gap-4 mb-8">
				<h2 className="text-[20px] font-medium text-[#111]">Customer</h2>
				<button
					className="flex items-center gap-2 bg-[#1b2d5d] hover:bg-[#132042] text-white text-[13px] font-medium py-1.5 px-4 rounded-full transition-colors"
					onClick={onEditClick}
				>
					{isEditing ? 'Editing' : 'Edit'}
					<FaPen size={12} />
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
				<InputField label="First Name" placeholder="Enter your first name" value={formData.userFirstName} onChange={(e) => updateDoc('userFirstName', e.target.value)} readOnly={!isEditing} />
				<InputField label="Last Name" placeholder="Enter your last name" value={formData.userLastName} onChange={(e) => updateDoc('userLastName', e.target.value)} readOnly={!isEditing} />
				<InputField label="Email" type="email" placeholder="[EMAIL_ADDRESS]" value={formData.userEmail} onChange={(e) => updateDoc('userEmail', e.target.value)} readOnly={!isEditing} />
				<InputField label="Mobile Phone" placeholder="+44 441 7784 444" value={formData.userMobile} onChange={(e) => updateDoc('userMobile', e.target.value)} readOnly={!isEditing} />
				<InputField label="Street" placeholder="Los Angeles, CA 90001 United States" value={formData.street} onChange={(e) => updateDoc('street', e.target.value)} readOnly={!isEditing} />
				<InputField label="Zip/Postal Code" placeholder="6587" value={formData.zipCode} onChange={(e) => updateDoc('zipCode', e.target.value)} readOnly={!isEditing} />
				<InputField label="City" placeholder="New York" value={formData.city} onChange={(e) => updateDoc('city', e.target.value)} readOnly={!isEditing} />
				<SelectField label="Country" options={countries} value={formData.country} onChange={(e) => updateDoc('country', e.target.value)} disabled={!isEditing} />
			</div>
		</section>
	)
}
