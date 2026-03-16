import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMail } from 'react-icons/lu';
import AuthSidePanel from '../../components/AuthSidePanel';

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send verification code goes here
    navigate('/otp-verification'); // Usually goes to OTP after sending code
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center ">
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden">

        <AuthSidePanel />

        {/* Right Section */}
        <section className="bg-[#F9F9F9] p-3 md:p-8 lg:p-10 flex flex-col lg:justify-start min-h-screen">
          <div className="max-w-md mx-auto lg:mx-0 w-full py-8 lg:pl-8 xl:pl-12">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Forget Password</h2>
            <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
              Not a problem! Please enter your email address to change your password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Email</label>
                <div className="mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border border-gray-50">
                  <span className="text-gray-400"><LuMail size={18} /></span>
                  <input
                    type="email"
                    placeholder="jayson@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-semibold hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20"
                >
                  Send Verification Code
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
