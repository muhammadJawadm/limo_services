import { useNavigate } from 'react-router-dom';
import { LuLock, LuMail } from 'react-icons/lu';
import { FiInfo, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthSidePanel from '../../components/AuthSidePanel';
import { useAuthStore } from '../../stores/authStore';
import { useCredentialForm } from '../../hooks/useCredentialForm';
import { useState } from 'react';
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUser, isLoading, error, clearError } = useAuthStore();
  const {
    form,
    hasError,
    errorMessage,
    updateField,
    validateCredentials,
    setSubmissionError,
  } = useCredentialForm({ storeError: error, clearStoreError: clearError });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateCredentials()) {
      return;
    }

    const result = await loginUser(form);

    if (result?.success) {
      navigate('/');
      return;
    }

    setSubmissionError(result?.message || 'Login failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center ">
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden">

        <AuthSidePanel />

        {/* Right Section */}
        <section className="bg-[#F9F9F9] p-5 md:p-8 lg:p-10 flex flex-col lg:justify-start min-h-screen">
          <div className="max-w-md mx-auto lg:mx-0 w-full py-8 lg:pl-8 xl:pl-12">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Login</h2>
            <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
              Access your bookings, view trip history, manage upcoming trips, and update your account details.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Email Address</label>
                <div className={`mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border ${hasError ? 'border-red-200' : 'border-gray-50'}`}>
                  <span className="text-gray-400"><LuMail size={18} /></span>
                  <input
                    type="email"
                    placeholder="Enter your email addresss"
                    value={form.email}
                    onChange={updateField('email')}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Password</label>
                <div className={`mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border ${hasError ? 'border-red-200' : 'border-gray-50'}`}>
                  <span className="text-gray-400"><LuLock size={18} /></span>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*********"
                    value={form.password}
                    onChange={updateField('password')}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-2 text-gray-400 hover:text-[#1b2d5d] transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                {/* Validation and Forgot Password Row */}
                <div className={`flex items-center mt-3 ml-1 ${hasError ? 'justify-between' : 'justify-start'}`}>
                  {hasError && (
                    <div className="flex items-center text-red-500 text-[13px]">
                      <FiInfo size={14} className="mr-1" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => navigate('/forget-password')}
                    className={`text-[15px] hover:underline ${hasError ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-semibold hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <p className="text-[15px] text-gray-500 mt-4 ml-1">
                I don't have an account.{' '}
                <button
                  type="button"
                  onClick={() => navigate('/create-account')}
                  className="text-[#1b2d5d] font-semibold hover:underline"
                >
                  Register Now
                </button>
              </p>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
