const DocRow = ({ name, expiry, status }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 gap-4 last:border-b-0">
    <div className="flex-1 text-[13px] md:text-[14px] text-gray-600 font-medium pr-4">{name}</div>
    <div className="w-40 shrink-0 text-[13px] text-gray-500">{expiry || '-'}</div>
    <div className="w-24 shrink-0 flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'Uploaded' ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-[13px] text-gray-500">{status}</span>
    </div>
    <div className="w-20 shrink-0 text-right">
      <button className="text-[#1b2d5d] text-[13px] font-medium hover:underline">Upload</button>
    </div>
  </div>
);

export const Step6 = () => {
  const companyDocs = [
    { name: 'W-9 Form', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Articles of Incorporation, articles of organization, or business registration.', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'Federal Tax ID / EIN Certificate', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'City of Houston- Vehicle for Hire Permit', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Copy of void check for payment detail confirmation', expiry: '-', status: 'Missing' }
  ];

  const chauffeurDocs = [
    { name: 'Chauffeur Profile Picture', expiry: '02-6-2028', status: 'Missing' },
    { name: 'License Picture Upload', expiry: '02-6-2028', status: 'Uploaded' }
  ];

  const vehicleDocs = [
    { name: 'Houston Limousine License window Decal', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Certificate of liability Insurance (min.$1M CSL (Sedan/SUV) $1.5MCSL (Spri...', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'Texas Premium Sedan Vehicle Registration Paper and Sticker', expiry: '02-6-2028', status: 'Uploaded' },
    { name: 'City o Houston Permitted Vehicle Window Sticker', expiry: '02-6-2028', status: 'Missing' },
    { name: 'Texas of the whole vehicle showing the license palte', expiry: '-', status: 'Missing' },
    { name: 'Airport Permit', expiry: '-', status: 'Missing' }
  ];

  const TableHeader = () => (
    <div className="flex items-center justify-between bg-black text-white px-4 py-3.5 rounded-t-lg text-[13px] font-medium mt-2">
      <div className="flex-1 pr-4">Name</div>
      <div className="w-40 shrink-0">Expiry Date</div>
      <div className="w-24 shrink-0">Status</div>
      <div className="w-20 shrink-0"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[18px] font-bold text-[#111]">Upload Required Documents</h2>
        <p className="text-[14px] text-gray-500 mt-1">Please upload each of the below required document. These will be reviewed by our team before your application can be approved.</p>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1">Company Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Company documents required for Sunrise Correlation:</p>
        <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="min-w-[700px]">
            <TableHeader />
            <div className="px-4 border-x border-b border-gray-100 rounded-b-lg bg-white">
              {companyDocs.map((doc, i) => <DocRow key={i} {...doc} />)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1 mt-6">Chauffeur Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Chauffeur documents required for Jayson smith:</p>
        <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="min-w-[700px]">
            <TableHeader />
            <div className="px-4 border-x border-b border-gray-100 rounded-b-lg bg-white">
              {chauffeurDocs.map((doc, i) => <DocRow key={i} {...doc} />)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1 mt-6">Vehicle Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Vehicle documents required for Premium Sedan (TYR45454):</p>
        <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="min-w-[700px]">
            <TableHeader />
            <div className="px-4 border-x border-b border-gray-100 rounded-b-lg bg-white">
              {vehicleDocs.map((doc, i) => <DocRow key={i} {...doc} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start text-gray-600 mt-6 pb-4">
        <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[12px]">i</div>
      </div>
    </div>
  );
};
