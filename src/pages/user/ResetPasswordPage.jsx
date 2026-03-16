import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLock } from 'react-icons/lu';
import AuthSidePanel from '../../components/AuthSidePanel';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const updateField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Reset password logic here
    navigate('/login');
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
              Your new password mube be different from previous used password.
            </p>

            <form onSubmit={handleReset} className="mt-8 space-y-5">
              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Password</label>
                <div className="mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border border-gray-50">
                  <span className="text-gray-400"><LuLock size={18} /></span>
                  <input
                    type="password"
                    placeholder="*********"
                    value={form.password}
                    onChange={updateField('password')}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Confirm Password</label>
                <div className="mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border border-gray-50">
                  <span className="text-gray-400"><LuLock size={18} /></span>
                  <input
                    type="password"
                    placeholder="*********"
                    value={form.confirmPassword}
                    onChange={updateField('confirmPassword')}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <p className="text-[15px] text-gray-400 ml-1 mt-2">
                Both passwords must match.
              </p>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-medium hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
