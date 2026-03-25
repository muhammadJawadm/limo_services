import { useMemo, useState } from 'react';
import {
  FiBell,
  FiEye,
  FiEdit,
  FiGrid,
  FiLogOut,
  FiPlus,
  FiSearch,
  FiUsers,
  FiUser
} from 'react-icons/fi';
import { LuCar } from 'react-icons/lu';
import logoImg from '../../assets/navbarlogo.png';
import whitecaricon from '../../assets/whitecaricon.png'
import blackcaricon from '../../assets/blackcaricon.png'
import { MdOutlineLocationOn } from 'react-icons/md';

const RIDE_TABS = ['Upcoming Ride', 'Past Rides', 'Cancelled Rides'];

const BASE_ROWS = [
  {
    confNo: '0022',
    date: '02-14-2026',
    time: '12:00 AM',
    passenger: 'Jayson Smith',
    total: '$145.00',
  },
  {
    confNo: '0022',
    date: '02-14-2026',
    time: '12:00 AM',
    passenger: 'Doe Smith',
    total: '$145.00',
  },
];

function StatusPill({ tab }) {
  if (tab === 'Cancelled Rides') {
    return (
      <span className="rounded-full border border-[#ff7a73] px-4 py-1 text-xs text-[#ff6258]">
        Cancel
      </span>
    );
  }

  return (
    <span className="rounded-full border border-gray-200 px-4 py-1 text-xs text-gray-500">
      {tab === 'Past Rides' ? 'Past Rides' : 'Upcoming'}
    </span>
  );
}

function RoutingInfo() {
  return (
    <div className="space-y-1 text-[15px] text-gray-500 leading-6">
      <p className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-green-500 flex-shrink-0" size={24} />
        USA Vein Clinics, Telegraph Road, USA
      </p>
      <p className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-yellow-500 flex-shrink-0" size={24} />
        USA Vein Clinics, Telegraph Road, USA
      </p>
      <p className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-red-500 flex-shrink-0" size={24} />
        USA Vein Clinics, Telegraph Road, USA
      </p>
    </div>
  );
}

import LogoutModal from '../../components/dashboard/LogoutModal';
import RideDetailsModal from '../../components/dashboard/RideDetailsModal';
import MessagesModal from '../../components/dashboard/MessagesModal';
import RideAlertsView from '../../components/dashboard/RideAlertsView';
import PassengerView from '../../components/dashboard/PassengerView';
import PassengerEditModal from '../../components/dashboard/PassengerEditModal';
import AccountInfoView from '../../components/dashboard/AccountInfoView';
import AccountEditModal from '../../components/dashboard/AccountEditModal';
import NewReservationModal from '../../components/dashboard/NewReservationModal';
import ReturnTripModal from '../../components/dashboard/ReturnTripModal';
import { FaUserCircle } from 'react-icons/fa';

export default function UserDashboardPage() {
  const [activeRideTab, setActiveRideTab] = useState('Upcoming Ride');
  const [activeSidebarTab, setActiveSidebarTab] = useState('Dashboard'); // 'Dashboard' | 'Notification'
  const [activeTopNavTab, setActiveTopNavTab] = useState('Ride Details'); // 'Ride Details' | 'Passenger' | 'Account Info'

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isRideDetailsModalOpen, setIsRideDetailsModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isPassengerEditModalOpen, setIsPassengerEditModalOpen] = useState(false);
  const [isAccountEditModalOpen, setIsAccountEditModalOpen] = useState(false);
  const [accountEditType, setAccountEditType] = useState('passenger');
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);
  const [isReturnTripModalOpen, setIsReturnTripModalOpen] = useState(false);
  const [selectedRideConfig, setSelectedRideConfig] = useState({ isReturnTrip: false, hasFlightInfo: false });

  // Helper functions
  const openRideDetails = (isReturnTrip, hasFlightInfo) => {
    setSelectedRideConfig({ isReturnTrip, hasFlightInfo });
    setIsRideDetailsModalOpen(true);
  };

  const handleOpenMessages = () => {
    setIsRideDetailsModalOpen(false); // Optionally close details modal when opening chat
    setIsMessagesModalOpen(true);
  };

  const rows = useMemo(() => {
    return BASE_ROWS.map((row) => ({ ...row, tab: activeRideTab }));
  }, [activeRideTab]);

  return (
    <div className="min-h-screen bg-[#efefef] text-[#111111]">
      <div className="mx-auto max-w-full lg:flex">
        <aside className="w-full border-b border-gray-200 bg-white px-6 py-6 lg:sticky lg:top-0 lg:h-screen lg:w-[230px] lg:border-b-0 lg:px-7 lg:py-7">
          <div className="mb-8 lg:mb-10">
            <img src={logoImg} alt="Pryvn Services" className="h-12 pl-2 w-auto object-contain" />
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSidebarTab('Dashboard')}
              className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-base ${activeSidebarTab === 'Dashboard'
                ? 'bg-[#1b2d5d] font-medium text-white'
                : 'text-[#4d4d4d] hover:bg-gray-100'
                }`}
            >
              <FiGrid size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveSidebarTab('Notification')}
              className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-base ${activeSidebarTab === 'Notification'
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
            className="mt-10 flex w-[160px] items-center justify-center gap-2 rounded-full bg-[#ffe2de] px-4 py-3 text-base font-medium text-[#ff5548] lg:mt-auto lg:absolute lg:bottom-10 lg:left-7"
          >
            <FiLogOut size={17} />
            Log out
          </button>
        </aside>

        <main className="min-h-screen bg-white flex-1 flex flex-col">
          <header className="mt-4 lg:mt-6 mb-5 flex flex-col gap-4 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between ">
            <h1 className="text-3xl font-semibold text-[#161616]">
              {activeSidebarTab === 'Dashboard' ? 'Dashboard' : 'Notification'}
            </h1>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTopNavTab('Ride Details')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors ${activeTopNavTab === 'Ride Details'
                    ? 'bg-[#1b2d5d] text-white'
                    : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {activeTopNavTab === 'Ride Details' ? (
                    <img src={whitecaricon} alt="car" className='w-6' />
                  ) : (
                    <img src={blackcaricon} alt="car" className='w-6' />
                  )}
                  Ride Details
                </button>
                <button
                  onClick={() => setActiveTopNavTab('Passenger')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors ${activeTopNavTab === 'Passenger'
                    ? 'bg-[#1b2d5d] text-white'
                    : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <FiUsers size={15} />
                  Passenger
                </button>
                <button
                  onClick={() => setActiveTopNavTab('Account Info')}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors ${activeTopNavTab === 'Account Info'
                    ? 'bg-[#1b2d5d] text-white'
                    : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <FiUser size={15} />
                  Account Info
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">Welcome</p>
                  <p className="text-sm text-gray-500">Jayson Smith</p>
                </div>
                <div className="relative group">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-gray-300 bg-white cursor-pointer">
                    <FaUserCircle size={36} className='text-white bg-black rounded-full p-0.5' />
                  </div>
                  {/* Profile hover dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-[240px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <p className="text-sm text-gray-400">Welcome</p>
                    <h3 className="text-2xl font-semibold text-[#191919] leading-tight mt-0.5">Jayson Smith</h3>
                    <button className="mt-4 w-full rounded-full border border-[#1b2d5d] py-2.5 text-sm font-medium text-[#1b2d5d] hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {activeSidebarTab === 'Dashboard' ? (
            <>
              {activeTopNavTab === 'Ride Details' && (
                <section className="bg-[#efefef] flex-1">
                  <div className="mb-3 flex flex-col gap-3 bg-[#EAEAEA] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                    <h2 className="text-4xl font-semibold">Rides Details</h2>
                    <button
                      onClick={() => setIsNewReservationModalOpen(true)}
                      className="flex items-center gap-2 self-start rounded-full bg-[#1b2d5d] px-6 py-3 text-lg font-medium text-white sm:self-auto hover:bg-[#132042] transition-colors"
                    >
                      <FiPlus size={20} />
                      New Reservation
                    </button>
                  </div>

                  <div className="px-4 pb-8 sm:px-8">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white">
                        {RIDE_TABS.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveRideTab(tab)}
                            className={`px-4 py-3 text-sm sm:px-8 sm:text-[16px] ${activeRideTab === tab
                              ? 'bg-[#1b2d5d] text-white'
                              : 'text-gray-500 hover:bg-gray-50'
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 sm:px-6 sm:text-[16px]">
                          Trip Count:2
                        </div>
                        <label className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 sm:px-5">
                          <input
                            type="text"
                            placeholder="Search"
                            className="w-[110px] border-none text-sm text-gray-500 outline-none sm:w-[145px] sm:text-[16px]"
                          />
                          <FiSearch className="text-gray-500" size={18} />
                        </label>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl bg-white">
                      <table className="w-full min-w-[1150px] border-collapse">
                        <thead>
                          <tr className="bg-black text-left text-sm text-white sm:text-[16px]">
                            <th className="rounded-tl-2xl px-5 py-4 font-semibold">Conf #</th>
                            <th className="px-5 py-4 font-semibold">Date & Time</th>
                            <th className="px-5 py-4 font-semibold">Passenger</th>
                            <th className="px-5 py-4 font-semibold">Routing Information</th>
                            <th className="px-5 py-4 font-semibold">Status</th>
                            <th className="px-5 py-4 font-semibold">Total</th>
                            <th className="px-5 py-4 font-semibold">Cancel</th>
                            <th className="rounded-tr-2xl text-center px-5 py-4 font-semibold">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {rows.map((row, idx) => (
                            <tr key={`${row.confNo}-${idx}`} className="border-b border-gray-200 text-sm text-gray-500 sm:text-[15px]">
                              <td className="px-2 py-5">{row.confNo}</td>
                              <td className="px-2 py-5 leading-7">
                                <p>{row.date}</p>
                                <p>{row.time}</p>
                              </td>
                              <td className="px-2 py-5">{row.passenger}</td>
                              <td className="px-2 py-5">
                                <RoutingInfo />
                              </td>
                              <td className="px-2 py-5">
                                <StatusPill tab={row.tab} />
                              </td>
                              <td className="px-2 py-5">{row.total}</td>
                              <td className="px-5 py-5">Cancel</td>
                              <td className="px-2 py-5">
                                <div className="flex  items-center gap-3 whitespace-nowrap">
                                  <span
                                    className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d]"
                                    onClick={() => openRideDetails(true, false)} // Example config
                                  >
                                    <img src={blackcaricon} alt="" />                                    Return Trip
                                  </span>
                                  <span
                                    className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d]"
                                    onClick={() => setIsReturnTripModalOpen(true)} // Example config with flight info
                                  >
                                    <FiEye size={16} />
                                    View
                                  </span>
                                  <span
                                    className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d]"
                                    onClick={() => openRideDetails(false, true)} // Example config with flight info
                                  >
                                    <FiEdit size={16} />
                                    Edit
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </section>
              )}

              {activeTopNavTab === 'Passenger' && (
                <div className="px-4 sm:px-6 lg:px-8 pb-6">
                  <PassengerView onEditPassenger={() => setIsPassengerEditModalOpen(true)} />
                </div>
              )}

              {activeTopNavTab === 'Account Info' && (
                <div className="px-4 sm:px-6 lg:px-8 pb-6">
                  <AccountInfoView
                    onEditAccount={(type) => {
                      setAccountEditType(type);
                      setIsAccountEditModalOpen(true);
                    }}
                    onNewReservation={() => setIsNewReservationModalOpen(true)}
                  />
                </div>
              )}
            </>
          ) : (
            <RideAlertsView />
          )}

        </main>
      </div>

      {/* Modals */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => setIsLogoutModalOpen(false)}
      />
      <RideDetailsModal
        isOpen={isRideDetailsModalOpen}
        onClose={() => setIsRideDetailsModalOpen(false)}
        isReturnTrip={selectedRideConfig.isReturnTrip}
        hasFlightInfo={selectedRideConfig.hasFlightInfo}
        onOpenMessage={handleOpenMessages}
      />
      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
      />
      <PassengerEditModal
        isOpen={isPassengerEditModalOpen}
        onClose={() => setIsPassengerEditModalOpen(false)}
      />
      <AccountEditModal
        isOpen={isAccountEditModalOpen}
        onClose={() => setIsAccountEditModalOpen(false)}
        editType={accountEditType}
      />
      <NewReservationModal
        isOpen={isNewReservationModalOpen}
        onClose={() => setIsNewReservationModalOpen(false)}
      />
      <ReturnTripModal
        isOpen={isReturnTripModalOpen}
        onClose={() => setIsReturnTripModalOpen(false)}
      />
    </div>
  );
}
