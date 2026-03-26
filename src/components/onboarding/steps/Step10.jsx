import { ToggleSwitch } from '../FormElements';

export const Step10 = ({ formData, updateDoc }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];

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
