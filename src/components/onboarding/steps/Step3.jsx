import { InputField } from '../FormElements';
import SharedPhoneInput from '../../SharedPhoneInput';

const isMissing = (value) => value === undefined || value === null || String(value).trim() === '';

const FieldError = ({ show }) => {
  if (!show) return null;

  return (
    <p className="mt-1 ml-1 text-[12px] text-red-500">
      This field is required.
    </p>
  );
};

export const Step3 = ({ formData, updateDoc }) => {
  const showErrors = Boolean(formData.showErrors);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111]">First Chauffeur Information</h2>
        <p className="text-[14px] text-gray-500 mt-2 max-w-3xl leading-relaxed">
          Please note as a required step in your application your first chauffeur must confirm their identity before they can be approved to work with Limo Services. An email with instructions on the verification process will be sent to their registered email address after proceeding to the next page.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-8 ml-1">
        <input
          type="checkbox"
          id="sameAsRep"
          checked={Boolean(formData.sameAsRep)}
          onChange={(e) => updateDoc('sameAsRep', e.target.checked)}
          className="w-5 h-5 rounded-full border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d]"
          style={{ borderRadius: '50%', appearance: 'none', border: '1px solid #d1d5db', background: formData.sameAsRep ? '#1b2d5d' : 'transparent', position: 'relative' }}
        />
        <label htmlFor="sameAsRep" className="text-[15px] text-gray-600 cursor-pointer select-none">
          Chauffeur details are the same as authorized representative
        </label>
      </div>

      {!formData.sameAsRep && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
          <div>
            <InputField label="Chauffeur First Name" placeholder="Jayson" value={formData.chauffeurFirstName} onChange={(e) => updateDoc('chauffeurFirstName', e.target.value)} />
            <FieldError show={showErrors && isMissing(formData.chauffeurFirstName)} />
          </div>

          <div>
            <InputField label="Chauffeur Last Name" placeholder="Jayson" value={formData.chauffeurLastName} onChange={(e) => updateDoc('chauffeurLastName', e.target.value)} />
            <FieldError show={showErrors && isMissing(formData.chauffeurLastName)} />
          </div>

          <div>
            <InputField label="Chauffeur Email" type="email" placeholder="jayson@gmail.com" value={formData.chauffeurEmail} onChange={(e) => updateDoc('chauffeurEmail', e.target.value)} />
            <FieldError show={showErrors && isMissing(formData.chauffeurEmail)} />
          </div>

          <div className="w-full">
            <label className="block text-[14px] text-gray-600 mb-2 ml-1">Chauffeur Mobile Phone</label>
            <div className="mt-1.5">
              <SharedPhoneInput
                value={formData.chauffeurPhone}
                onChange={(e) => updateDoc('chauffeurPhone', e.target.value)}
                hasError={showErrors && isMissing(formData.chauffeurPhone)}
              />
            </div>
            <FieldError show={showErrors && isMissing(formData.chauffeurPhone)} />
          </div>

          <div className="col-span-1 md:col-span-2 md:w-[calc(50%-1.5rem)]">
            <InputField label="Driver License ID" placeholder="121 454 789" value={formData.driverLicenseId} onChange={(e) => updateDoc('driverLicenseId', e.target.value)} />
            <FieldError show={showErrors && isMissing(formData.driverLicenseId)} />
          </div>
        </div>
      )}
    </div>
  );
};
