import { BsCheck2 } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/navbarlogo.png';
import { useAuthStore } from '../stores/authStore';

const steps = [
  { label: 'Ride Details' },
  { label: 'Passenger Details' },
  { label: 'Payment' },
];

export default function StepperNavbar({ currentStep = 1 }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim()
    || user?.name
    || user?.email
    || 'Account';
  return (
    <nav className="sticky top-0 z-[9999] flex items-center justify-between px-3 md:px-8 py-3 bg-white shadow-sm border-b border-gray-100 w-full overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Limo Services" className="h-8 md:h-10 object-contain" />
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0">
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={i} className="flex items-center">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all
                    ${isCompleted ? 'bg-[#1a2b5e] border-[#1a2b5e] text-white' : ''}
                    ${isActive ? 'bg-[#1a2b5e] border-[#1a2b5e] text-white' : ''}
                    ${!isCompleted && !isActive ? 'bg-white border-gray-300 text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? <BsCheck2 size={12} /> : stepNum}
                </div>
                <span className={`hidden sm:block text-xs font-medium whitespace-nowrap ${isActive || isCompleted ? 'text-[#1a2b5e]' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {i < steps.length - 1 && (
                <div className="flex items-center mb-0 sm:mb-4 mx-1 md:mx-2">
                  <div
                    className={`w-8 md:w-16 h-[2px] ${isCompleted ? 'border-t-2 border-[#1a2b5e]' : 'border-t-2 border-dashed border-gray-300'}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Auth Button */}
      {isAuthenticated ? (
        <Link
          to="/dashboard"
          className="hidden sm:inline-flex items-center rounded-3xl border border-[#1B2D5D] bg-white px-4 py-2 text-sm font-semibold text-[#1B2D5D] shadow-sm hover:bg-[#1B2D5D] hover:text-white transition-colors"
        >
          {displayName}
        </Link>
      ) : (
        <button className="bg-[#1B2D5D] hover:bg-blue-800 transition-colors text-white text-xs md:text-sm font-semibold px-3 md:px-5 py-2 md:py-3 rounded-3xl shadow whitespace-nowrap"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      )}
    </nav>
  );
}

