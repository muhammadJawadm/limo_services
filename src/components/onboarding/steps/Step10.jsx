import { ToggleSwitch } from '../FormElements';

export const Step10 = ({ formData, updateDoc }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toTimeValue = (value, fallback) => {
    if (!value) return fallback;
    if (typeof value !== 'string') return fallback;
    if (value.includes('AM') || value.includes('PM')) {
      const [time, period] = value.split(' ');
      const [h, m] = time.split(':');
      if (!h || !m) return fallback;
      let hour = Number.parseInt(h, 10);
      if (Number.isNaN(hour)) return fallback;
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      return `${String(hour).padStart(2, '0')}:${m}`;
    }

    return value;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111]">Availability</h2>
        <p className="text-[14px] text-gray-500 mt-2">
          Set your preferred working hours.
        </p>
      </div>

      <div className="max-w-lg bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
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
          <div className="flex items-center justify-between text-[12px] text-gray-400">
            <span className="w-12" />
            <div className="flex items-center gap-6">
              <span className="w-[90px] text-center">Start</span>
              <span className="w-[90px] text-center">End</span>
            </div>
            <span className="w-14" />
          </div>
          {days.map((day) => {
            const startKey = `${day}Start`;
            const endKey = `${day}End`;
            const startVal = toTimeValue(formData.availability?.[startKey], '09:00');
            const endVal = toTimeValue(formData.availability?.[endKey], '18:00');

            return (
              <div key={day} className="flex items-center justify-between">
                <span className="text-[15px] font-medium text-gray-600 w-12">{day}</span>
                <div className="flex items-center gap-6">
                  <input
                    type="time"
                    value={startVal}
                    onChange={(e) =>
                      updateDoc('availability', {
                        ...formData.availability,
                        [startKey]: e.target.value,
                      })
                    }
                    className="w-[110px] rounded-full border border-gray-200 px-2 py-1 text-[13px] text-gray-600 focus:border-[#1b2d5d] focus:outline-none"
                  />
                  <input
                    type="time"
                    value={endVal}
                    onChange={(e) =>
                      updateDoc('availability', {
                        ...formData.availability,
                        [endKey]: e.target.value,
                      })
                    }
                    className="w-[110px] rounded-full border border-gray-200 px-2 py-1 text-[13px] text-gray-600 focus:border-[#1b2d5d] focus:outline-none"
                  />
                </div>
                <ToggleSwitch
                  checked={formData.availability?.[day] ?? true}
                  onChange={(val) =>
                    updateDoc('availability', {
                      ...formData.availability,
                      [day]: val,
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
