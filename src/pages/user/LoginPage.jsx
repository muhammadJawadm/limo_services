import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLock, LuMail } from 'react-icons/lu';
import { FiInfo } from 'react-icons/fi';
import blueCarImg from '../../assets/bluecar.png';
import mapImg from '../../assets/grouplocationicon.png';

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
    // Perform login action
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
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Login</h2>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
              Access your bookings, view trip history, manage upcoming trips, and update your account details.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Email Address</label>
                <div className={`mt-1.5 flex items-center rounded-full bg-white px-5 py-3.5 shadow-sm border ${hasError ? 'border-red-200' : 'border-gray-50'}`}>
                  <span className="text-gray-400"><LuMail size={18} /></span>
                  <input
                    type="email"
                    placeholder="jayson@gmail.com"
                    value={form.email}
                    onChange={updateField('email')}
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Password</label>
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
                    className={`text-[13px] hover:underline ${hasError ? 'text-red-500' : 'text-gray-500'}`}
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
