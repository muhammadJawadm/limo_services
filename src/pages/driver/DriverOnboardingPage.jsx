import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiCheck, FiGlobe } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import logoImg from '../../assets/navbarlogo.png';
import profile from '../../assets/profile.svg';
import { AiOutlineLogout } from "react-icons/ai";
import Footer from '../../components/Footer';

// Steps
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10 } from '../../components/onboarding/steps';

export default function DriverOnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    companyName: '',
    companyType: '',
    country: '',
    street: '',
    zipCode: '',
    city: '',
    stateProvince: '',
    taxId: '',
    businessRegistration: '',
    // Step 2
    priorExp: '',
    electricVehicles: '',
    femaleChauffeurs: '',
    chauffeurCount: '',
    firstClassCount: '',
    businessVansCount: '',
    businessVansCount2: '',
    fleetDescription: '',
    // Step 3
    sameAsRep: false,
    chauffeurFirstName: '',
    chauffeurLastName: '',
    chauffeurEmail: '',
    chauffeurPhone: '',
    driverLicenseId: '',
    // Step 4
    vehicleYear: '',
    vehicleBrand: '',
    vehicleClass: '',
    vehicleColor: '',
    passengerCount: '',
    luggageCount: '',
    wifi: '',
    smoking: '',
    numberPlate: '',
    vin: '',
    // Step 8
    contractPlace: '',
    contractAgreed: false,
    showErrors: false,
    // Step 9
    cardHolderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    // Step 10
    availability: {
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: true,
      Fri: true,
      Sun: true
    }
  });

  const updateDoc = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep === 8) {
      if (!formData.contractPlace) {
        updateDoc('showErrors', true);
        return;
      }
      // If valid, and want to go to next step
      updateDoc('showErrors', false);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else if (currentStep === totalSteps) {
      // Final submit
      console.log('Final Submit', formData);
      setShowReviewModal(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} updateDoc={updateDoc} />;
      case 2: return <Step2 formData={formData} updateDoc={updateDoc} />;
      case 3: return <Step3 formData={formData} updateDoc={updateDoc} />;
      case 4: return <Step4 formData={formData} updateDoc={updateDoc} />;
      case 5: return <Step5 />;
      case 6: return <Step6 />;
      case 7: return <Step7 />;
      case 8: return <Step8 formData={formData} updateDoc={updateDoc} />;
      case 9: return <Step9 formData={formData} updateDoc={updateDoc} />;
      case 10: return <Step10 formData={formData} updateDoc={updateDoc} />;
      default: return <div className="p-10 text-center text-gray-500">More steps coming soon...</div>;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#Fcfcfc] font-sans overflow-x-hidden w-full">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 xl:px-12 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logoImg} alt="Prvyn Services" className="h-10 object-contain" />
        </div>

        {/* Stepper Center */}
        <div className="hidden lg:flex flex-1 max-w-4xl mx-auto items-center justify-center px-1 xl:px-4">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div key={idx} className="flex items-center">
                <div className={`w-6 h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center text-[11.5px] xl:text-[13px] font-medium transition-colors
                  ${isCompleted ? 'bg-[#1b2d5d] text-white' : isCurrent ? 'bg-white border-2 border-[#1b2d5d] text-[#1b2d5d]' : 'bg-white border border-gray-200 text-gray-400'}
                `}>
                  {isCompleted ? <FiCheck size={14} /> : stepNum}
                </div>
                {idx < totalSteps - 1 && (
                  <div className={`w-3 lg:w-4 xl:w-8 h-[2px] mx-1 border-t-2 border-dashed ${isCompleted ? 'border-[#1b2d5d]' : 'border-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex-shrink-0 flex justify-end sm:min-w-[150px] xl:min-w-[200px]">
          <div className="relative group">
            <button className="flex items-center gap-3 bg-white border rounded-full py-2.5 px-5 hover:bg-gray-50 transition-colors shadow-sm">
              <img src={profile} alt="profile" className="w-7 h-6" />
              <span className="text-[14px] font-medium text-gray-600 block">Onboarding</span>
              <FiChevronDown className="text-gray-600 ml-1 w-6 h-6" />
            </button>

            {/* Dropdown Menu placeholder */}
            <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              <div className="flex items-center gap-1 p-3 rounded-xl bg-[#f8f9fa] border border-gray-100 mb-1 cursor-pointer">
                <img src={profile} alt="profile" className="w-7 h-6" />
                <span className="text-[14px] font-medium text-gray-800">Onboarding Registration</span>
                <div className="ml-auto w-4 h-4 rounded-full bg-[#1b2d5d] flex-shrink-0" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
                <LuUser className="text-gray-500" size={20} />
                <span className="text-[14px] text-gray-600">My Profile</span>
                <div className="ml-auto w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer text-red-500">
                <AiOutlineLogout className="text-red-500" size={20} />
                <span className="text-[14px]">Logout</span>
                <div className="ml-auto w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-10 md:py-16 px-4">
        <div className="w-full max-w-[1000px]">

          <div className="mb-4">
            <h1 className="text-[24px] md:text-[28px] font-semibold text-[#1b2d5d]">Partner Onboarding</h1>
            {currentStep === 1 && (
              <div className="mt-4 text-[15px] text-gray-500 max-w-2xl leading-relaxed">
                Thank you Jayson smith for choosing to partner with Limo Services. You have selected Algiers as your primary city of operations.
                <br /><br />
                Please provide the following mandatory information: Company Name, Legal Form, Country, City, Street and Postal Code.
              </div>
            )}

            {/* Mobile Stepper */}
            <div className="flex lg:hidden mt-6 items-center flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</span>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-[#1b2d5d] rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-transparent">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className={`mt-12 flex flex-col sm:flex-row items-center ${currentStep > 1 ? 'sm:justify-between' : 'sm:justify-start'} gap-4 w-full`}>
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-10 py-3.5 rounded-full border border-gray-300 bg-white text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto sm:min-w-[160px] flex-1 sm:flex-none"
                >
                  Previous
                </button>
              )}
              <button
                onClick={nextStep}
                className="px-10 py-3.5 rounded-full bg-[#1b2d5d] text-[15px] font-medium text-white hover:bg-[#132042] transition-colors w-full sm:w-auto sm:min-w-[160px] flex-1 sm:flex-none"
              >
                {currentStep === 10 ? 'Submit Application' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* Admin Under Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full text-center relative shadow-2xl animate-fade-in-up">
            <div className="w-14 h-14 bg-gray-100 text-[#1b2d5d] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="15" cy="15" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" />
                <path d="M17.5 17.5L19.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="text-[22px] font-bold text-[#111] mb-3">Under Admin Review</h3>
            <p className="text-[14px] text-gray-500 mb-8 leading-relaxed px-2">
              Your application has been submitted. Our team will review your documents and get back to you within 24-48 hours.
            </p>

            <button
              onClick={() => {
                setShowReviewModal(false);
                navigate('/driver/profile');
              }}
              className="w-full bg-[#1b2d5d] text-white rounded-full py-3.5 font-medium text-[15px] hover:bg-[#132042] transition-colors mb-3"
            >
              Simulate Approval
            </button>
            <button
              onClick={() => setShowReviewModal(false)}
              className="w-full border border-gray-200 text-gray-700 rounded-full py-3.5 font-medium text-[15px] hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
