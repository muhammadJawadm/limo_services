import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import blueCarImg from '../../assets/bluecar.png';
import mapImg from '../../assets/grouplocationicon.png';

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeAndNavigate = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden">
        
        {/* Left Section */}
        <section className="relative bg-white min-h-[450px] lg:min-h-[760px] flex flex-col ">
          <div className="relative z-10 p-8 md:p-12 lg:p-16 pb-0">
            <h1 className="text-4xl lg:text-[42px] font-bold text-[#1b2d5d] leading-[1.15] max-w-[400px]">
              Book Your Premium<br />Ride Instantly
            </h1>
            <p className="mt-4 text-gray-500 text-[15px] max-w-sm leading-relaxed">
              Experience luxury transportation with professional chauffeurs. Point-to-point or hourly service available.
            </p>
          </div>
          
          <div className="relative flex-grow w-full mt-10">
            <img
              src={mapImg}
              alt="Map Pattern"
              className="absolute inset-x-0 bottom-[10%] -left-20 lg:bottom-[45%] w-full h-[100%] lg:h-[100%] max-h-[400px] object-contain object-bottom opacity-80 pointer-events-none"
            />
            <img
              src={blueCarImg}
              alt="Blue Car"
              className="absolute bottom-0 -left-10 md:-left-16 lg:-left-12 w-[100%] md:w-[100%] md:bottom-[15%] xl:bottom-[1%] lg:w-[80%] xl:w-[70%] max-w-none object-contain object-left-bottom pointer-events-none"
            />
          </div>
        </section>

        {/* Right Section */}
        <section className="bg-[#fafafa] p-3 md:p-8 lg:p-10 flex flex-col justify-center h-full relative">
          <div className="max-w-md mx-auto w-full">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-[#111827] hover:text-[#1b2d5d] transition-colors mb-6 text-[16px] font-medium"
            >
              <FiChevronLeft className="mr-1" size={20} />
              Back
            </button>
            
            <h2 className="text-[26px] font-bold text-[#1b2d5d]">OTP Verification</h2>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed pr-6">
              We have sent a verification code to your phone number +1 454********6
            </p>

            <form onSubmit={handleContinue} className="mt-8 space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-100 shadow-sm text-center text-xl font-semibold text-[#1b2d5d] focus:outline-none focus:border-[#1b2d5d] focus:ring-1 focus:ring-[#1b2d5d] transition-all"
                  />
                ))}
              </div>

              <div className="space-y-1 mt-4">
                <p className="text-[12px] text-gray-800">
                  We have sent code to <span className="text-[#1b2d5d]">limeservice@gmail.com</span>
                </p>
                <p className="text-[12px] text-gray-800">
                  Didn't receive code? <span className="font-medium text-[#1b2d5d]">00:54</span>{' '}
                  <button type="button" className="text-gray-500 hover:text-[#1b2d5d] ml-1">
                    Re-send code
                  </button>
                </p>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-3.5 text-[15px] font-medium hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20 max-w-[300px]"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[380px] w-full flex flex-col items-center text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Icon / Graphic */}
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center p-3">
              {/* Star-like badge shape background (approximated with a circle and shadows/layers) */}
              <div className="absolute inset-0 bg-[#1b2d5d] rounded-[30%] rotate-45 scale-105"></div>
              <div className="absolute inset-0 bg-[#1b2d5d] rounded-[30%] rotate-[-45%] scale-105"></div>
              <div className="absolute z-10 text-white flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Confetti dots */}
              <div className="absolute -top-2 left-0 w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="absolute top-2 -right-4 w-3 h-3 rounded-full bg-[#a1a1aa]"></div>
              <div className="absolute bottom-4 -left-6 w-2.5 h-2.5 rounded-full bg-[#9ca3af]"></div>
              <div className="absolute -bottom-4 right-2 w-2 h-2 rounded-full bg-[#cbd5e1]"></div>
            </div>

            <h3 className="text-[22px] font-bold text-gray-900 mb-2">Verification complete!</h3>
            <p className="text-[14px] text-gray-500 mb-8 max-w-[240px]">
              Your account has been successfully verified.
            </p>

            <button
              onClick={closeAndNavigate}
              className="w-full rounded-full bg-[#1b2d5d] text-white py-3.5 text-[15px] font-medium hover:bg-[#16254c] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
