import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiInfo } from 'react-icons/fi';
import AuthSidePanel from '../../components/AuthSidePanel';
import tickicon from "../../assets/grouptickpop.png";
import { useAuthStore } from '../../stores/authStore';
import { useOtpVerification } from '../../hooks/useOtpVerification';

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email ?? '';
  const flow = location.state?.flow ?? 'register';

  const { verifyOtp, verifyResetOtp, resendOtp, isLoading, error, clearError } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const {
    otp,
    inputRefs,
    cooldown,
    hasError,
    errorMessage,
    handleChange,
    handleKeyDown,
    verifyCode,
    resendCode,
    setFormError,
  } = useOtpVerification({
    email: emailFromState,
    flow,
    verifyOtp,
    verifyResetOtp,
    resendOtp,
    storeError: error,
    clearStoreError: clearError,
    startCooldownOnMount: true,
  });

  const handleContinue = useCallback(async (e) => {
    e.preventDefault();
    const result = await verifyCode();

    if (result?.success) {
      setShowModal(true);
      return;
    }

    if (result?.message) {
      setFormError(result.message || 'Verification failed. Please try again.');
    }
  }, [verifyCode, setFormError]);

  const handleResend = async () => {
    await resendCode();
  };

  const closeAndNavigate = () => {
    setShowModal(false);
    if (flow === 'reset') {
      navigate('/reset-password', { state: { email: emailFromState } });
    } else {
      navigate('/login');
    }
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
              {emailFromState
                ? <>We sent a 6-digit code to <span className="text-[#1b2d5d] font-medium">{emailFromState}</span></>
                : 'We have sent a verification code to your email.'}
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
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border shadow-sm text-center text-xl font-semibold text-[#1b2d5d] focus:outline-none focus:border-[#1b2d5d] focus:ring-1 focus:ring-[#1b2d5d] transition-all ${hasError ? 'border-red-300' : 'border-gray-100'}`}
                  />
                ))}
              </div>

              {hasError && (
                <div className="flex items-center text-red-500 text-[13px]">
                  <FiInfo size={14} className="mr-1.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1 mt-4">
                <p className="text-[12px] text-gray-800">
                  Code sent to{' '}
                  <span className="text-[#1b2d5d] underline cursor-pointer">
                    {emailFromState || 'your email'}
                  </span>
                </p>
                <p className="text-[12px] text-gray-800">
                  Didn't receive code?{' '}
                  {cooldown > 0 ? (
                    <span className="font-medium text-[#1b2d5d]">
                      {String(Math.floor(cooldown / 60)).padStart(2, '0')}:{String(cooldown % 60).padStart(2, '0')}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-gray-500 hover:text-[#1b2d5d] ml-1 underline font-medium transition-colors"
                    >
                      Re-send code
                    </button>
                  )}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-3.5 text-[15px] font-medium hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20 max-w-[300px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[380px] w-full flex flex-col items-center text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="relative w-40 h-28 mb-4 flex items-center justify-center p-3">
              <img src={tickicon} className='object-contain' alt="Verified" />
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
