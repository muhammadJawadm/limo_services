import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuUser, LuMail, LuLock } from 'react-icons/lu';
import { FiChevronDown } from 'react-icons/fi';
import logoImg from '../../assets/navbarlogo.png';
import driverSideImg from '../../assets/driverside.png';
import usFlag from '../../assets/us.png';

export default function DriverRegisterDetailsPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
    newsletter: false,
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/driver/forget-password');
  };

  return (
    <div className="min-h-screen bg-[#Fcfcfc] flex items-center justify-center p-4  md:p-6 lg:p-6">
      <div className="w-full max-w-[1400px] h-[calc(100vh-3rem)] min-h-[600px] grid grid-cols-1 lg:grid-cols-2 bg-[#Fcfcfc] rounded-3xl overflow-hidden shadow-sm border border-gray-100">

        {/* Left Section - Form */}
        <section className="p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-start max-w-2xl w-full mx-auto relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Logo */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-12 lg:left-16 xl:top-16 xl:left-20">
            <img src={logoImg} alt="Prvyn Services" className="h-10 md:h-12 object-contain" />
          </div>

          <div className="mt-36 xl:mt-20 w-full pb-8 ">
            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1b2d5d]">Register</h2>
            <p className="mt-2 text-[15px] text-gray-500">
              Enter your details to create an account.
            </p>

            <form onSubmit={handleSignUp} className="mt-8 space-y-4">
              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">First Name</label>
                <div className="relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border border-gray-200 bg-white transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuUser className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Jayson Smith"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Last Name</label>
                <div className="relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border border-gray-200 bg-white transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuUser className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Jayson Smi|"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Email Address</label>
                <div className="relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border border-gray-200 bg-white transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuMail className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="jayson@gmail.com"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Phone Number</label>
                <div className="relative mt-1.5 flex items-center rounded-full border border-gray-200 bg-white px-2 py-1.5 focus-within:border-[#1b2d5d] transition-colors">
                  <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                    <img src={usFlag} alt="US" className="w-5 h-5 object-cover rounded-full" />
                    <FiChevronDown className="text-[#4d4d4d]" />
                  </div>
                  <span className="text-[#4d4d4d] text-[15px] ml-2">+1</span>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="flex-1 bg-transparent border-none text-[15px] text-gray-700 outline-none px-2 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Password</label>
                <div className="relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border border-gray-200 bg-white transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuLock className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="password"
                    placeholder="*********"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 ml-1 mt-6">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={form.newsletter}
                  onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
                  className="w-4 h-4 rounded-full border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d]"
                  style={{ borderRadius: '50%', appearance: 'none', border: '1px solid #d1d5db' }}
                />
                <label htmlFor="newsletter" className="text-[14px] text-gray-500 cursor-pointer">
                  I want to receive notification & Newsletters
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
                >
                  Sign Up
                </button>
              </div>

              <div className="pt-1 text-left">
                <span className="text-[14px] text-gray-500">
                  Already have an Account?{' '}
                  <Link to="/driver/login" className="font-medium text-[#1b2d5d] hover:underline">
                    Log In
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