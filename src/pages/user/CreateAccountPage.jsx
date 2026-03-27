import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { LuBuilding2, LuLock, LuMail, LuUser } from 'react-icons/lu';
import AuthSidePanel from '../../components/AuthSidePanel';
import usFlag from '../../assets/us.png';
import buildingIcon from '../../assets/company.png';

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

        <AuthSidePanel />

        {/* Right Section */}
        <section className="bg-[#F9F9F9] p-3 md:p-8 lg:p-10 flex flex-col justify-center lg:justify-start min-h-screen">
          <div className="max-w-md mx-auto lg:mx-0 w-full py-8 lg:pl-8 xl:pl-12">
            <h2 className="text-[28px] font-bold text-[#1b2d5d]">Create an Account</h2>
            <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
              Continue as a guest for a quick booking, or create an account to save your details and manage future trips easily.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">First Name</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuUser size={18} />}
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={updateField('firstName')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Last Name</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuUser size={18} />}
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={updateField('lastName')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Email Address</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuMail size={18} />}
                    placeholder="Enter your email address"
                    value={form.address}
                    onChange={updateField('address')}
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Phone Number</label>
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
                <label className="text-[15px] font-medium text-gray-800 ml-1">Password</label>
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
                <label className="text-[15px] font-medium text-gray-800 ml-1">Company Name <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<img src={buildingIcon} alt="Building" className="w-5 h-5 object-cover" />}
                    placeholder="Enter your company name"
                    value={form.company}
                    onChange={updateField('company')}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 ml-1">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${form.optIn ? 'border-[#1b2d5d] bg-[#1b2d5d]' : 'border-gray-300 bg-transparent'
                    }`}
                  onClick={() => setForm(prev => ({ ...prev, optIn: !prev.optIn }))}
                >
                  {form.optIn && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="text-[15px] text-gray-500 cursor-pointer select-none" onClick={() => setForm(prev => ({ ...prev, optIn: !prev.optIn }))}>
                  I want to receive notification & Newsletters
                </span>
              </div>

              <div className="pt-2">
                <button className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-semibold hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20" onClick={() => navigate('/otp-verification')}>
                  Sign Up
                </button>
              </div>

              <p className="text-[15px] text-gray-500 mt-4 ml-1">
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