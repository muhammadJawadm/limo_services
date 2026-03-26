import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export const InputField = ({ label, type = 'text', placeholder, value, onChange, icon }) => (
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

export const SelectField = ({ label, options, value, onChange }) => {
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

export const RadioGroup = ({ label, name, options, value, onChange }) => (
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

export const ToggleSwitch = ({ checked, onChange }) => (
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
