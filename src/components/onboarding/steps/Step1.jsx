import { InputField, SelectField } from '../FormElements';

const countries = ['USA', 'Canada', 'UK', 'Australia'];

export const Step1 = ({ formData, updateDoc }) => (
  <div className="space-y-4">
    <div className="mb-6">
      <h2 className="text-[20px] font-medium text-[#111]">Company Information</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12">
      <InputField label="Company Name" placeholder="UX Pilot" value={formData.companyName} onChange={(e) => updateDoc('companyName', e.target.value)} />
      <SelectField label="Company Type ( Legal Form)" options={['Sole Proprietorship', 'General Partnership', 'LLC', 'Corp', 'Inc.']} value={formData.companyType} onChange={(e) => updateDoc('companyType', e.target.value)} />

      <div className="col-span-1 md:col-span-2 mt-3">
        <h3 className="text-[18px] font-medium text-[#111] mb-2 border-b pb-2 border-transparent">Company Address</h3>
      </div>

      <SelectField label="Country" options={countries} value={formData.country} onChange={(e) => updateDoc('country', e.target.value)} />
      <InputField label="Street" placeholder="4744" value={formData.street} onChange={(e) => updateDoc('street', e.target.value)} />

      <InputField label="Zip/Postal Code" placeholder="6587" value={formData.zipCode} onChange={(e) => updateDoc('zipCode', e.target.value)} />
      <InputField label="City" placeholder="4744" value={formData.city} onChange={(e) => updateDoc('city', e.target.value)} />

      <SelectField label="State/Province" options={['None', 'New York', 'California']} value={formData.stateProvince} onChange={(e) => updateDoc('stateProvince', e.target.value)} />
      <InputField label="Tax Identification Number" placeholder="7784" value={formData.taxId} onChange={(e) => updateDoc('taxId', e.target.value)} />

      <div className="col-span-1 md:col-span-2">
        <InputField label="Business Registration Number" placeholder="Please enter your registration number" value={formData.businessRegistration} onChange={(e) => updateDoc('businessRegistration', e.target.value)} />
      </div>
    </div>
    <div className="pt-4">
      <p className="text-[14px] text-gray-500">For more information regarding Partner Onboarding, you can visit our FAQ page <a href="#" className="font-medium text-[#1b2d5d] underline">here</a></p>
    </div>
  </div>
);
