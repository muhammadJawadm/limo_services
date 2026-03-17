import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import logoImg from '../../assets/navbarlogo.png';
import driverSideImg from '../../assets/driverside.png';

export default function DriverOTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    navigate('/driver/reset-password');
  };

  return (
    <div className="min-h-screen bg-[#Fcfcfc] flex items-center justify-center p-4  md:p-6 lg:p-6">
      <div className="w-full max-w-[1400px] h-[calc(100vh-3rem)] min-h-[600px] grid grid-cols-1 lg:grid-cols-2 bg-[#Fcfcfc] rounded-3xl overflow-hidden shadow-sm border border-gray-100">

        {/* Left Section - Form */}
        <section className="p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center max-w-2xl w-full mx-auto relative overflow-y-auto">
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
              We have sent a verification code to your phone number +1 454********6
            </p>

            <div className="mt-8">
              <div className="flex gap-3 md:gap-4 mb-8">
                {otp.map((data, index) => (
                  <input
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 bg-white text-center text-xl font-semibold text-[#111] focus:border-[#1b2d5d] focus:outline-none focus:ring-1 focus:ring-[#1b2d5d] transition-all"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                    ref={el => inputRefs.current[index] = el}
                  />
                ))}
              </div>

              <div className="space-y-1 mb-8 text-[14px]">
                <p className="text-gray-700">
                  We have sent code to <span className="text-[#1b2d5d] font-medium">limeservice@gmail.com</span>
                </p>
                <p className="text-gray-500">
                  Didn't receive code? <span className="text-[#1b2d5d] font-medium mr-1">00:54</span> 
                  <button className="text-gray-600 underline font-medium hover:text-[#111]">Re-send code</button>
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full max-w-sm rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
              >
                Continue
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