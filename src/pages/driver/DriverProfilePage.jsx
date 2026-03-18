import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import logoImg from '../../assets/navbarlogo.png';

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
    name: 'Jayson smith',
    companyName: 'UX Pilot',
    aboutUser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    sfUserId: '00045454TIERDI4454',
    userEmail: 'Limo@gmail.com',
    userMobile: '+44 441 7784 444',
    userAddress: 'Los Angeles, CA 90001 United States',
    
    // About Section
    firstName: 'Jayson smith',
    lastName: 'UX Pilot',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    title: '00045454TIERDI4454',
    company: 'Limo@gmail.com',
    mobilePhone: '+44 441 7784 444',
    address: 'Los Angeles, CA 90001 United States',
    
    // Contact Section
    email: 'Limo@gmail.com',
    phone: '+1 12 4578 78',
    fax: '00045454TIERDI4454',
    country: 'United States',
    street: 'Los Angeles, CA 90001 United States',
    zipCode: 'Los Angeles, CA 90001 United States',
    city: 'Los Angeles',
    stateProvince: 'None',
  });

  const updateDoc = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia'];
  const states = ['None', 'California', 'New York', 'Texas'];

  return (
    <div className="min-h-screen flex flex-col bg-[#Fcfcfc] font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 xl:px-12 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logoImg} alt="Prvyn Services" className="h-10 object-contain" />
        </div>
        
        <div className="flex-shrink-0 min-w-[200px] flex justify-end">
          <div className="relative group">
            <button className="flex items-center gap-3 bg-white border rounded-full py-2.5 px-5 hover:bg-gray-50 transition-colors shadow-sm">
              <LuUser className="text-gray-600" size={16} />
              <span className="text-[14px] font-medium text-gray-600 block">Profile</span>
              <FiChevronDown className="text-gray-400 ml-1" />
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
              <Link to="/driver/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer text-red-500">
                <BsArrowLeft className="text-red-500" size={18} />
                <span className="text-[14px]">Logout</span>
              </Link>
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.50001C19.3284 1.67158 20.6716 1.67158 21.5 2.50001C22.3284 3.32844 22.3284 4.67158 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                <InputField label="Name" placeholder="" value={formData.name} onChange={(e) => updateDoc('name', e.target.value)} />
                <InputField label="Company Name" placeholder="" value={formData.companyName} onChange={(e) => updateDoc('companyName', e.target.value)} />
                
                <div className="col-span-1 md:col-span-2 w-full">
                  <label className="block text-[14px] text-gray-600 mb-2 ml-1">About</label>
                  <textarea
                    rows="4"
                    value={formData.aboutUser}
                    onChange={(e) => updateDoc('aboutUser', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
                  ></textarea>
                </div>

                <InputField label="SF USer ID" placeholder="" value={formData.sfUserId} onChange={(e) => updateDoc('sfUserId', e.target.value)} />
                <InputField label="Email" type="email" placeholder="" value={formData.userEmail} onChange={(e) => updateDoc('userEmail', e.target.value)} />
                <InputField label="Mobile Phone" placeholder="" value={formData.userMobile} onChange={(e) => updateDoc('userMobile', e.target.value)} />
                <InputField label="Address" placeholder="" value={formData.userAddress} onChange={(e) => updateDoc('userAddress', e.target.value)} />
              </div>
            </section>

            <div className="w-full h-px bg-gray-100"></div>

            {/* About Section */}
            <section>
              <div className="mb-8">
                <h2 className="text-[20px] font-semibold text-[#111]">About</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                <InputField label="First Name" placeholder="" value={formData.firstName} onChange={(e) => updateDoc('firstName', e.target.value)} />
                <InputField label="Last Name" placeholder="" value={formData.lastName} onChange={(e) => updateDoc('lastName', e.target.value)} />
                
                <div className="col-span-1 md:col-span-2 w-full">
                  <label className="block text-[14px] text-gray-600 mb-2 ml-1">About</label>
                  <textarea
                    rows="4"
                    value={formData.about}
                    onChange={(e) => updateDoc('about', e.target.value)}
                    className="w-full rounded-3xl border border-gray-200/80 bg-white p-5 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] transition-colors resize-none"
                  ></textarea>
                </div>

                <InputField label="Title" placeholder="" value={formData.title} onChange={(e) => updateDoc('title', e.target.value)} />
                <InputField label="Company" placeholder="" value={formData.company} onChange={(e) => updateDoc('company', e.target.value)} />
                <InputField label="Mobile Phone" placeholder="" value={formData.mobilePhone} onChange={(e) => updateDoc('mobilePhone', e.target.value)} />
                <InputField label="Address" placeholder="" value={formData.address} onChange={(e) => updateDoc('address', e.target.value)} />
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <div className="mb-8 mt-12">
                <h2 className="text-[20px] font-semibold text-[#111]">Contact</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                <InputField label="Email" type="email" placeholder="" value={formData.email} onChange={(e) => updateDoc('email', e.target.value)} />
                <InputField label="Phone" placeholder="" value={formData.phone} onChange={(e) => updateDoc('phone', e.target.value)} />
                <InputField label="Fax" placeholder="" value={formData.fax} onChange={(e) => updateDoc('fax', e.target.value)} />
                <SelectField label="Country" options={countries} value={formData.country} onChange={(e) => updateDoc('country', e.target.value)} />
                <InputField label="Steet" placeholder="" value={formData.street} onChange={(e) => updateDoc('street', e.target.value)} />
                <InputField label="Zip/Postal Code" placeholder="" value={formData.zipCode} onChange={(e) => updateDoc('zipCode', e.target.value)} />
                <InputField label="City" placeholder="" value={formData.city} onChange={(e) => updateDoc('city', e.target.value)} />
                <SelectField label="State Proven" options={states} value={formData.stateProvince} onChange={(e) => updateDoc('stateProvince', e.target.value)} />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="mt-12 flex items-center gap-4">
              <button className="px-10 py-3.5 rounded-full border border-gray-300 bg-white text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full md:w-auto min-w-[160px]">
                Cancel
              </button>
              <button className="px-10 py-3.5 rounded-full bg-[#1b2d5d] text-[15px] font-medium text-white hover:bg-[#132042] transition-colors w-full md:w-auto min-w-[160px]">
                Save
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e1e1e] text-white pt-16 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            <div className="max-w-md">
              <h3 className="text-[26px] font-semibold mb-4">Limo Services</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Limo Services offers luxury chauffeur-driven rides through a simple web platform, connecting riders with professional drivers for reliable, premium transportation.
              </p>
            </div>
            <div>
              <h3 className="text-[26px] font-semibold mb-6">Information</h3>
              <ul className="flex flex-wrap md:flex-nowrap gap-x-6 gap-y-3">
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors text-[15px]">Become a Partner</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors text-[15px]">Terms</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors text-[15px]">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white transition-colors text-[15px]">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-[14px]">Copyright © Limo Services</p>
            <div className="flex gap-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
