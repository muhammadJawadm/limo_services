import { useNavigate, useLocation } from 'react-router-dom';
import { LuLock } from 'react-icons/lu';
import { useState } from 'react';
import { FiInfo, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthSidePanel from '../../components/AuthSidePanel';
import { useAuthStore } from '../../stores/authStore';
import { usePasswordResetForm } from '../../hooks/usePasswordResetForm';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email ?? '';
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  const {
    form,
    success,
    setSuccess,
    hasError,
    errorMessage,
    updateField,
    validateResetForm,
    setSubmissionError,
  } = usePasswordResetForm({ storeError: error, clearStoreError: clearError, email: emailFromState });

  const handleReset = async (e) => {
    e.preventDefault();

    if (!validateResetForm()) {
      return;
    }

    const result = await resetPassword(emailFromState, form.password, form.confirmPassword);

    if (result?.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
      return;
    }

    setSubmissionError(result?.message || 'Password reset failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center ">
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden">

        <AuthSidePanel />

        {/* Right Section */}
        <section className="bg-[#F9F9F9] p-3 md:p-8 lg:p-10 flex flex-col justify-center min-h-screen">
          <div className="max-w-md mx-auto lg:mx-0 w-full py-8 lg:pl-8 xl:pl-12">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Create a New Password</h2>
            <p className="mt-2 text-[15px] text-gray-400 leading-relaxed pr-6">
              Your new password must be different from your previously used password.
            </p>

            {success ? (
              <div className="mt-10 flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheck size={22} className="text-green-600" />
                </div>
                <p className="text-[16px] font-semibold text-gray-800">Password updated successfully!</p>
                <p className="text-[14px] text-gray-500">Redirecting you to login…</p>
              </div>
            ) : (
              <form onSubmit={handleReset} className="mt-8 space-y-5">
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
                </div>

                <div>
                  <label className="text-[15px] font-medium text-gray-800 ml-1">Confirm Password</label>
                  <div className={`mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border ${hasError ? 'border-red-200' : 'border-gray-50'}`}>
                    <span className="text-gray-400"><LuLock size={18} /></span>

                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="*********"
                      value={form.confirmPassword}
                      onChange={updateField('confirmPassword')}
                      className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="ml-2 text-gray-400 hover:text-[#1b2d5d] transition-colors"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {hasError ? (
                  <div className="flex items-center text-red-500 text-[13px] ml-1">
                    <FiInfo size={14} className="mr-1.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                ) : (
                  <p className="text-[15px] text-gray-400 ml-1 mt-2">Both passwords must match.</p>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-medium hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
