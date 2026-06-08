import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/navbarlogo1.png';
import driverSideImg from '../../assets/driverside.png';
import USAddressInput from '../../components/USAddressInput';

export default function DriverRegisterPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleNext = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      setAddressError('Address is required.');
      return;
    }

    navigate('/driver/register/details', {
      state: { location: address.trim() },
    });
  };

  const handleSelect = (prediction) => {
    setAddress(prediction.description);
    setAddressError('');
  };

  return (
    <div className="min-h-screen bg-[#Fcfcfc] flex items-center justify-center p-4 md:p-6 lg:p-6">
      <div className="w-full max-w-[1400px] h-[calc(100vh-3rem)] min-h-[600px] grid grid-cols-1 lg:grid-cols-2 bg-[#Fcfcfc] rounded-3xl overflow-hidden shadow-sm border border-gray-100">

        {/* Left Section - Form */}
        <section className="p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-start max-w-2xl w-full mx-auto relative overflow-y-auto">
          {/* Logo */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-12 lg:left-16 xl:top-16 xl:left-20">
            <img src={logoImg} alt="Prvyn Services" className="h-10 md:h-12 object-contain" />
          </div>

          <div className="mt-16 w-full">
            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1b2d5d]">Register</h2>
            <p className="mt-2 text-[15px] text-gray-500">
              Enter your details to create an account.
            </p>

            <form onSubmit={handleNext} className="mt-10 space-y-6">
              <div>
                <USAddressInput
                  label="Select Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError('');
                  }}
                  onSelect={handleSelect}
                  placeholder="Search Address..."
                  error={addressError}
                  types={['geocode']}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042]"
                >
                  Next
                </button>
              </div>

              <div className="pt-2 text-left">
                <span className="text-[15px] text-gray-500">
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
