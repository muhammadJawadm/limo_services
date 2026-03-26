import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLock, LuMail } from 'react-icons/lu';
import { FiInfo } from 'react-icons/fi';
import AuthSidePanel from '../../components/AuthSidePanel';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [hasError, setHasError] = useState(false); // Toggle to simulate error

  const updateField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (hasError) setHasError(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate error for demonstration purposes if email/password isn't matched
    if (!form.email || !form.password) {
      setHasError(true);
      return;
    }
    navigate('/otp-verification');
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
                    type="password"
                    placeholder="*********"
                    value={form.password}
                    onChange={updateField('password')}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>

                {/* Validation and Forgot Password Row */}
                <div className={`flex items-center mt-3 ml-1 ${hasError ? 'justify-between' : 'justify-start'}`}>
                  {hasError && (
                    <div className="flex items-center text-red-500 text-[13px]">
                      <FiInfo size={14} className="mr-1" />
                      <span>Invalid Password</span>
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
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-semibold hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20"
                >
                  Login
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
