import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import AuthSidePanel from '../../components/AuthSidePanel';
import tickicon from "../../assets/grouptickpop.png"

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeAndNavigate = () => {
    setShowModal(false);
    navigate('/forget-password');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden">

        <AuthSidePanel />

        {/* Right Section */}
        <section className="bg-[#F9F9F9] p-3 md:p-8 lg:p-10 flex flex-col lg:justify-start min-h-screen relative">
          <div className="max-w-md mx-auto lg:mx-0 w-full py-8 lg:pl-8 xl:pl-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#111827] hover:text-[#1b2d5d] transition-colors mb-6 text-[16px] font-medium"
            >
              <FiChevronLeft className="mr-1" size={20} />
              Back
            </button>

            <h2 className="text-[26px] font-bold text-[#1b2d5d]">OTP Verification</h2>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed pr-6">
              We have sent a verification code to your phone number +1 454********6
            </p>

            <form onSubmit={handleContinue} className="mt-8 space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-100 shadow-sm text-center text-xl font-semibold text-[#1b2d5d] focus:outline-none focus:border-[#1b2d5d] focus:ring-1 focus:ring-[#1b2d5d] focus:bg-[#F9F9F9] transition-all"
                  />
                ))}
              </div>

              <div className="space-y-1 mt-4">
                <p className="text-[12px] text-gray-800">
                  We have sent code to <span className="text-[#1b2d5d] underline cursor-pointer">limeservice@gmail.com</span>
                </p>
                <p className="text-[12px] text-gray-800">
                  Didn't receive code? <span className="font-medium text-[#1b2d5d]">00:54</span>{' '}
                  <button type="button" className="text-gray-500 hover:text-[#1b2d5d] ml-1 underline">
                    Re-send code
                  </button>
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-3.5 text-[15px] font-medium hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20 max-w-[300px]"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[380px] w-full flex flex-col items-center text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">

            {/* Modal Icon / Graphic */}
            <div className="relative w-40 h-28 mb-4 flex items-center justify-center p-3">

              {/* Star-like badge shape background (approximated with a circle and shadows/layers) */}
              <img src={tickicon} className='object-contain' alt="" />
            </div>

            <h3 className="text-[22px] font-bold text-gray-900 mb-2">Verification complete!</h3>
            <p className="text-[14px] text-gray-500 mb-8 max-w-[240px]">
              Your account has been successfully verified.
            </p>

            <button
              onClick={closeAndNavigate}
              className="w-full rounded-full bg-[#1b2d5d] text-white py-3.5 text-[15px] font-medium hover:bg-[#16254c] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
