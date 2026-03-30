import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { LuMapPin } from 'react-icons/lu';
import logoImg from '../../assets/navbarlogo1.png';
import driverSideImg from '../../assets/driverside.png';

export default function DriverRegisterPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true); 

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/driver/register/details');
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const mockSuggestions = [
    { id: 1, main: "New York", sub: "NY, USA" },
    { id: 2, main: "New York State", sub: "USA" },
    { id: 3, main: "New York Hotel & Casio", sub: "South Las Vegas Boulevard, Las Vegas, NV, USA" },
    { id: 4, main: "New York Hotel & Casio", sub: "Brodway, New York, NY, USA" },
  ];

  return (
    <div className="min-h-screen bg-[#Fcfcfc] flex items-center justify-center p-4 md:p-6 lg:p-6">
      <div className="w-full max-w-[1400px] h-[calc(100vh-3rem)] min-h-[600px] grid grid-cols-1 lg:grid-cols-2 bg-[#Fcfcfc] rounded-3xl overflow-hidden shadow-sm border border-gray-100">

        {/* Left Section - Form */}
        <section className="p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-start max-w-2xl w-full mx-auto relative overflow-y-auto">
          {/* Logo */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-12 lg:left-16 xl:top-16 xl:left-20">
            <img src={logoImg} alt="Prvyn Services" className="h-10 md:h-12 object-contain" />
          </div>

          <div className="mt-16 w-full">
            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1b2d5d]">Register</h2>
            <p className="mt-2 text-[15px] text-gray-500">
              Enter your details to create an account.
            </p>

            <form onSubmit={handleNext} className="mt-10 space-y-6">
              <div className="relative">
                <label className="text-[14px] font-medium text-gray-700 ml-1">Select Address</label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    onFocus={() => setShowSuggestions(address.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Search Address..."
                    className="w-full rounded-full border border-gray-300/80 bg-white py-3.5 pl-11 pr-10 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d]"
                  />
                  {address && (
                    <button
                      type="button"
                      onClick={() => { setAddress(''); setShowSuggestions(false); }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-red-500 hover:text-red-700"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {mockSuggestions.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => { setAddress(item.main); setShowSuggestions(false); }}
                        className={`flex items-start gap-4 px-5 py-3.5 cursor-pointer hover:bg-gray-50 ${index !== mockSuggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
                      >
                        <div className="mt-0.5 text-gray-400">
                          <LuMapPin size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-gray-900">{item.main}</span>
                          <span className="text-[12.5px] text-gray-400 mt-0.5">{item.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
                >
                  Next
                </button>
              </div>

              <div className="pt-2 text-left">
                <span className="text-[15px] text-gray-500">
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