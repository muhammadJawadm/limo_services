import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiInfo, FiEye, FiEyeOff } from 'react-icons/fi';
import { LuBuilding2, LuLock, LuMail, LuUser } from 'react-icons/lu';
import AuthSidePanel from '../../components/AuthSidePanel';
import SharedPhoneInput from '../../components/SharedPhoneInput';
import buildingIcon from '../../assets/company.png';
import { useAuthStore } from '../../stores/authStore';
import { validatePassword } from '../../utils/validation';

function InputRow({
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  hasError,
  showToggle = false,
  showValue = false,
  onToggleShow,
}) {
  return (
    <div className={`flex items-center rounded-full bg-white px-5 py-3.5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border ${hasError ? 'border-red-200' : 'border-gray-50'}`}>
      <span className="text-gray-400">{icon}</span>

      <input
        type={showToggle ? (showValue ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="ml-3 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
      />

      {showToggle && (
        <button
          type="button"
          onClick={onToggleShow}
          className="ml-2 text-gray-400 hover:text-[#1b2d5d] transition-colors"
        >
          {showValue ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      )}
    </div>
  );
}
export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, isLoading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    company: '',
    optIn: false,
  });
  const [formError, setFormError] = useState('');

  const hasError = Boolean(formError || error);
  const errorMessage = formError || error;

  const updateField = (key) => (e) => {
    const value = key === 'optIn' ? e.target.checked : e.target.value;
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

    const result = await registerUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      password: form.password,
    });

    if (result?.success) {
      navigate('/otp-verification', { state: { email: form.email.trim(), flow: 'register' } });
      return;
    }

    setFormError(result?.message || 'Registration failed. Please try again.');
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

            <form onSubmit={handleSignUp} className="mt-8 space-y-4">
              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">First Name</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuUser size={18} />}
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={updateField('firstName')}
                    hasError={hasError}
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
                    hasError={hasError}
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Email Address</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuMail size={18} />}
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={updateField('email')}
                    hasError={hasError}
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Phone Number</label>
                <div className="mt-1.5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-full">
                  <SharedPhoneInput
                    value={form.phone}
                    onChange={updateField('phone')}
                    hasError={hasError}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-medium text-gray-800 ml-1">Password</label>
                <div className="mt-1.5">
                  <InputRow
                    icon={<LuLock size={18} />}
                    placeholder="*********"
                    value={form.password}
                    onChange={(e) =>
                      updateField('password')({
                        target: { value: e.target.value.replace(/\s/g, '') }
                      })
                    }
                    hasError={hasError}
                    showToggle
                    showValue={showPassword}
                    onToggleShow={() => setShowPassword((prev) => !prev)}
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

              {/* Error message */}
              {hasError && (
                <div className="flex items-center text-red-500 text-[13px] ml-1 mt-1">
                  <FiInfo size={14} className="mr-1.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-2 ml-1">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${form.optIn ? 'border-[#1b2d5d] bg-[#1b2d5d]' : 'border-gray-300 bg-transparent'}`}
                  onClick={() => setForm(prev => ({ ...prev, optIn: !prev.optIn }))}
                >
                  {form.optIn && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span
                  className="text-[15px] text-gray-500 cursor-pointer select-none"
                  onClick={() => setForm(prev => ({ ...prev, optIn: !prev.optIn }))}
                >
                  I want to receive notification & Newsletters
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#1b2d5d] text-white py-4 text-[15px] font-semibold hover:bg-[#16254c] transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>
              </div>

              <p className="text-[15px] text-gray-500 mt-4 ml-1">
                Already have an Account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#1b2d5d] font-semibold hover:underline"
                >
                  Log In
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}