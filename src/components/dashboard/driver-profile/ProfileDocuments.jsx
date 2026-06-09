import { useRef, useState } from 'react';
import { uploadOnboardingDocument, patchRequiredDocuments } from '../../../services/driverService';

function toDateOnly(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.slice(0, 10);
  return '';
}

function DocRow({
  name,
  expiryValue,
  onExpiryChange,
  status,
  fileUrl,
  onUpload,
  isUploading,
  error,
}) {
  const inputRef = useRef(null);
  const hasFile = Boolean(fileUrl);

  const dotColor = isUploading
    ? 'bg-amber-400'
    : status === 'uploaded' || status === 'approved'
      ? 'bg-green-500'
      : 'bg-red-500';

  return (
    <div className="flex items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors gap-2">
      <div className="flex-[2] min-w-[200px] pr-4 text-[14px] text-gray-600 font-medium leading-relaxed">
        {name}
      </div>

      <div className="w-[140px] shrink-0">
        <input
          type="date"
          value={expiryValue}
          onChange={(e) => onExpiryChange(e.target.value)}
          disabled={isUploading}
          className="w-full rounded-md border border-gray-200 px-2 py-1 text-[13px] text-gray-600 focus:border-[#1b2d5d] focus:outline-none disabled:opacity-50"
        />
      </div>

      <div className="w-[110px] shrink-0 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
        <span className={`text-[13px] capitalize ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error ? 'Error' : isUploading ? 'Uploading…' : status || 'missing'}
        </span>
      </div>

      <div className="w-[170px] shrink-0 flex items-center justify-end gap-3">
        {error && (
          <span className="text-[11px] text-red-500 truncate max-w-[80px]" title={error}>
            {error}
          </span>
        )}
        {fileUrl && !error && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[#1b2d5d] hover:underline"
          >
            View
          </a>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className={`text-[13px] font-medium whitespace-nowrap ${
            isUploading
              ? 'text-gray-400 cursor-not-allowed'
              : hasFile
                ? 'text-amber-600 hover:underline'
                : 'text-[#1b2d5d] hover:underline'
          }`}
        >
          {isUploading ? 'Uploading…' : hasFile ? 'Re-upload' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}

export function DocumentTable({ docs, docData, onUploadSuccess }) {
  const [localExpiry, setLocalExpiry] = useState({});
  const [uploadState, setUploadState] = useState({});

  const getExpiry = (key) =>
    localExpiry[key] !== undefined
      ? localExpiry[key]
      : toDateOnly(docData?.[`${key}Expiry`]);

  const handleUpload = async (docKey, file) => {
    setUploadState((prev) => ({ ...prev, [docKey]: { uploading: true, error: null } }));

    const uploadResult = await uploadOnboardingDocument({ file, docType: docKey });
    if (!uploadResult.success) {
      setUploadState((prev) => ({
        ...prev,
        [docKey]: { uploading: false, error: uploadResult.message || 'Upload failed.' },
      }));
      return;
    }

    const url = uploadResult.url;
    const expiry = getExpiry(docKey);
    const patchBody = { [`${docKey}Url`]: url };
    if (expiry) patchBody[`${docKey}Expiry`] = expiry;

    const patchResult = await patchRequiredDocuments(patchBody);
    if (!patchResult.success) {
      setUploadState((prev) => ({
        ...prev,
        [docKey]: { uploading: false, error: patchResult.message || 'Failed to save document.' },
      }));
      return;
    }

    setUploadState((prev) => ({ ...prev, [docKey]: { uploading: false, error: null } }));
    // Clear local expiry override so we read the freshly fetched value
    setLocalExpiry((prev) => {
      const next = { ...prev };
      delete next[docKey];
      return next;
    });
    onUploadSuccess?.();
  };

  return (
    <div className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-xl bg-white mt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="min-w-[720px]">
        <div className="flex items-center bg-black text-white px-5 py-4 rounded-t-xl text-[14px] font-medium gap-2">
          <div className="flex-[2] min-w-[200px] pr-4">Name</div>
          <div className="w-[140px] shrink-0">Expiry Date</div>
          <div className="w-[110px] shrink-0">Status</div>
          <div className="w-[170px] shrink-0 text-right">Actions</div>
        </div>
        <div className="px-5">
          {docs.map((doc) => {
            const state = uploadState[doc.key] || {};
            return (
              <DocRow
                key={doc.key}
                name={doc.name}
                expiryValue={getExpiry(doc.key)}
                onExpiryChange={(val) =>
                  setLocalExpiry((prev) => ({ ...prev, [doc.key]: val }))
                }
                status={docData?.[`${doc.key}Status`] || 'missing'}
                fileUrl={docData?.[`${doc.key}Url`] || ''}
                isUploading={Boolean(state.uploading)}
                error={state.error || null}
                onUpload={(file) => handleUpload(doc.key, file)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
