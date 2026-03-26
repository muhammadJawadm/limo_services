export function FormInput({ icon, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-full px-3 py-3 gap-2 bg-white focus-within:border-[#1a2b5e] transition-colors">
      {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400 min-w-0"
      />
    </div>
  );
}
