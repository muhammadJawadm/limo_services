import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { LuBuilding2, LuLock, LuMail, LuUser } from 'react-icons/lu';
import blueCarImg from '../../assets/bluecar.png';
import mapImg from '../../assets/grouplocationicon.png';
import usFlag from '../../assets/us.png';

function InputRow({ icon, type = 'text', placeholder, value, onChange }) {
  return (
    <div className="flex items-center rounded-full bg-white px-5 py-3.5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-50">
      <span className="text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
      />
    </div>
  );
}

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
    company: '',
    optIn: false,
  });

  const updateField = (key) => (e) => {
    const value = key === 'optIn' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
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
              className="absolute bottom-0 -left-10 md:-left-16 lg:-left-12 w-[100%] md:w-[100%] md:bottom-[15%] xl:bottom-[1%]  lg:w-[80%] xl:w-[70%] max-w-none object-contain object-left-bottom pointer-events-none"
            />
          </div>
        </section>

        {/* Right Section */}
        <section className="bg-gray-100 p-3 md:p-8 lg:p-10  flex flex-col justify-start h-full">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Create an Account</h2>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
              Continue as a guest for a quick booking, or create an account to save your details and manage future trips easily.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">First Name</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuUser size={18} />}
                    placeholder="Jayson Smi"
                    value={form.firstName}
                    onChange={updateField('firstName')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Last Name</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuUser size={18} />}
                    placeholder="Jayson Smi"
                    value={form.lastName}
                    onChange={updateField('lastName')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Address</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuMail size={18} />}
                    placeholder="jayson@gmail.com"
                    value={form.address}
                    onChange={updateField('address')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Phone Number</label>
                <div className="mt-1.5 flex items-center rounded-full bg-white px-5 py-3 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-50">
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                    <img src={usFlag} alt="US" className="w-5 h-5 rounded-full object-cover" />
                    <FiChevronDown size={32} className="ml-1 text-gray-600" />
                  </div>
                  <span className="ml-3 text-sm text-gray-500">+1</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={updateField('phone')}
                    placeholder=""
                    className="ml-3 w-full bg-transparent text-sm text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Password</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuLock size={18} />}
                    type="password"
                    placeholder="*********"
                    value={form.password}
                    onChange={updateField('password')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-gray-800 ml-1">Company Name <span className="text-gray-400 font-normal">(Option)</span></label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuBuilding2 size={18} />}
                    placeholder="Pvryn.com"
                    value={form.company}
                    onChange={updateField('company')}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 ml-1">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${
                    form.optIn ? 'border-[#1b2d5d] bg-[#1b2d5d]' : 'border-gray-300 bg-transparent'
                  }`}
                  onClick={() => setForm(prev => ({ ...prev, optIn: !prev.optIn }))}
                >
                  {form.optIn && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="text-[13px] text-gray-500 cursor-pointer select-none" onClick={() => setForm(prev => ({ ...prev, optIn: !prev.optIn }))}>
                  I want to receive notification & Newsletters
                </span>
              </div>

              <div className="pt-2">
                <button className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-semibold hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20">
                  Sign Up
                </button>
              </div>

              <p className="text-[13px] text-gray-500 mt-4 ml-1">
                Already have an Account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-[#1b2d5d] font-semibold hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
