import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMenu, FiX } from 'react-icons/fi';
import { LuLock, LuMail } from 'react-icons/lu';
import logoImg from '../../assets/navbarlogo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 ml-[4%]">
            <div className="w-full">
              <img src={logoImg} alt="Limo Services" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Nav Links — desktop */}
          <ul className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
            <li><a href="#" className="hover:text-blue-700 transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Become a partner</a></li>
          </ul>

          <div className="flex items-center gap-3">
            {/* Auth Button — desktop only */}
            <button
              onClick={() => setShowLoginModal(true)}
              className="hidden md:block bg-[#1B2D5D] hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow"
            >
              Login/Registration
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-8 py-4 flex flex-col gap-4">
            <ul className="flex flex-col gap-4 text-gray-600 text-sm font-medium">
              <li><a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Terms</a></li>
              <li><a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Privacy</a></li>
              <li><a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Support</a></li>
              <li><a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Become a partner</a></li>
            </ul>
            <button
              onClick={() => { setMobileMenuOpen(false); setShowLoginModal(true); }}
              className="w-full bg-[#1B2D5D] hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow"
            >
              Login/Registration
            </button>
          </div>
        )}
      </nav>

      {showLoginModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-[24px] bg-white/100 px-6 py-7 md:px-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-3xl font-semibold text-black">Login</h2>
            <p className="mt-2 text-center text-base text-gray-500 leading-snug">
              You&apos;ll be able to easily book and manage rides, and
              <br />
              get ride status updates
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center rounded-full bg-white/70 border px-5 py-3 shadow-sm">
                <LuMail size={20} className="text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='John@gmail.com'
                  className="ml-3 w-full bg-transparent text-base text-gray-600  outline-none"
                />
              </div>

              <div className="flex items-center rounded-full bg-white/70 border px-5 py-3 shadow-sm">
                <LuLock size={20} className="text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className="ml-3 w-full bg-transparent text-base text-gray-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={() => { setShowLoginModal(false); navigate('/login'); }}
              className="mt-5 w-full rounded-full bg-black py-3.5 text-xl font-medium text-white">
              Login
            </button>

            <button
              onClick={() => { setShowLoginModal(false); navigate('/forget-password'); }}
              className="mt-4 w-full text-center text-xl text-gray-500 hover:text-gray-700 transition-colors">
              Forgot password?
            </button>

            <button
              onClick={() => { setShowLoginModal(false); navigate('/create-account'); }}
              className="mt-4 w-full rounded-full bg-[#1B2D5D] py-3.5 text-xl font-medium text-white"
            >
              Create An account
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 w-full rounded-full border-2 border-[#1B2D5D] bg-transparent py-3.5 text-xl font-medium text-[#1B2D5D]"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}
