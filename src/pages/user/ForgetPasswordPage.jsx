import { useNavigate } from 'react-router-dom';
import { LuMail } from 'react-icons/lu';
import { FiInfo } from 'react-icons/fi';
import AuthSidePanel from '../../components/AuthSidePanel';
import { useAuthStore } from '../../stores/authStore';
import { useEmailForm } from '../../hooks/useEmailForm';

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  const {
    email,
    hasError,
    errorMessage,
    handleEmailChange,
    validateEmail,
    setSubmissionError,
    getTrimmedEmail,
  } = useEmailForm({ storeError: error, clearStoreError: clearError });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) {
      return;
    }

    const result = await forgotPassword(getTrimmedEmail());

    if (result?.success) {
      navigate('/otp-verification', { state: { email: getTrimmedEmail(), flow: 'reset' } });
      return;
    }

    setSubmissionError(result?.message || 'Failed to send verification code. Please try again.');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center ">
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden">

        <AuthSidePanel />

        <section className="bg-[#F9F9F9] p-3 md:p-8 lg:p-10 flex flex-col lg:justify-start min-h-screen">
          <div className="max-w-md mx-auto lg:mx-0 w-full py-8 lg:pl-8 xl:pl-12">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Forget Password</h2>
            <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
              Not a problem! Please enter your email address to change your password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Email</label>
                <div className={`mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border ${hasError ? 'border-red-200' : 'border-gray-50'}`}>
                  <span className="text-gray-400"><LuMail size={18} /></span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              {hasError && (
                <div className="flex items-center text-red-500 text-[13px]">
                  <FiInfo size={14} className="mr-1.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-[#1b2d5d] text-white py-3.5 text-[15px] font-medium hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
