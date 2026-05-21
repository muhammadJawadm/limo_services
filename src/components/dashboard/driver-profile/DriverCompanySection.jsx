import { InputField } from './DriverProfileFormFields'

export default function DriverCompanySection({ formData, updateDoc, isEditing }) {
	return (
		<section>
			<div className="mb-8">
				<h2 className="text-[20px] font-semibold text-[#111]">Company Information</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
				<InputField label="Company Name" placeholder="Enter your company name" value={formData.companyName} onChange={(e) => updateDoc('companyName', e.target.value)} />
				<InputField label="Company Type" placeholder="LLC" value={formData.companyType} onChange={(e) => updateDoc('companyType', e.target.value)} readOnly={!isEditing} />
				<InputField label="Tax Identification Number" placeholder="12-3456789" value={formData.taxId} onChange={(e) => updateDoc('taxId', e.target.value)} readOnly={!isEditing} />
				<InputField label="Business Registration Number" placeholder="BR-998877" value={formData.businessRegistration} onChange={(e) => updateDoc('businessRegistration', e.target.value)} readOnly={!isEditing} />
			</div>
		</section>
	)
}
