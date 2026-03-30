import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuMail } from 'react-icons/lu';
import logoImg from '../../assets/navbarlogo1.png';
import driverSideImg from '../../assets/driverside.png';

export default function DriverForgetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    navigate('/driver/reset-password');
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
            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1b2d5d]">Forget Password</h2>
            <p className="mt-2 text-[15px] text-gray-500 max-w-sm">
              Not a problem! Please enter your email address to change your password.
            </p>

            <form onSubmit={handleSendCode} className="mt-10 space-y-6">
              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Email Address</label>
                <div className="relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border border-gray-200 bg-white transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuMail className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="jayson@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
                >
                  Send Verification Code
                </button>
              </div>

              <div className="pt-2 text-left">
                <span className="text-[14px] text-gray-500">
                  I don't have an account.{' '}
                  <Link to="/driver/register" className="font-medium text-[#1b2d5d] hover:underline">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
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