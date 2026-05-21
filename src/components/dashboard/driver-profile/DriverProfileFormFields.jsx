import { FiChevronDown } from 'react-icons/fi';

export const InputField = ({ label, type = 'text', placeholder, value, onChange, readOnly }) => (
  <div className="w-full">
    <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full appearance-none rounded-full border border-gray-200/80 bg-white py-3.5 px-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors"
      />
    </div>
  </div>
);

export const SelectField = ({ label, options, value, onChange, disabled }) => (
  <div className="w-full relative">
    <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full appearance-none rounded-full border border-gray-200/80 bg-white py-3.5 pl-5 pr-10 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors"
      >
        <option value="" disabled>Select Option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt?.value ?? opt}>
            {opt?.label ?? opt}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <FiChevronDown className="text-gray-400" size={18} />
      </div>
    </div>
  </div>
);
