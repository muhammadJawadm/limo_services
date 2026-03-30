import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import logoImg from '../../assets/navbarlogo.png';
import { FaPen } from "react-icons/fa";
import Footer from '../../components/Footer';
import redstarbg from '../../assets/redstarbg.png';

const InputField = ({ label, type = 'text', placeholder, value, onChange }) => (
  <div className="w-full">
    <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-full border border-gray-200/80 bg-white py-3.5 px-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors"
      />
    </div>
  </div>
);

const SelectField = ({ label, options, value, onChange }) => (
  <div className="w-full relative">
    <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-full border border-gray-200/80 bg-white py-3.5 pl-5 pr-10 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors"
      >
        <option value="" disabled>Select Option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <FiChevronDown className="text-gray-400" size={18} />
      </div>
    </div>
  </div>
);

export default function DriverProfilePage() {
  const [formData, setFormData] = useState({
    // User Section
    name: '',
    companyName: '',
    aboutUser: '',
    sfUserId: '',
    userEmail: '',
    userMobile: '',
    userAddress: '',

    // About Section
    firstName: '',
    lastName: '',
    about: '',
    title: '',
    company: '',
    mobilePhone: '',
    address: '',

    // Contact Section
    email: '',
    phone: '',
    fax: '',
    country: '',
    street: '',
    zipCode: '',
    city: '',
    stateProvince: '',
  });

  const updateDoc = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia'];
  const states = ['None', 'California', 'New York', 'Texas'];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#Fcfcfc] font-sans overflow-x-hidden w-full">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 xl:px-12 h-16 md:h-20 flex items-center justify-between w-full">
        <div className="flex-shrink-0">
          <img src={logoImg} alt="Prvyn Services" className="h-8 md:h-10 object-contain" />
        </div>

        <div className="flex-shrink-0 flex justify-end sm:min-w-[150px] xl:min-w-[200px]">
          <div className="relative group">
            <button className="flex items-center gap-2 md:gap-3 bg-white border rounded-full py-2 px-3 md:py-2.5 md:px-5 hover:bg-gray-50 transition-colors shadow-sm">
              <LuUser className="text-gray-600" size={16} />
              <span className="text-[13px] md:text-[14px] font-medium text-gray-600 hidden sm:block">Profile</span>
              <FiChevronDown className="text-gray-400 sm:ml-1" />
            </button>

            {/* Dropdown Menu placeholder */}
            <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              <Link to="/driver/onboarding" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 mb-1 cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-[14px] text-gray-600">Onboarding Registration</span>
              </Link>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9fa] border border-gray-100 cursor-pointer">
                <LuUser className="text-[#1b2d5d]" size={18} />
                <span className="text-[14px] font-medium text-gray-800">My Profile</span>
              </div>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer text-red-500 w-full"
              >
                <BsArrowLeft className="text-red-500" size={18} />
                <span className="text-[14px]">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-10 md:py-16 px-4">
        <div className="w-full max-w-[1000px]">
          <div className="mb-10">
            <h1 className="text-[28px] md:text-[32px] font-semibold text-[#111]">Profile</h1>
          </div>

          <div className="space-y-12">

            {/* Customer Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-[20px] font-medium text-[#111]">Customer</h2>
                <button className="flex items-center gap-2 bg-[#1b2d5d] hover:bg-[#132042] text-white text-[13px] font-medium py-1.5 px-4 rounded-full transition-colors">
                  Edit
                  <FaPen size={12} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                <InputField label="Name" placeholder="Enter your name" value={formData.name} onChange={(e) => updateDoc('name', e.target.value)} />
                <InputField label="Company Name" placeholder="Enter your company name" value={formData.companyName} onChange={(e) => updateDoc('companyName', e.target.value)} />

                <div className="col-span-1 md:col-span-2 w-full">
                  <label className="block text-[14px] text-gray-600 mb-2 ml-1">About</label>
                  <textarea
                    rows="4"
                    placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
                    value={formData.aboutUser}
                    onChange={(e) => updateDoc('aboutUser', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
                  ></textarea>
                </div>

                <InputField label="SF USer ID" placeholder="00045454TIERDI4454" value={formData.sfUserId} onChange={(e) => updateDoc('sfUserId', e.target.value)} />
                <InputField label="Email" type="email" placeholder="[EMAIL_ADDRESS]" value={formData.userEmail} onChange={(e) => updateDoc('userEmail', e.target.value)} />
                <InputField label="Mobile Phone" placeholder="+44 441 7784 444" value={formData.userMobile} onChange={(e) => updateDoc('userMobile', e.target.value)} />
                <InputField label="Address" placeholder="Los Angeles, CA 90001 United States" value={formData.userAddress} onChange={(e) => updateDoc('userAddress', e.target.value)} />
              </div>
            </section>

            <div className="w-full h-px bg-gray-100"></div>

            {/* About Section */}
            <section>
              <div className="mb-8">
                <h2 className="text-[20px] font-semibold text-[#111]">About</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                <InputField label="First Name" placeholder="Jayson" value={formData.firstName} onChange={(e) => updateDoc('firstName', e.target.value)} />
                <InputField label="Last Name" placeholder="smith" value={formData.lastName} onChange={(e) => updateDoc('lastName', e.target.value)} />

                <div className="col-span-1 md:col-span-2 w-full">
                  <label className="block text-[14px] text-gray-600 mb-2 ml-1">About</label>
                  <textarea
                    rows="4"
                    placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
                    value={formData.about}
                    onChange={(e) => updateDoc('about', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
                  ></textarea>
                </div>

                <InputField label="Title" placeholder="CEO" value={formData.title} onChange={(e) => updateDoc('title', e.target.value)} />
                <InputField label="Company" placeholder="UX Pilot" value={formData.company} onChange={(e) => updateDoc('company', e.target.value)} />
                <InputField label="Mobile Phone" placeholder="+44 441 7784 444" value={formData.mobilePhone} onChange={(e) => updateDoc('mobilePhone', e.target.value)} />
                <InputField label="Address" placeholder="Los Angeles, CA 90001 United States" value={formData.address} onChange={(e) => updateDoc('address', e.target.value)} />
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <div className="mb-8 mt-12">
                <h2 className="text-[20px] font-semibold text-[#111]">Contact</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                <InputField label="Email" type="email" placeholder="[EMAIL_ADDRESS]" value={formData.email} onChange={(e) => updateDoc('email', e.target.value)} />
                <InputField label="Phone" placeholder="+44 441 7784 444" value={formData.phone} onChange={(e) => updateDoc('phone', e.target.value)} />
                <InputField label="Fax" placeholder="4444" value={formData.fax} onChange={(e) => updateDoc('fax', e.target.value)} />
                <SelectField label="Country" options={countries} value={formData.country} onChange={(e) => updateDoc('country', e.target.value)} />
                <InputField label="Steet" placeholder="Los Angeles, CA 90001 United States" value={formData.street} onChange={(e) => updateDoc('street', e.target.value)} />
                <InputField label="Zip/Postal Code" placeholder="6587" value={formData.zipCode} onChange={(e) => updateDoc('zipCode', e.target.value)} />
                <InputField label="City" placeholder="New York" value={formData.city} onChange={(e) => updateDoc('city', e.target.value)} />
                <SelectField label="State Proven" options={states} value={formData.stateProvince} onChange={(e) => updateDoc('stateProvince', e.target.value)} />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full">
              <button className="px-10 py-3.5 rounded-full border border-gray-300 bg-white text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto sm:min-w-[160px] flex-1 sm:flex-none">
                Cancel
              </button>
              <button className="px-10 py-3.5 rounded-full bg-[#1b2d5d] text-[15px] font-medium text-white hover:bg-[#132042] transition-colors w-full sm:w-auto sm:min-w-[160px] flex-1 sm:flex-none" onClick={() => navigate('/driver/dashboard')}>
                Save
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center shadow-2xl">
            {/* Icon */}

            <img className='mx-auto mb-6' src={redstarbg} alt="" />

            <h3 className="text-[22px] font-bold text-[#111] mb-2">Log out</h3>
            <p className="text-[14px] text-gray-400 mb-8">Are you sure you want to log out?</p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3.5 rounded-full bg-gray-500 text-white text-[15px] font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLogoutModal(false); navigate('/driver/login'); }}
                className="flex-1 py-3.5 rounded-full bg-red-500 text-white text-[15px] font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
