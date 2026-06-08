import { useCallback, useEffect, useState } from 'react';
import { InputField, SelectField } from '../FormElements';
import USAddressInput from '../../USAddressInput';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const isMissing = (value) => value === undefined || value === null || String(value).trim() === '';

const FieldError = ({ show }) => {
  if (!show) return null;

  return (
    <p className="mt-1 ml-1 text-[12px] text-red-500">
      This field is required.
    </p>
  );
};

export const Step1 = ({ formData, updateDoc }) => {
  const showErrors = Boolean(formData.showErrors);
  const [addressSearch, setAddressSearch] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { updateDoc('country', 'USA'); }, []);

  const handleAddressSelect = useCallback(
    (prediction) => {
      setAddressSearch(prediction.description);

      if (!window.google?.maps?.Geocoder) return;

      new window.google.maps.Geocoder().geocode(
        { placeId: prediction.place_id },
        (results, status) => {
          if (status !== 'OK' || !results?.[0]) return;

          const comps = results[0].address_components;
          const get = (types, key = 'long_name') =>
            comps.find((c) => c.types.some((t) => types.includes(t)))?.[key] || '';

          const streetNumber = get(['street_number']);
          const route = get(['route']);
          const city =
            get(['locality']) ||
            get(['sublocality_level_1']) ||
            get(['administrative_area_level_2']);
          const stateRaw = get(['administrative_area_level_1']);
          const stateProvince =
            US_STATES.find((s) => s.toLowerCase() === stateRaw.toLowerCase()) || stateRaw;
          const zipCode = get(['postal_code']);

          updateDoc('street', [streetNumber, route].filter(Boolean).join(' '));
          updateDoc('city', city);
          updateDoc('stateProvince', stateProvince);
          updateDoc('zipCode', zipCode);
          updateDoc('country', 'USA');
        },
      );
    },
    [updateDoc],
  );

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-[20px] font-medium text-[#111]">Company Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12">
        <div>
          <InputField label="Company Name" placeholder="UX Pilot" value={formData.companyName} onChange={(e) => updateDoc('companyName', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.companyName)} />
        </div>

        <div>
          <SelectField label="Company Type ( Legal Form)" options={['Sole Proprietorship', 'General Partnership', 'LLC', 'Corp', 'Inc.']} value={formData.companyType} onChange={(e) => updateDoc('companyType', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.companyType)} />
        </div>

        <div className="col-span-1 md:col-span-2 mt-3">
          <h3 className="text-[18px] font-medium text-[#111] mb-2 border-b pb-2 border-transparent">Company Address</h3>
        </div>

        {/* Address search — auto-fills Street, City, State, Zip below */}
        <div className="col-span-1 md:col-span-2">
          <USAddressInput
            label="Search Address (auto-fills fields below)"
            value={addressSearch}
            onChange={(e) => setAddressSearch(e.target.value)}
            onSelect={handleAddressSelect}
            placeholder="Start typing a US address..."
          />
        </div>

        {/* Country locked to USA */}
        <div>
          <div className="w-full">
            <label className="block text-[14px] text-gray-600 mb-2 ml-1">Country</label>
            <div className="w-full flex items-center justify-between rounded-full border border-gray-200/80 bg-gray-50 py-3.5 pl-5 pr-4 text-[15px] text-gray-700 cursor-default select-none">
              <span>USA</span>
              <span className="text-[11px] text-gray-400 bg-gray-100 rounded-full px-3 py-0.5">US only</span>
            </div>
          </div>
        </div>

        <div>
          <InputField label="Street" placeholder="4744 Main St" value={formData.street} onChange={(e) => updateDoc('street', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.street)} />
        </div>

        <div>
          <InputField type="number" label="Zip/Postal Code" placeholder="6587" value={formData.zipCode} onChange={(e) => updateDoc('zipCode', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.zipCode)} />
        </div>

        <div>
          <InputField label="City" placeholder="New York" value={formData.city} onChange={(e) => updateDoc('city', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.city)} />
        </div>

        <div>
          <SelectField label="State/Province" options={US_STATES} value={formData.stateProvince} onChange={(e) => updateDoc('stateProvince', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.stateProvince)} />
        </div>

        <div>
          <InputField label="Tax Identification Number" placeholder="7784" value={formData.taxId} onChange={(e) => updateDoc('taxId', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.taxId)} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <InputField label="Business Registration Number" placeholder="Please enter your registration number" value={formData.businessRegistration} onChange={(e) => updateDoc('businessRegistration', e.target.value)} />
          <FieldError show={showErrors && isMissing(formData.businessRegistration)} />
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[14px] text-gray-500">For more information regarding Partner Onboarding, you can visit our FAQ page <a href="/faq" className="font-medium text-[#1b2d5d] underline">here</a></p>
      </div>
    </div>
  );
};
