import { MdEdit } from 'react-icons/md'
import { FiSave, FiX } from 'react-icons/fi'

export function Field({ label, value, onChange, type = 'text', editing, icon, placeholder = '' }) {
  return (
    <div className="w-full">
      {label && <label className="block text-[14px] text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10 text-gray-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value ?? ''}
          readOnly={!editing}
          onChange={editing ? (event) => onChange(event.target.value) : undefined}
          placeholder={placeholder}
          className={`w-full rounded-full border py-3.5 px-5 text-[14px] text-gray-800 outline-none transition-colors
            ${icon ? 'pl-[52px]' : ''}
            ${editing
              ? 'border-[#1b2d5d] bg-white focus:ring-2 focus:ring-[#1b2d5d]/20'
              : 'border-gray-100 bg-white cursor-default'
            }`}
        />
      </div>
    </div>
  )
}

export function SelectField({ label, value, onChange, options = [], editing, icon }) {
  return (
    <div className="w-full">
      {label && <label className="block text-[14px] text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10 text-gray-500">
            {icon}
          </div>
        )}
        {editing ? (
          <select
            value={value ?? ''}
            onChange={(event) => onChange(event.target.value)}
            className={`w-full appearance-none rounded-full border border-[#1b2d5d] bg-white py-3.5 pr-10 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-[#1b2d5d]/20 ${icon ? 'pl-[52px]' : 'pl-5'}`}
          >
            {options.map((option) => (
              <option key={option.value ?? option} value={option.value ?? option}>
                {option.label ?? option}
              </option>
            ))}
          </select>
        ) : (
          <input
            readOnly
            value={value ?? ''}
            className={`w-full appearance-none rounded-full border border-gray-100 bg-white py-3.5 pr-10 text-[14px] text-gray-800 outline-none cursor-default ${icon ? 'pl-[52px]' : 'pl-5'}`}
          />
        )}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gray-400">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function RadioGroup({ label, value, onChange, editing }) {
  return (
    <div>
      <p className="text-[14px] text-gray-700 mb-3">{label}</p>
      <div className="flex gap-6">
        {['Yes', 'No'].map((option) => (
          <label
            key={option}
            className={`flex items-center gap-2 ${editing ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={editing ? () => onChange(option.toLowerCase()) : undefined}
          >
            <div
              className={`w-4 h-4 flex-shrink-0 rounded-full border flex items-center justify-center transition-colors
                ${(value === true && option === 'Yes') || (value === 'yes' && option === 'Yes') ||
                  (value === false && option === 'No') || (value === 'no' && option === 'No')
                  ? 'border-[#1b2d5d]' : 'border-gray-300'}`}
            >
              {((value === true && option === 'Yes') || (value === 'yes' && option === 'Yes') ||
                (value === false && option === 'No') || (value === 'no' && option === 'No')) && (
                <div className="w-2 h-2 rounded-full bg-[#1b2d5d]" />
              )}
            </div>
            <span className="text-[14px] text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-8 w-14 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? 'bg-[#1b2d5d]' : 'bg-gray-200 shadow-inner'}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  )
}

export function EditBar({ editing, saving, onEdit, onSave, onCancel }) {
  return (
    <div className="mt-8 flex items-center gap-3">
      {!editing ? (
        <button
          onClick={onEdit}
          className="bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-10 py-3 flex items-center gap-2 font-medium text-[15px]"
        >
          Edit <MdEdit size={14} />
        </button>
      ) : (
        <>
          <button
            onClick={onSave}
            disabled={saving}
            className="bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-10 py-3 flex items-center gap-2 font-medium text-[15px] disabled:opacity-60"
          >
            {saving ? 'Saving...' : <><FiSave size={14} /> Save</>}
          </button>
          <button
            onClick={onCancel}
            className="border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full px-10 py-3 flex items-center gap-2 font-medium text-[15px]"
          >
            <FiX size={14} /> Cancel
          </button>
        </>
      )}
    </div>
  )
}
