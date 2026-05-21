const toDateOnly = (value) => {
  if (!value) return ''
  if (typeof value === 'string') return value.slice(0, 10)
  return ''
}

function DocRow({ name, expiry, status, fileUrl }) {
  return (
    <div className="flex items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex-[2] min-w-[300px] pr-4 text-[14px] text-gray-600 font-medium leading-relaxed">{name}</div>
      <div className="w-[140px] shrink-0 text-[14px] text-gray-500">{toDateOnly(expiry) || '-'}</div>
      <div className="w-[120px] shrink-0 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'uploaded' || status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-[14px] text-gray-500 capitalize">{status || 'missing'}</span>
      </div>
      <div className="w-[80px] shrink-0 text-right">
        {fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[14px] text-[#1b2d5d] hover:underline"
          >
            View
          </a>
        ) : (
          <span className="text-[14px] text-gray-300">—</span>
        )}
      </div>
    </div>
  )
}

export function DocumentTable({ docs, docData }) {
  return (
    <div className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-xl bg-white mt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="min-w-[700px]">
        <div className="flex items-center bg-black text-white px-5 py-4 rounded-t-xl text-[14px] font-medium">
          <div className="flex-[2] min-w-[300px] pr-4">Name</div>
          <div className="w-[140px] shrink-0">Expiry Date</div>
          <div className="w-[120px] shrink-0">Status</div>
          <div className="w-[80px] shrink-0 text-right">File</div>
        </div>
        <div className="px-5">
          {docs.map((doc) => (
            <DocRow
              key={doc.key}
              name={doc.name}
              expiry={docData?.[`${doc.key}Expiry`] || '-'}
              status={docData?.[`${doc.key}Status`] || 'missing'}
              fileUrl={docData?.[`${doc.key}Url`] || ''}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
