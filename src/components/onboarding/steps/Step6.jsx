import { useRef } from 'react';
import { useDriverStore } from '../../../stores/driverStore';

const DocRow = ({ name, expiryValue, onExpiryChange, status, fileUrl, onSelectFile, isUploading, error }) => {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current?.click();

  const showUploaded  = status === 'Uploaded';
  const showUploading = status === 'Uploading';

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 gap-4 last:border-b-0">
      <div className="flex-1 text-[13px] md:text-[14px] text-gray-600 font-medium pr-4">{name}</div>
      <div className="w-40 shrink-0">
        <input
          type="date"
          value={expiryValue}
          onChange={(e) => onExpiryChange(e.target.value)}
          className="w-full rounded-md border border-gray-200 px-2 py-1 text-[13px] text-gray-600 focus:border-[#1b2d5d] focus:outline-none"
        />
      </div>
      <div className="w-24 shrink-0 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${showUploaded ? 'bg-green-500' : showUploading ? 'bg-amber-500' : 'bg-red-500'}`} />
        <span className={`text-[13px] ${error ? 'text-red-500' : 'text-gray-500'}`}>{error || status}</span>
      </div>
      <div className="w-20 shrink-0 text-right">
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mr-3 text-[13px] font-medium text-[#1b2d5d] hover:underline"
          >
            View
          </a>
        )}
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className={`text-[13px] font-medium ${isUploading ? 'text-gray-400 cursor-not-allowed' : 'text-[#1b2d5d] hover:underline'}`}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onSelectFile(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
};

const TableHeader = () => (
  <div className="flex items-center justify-between bg-black text-white px-4 py-3.5 rounded-t-lg text-[13px] font-medium mt-2">
    <div className="flex-1 pr-4">Name</div>
    <div className="w-40 shrink-0">Expiry Date</div>
    <div className="w-24 shrink-0">Status</div>
    <div className="w-20 shrink-0" />
  </div>
);

// ─── Doc definitions using flat keys that match the store ───────────────────

const companyDocs = [
  { key: 'w9Form',                 name: 'W-9 Form' },
  { key: 'articleOfIncorporation', name: 'Articles of Incorporation, articles of organization, or business registration.' },
  { key: 'einCertificate',         name: 'Federal Tax ID / EIN Certificate' },
  { key: 'cityPermit',             name: 'City of Houston – Vehicle for Hire Permit' },
  { key: 'voidCheck',              name: 'Copy of void check for payment detail confirmation' },
];

const chauffeurDocs = [
  { key: 'profilePicture', name: 'Chauffeur Profile Picture' },
  { key: 'licensePicture', name: 'License Picture Upload' },
];

const vehicleDocs = [
  { key: 'limoLicenseDecal',     name: 'Houston Limousine License Window Decal' },
  { key: 'liabilityInsurance',   name: 'Certificate of Liability Insurance (min. $1M CSL Sedan/SUV, $1.5M CSL Sprinter)' },
  { key: 'vehicleRegistration',  name: 'Texas Premium Sedan Vehicle Registration Paper and Sticker' },
  { key: 'cityPermittedSticker', name: 'City of Houston Permitted Vehicle Window Sticker' },
  { key: 'licensePlatePhoto',    name: 'Photo of the whole vehicle showing the license plate' },
  { key: 'airportPermit',        name: 'Airport Permit' },
];

// ─── Step6 ──────────────────────────────────────────────────────────────────

export const Step6 = () => {
  const { onboardingForm, uploadRequiredDocument, onboardingUploads, setRequiredDocument } = useDriverStore();

  // Flat map — matches the store's requiredDocuments shape
  const requiredDocuments = onboardingForm.requiredDocuments || {};

  const toDateValue = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value.slice(0, 10);
    return '';
  };

  const renderDocRow = (doc) => {
    const entry       = requiredDocuments[doc.key] || {};
    const uploadState = onboardingUploads[doc.key]  || {};
    const status      = uploadState.isUploading
      ? 'Uploading'
      : entry.fileUrl
        ? 'Uploaded'
        : 'Missing';

    return (
      <DocRow
        key={doc.key}
        name={doc.name}
        expiryValue={toDateValue(entry.expiry)}
        onExpiryChange={(value) =>
          setRequiredDocument(doc.key, { expiry: value })
        }
        status={status}
        fileUrl={entry.fileUrl}
        error={uploadState.error}
        isUploading={Boolean(uploadState.isUploading)}
        onSelectFile={(file) =>
          uploadRequiredDocument({
            docKey:  doc.key,   // flat key — e.g. 'w9Form', 'profilePicture'
            file,
            docType: doc.key,
          })
        }
      />
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[18px] font-bold text-[#111]">Upload Required Documents</h2>
        <p className="text-[14px] text-gray-500 mt-1">
          Please upload each of the required documents below. These will be reviewed by our team before your application can be approved.
        </p>
      </div>

      {/* Company Documents */}
      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1">Company Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Company documents required for your application:</p>
        <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="min-w-[700px]">
            <TableHeader />
            <div className="px-4 border-x border-b border-gray-100 rounded-b-lg bg-white">
              {companyDocs.map(renderDocRow)}
            </div>
          </div>
        </div>
      </div>

      {/* Chauffeur Documents */}
      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1 mt-6">Chauffeur Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Chauffeur documents required for your application:</p>
        <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="min-w-[700px]">
            <TableHeader />
            <div className="px-4 border-x border-b border-gray-100 rounded-b-lg bg-white">
              {chauffeurDocs.map(renderDocRow)}
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Documents */}
      <div>
        <h3 className="text-[15px] font-bold text-[#111] mb-1 mt-6">Vehicle Documents</h3>
        <p className="text-[13px] text-gray-400 mb-2">Vehicle documents required for your application:</p>
        <div className="w-full overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="min-w-[700px]">
            <TableHeader />
            <div className="px-4 border-x border-b border-gray-100 rounded-b-lg bg-white">
              {vehicleDocs.map(renderDocRow)}
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