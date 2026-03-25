import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiCheck, FiGlobe } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import logoImg from '../../assets/navbarlogo.png';
import usFlag from '../../assets/us.png';
import testpdf from '../../assets/testpdf.pdf';
import profile from '../../assets/profile.svg';
import { AiOutlineLogout } from "react-icons/ai";
import Footer from '../../components/Footer';
import wallet from '../../assets/wallet.png';
import whitewallet from '../../assets/whitewallet.png';
// Dummy list of countries and states
const countries = ['USA', 'Canada', 'UK', 'Australia'];
const vehicleClasses = ['Business Class', 'First Class', 'Standard'];
const vehicleBrands = ['Mercedes-Benz S-Class', 'BMW 7 Series', 'Audi A8'];

const InputField = ({ label, type = 'text', placeholder, value, onChange, icon }) => (
  <div className="w-full">
    <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full appearance-none rounded-full border border-gray-200/80 bg-white py-3.5 ${icon ? 'pl-11' : 'pl-5'} pr-4 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors`}
      />
    </div>
  </div>
);

const SelectField = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full relative">
      <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between rounded-full border border-gray-200/80 bg-white py-3.5 pl-5 pr-4 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors"
        >
          <span className={value ? 'text-gray-700' : 'text-gray-400'}>{value || 'Select Option'}</span>
          <FiChevronDown className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} size={18} />
        </button>
        {open && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
            {options.map((opt, idx) => {
              const isSelected = value === opt;
              return (
                <div
                  key={idx}
                  onClick={() => { onChange({ target: { value: opt } }); setOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-[#f8f9fa]' : 'hover:bg-gray-50'}`}
                >
                  <span className={`text-[14px] flex-1 ${isSelected ? 'font-medium text-gray-800' : 'text-gray-600'}`}>{opt}</span>
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${isSelected ? 'bg-[#1b2d5d]' : 'border-2 border-gray-300'}`} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const RadioGroup = ({ label, name, options, value, onChange }) => (
  <div className="w-full">
    <label className="block text-[14px] text-gray-600 mb-3 ml-1">{label}</label>
    <div className="flex items-center gap-6 ml-1">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-5 h-5 accent-[#1b2d5d] border-gray-300 focus:ring-[#1b2d5d]"
          />
          <span className="text-[15px] text-gray-600">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

// Form Steps Components

const Step1 = ({ formData, updateDoc }) => (
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

const Step2 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">Fleet Information</h2>
      <p className="text-[14px] text-gray-500 mt-1">Please provide the following information about your fleet:</p>
    </div>

    <div className="space-y-6">
      <RadioGroup label="Do you have Prior Limo Services Experience?" name="priorExp" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.priorExp} onChange={(v) => updateDoc('priorExp', v)} />
      <RadioGroup label="Do you have electric vehicles in your fleet?" name="electricVehicles" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.electricVehicles} onChange={(v) => updateDoc('electricVehicles', v)} />
      <RadioGroup label="Do you have femaile chauffeurs?" name="femaleChauffeurs" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} value={formData.femaleChauffeurs} onChange={(v) => updateDoc('femaleChauffeurs', v)} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
      <InputField label="How many chauffeurs do you have?" placeholder="3" value={formData.chauffeurCount} onChange={(e) => updateDoc('chauffeurCount', e.target.value)} />
      <SelectField label="How many first class vehicles do you have?" options={['1-5', '6-10', '11+']} value={formData.firstClassCount} onChange={(e) => updateDoc('firstClassCount', e.target.value)} />

      <InputField label="How many business class vans do you have?" placeholder="How many business class vans do you have?" value={formData.businessVansCount} onChange={(e) => updateDoc('businessVansCount', e.target.value)} />
      <SelectField label="How many business class vans do you have?" options={['1-5', '6-10', '11+']} value={formData.businessVansCount2} onChange={(e) => updateDoc('businessVansCount2', e.target.value)} />
    </div>

    <div className="w-full">
      <label className="block text-[14px] text-gray-600 mb-2 ml-1">Describe the vehicles in your fleet (brand, model and year)</label>
      <textarea
        placeholder="Lorem Ipsum..."
        rows="4"
        value={formData.fleetDescription}
        onChange={(e) => updateDoc('fleetDescription', e.target.value)}
        className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
      ></textarea>
    </div>
  </div>
);

const Step3 = ({ formData, updateDoc }) => (
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

const Step4 = ({ formData, updateDoc }) => (
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

const Step9 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">Payment Details</h2>
      <p className="text-[14px] text-gray-500 mt-2">
        Please Provide the bank details for receiving payments form Limo in the future
      </p>
    </div>

    <div className="space-y-4 max-w-2xl">
      <p className="text-[14px] text-gray-500 mb-2">Preferred Payment Method</p>

      {/* Selected Payment Method Mockup */}
      <div className="border border-[#1b2d5d] rounded-xl p-4 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white">
            <img src={whitewallet} alt="card" className='w-6 h-6' />
          </div>
          <div>
            <div className="text-[15px] font-medium text-[#111]">Dabit Cart</div>
            <div className="text-[13px] text-gray-500">Pay directly form your bank</div>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white">
          <FiCheck size={14} />
        </div>
      </div>

      <div className="pt-2" />

      <InputField label="" icon={<LuUser className="text-gray-400" size={18} />} placeholder="Card Holder Name" value={formData.cardHolderName} onChange={(e) => updateDoc('cardHolderName', e.target.value)} />
      <InputField label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} placeholder="Card Number" value={formData.cardNumber} onChange={(e) => updateDoc('cardNumber', e.target.value)} />

      <div className="grid grid-cols-2 gap-4">
        <InputField label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} placeholder="Date Expiry" value={formData.cardExpiry} onChange={(e) => updateDoc('cardExpiry', e.target.value)} />
        <InputField label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} placeholder="CVC" value={formData.cardCvc} onChange={(e) => updateDoc('cardCvc', e.target.value)} />
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mt-1">
          <img src={wallet} alt="wallet" className='w-6 h-6' />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-medium text-[#111]">Created card</div>
          <div className="text-[13px] text-gray-500 mb-2">Save your info for faster booking</div>
          <div className="flex items-center justify-start text-gray-600 gap-2 bg-[#1B2D5D26] px-4 py-2 rounded-md w-[65%]">
            <div className="w-5 h-5 rounded-full border border-gray-800 flex items-center justify-center text-[12px] text-black">!</div>
            <p className="text-[14px] text-gray-500">ID verification required for credit card payments.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#1b2d5d]' : 'bg-gray-200 shadow-inner'}`}
  >
    <span className="sr-only">Use setting</span>
    <span
      className={`pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}
    />
  </button>
);

const Step10 = ({ formData, updateDoc }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']; // Assuming Sat is omitted based on screenshot or just standard

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111]">Availability</h2>
        <p className="text-[14px] text-gray-500 mt-2">
          Set your preferred working hours.
        </p>
      </div>

      <div className="max-w-md bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-[16px] font-semibold text-[#111]">Weekly Schedule</h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="p-5 space-y-5">
          {days.map(day => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-gray-600 w-12">{day}</span>
              <div className="flex items-center gap-6">
                <span className="text-[14px] text-gray-400">9:00 AM</span>
                <span className="text-[14px] text-gray-400">9:00 AM</span>
              </div>
              <ToggleSwitch
                checked={formData.availability?.[day] ?? true}
                onChange={(val) => updateDoc('availability', { ...formData.availability, [day]: val })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




const Step5 = () => (
  <div className="space-y-6">
    <div className="mb-10">
      <h2 className="text-[20px] font-bold text-[#111]">Onboarding Program</h2>
    </div>

    <div className="text-[15px] text-gray-600 leading-relaxed font-light space-y-6 max-w-4xl">
      <p className='text-black font-semibold'>Thanks you fo providing your company details. We are excited to have you drive with us soon. As a Lime Services partner, you'll get:</p>

      <ul className="list-disc pl-5 space-y-2 text-gray-500 marker:text-gray-900">
        <li>Quality-based bonus opportunities and the chance to join out partner prestige Club</li>
        <li>Regular, reliable payment for all rides</li>
        <li>Access to an established global customer base of business-class travellers</li>
        <li>Easy account management with our user-friendly chauffeur app and online partner portal</li>
        <li>Choice of which rides you want to take to fill any gaps in your daily schedule</li>
      </ul>

      <p className='text-black font-semibold'>Before you can perform your first ride and join  Limo services global network of partner we need your help with the following:</p>

      <ul className="list-disc pl-5 space-y-2 text-gray-500 marker:text-gray-900">
        <li>Upload 14 required documents</li>
        <li>Complete all Partner training modules</li>
        <li>Sign the partner agreement contract</li>
        <li>Submit your payment details</li>
        <li>Complete a live webinar</li>
      </ul>

      <p>Our team is looking forward to receiving your information and supporting you through registration process.</p>
    </div>

    <div className="pt-4">
      <p className="text-[14px] text-gray-500">For more information, you can visit our FAQ page <a href="#" className="font-medium text-[#1b2d5d] hover:underline">here</a>.</p>
    </div>
  </div>
);

const DocRow = ({ name, expiry, status }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-100 gap-4">
    <div className="flex-1 text-[13px] md:text-[14px] text-gray-600 font-medium">{name}</div>
    <div className="w-32 text-[13px] text-gray-500">{expiry || '-'}</div>
    <div className="w-24 flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'Uploaded' ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-[13px] text-gray-500">{status}</span>
    </div>
    <div className="w-20 text-right">
      <button className="text-[#1b2d5d] text-[13px] font-medium hover:underline">Upload</button>
    </div>
  </div>
);

const Step6 = () => {
  const companyDocs = [
    { name: 'W-9 Form', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Articles of Incorporation, articles of organization, or business registration.', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'Federal Tax ID / EIN Certificate', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'City of Houston- Vehicle for Hire Permit', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Copy of void check for payment detail confirmation', expiry: '-', status: 'Missing' }
  ];

  const chauffeurDocs = [
    { name: 'Chauffeur Profile Picture', expiry: '02-6-2028', status: 'Missing' },
    { name: 'License Picture Upload', expiry: '02-6-2028', status: 'Uploaded' }
  ];

  const vehicleDocs = [
    { name: 'Houston Limousine License window Decal', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Certificate of liability Insurance (min.$1M CSL (Sedan/SUV) $1.5MCSL (Spri...', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'Texas Premium Sedan Vehicle Registration Paper and Sticker', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'City o Houston Permitted Vehicle Window Sticker', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Texas of the whole vehicle showing the license palte', expiry: '-', status: 'Missing' },
    { name: 'Airport Permit', expiry: '-', status: 'Missing' }
  ];

  const TableHeader = () => (
    <div className="hidden md:flex items-center justify-between bg-black text-white px-4 py-3 rounded-t-lg text-[13px] font-medium mt-2">
      <div className="flex-1">Name</div>
      <div className="w-40">Expiry Date</div>
      <div className="w-24">Status</div>
      <div className="w-20"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[18px] font-bold text-[#111]">Upload Required Documents</h2>
        <p className="text-[14px] text-gray-500 mt-1">Please upload each of the below required document. These will be reviewed by our team before your application can be approved.</p>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1">Company Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Company documents required for Sunrise Correlation:</p>
        <TableHeader />
        <div className="px-4">
          {companyDocs.map((doc, i) => <DocRow key={i} {...doc} />)}
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1 mt-6">Chauffeur Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Chauffeur documents required for Jayson smith:</p>
        <TableHeader />
        <div className="px-4">
          {chauffeurDocs.map((doc, i) => <DocRow key={i} {...doc} />)}
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1 mt-6">Vehicle Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Vehicle documents required for Premium Sedan (TYR45454):</p>
        <TableHeader />
        <div className="px-4">
          {vehicleDocs.map((doc, i) => <DocRow key={i} {...doc} />)}
        </div>
      </div>

      <div className="flex items-center justify-start text-gray-600 mt-6 pb-4">
        <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[12px]">i</div>
      </div>
    </div>
  );
};

const Step7 = () => {
  const modules = [
    { num: 1, name: 'Who We Are', progress: '0%' },
    { num: 2, name: 'The Chauffeur App', progress: '0%' },
    { num: 3, name: 'Reviewing Rides and Waiting Time Policy', progress: '0%' },
    { num: 4, name: 'Service improvement opportunities', progress: '0%' },
    { num: 5, name: 'Chauffeur Values - Act with Integrity', progress: '0%' },
    { num: 6, name: 'Chauffeur Values - Be Adaptable', progress: '0%' },
    { num: 7, name: 'Chauffeur Values - Be Consistent', progress: '0%' },
    { num: 8, name: 'Chauffeur Values - Be Discreet', progress: '0%' },
    { num: 9, name: 'Chauffeur Values - Be Refined', progress: '0%' },
    { num: 10, name: 'Chauffeur Values - Be Reliable', progress: '0%' },
    { num: 11, name: 'Chauffeur Values - Be Reliable', progress: '0%' },
    { num: 12, name: 'Chauffeur Values - Be Respectful', progress: '0%' },
    { num: 13, name: 'Chauffeur Values - Be Vehicle Champions', progress: '0%' },
    { num: 14, name: 'Chauffeur Values - Go Above and Beyond', progress: '0%' },
    { num: 15, name: 'Chauffeur Values - Prioritize Safety', progress: '0%' }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111] mb-4">Partner Training</h2>
        <p className="text-[14px] text-gray-500 mt-2 max-w-3xl leading-relaxed">
          Welcome to Limo Services Training. In order to be able to perform rides with limo, please complete the following 15 modules. <br />They can be accessed individually using the links below.
        </p>
        <p className="text-[14px] text-[#111] font-medium mt-6">You have competed out of 15 modules</p>
      </div>

      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <div className="hidden md:flex items-center justify-between bg-black text-white px-6 py-4 text-[14px] font-medium">
          <div className="w-40">Module#</div>
          <div className="flex-1">Training Modules</div>
          <div className="w-48 text-right">Progress Percentage</div>
        </div>

        <div className="divide-y divide-gray-100">
          {modules.map((mod) => (
            <div key={mod.num} className="flex flex-col md:flex-row md:items-center px-6 py-5 hover:bg-gray-50 transition-colors">
              <div className="w-40 text-[14px] text-gray-400 mb-1 md:mb-0">{mod.num}</div>
              <div className="flex-1 text-[14px] text-gray-500 font-medium cursor-pointer hover:text-[#1b2d5d]">{mod.num}. {mod.name}</div>
              <div className="w-48 text-right text-[14px] text-[#1b2d5d] underline mt-2 md:mt-0">{mod.progress}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step8 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">Partner Contract</h2>
      <p className="text-[14px] text-gray-500 mt-2">
        Please review our contract below and accept your contractual agreement.
      </p>
    </div>

    {/* Actual PDF Viewer */}
    <div className="w-full bg-[#323639] rounded-lg overflow-hidden flex flex-col h-[600px] border border-gray-200">
      <iframe
        src={testpdf}
        title="Partner Contract"
        className="w-full h-full"
        style={{ border: 'none' }}
      >
        <p>Your browser does not support PDFs. <a href={testpdf}>Download the PDF</a>.</p>
      </iframe>
    </div>

    <div className="pt-2">
      <a href="#" className="text-[14px] text-[#1B2D5D] hover:underline">Click here to download a copy of your contractual agreement.</a>
    </div>

    <div className="mt-6">
      <div className="w-full">
        <label className="block text-[14px] text-gray-600 mb-2 ml-1">Place</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Jayson|"
            value={formData.contractPlace || ''}
            onChange={(e) => updateDoc('contractPlace', e.target.value)}
            className={`w-full appearance-none rounded-full border ${formData.showErrors && !formData.contractPlace ? 'border-red-400 bg-red-50/20' : 'border-gray-200/80 bg-white'} py-3.5 pl-5 pr-4 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors`}
          />
        </div>
        {formData.showErrors && !formData.contractPlace && (
          <p className="text-red-500 text-[13px] mt-2 ml-1">Completed this fields</p>
        )}
      </div>
    </div>

    <div className="mt-6 flex items-start gap-3 ml-1">
      <div className="mt-0.5 relative flex items-center justify-center flex-shrink-0">
        <input
          type="checkbox"
          id="contractAgreed"
          checked={formData.contractAgreed || false}
          onChange={(e) => updateDoc('contractAgreed', e.target.checked)}
          className="w-5 h-5 rounded-full border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d] cursor-pointer"
          style={{ borderRadius: '50%', appearance: 'none', border: '1px solid #d1d5db', background: formData.contractAgreed ? '#1b2d5d' : 'transparent' }}
        />
        {formData.contractAgreed && <FiCheck className="absolute text-white pointer-events-none" size={12} />}
      </div>
      <label htmlFor="contractAgreed" className="text-[14px] text-gray-600 cursor-pointer select-none leading-relaxed">
        I have reviewed and agree to the local service provider U.S General Terms and Conditions
      </label>
    </div>

    <div className="pt-6">
      <p className="text-[14px] text-[#111]">By clicking Agree, you hereby accept the terms of the pertner agreement and have provided a digital signature for the contract.</p>
    </div>
  </div>
);


export default function DriverOnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    companyName: '',
    companyType: '',
    country: '',
    street: '',
    zipCode: '',
    city: '',
    stateProvince: '',
    taxId: '',
    businessRegistration: '',
    // Step 2
    priorExp: '',
    electricVehicles: '',
    femaleChauffeurs: '',
    chauffeurCount: '',
    firstClassCount: '',
    businessVansCount: '',
    businessVansCount2: '',
    fleetDescription: '',
    // Step 3
    sameAsRep: false,
    chauffeurFirstName: '',
    chauffeurLastName: '',
    chauffeurEmail: '',
    chauffeurPhone: '',
    driverLicenseId: '',
    // Step 4
    vehicleYear: '',
    vehicleBrand: '',
    vehicleClass: '',
    vehicleColor: '',
    passengerCount: '',
    luggageCount: '',
    wifi: '',
    smoking: '',
    numberPlate: '',
    vin: '',
    // Step 8
    contractPlace: '',
    contractAgreed: false,
    showErrors: false,
    // Step 9
    cardHolderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    // Step 10
    availability: {
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: true,
      Fri: true,
      Sun: true
    }
  });

  const updateDoc = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep === 8) {
      if (!formData.contractPlace) {
        updateDoc('showErrors', true);
        return;
      }
      // If valid, and want to go to next step
      updateDoc('showErrors', false);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else if (currentStep === totalSteps) {
      // Final submit
      console.log('Final Submit', formData);
      setShowReviewModal(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} updateDoc={updateDoc} />;
      case 2: return <Step2 formData={formData} updateDoc={updateDoc} />;
      case 3: return <Step3 formData={formData} updateDoc={updateDoc} />;
      case 4: return <Step4 formData={formData} updateDoc={updateDoc} />;
      case 5: return <Step5 />;
      case 6: return <Step6 />;
      case 7: return <Step7 />;
      case 8: return <Step8 formData={formData} updateDoc={updateDoc} />;
      case 9: return <Step9 formData={formData} updateDoc={updateDoc} />;
      case 10: return <Step10 formData={formData} updateDoc={updateDoc} />;
      default: return <div className="p-10 text-center text-gray-500">More steps coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#Fcfcfc] font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 xl:px-12 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logoImg} alt="Prvyn Services" className="h-10 object-contain" />
        </div>

        {/* Stepper Center */}
        <div className="hidden lg:flex flex-1 max-w-4xl mx-auto items-center justify-center px-8">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div key={idx} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors
                  ${isCompleted ? 'bg-[#1b2d5d] text-white' : isCurrent ? 'bg-white border-2 border-[#1b2d5d] text-[#1b2d5d]' : 'bg-white border border-gray-200 text-gray-400'}
                `}>
                  {isCompleted ? <FiCheck size={16} /> : stepNum}
                </div>
                {idx < totalSteps - 1 && (
                  <div className={`w-6 xl:w-10 h-[2px] mx-1 md:mx-2 border-t-2 border-dashed ${isCompleted ? 'border-[#1b2d5d]' : 'border-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex-shrink-0 min-w-[200px] flex justify-end">
          <div className="relative group">
            <button className="flex items-center gap-3 bg-white border rounded-full py-2.5 px-5 hover:bg-gray-50 transition-colors shadow-sm">
              <img src={profile} alt="profile" className="w-7 h-6" />
              <span className="text-[14px] font-medium text-gray-600 block">Onboarding</span>
              <FiChevronDown className="text-gray-600 ml-1 w-6 h-6" />
            </button>

            {/* Dropdown Menu placeholder */}
            <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              <div className="flex items-center gap-1 p-3 rounded-xl bg-[#f8f9fa] border border-gray-100 mb-1 cursor-pointer">
                <img src={profile} alt="profile" className="w-7 h-6" />
                <span className="text-[14px] font-medium text-gray-800">Onboarding Registration</span>
                <div className="ml-auto w-4 h-4 rounded-full bg-[#1b2d5d] flex-shrink-0" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
                <LuUser className="text-gray-500" size={20} />
                <span className="text-[14px] text-gray-600">My Profile</span>
                <div className="ml-auto w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer text-red-500">
                <AiOutlineLogout className="text-red-500" size={20} />
                <span className="text-[14px]">Logout</span>
                <div className="ml-auto w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-10 md:py-16 px-4">
        <div className="w-full max-w-[1000px]">

          <div className="mb-4">
            <h1 className="text-[24px] md:text-[28px] font-semibold text-[#1b2d5d]">Partner Onboarding</h1>
            {currentStep === 1 && (
              <div className="mt-4 text-[15px] text-gray-500 max-w-2xl leading-relaxed">
                Thank you Jayson smith for choosing to partner with Limo Services. You have selected Algiers as your primary city of operations.
                <br /><br />
                Please provide the following mandatory information: Company Name, Legal Form, Country, City, Street and Postal Code.
              </div>
            )}

            {/* Mobile Stepper */}
            <div className="flex lg:hidden mt-6 items-center flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</span>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-[#1b2d5d] rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-transparent">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className={`mt-12 flex items-center ${currentStep > 1 ? 'justify-between' : 'justify-start'} gap-4`}>
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-10 py-3.5 rounded-full border border-gray-300 bg-white text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full md:w-auto min-w-[160px]"
                >
                  Previous
                </button>
              )}
              <button
                onClick={nextStep}
                className="px-10 py-3.5 rounded-full bg-[#1b2d5d] text-[15px] font-medium text-white hover:bg-[#132042] transition-colors w-full md:w-auto min-w-[160px]"
              >
                {currentStep === 10 ? 'Submit Application' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* Admin Under Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full text-center relative shadow-2xl animate-fade-in-up">
            <div className="w-14 h-14 bg-gray-100 text-[#1b2d5d] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="15" cy="15" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" />
                <path d="M17.5 17.5L19.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="text-[22px] font-bold text-[#111] mb-3">Under Admin Review</h3>
            <p className="text-[14px] text-gray-500 mb-8 leading-relaxed px-2">
              Your application has been submitted. Our team will review your documents and get back to you within 24-48 hours.
            </p>

            <button
              onClick={() => {
                setShowReviewModal(false);
                navigate('/driver/profile');
              }}
              className="w-full bg-[#1b2d5d] text-white rounded-full py-3.5 font-medium text-[15px] hover:bg-[#132042] transition-colors mb-3"
            >
              Simulate Approval
            </button>
            <button
              onClick={() => setShowReviewModal(false)}
              className="w-full border border-gray-200 text-gray-700 rounded-full py-3.5 font-medium text-[15px] hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
