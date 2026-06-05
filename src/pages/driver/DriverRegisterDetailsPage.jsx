import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LuUser, LuMail, LuLock } from 'react-icons/lu';
import { FiChevronDown, FiInfo, FiEye, FiEyeOff } from 'react-icons/fi';
import logoImg from '../../assets/navbarlogo1.png';
import driverSideImg from '../../assets/driverside.png';
import SharedPhoneInput from '../../components/SharedPhoneInput';
import { useAuthStore } from '../../stores/authStore';
import { validatePassword } from '../../utils/validation';
export default function DriverRegisterDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationFromPrev = location.state?.location ?? '';
  const [showPassword, setShowPassword] = useState(false);
  const { registerDriver, isLoading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    newsletter: false,
  });
  const [formError, setFormError] = useState('');

  const hasError = Boolean(formError || error);
  const errorMessage = formError || error;

  const updateField = (key) => (e) => {
    const value = key === 'newsletter' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (formError) setFormError('');
    if (error) clearError();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!form.firstName.trim()) return setFormError('First name is required.');
    if (!form.lastName.trim()) return setFormError('Last name is required.');
    if (!form.email.trim()) return setFormError('Email address is required.');
    if (!form.phone.trim()) return setFormError('Phone number is required.');
    const passwordError = validatePassword(form.password);

    if (passwordError) {
      return setFormError(passwordError);
    }

    const fullPhone = form.phone.startsWith('+') ? form.phone : `+1${form.phone}`;

    const result = await registerDriver({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      password: form.password,
      location: locationFromPrev || 'Houston',
    });

    if (result?.success) {
      navigate('/driver/otp-verification', {
        state: { email: form.email.trim(), flow: 'register' },
      });
      return;
    }

    setFormError(result?.message || 'Registration failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-[#Fcfcfc] p-4 flex flex-col md:p-6 lg:p-6">
      <div className="w-full max-w-[1400px] mx-auto flex-1 grid grid-cols-1 lg:grid-cols-2 bg-[#Fcfcfc] rounded-3xl shadow-sm border border-gray-100 overflow-hidden lg:h-[calc(100vh-3rem)]">

        {/* Left Section - Form */}
        <section className="p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-start max-w-2xl w-full mx-auto relative h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                <div className={`relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border ${hasError ? 'border-red-200' : 'border-gray-200'} bg-white transition-colors`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuUser className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Jayson Smith"
                    value={form.firstName}
                    onChange={updateField('firstName')}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Last Name</label>
                <div className={`relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border ${hasError ? 'border-red-200' : 'border-gray-200'} bg-white transition-colors`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuUser className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={updateField('lastName')}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Email Address</label>
                <div className={`relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border ${hasError ? 'border-red-200' : 'border-gray-200'} bg-white transition-colors`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuMail className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="jayson@gmail.com"
                    value={form.email}
                    onChange={updateField('email')}
                    className="w-full bg-transparent py-3.5 pl-11 pr-4 text-[15px] text-gray-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Phone Number</label>
                <div className="mt-1.5">
                  <SharedPhoneInput
                    value={form.phone}
                    onChange={updateField('phone')}
                    hasError={hasError}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#111] ml-1">Password</label>
                <div className={`relative mt-1.5 focus-within:border-[#1b2d5d] rounded-full border ${hasError ? 'border-red-200' : 'border-gray-200'} bg-white transition-colors`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LuLock className="text-gray-400" size={18} />
                  </div>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*********"
                    value={form.password}
                    onChange={(e) =>
                      updateField('password')({
                        target: { value: e.target.value.replace(/\s/g, '') }
                      })
                    }
                    className="w-full bg-transparent py-3.5 pl-11 pr-12 text-[15px] text-gray-700 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#1b2d5d] transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {hasError && (
                <div className="flex items-center text-red-500 text-[13px] ml-1">
                  <FiInfo size={14} className="mr-1.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div
                className="flex items-center gap-2 ml-1 mt-4 cursor-pointer select-none"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    newsletter: !prev.newsletter,
                  }))
                }
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${form.newsletter
                      ? 'border-[#1b2d5d] bg-[#1b2d5d]'
                      : 'border-gray-300 bg-white'
                    }`}
                >
                  {form.newsletter && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                <span className="text-[14px] text-gray-500">
                  I want to receive notification & Newsletters
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Sign Up'}
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