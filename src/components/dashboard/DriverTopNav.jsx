import { FaUserCircle } from 'react-icons/fa';
import whitecaricon from '../../assets/whitecaricon.png';
import blackcaricon from '../../assets/blackcaricon.png';

export default function DriverTopNav({
  activeSidebarTab,
  activeTopNavTab,
  setActiveTopNavTab
}) {
  return (
    <header className="mt-4 lg:mt-6 mb-5 flex flex-col gap-5 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center justify-between w-full xl:w-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
              {activeSidebarTab === 'Dashboard'
                  ? 'Dashboard'
                  : activeSidebarTab === 'Notification'
                      ? 'Notification'
                      : 'Admin Chat'}
          </h1>

          {/* Profile - Mobile & Tablet Only */}
          <div className="flex xl:hidden items-center gap-3 border-l pl-4 border-gray-200">
              <div className="text-right hidden sm:block">
                  <p className="text-xs sm:text-sm font-semibold">Welcome</p>
                  <p className="text-xs sm:text-sm text-gray-500">Jayson Smith</p>
              </div>
              <div className="relative group">
                  <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-gray-300 bg-white cursor-pointer -ml-1">
                      <FaUserCircle className='text-[34px] sm:text-[42px] text-[#222] bg-white rounded-full' />
                  </div>
                  <div className="absolute right-0 top-full mt-2 w-[220px] sm:w-[240px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <p className="text-xs sm:text-sm text-gray-400">Welcome</p>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#191919] leading-tight mt-0.5">Jayson Smith</h3>
                      <button
                          onClick={() => setActiveTopNavTab('Profile Details')}
                          className="mt-4 w-full rounded-full border border-[#1b2d5d] py-2 sm:py-2.5 text-sm font-medium text-[#1b2d5d] hover:bg-gray-50 transition-colors"
                      >
                          View Profile
                      </button>
                  </div>
              </div>
          </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6 w-full xl:w-auto">
          <div className="flex flex-col md:flex-row overflow-x-auto gap-2 pb-2 sm:pb-0 w-full xl:w-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <button
                  onClick={() => setActiveTopNavTab('Ride Details')}
                  className={`flex whitespace-nowrap items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors ${activeTopNavTab === 'Ride Details'
                      ? 'bg-[#1b2d5d] text-white'
                      : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                      }`}
              >
                  {activeTopNavTab === 'Ride Details' ? (
                      <img src={whitecaricon} alt="car" className='w-4 sm:w-5' />
                  ) : (
                      <img src={blackcaricon} alt="car" className='w-4 sm:w-5' />
                  )}
                  Ride Details
              </button>
          </div>

          {/* Profile - Desktop Only */}
          <div className="hidden xl:flex items-center gap-3">
              <div className="text-right">
                  <p className="text-sm font-semibold">Welcome</p>
                  <p className="text-sm text-gray-500">Jayson Smith</p>
              </div>
              <div className="relative group">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-gray-300 bg-white cursor-pointer">
                      <FaUserCircle size={36} className='text-white bg-black rounded-full p-0.5' />
                  </div>
                  <div className="absolute right-0 top-full mt-2 w-[240px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <p className="text-sm text-gray-400">Welcome</p>
                      <h3 className="text-xl font-semibold text-[#191919] leading-tight mt-0.5">Jayson Smith</h3>
                      <button
                          onClick={() => setActiveTopNavTab('Profile Details')}
                          className="mt-4 w-full rounded-full border border-[#1b2d5d] py-2.5 text-sm font-medium text-[#1b2d5d] hover:bg-gray-50 transition-colors"
                      >
                          View Profile
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </header>
  );
}
