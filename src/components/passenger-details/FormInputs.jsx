import { FiChevronDown } from 'react-icons/fi';
import SharedPhoneInput from '../SharedPhoneInput';

export function FloatingInput({ icon, placeholder, value, onChange, type = 'text', required = false }) {
  return (
    <div className="relative flex items-center border rounded-full px-3 py-3 gap-2 bg-white focus-within:border-[#1a2b5e] transition-colors">
      {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent min-w-0"
      />
    </div>
  );
}

export function PhoneInput(props) {
  return <SharedPhoneInput {...props} />;
}
