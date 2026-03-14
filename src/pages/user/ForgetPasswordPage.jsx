import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMail } from 'react-icons/lu';
import blueCarImg from '../../assets/bluecar.png';
import mapImg from '../../assets/grouplocationicon.png';

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
        <section className="bg-[#fafafa] p-3 md:p-8 lg:p-10 flex flex-col justify-center h-full">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Forget Password</h2>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
              Not a problem! Please enter your email address to change your password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Email</label>
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

              <p className="text-[13px] text-gray-500 mt-4 ml-1">
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
