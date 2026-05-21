import { InputField, SelectField } from './DriverProfileFormFields'

export default function DriverFleetSection({ formData, updateDoc, isEditing, yesNoOptions }) {
	return (
		<section>
			<div className="mb-8 mt-12">
				<h2 className="text-[20px] font-semibold text-[#111]">Fleet Information</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
				<SelectField label="Prior Limo Experience" options={yesNoOptions} value={formData.priorLimoExperience} onChange={(e) => updateDoc('priorLimoExperience', e.target.value)} disabled={!isEditing} />
				<SelectField label="Electric Vehicle Fleet" options={yesNoOptions} value={formData.electricVehicleFleet} onChange={(e) => updateDoc('electricVehicleFleet', e.target.value)} disabled={!isEditing} />
				<SelectField label="Female Chauffeurs" options={yesNoOptions} value={formData.femaleChauffeurs} onChange={(e) => updateDoc('femaleChauffeurs', e.target.value)} disabled={!isEditing} />
				<InputField label="Number of Chauffeurs" type="number" placeholder="0" value={formData.numberOfChauffeurs} onChange={(e) => updateDoc('numberOfChauffeurs', e.target.value)} readOnly={!isEditing} />
				<InputField label="First Class Vehicles" type="number" placeholder="0" value={formData.numberOfFirstClassVehicles} onChange={(e) => updateDoc('numberOfFirstClassVehicles', e.target.value)} readOnly={!isEditing} />
				<InputField label="Business Class Vans" type="number" placeholder="0" value={formData.numberOfBusinessClassVans} onChange={(e) => updateDoc('numberOfBusinessClassVans', e.target.value)} readOnly={!isEditing} />
				<div className="col-span-1 md:col-span-2 w-full">
					<label className="block text-[14px] text-gray-600 mb-2 ml-1">Business Class Vans Description</label>
					<textarea
						rows="4"
						placeholder="Mercedes Sprinter vans"
						value={formData.businessClassVansDescription}
						onChange={(e) => updateDoc('businessClassVansDescription', e.target.value)}
						readOnly={!isEditing}
						className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
					></textarea>
				</div>
			</div>
		</section>
	)
}
