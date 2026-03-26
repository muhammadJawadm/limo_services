import { FiChevronDown } from 'react-icons/fi';
import usflag from '../../assets/us.png';

export function FloatingInput({ icon, placeholder, value, onChange, type = 'text' }) {
  return (
    <div className="relative flex items-center border rounded-full px-3 py-3 gap-2 bg-white focus-within:border-[#1a2b5e] transition-colors">
      {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent min-w-0"
      />
    </div>
  );
}

export function PhoneInput({ value, onChange, dialCode, onDialChange }) {
  return (
    <div className="relative flex items-center border border-gray-200 rounded-3xl overflow-hidden bg-white focus-within:border-[#1a2b5e] transition-colors">
      {/* Country selector */}
      <div className="flex items-center gap-1 px-2 py-1 border rounded-full bg-gray-200  flex-shrink-0 ml-2">
        <img src={usflag} alt="US" className="w-5 h-4.5 object-cover" />
        <FiChevronDown size={12} className="text-gray-400" />
      </div>
      <input
        type="tel"
        placeholder="+1"
        value={value}
        onChange={onChange}
        className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent px-3 py-3 min-w-0"
      />
    </div>
  );
}
