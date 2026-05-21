import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logoImg from '../../assets/navbarlogo.png';
import { useAuthStore } from '../../stores/authStore';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim()
    || user?.name
    || user?.email
    || 'Customer';

  const accountLink = isAuthenticated ? '/dashboard' : '/login';

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 ml-[4%]">
            <div className="w-full">
              <img src={logoImg} alt="Limo Services" className="w-full h-full object-cover" onClick={() => navigate('/')} />
            </div>
          </div>

          {/* Nav Links — desktop */}
          <ul className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
            <li><Link to="/terms" className="hover:text-blue-700 transition-colors">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-700 transition-colors">Privacy</Link></li>
            <li><Link to="/support" className="hover:text-blue-700 transition-colors">Support</Link></li>
            <li><Link to="/driver/login" className="hover:text-blue-700 transition-colors">Become a partner</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to={accountLink}
                className="hidden md:inline-flex items-center rounded-3xl border border-[#1B2D5D] bg-white px-5 py-3 text-sm font-semibold text-[#1B2D5D] shadow-sm hover:bg-[#1B2D5D] hover:text-white transition-colors"
              >
                {displayName}
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-3xl border border-[#1B2D5D] bg-white px-5 py-3 text-sm font-semibold text-[#1B2D5D] shadow-sm hover:bg-[#1B2D5D] hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/create-account"
                  className="rounded-3xl bg-[#1B2D5D] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

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
              <li><Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Terms</Link></li>
              <li><Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Privacy</Link></li>
              <li><Link to="/support" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Support</Link></li>
              <li><Link to="/driver/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-700 transition-colors">Become a partner</Link></li>
            </ul>
            {isAuthenticated ? (
              <Link
                to={accountLink}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#1B2D5D] hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow text-center"
              >
                {displayName}
              </Link>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-[#1B2D5D] text-[#1B2D5D] hover:bg-[#1B2D5D] hover:text-white transition-colors text-sm font-semibold px-5 py-3 rounded-3xl shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/create-account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[#1B2D5D] hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
