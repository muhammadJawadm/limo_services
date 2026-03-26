import { InputField, SelectField } from '../FormElements';

const vehicleBrands = ['Mercedes-Benz S-Class', 'BMW 7 Series', 'Audi A8'];
const vehicleClasses = ['Business Class', 'First Class', 'Standard'];

export const Step4 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">First Vehicle Information</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
      <SelectField label="Vehicle Year of Manufacture (YoM)" options={['2020', '2021', '2022', '2023', '2024']} value={formData.vehicleYear} onChange={(e) => updateDoc('vehicleYear', e.target.value)} />
      <SelectField label="Vehicle Brand & Model" options={vehicleBrands} value={formData.vehicleBrand} onChange={(e) => updateDoc('vehicleBrand', e.target.value)} />

      <SelectField label="Vehicle Class" options={vehicleClasses} value={formData.vehicleClass} onChange={(e) => updateDoc('vehicleClass', e.target.value)} />
      <SelectField label="Vehicle Color" options={['Black', 'White', 'Silver', 'Navy']} value={formData.vehicleColor} onChange={(e) => updateDoc('vehicleColor', e.target.value)} />

      <InputField label="Passenger" placeholder="4" value={formData.passengerCount} onChange={(e) => updateDoc('passengerCount', e.target.value)} />
      <InputField label="Luggage" placeholder="3" value={formData.luggageCount} onChange={(e) => updateDoc('luggageCount', e.target.value)} />

      <InputField label="Wi-Fi" placeholder="Available" value={formData.wifi} onChange={(e) => updateDoc('wifi', e.target.value)} />
      <InputField label="Smoking" placeholder="Allowed" value={formData.smoking} onChange={(e) => updateDoc('smoking', e.target.value)} />

      <InputField label="Vehicle number plate" placeholder="1122" value={formData.numberPlate} onChange={(e) => updateDoc('numberPlate', e.target.value)} />
      <InputField label="Vehicle VIN" placeholder="121 454 789" value={formData.vin} onChange={(e) => updateDoc('vin', e.target.value)} />
    </div>

    <div className="pt-6 border-t mt-8">
      <p className="text-[14px] text-gray-500 mb-2">Upon clicking &quot;Next&quot; the following information will be submitted for review:</p>
      <ul className="list-disc pl-5 space-y-1 mb-6 text-[14px] text-gray-600 marker:text-gray-900">
        <li>Company Information</li>
        <li>Fleet Information</li>
        <li>First Chauffeur Information</li>
        <li>First Vehicle Information</li>
      </ul>
      <p className="font-medium text-[14px] text-[#111]">
        Please confirm the above provided information is accurate as you will not be able to updated it once submitted
      </p>
    </div>
  </div>
);
