import { InputField, SelectField } from './DriverProfileFormFields'

export default function DriverChauffeurSection({ formData, updateDoc, isEditing, yesNoOptions }) {
	return (
		<section>
			<div className="mb-8 mt-12">
				<h2 className="text-[20px] font-semibold text-[#111]">Chauffeur Information</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
				<SelectField label="Use Authorized Representative Details" options={yesNoOptions} value={formData.useAuthorizedRepresentativeDetails} onChange={(e) => updateDoc('useAuthorizedRepresentativeDetails', e.target.value)} disabled={!isEditing} />
				<InputField label="First Name" placeholder="John" value={formData.chauffeurFirstName} onChange={(e) => updateDoc('chauffeurFirstName', e.target.value)} readOnly={!isEditing} />
				<InputField label="Last Name" placeholder="Doe" value={formData.chauffeurLastName} onChange={(e) => updateDoc('chauffeurLastName', e.target.value)} readOnly={!isEditing} />
				<InputField label="Email" type="email" placeholder="john@prvyn.com" value={formData.chauffeurEmail} onChange={(e) => updateDoc('chauffeurEmail', e.target.value)} readOnly={!isEditing} />
				<InputField label="Phone" placeholder="+12125551234" value={formData.chauffeurPhone} onChange={(e) => updateDoc('chauffeurPhone', e.target.value)} readOnly={!isEditing} />
				<InputField label="Driver License ID" placeholder="NY-DRV-123456" value={formData.chauffeurDriverLicenseId} onChange={(e) => updateDoc('chauffeurDriverLicenseId', e.target.value)} readOnly={!isEditing} />
			</div>
		</section>
	)
}
