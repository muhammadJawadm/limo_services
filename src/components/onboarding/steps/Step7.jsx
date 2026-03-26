export const Step7 = () => {
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

      <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="min-w-[700px] border border-gray-100 rounded-lg overflow-hidden bg-white">
          <div className="flex items-center justify-between bg-black text-white px-6 py-4 text-[14px] font-medium">
            <div className="w-32 shrink-0">Module#</div>
            <div className="flex-1 pr-4">Training Modules</div>
            <div className="w-48 shrink-0 text-right">Progress Percentage</div>
          </div>

          <div className="divide-y divide-gray-100">
            {modules.map((mod) => (
              <div key={mod.num} className="flex items-center px-6 py-5 hover:bg-gray-50 transition-colors">
                <div className="w-32 shrink-0 text-[14px] text-gray-400">{mod.num}</div>
                <div className="flex-1 pr-4 text-[14px] text-gray-500 font-medium cursor-pointer hover:text-[#1b2d5d]">
                  {mod.num}. {mod.name}
                </div>
                <div className="w-48 shrink-0 text-right text-[14px] text-[#1b2d5d] underline">
                  {mod.progress}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
