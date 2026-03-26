import { InputField } from '../FormElements';
import { FiChevronDown } from 'react-icons/fi';
import usFlag from '../../../assets/us.png';

export const Step3 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">First Chauffeur Information</h2>
      <p className="text-[14px] text-gray-500 mt-2 max-w-3xl leading-relaxed">
        Please note as a required step in your application your fist chauffeur must confirm their identity before they can be approved to work with Limo Services. An email with instructions on the verification process will be sent to their registered email address after proceeding to the next to the next page.
      </p>
    </div>

    <div className="flex items-center gap-2 mb-8 ml-1">
      <input
        type="checkbox"
        id="sameAsRep"
        checked={formData.sameAsRep}
        onChange={(e) => updateDoc('sameAsRep', e.target.checked)}
        className="w-5 h-5 rounded-full border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d]"
        style={{ borderRadius: '50%', appearance: 'none', border: '1px solid #d1d5db', background: formData.sameAsRep ? '#1b2d5d' : 'transparent', position: 'relative' }}
      />
      {/* Quick hack for visual checkmark if wanted, but standard solid background circle works per screenshot for active state */}
      <label htmlFor="sameAsRep" className="text-[15px] text-gray-600 cursor-pointer select-none">
        Chauffeur details are the same as authorized representative
      </label>
    </div>

    {!formData.sameAsRep && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
        <InputField label="Chauffeur First Name" placeholder="Jayson" value={formData.chauffeurFirstName} onChange={(e) => updateDoc('chauffeurFirstName', e.target.value)} />
        <InputField label="Chauffeur Last Name" placeholder="Jayson" value={formData.chauffeurLastName} onChange={(e) => updateDoc('chauffeurLastName', e.target.value)} />

        <InputField label="Chauffeur Email" type="email" placeholder="jayson@gmail.com" value={formData.chauffeurEmail} onChange={(e) => updateDoc('chauffeurEmail', e.target.value)} />

        <div className="w-full">
          <label className="block text-[14px] text-gray-600 mb-2 ml-1">Chauffeur Mobile Phone</label>
          <div className="relative flex items-center rounded-full border border-gray-200/80 bg-white py-2 px-2 focus-within:border-[#1b2d5d] transition-colors">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full cursor-pointer border border-gray-100">
              <img src={usFlag} alt="US" className="w-5 h-5 object-cover rounded-full" />
              <FiChevronDown className="text-[#4d4d4d]" size={14} />
            </div>
            <span className="text-[#4d4d4d] text-[15px] ml-3">+1</span>
            <input
              type="text"
              value={formData.chauffeurPhone}
              onChange={(e) => updateDoc('chauffeurPhone', e.target.value)}
              className="flex-1 bg-transparent border-none text-[15px] text-gray-700 outline-none px-3 py-1.5"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 md:w-[calc(50%-1.5rem)]">
          <InputField label="Driver License ID" placeholder="121 454 789" value={formData.driverLicenseId} onChange={(e) => updateDoc('driverLicenseId', e.target.value)} />
        </div>
      </div>
    )}
  </div>
);
