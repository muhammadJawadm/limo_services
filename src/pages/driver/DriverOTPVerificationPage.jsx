import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiInfo } from 'react-icons/fi';
import logoImg from '../../assets/navbarlogo1.png';
import driverSideImg from '../../assets/driverside.png';
import { useAuthStore } from '../../stores/authStore';
import { OTP_RESEND_COOLDOWN, useOtpVerification } from '../../hooks/useOtpVerification';

export default function DriverOTPVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email ?? '';
  const flow = location.state?.flow ?? 'register';

  const { verifyOtp, verifyResetOtp, resendOtp, isLoading, error, clearError } = useAuthStore();

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
    startCooldownOnMount: false,
    initialCooldown: OTP_RESEND_COOLDOWN,
  });

  const handleContinue = useCallback(async () => {
    const result = await verifyCode();

    if (result?.success) {
      if (flow === 'reset') {
        navigate('/driver/reset-password', { state: { email: emailFromState } });
      } else {
        navigate('/driver/login');
      }
      return;
    }

    if (result?.message) {
      setFormError(result.message || 'Verification failed. Please try again.');
    }
  }, [verifyCode, setFormError, flow, navigate, emailFromState]);

  const handleResend = async () => {
    await resendCode();
  };

  return (
    <div className="min-h-screen bg-[#Fcfcfc] flex items-center justify-center p-4  md:p-6 lg:p-6">
      <div className="w-full max-w-[1400px] h-[calc(100vh-3rem)] min-h-[600px] grid grid-cols-1 lg:grid-cols-2 bg-[#Fcfcfc] rounded-3xl overflow-hidden shadow-sm border border-gray-100">

        {/* Left Section - Form */}
        <section className="p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-start max-w-2xl w-full mx-auto relative overflow-y-auto">
          {/* Logo */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-12 lg:left-16 xl:top-16 xl:left-20">
            <img src={logoImg} alt="Prvyn Services" className="h-10 md:h-12 object-contain" />
          </div>

          <div className="mt-16 w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[18px] font-medium text-[#111] mb-6 hover:text-gray-600 transition-colors"
            >
              <FiChevronLeft className="mr-1" size={24} /> Back
            </button>

            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1b2d5d]">OTP Verification</h2>
            <p className="mt-2 text-[15px] text-gray-500 max-w-sm leading-relaxed">
              {emailFromState
                ? <>We sent a 6-digit code to <span className="text-[#1b2d5d] font-medium">{emailFromState}</span></>
                : 'We have sent a verification code to your email.'}
            </p>

            <div className="mt-8">
              <div className="flex gap-3 md:gap-4 mb-4">
                {otp.map((data, index) => (
                  <input
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full border bg-white text-center text-xl font-semibold text-[#111] focus:border-[#1b2d5d] focus:outline-none focus:ring-1 focus:ring-[#1b2d5d] transition-all ${hasError ? 'border-red-300' : 'border-gray-200'}`}
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                    ref={el => inputRefs.current[index] = el}
                  />
                ))}
              </div>

              {hasError && (
                <div className="flex items-center text-red-500 text-[13px] mb-4">
                  <FiInfo size={14} className="mr-1.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1 mb-8 text-[14px]">
                <p className="text-gray-700">
                  Code sent to <span className="text-[#1b2d5d] font-medium">{emailFromState || 'your email'}</span>
                </p>
                <p className="text-gray-500">
                  Didn't receive code?{' '}
                  {cooldown > 0 ? (
                    <span className="text-[#1b2d5d] font-medium mr-1">
                      {String(Math.floor(cooldown / 60)).padStart(2, '0')}:{String(cooldown % 60).padStart(2, '0')}
                    </span>
                  ) : (
                    <button
                      onClick={handleResend}
                      className="text-gray-600 underline font-medium hover:text-[#111] transition-colors"
                    >
                      Re-send code
                    </button>
                  )}
                </p>
              </div>

              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="w-full max-w-sm rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </div>
          </div>
        </section>

        {/* Right Section - Image */}
        <section className="hidden lg:block relative h-full p-2">
          <img
            src={driverSideImg}
            alt="Professional Chauffeur"
            className="w-full h-full object-cover rounded-3xl"
          />
        </section>
      </div>
    </div>
  );
}