import { FiCheck } from 'react-icons/fi';
import testpdf from '../../../assets/testpdf.pdf';

export const Step8 = ({ formData, updateDoc }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-[18px] font-bold text-[#111]">Partner Contract</h2>
      <p className="text-[14px] text-gray-500 mt-2">
        Please review our contract below and accept your contractual agreement.
      </p>
    </div>

    {/* Actual PDF Viewer */}
    <div className="w-full bg-[#323639] rounded-lg overflow-hidden flex flex-col h-[600px] border border-gray-200">
      <iframe
        src={testpdf}
        title="Partner Contract"
        className="w-full h-full"
        style={{ border: 'none' }}
      >
        <p>Your browser does not support PDFs. <a href={testpdf}>Download the PDF</a>.</p>
      </iframe>
    </div>

    <div className="pt-2">
      <a href="#" className="text-[14px] text-[#1B2D5D] hover:underline">Click here to download a copy of your contractual agreement.</a>
    </div>

    <div className="mt-6">
      <div className="w-full">
        <label className="block text-[14px] text-gray-600 mb-2 ml-1">Place</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Jayson|"
            value={formData.contractPlace || ''}
            onChange={(e) => updateDoc('contractPlace', e.target.value)}
            className={`w-full appearance-none rounded-full border ${formData.showErrors && !formData.contractPlace ? 'border-red-400 bg-red-50/20' : 'border-gray-200/80 bg-white'} py-3.5 pl-5 pr-4 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors`}
          />
        </div>
        {formData.showErrors && !formData.contractPlace && (
          <p className="text-red-500 text-[13px] mt-2 ml-1">Completed this fields</p>
        )}
      </div>
    </div>

    <div className="mt-6 flex items-start gap-3 ml-1">
      <div className="mt-0.5 relative flex items-center justify-center flex-shrink-0">
        <input
          type="checkbox"
          id="contractAgreed"
          checked={formData.contractAgreed || false}
          onChange={(e) => updateDoc('contractAgreed', e.target.checked)}
          className="w-5 h-5 rounded-full border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d] cursor-pointer"
          style={{ borderRadius: '50%', appearance: 'none', border: '1px solid #d1d5db', background: formData.contractAgreed ? '#1b2d5d' : 'transparent' }}
        />
        {formData.contractAgreed && <FiCheck className="absolute text-white pointer-events-none" size={12} />}
      </div>
      <label htmlFor="contractAgreed" className="text-[14px] text-gray-600 cursor-pointer select-none leading-relaxed">
        I have reviewed and agree to the local service provider U.S General Terms and Conditions
      </label>
    </div>

    <div className="pt-6">
      <p className="text-[14px] text-[#111]">By clicking Agree, you hereby accept the terms of the pertner agreement and have provided a digital signature for the contract.</p>
    </div>
  </div>
);
