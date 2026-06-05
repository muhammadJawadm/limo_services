import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import usFlag from '../assets/us.png';

export const COUNTRIES = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: usFlag, length: 10 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨', length: 10 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'u', length: 10 },
];

export default function SharedPhoneInput({ value, onChange, dialCode = '+1', onDialChange, required = false, hasError = false, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [internalCountryCode, setInternalCountryCode] = useState(() => {
    const found = COUNTRIES.find(c => c.dialCode === dialCode);
    return found ? found.code : 'US';
  });

  const selectedCountry = COUNTRIES.find(c => c.code === internalCountryCode) || COUNTRIES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const rawValue = e.target.value;
    // Allow only numbers
    const numbersOnly = rawValue.replace(/\D/g, '');
    
    // Not more characters than allowed by country
    if (numbersOnly.length <= selectedCountry.length) {
      if (onChange) {
        // Return a mock event to remain compatible with standard onChange
        onChange({ target: { name: e.target.name, value: numbersOnly } });
      }
    }
  };

  const handleCountrySelect = (country) => {
    setInternalCountryCode(country.code);
    if (onDialChange) onDialChange(country.dialCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative flex items-center border rounded-full bg-white transition-colors py-1 ${hasError ? 'border-red-200' : 'border-gray-200 focus-within:border-[#1a2b5e]'} ${className}`}>
      {/* Country selector */}
      <div 
        ref={dropdownRef}
        className="relative flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full cursor-pointer ml-1 select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry.code === 'US' ? (
           <img src={selectedCountry.flag} alt="US" className="w-5 h-5 rounded-full object-cover" />
        ) : (
           <span className="text-[18px] leading-none flex items-center justify-center w-5 h-5">{selectedCountry.flag}</span>
        )}
        <FiChevronDown size={14} className="text-gray-600" />
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-1 z-50">
            {COUNTRIES.map(country => (
              <div 
                key={country.code}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCountrySelect(country);
                }}
              >
                {country.code === 'US' ? (
                   <img src={country.flag} alt="US" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                   <span className="text-[18px] leading-none flex items-center justify-center w-5 h-5">{country.flag}</span>
                )}
                <span className="text-sm font-medium text-gray-700">{country.name}</span>
                <span className="text-sm text-gray-400 ml-auto">{country.dialCode}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <span className="ml-2 text-sm text-gray-500">{selectedCountry.dialCode}</span>
      
      <input
        name="phone"
        type="tel"
        value={value || ''}
        onChange={handleChange}
        required={required}
        placeholder={`Enter ${selectedCountry.length} digits`}
        className="ml-2 w-full bg-transparent text-sm text-gray-700 outline-none px-2 py-2 min-w-0"
        minLength={selectedCountry.length}
        maxLength={selectedCountry.length}
      />
    </div>
  );
}