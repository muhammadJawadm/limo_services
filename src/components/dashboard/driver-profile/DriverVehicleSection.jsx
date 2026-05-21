import { InputField, SelectField } from './DriverProfileFormFields'

export default function DriverVehicleSection({ formData, updateDoc, isEditing, yesNoOptions }) {
	return (
		<section>
			<div className="mb-8 mt-12">
				<h2 className="text-[20px] font-semibold text-[#111]">Vehicle Information</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
				<InputField label="Year of Manufacture" placeholder="2022" value={formData.vehicleYearOfManufacture} onChange={(e) => updateDoc('vehicleYearOfManufacture', e.target.value)} readOnly={!isEditing} />
				<InputField label="Brand & Model" placeholder="BMW 7 Series" value={formData.vehicleBrandAndModel} onChange={(e) => updateDoc('vehicleBrandAndModel', e.target.value)} readOnly={!isEditing} />
				<InputField label="Vehicle Class" placeholder="First" value={formData.vehicleClass} onChange={(e) => updateDoc('vehicleClass', e.target.value)} readOnly={!isEditing} />
				<InputField label="Color" placeholder="Black" value={formData.vehicleColor} onChange={(e) => updateDoc('vehicleColor', e.target.value)} readOnly={!isEditing} />
				<InputField label="Passenger Capacity" type="number" placeholder="4" value={formData.vehiclePassengerCapacity} onChange={(e) => updateDoc('vehiclePassengerCapacity', e.target.value)} readOnly={!isEditing} />
				<InputField label="Luggage Capacity" type="number" placeholder="3" value={formData.vehicleLuggageCapacity} onChange={(e) => updateDoc('vehicleLuggageCapacity', e.target.value)} readOnly={!isEditing} />
				<SelectField label="WiFi" options={yesNoOptions} value={formData.vehicleWifi} onChange={(e) => updateDoc('vehicleWifi', e.target.value)} disabled={!isEditing} />
				<SelectField label="Smoking Allowed" options={yesNoOptions} value={formData.vehicleSmokingAllowed} onChange={(e) => updateDoc('vehicleSmokingAllowed', e.target.value)} disabled={!isEditing} />
				<InputField label="Vehicle Number Plate" placeholder="NYC-1234" value={formData.vehicleNumberPlate} onChange={(e) => updateDoc('vehicleNumberPlate', e.target.value)} readOnly={!isEditing} />
				<InputField label="Vehicle VIN" placeholder="1HGCM82633A004352" value={formData.vehicleVIN} onChange={(e) => updateDoc('vehicleVIN', e.target.value)} readOnly={!isEditing} />
			</div>
		</section>
	)
}
