import { FiBell, FiGrid, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import logoImg from '../../assets/navbarlogo.png';

export default function DriverSidebar({
  activeSidebarTab,
  setActiveSidebarTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsLogoutModalOpen
}) {
  return (
    <aside className="w-full border-b border-gray-200 bg-white px-5 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-[230px] lg:border-b-0 lg:px-7 lg:py-7 z-20">
      <div className="flex items-center justify-between lg:mb-10 mb-0">
          <img src={logoImg} alt="Pryvn Services" className="h-10 sm:h-12 pl-2 w-auto object-contain" />
          <button
              className="lg:hidden p-2 -mr-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
              {isMobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
      </div>

      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col mt-6 lg:mt-0 h-auto`}>
          <nav className="space-y-2 flex-1">
              <button
                  onClick={() => { setActiveSidebarTab('Dashboard'); setIsMobileMenuOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm sm:text-base transition-colors ${activeSidebarTab === 'Dashboard'
                      ? 'bg-[#1b2d5d] font-medium text-white'
                      : 'text-[#4d4d4d] hover:bg-gray-100'
                      }`}
              >
                  <FiGrid size={18} />
                  Dashboard
              </button>
              <button
                  onClick={() => { setActiveSidebarTab('Notification'); setIsMobileMenuOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm sm:text-base transition-colors ${activeSidebarTab === 'Notification'
                      ? 'bg-[#1b2d5d] font-medium text-white'
                      : 'text-[#4d4d4d] hover:bg-gray-100'
                      }`}
              >
                  <FiBell size={18} />
                  Notification
              </button>
          </nav>

          <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="mt-8 lg:mt-auto flex w-full lg:absolute lg:bottom-10 lg:left-7 lg:w-[160px] items-center justify-center gap-2 rounded-full bg-[#ffe2de] px-4 py-3 text-sm sm:text-base font-medium text-[#ff5548] hover:bg-[#ffcfc8] transition-colors mb-4 lg:mb-0"
          >
              <FiLogOut size={17} />
              Log out
          </button>
      </div>
    </aside>
  );
}
