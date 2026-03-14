import { useMemo, useState } from 'react';
import {
  FiBell,
  FiEye,
  FiGrid,
  FiLogOut,
  FiPlus,
  FiSearch,
  FiUser,
} from 'react-icons/fi';
import { LuCar } from 'react-icons/lu';
import logoImg from '../../assets/navbarlogo.png';

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
        <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#52c878]" />
        USA Vein Clinics, Telegraph Road, USA
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#ffd34f]" />
        USA Vein Clinics, Telegraph Road, USA
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#ff6e62]" />
        USA Vein Clinics, Telegraph Road, USA
      </p>
    </div>
  );
}

export default function UserDashboardPage() {
  const [activeRideTab, setActiveRideTab] = useState('Upcoming Ride');

  const rows = useMemo(() => {
    return BASE_ROWS.map((row) => ({ ...row, tab: activeRideTab }));
  }, [activeRideTab]);

  return (
    <div className="min- bg-[#efefef] text-[#111111]">
      <div className="mx-auto max-w-full lg:flex">
        <aside className="w-full border-b border-gray-200 bg-white px-6 py-6 lg:sticky lg:top-0 lg:h-screen lg:w-[230px] lg:border-b-0 lg:border-r lg:px-7 lg:py-7">
          <div className="mb-8 lg:mb-10">
            <img src={logoImg} alt="Pryvn Services" className="h-12 w-auto object-contain" />
          </div>

          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-full bg-[#1b2d5d] px-4 py-3 text-left text-base font-medium text-white">
              <FiGrid size={18} />
              Dashboard
            </button>
            <button className="flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-base text-[#4d4d4d] hover:bg-gray-100">
              <FiBell size={18} />
              Notification
            </button>
          </nav>

          <button className="mt-10 flex w-[160px] items-center justify-center gap-2 rounded-full bg-[#ffe2de] px-4 py-3 text-base font-medium text-[#ff5548] lg:mt-auto lg:absolute lg:bottom-10 lg:left-7">
            <FiLogOut size={17} />
            Log out
          </button>
        </aside>

        <main className="min-h-screen bg-white flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <header className="mb-5 flex flex-col gap-4 px-2 py-1 sm:px-0 xl:flex-row xl:items-center xl:justify-between ">
            <h1 className="text-3xl font-semibold text-[#161616]">Dashboard</h1>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 rounded-full bg-[#1b2d5d] px-5 py-2 text-sm text-white">
                  <LuCar size={15} />
                  Ride Details
                </button>
                <button className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-500">Passenger</button>
                <button className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-500">Account Info</button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">Welcome</p>
                  <p className="text-sm text-gray-500">Jayson Smith</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full border border-gray-300 bg-white">
                  <FiUser size={20} />
                </div>
              </div>
            </div>
          </header>

          <section className="rounded-xl bg-[#efefef]">
            <div className="mb-3 flex flex-col gap-3 rounded-t-xl bg-[#e6e6e6] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <h2 className="text-4xl font-semibold">Rides Details</h2>
              <button className="flex items-center gap-2 self-start rounded-full bg-[#1b2d5d] px-6 py-3 text-lg font-medium text-white sm:self-auto">
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
                      className={`px-4 py-3 text-sm sm:px-8 sm:text-[16px] ${
                        activeRideTab === tab
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
                      <th className="rounded-tr-2xl px-5 py-4 font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={`${row.confNo}-${idx}`} className="border-b border-gray-200 text-sm text-gray-500 sm:text-[15px]">
                        <td className="px-5 py-5">{row.confNo}</td>
                        <td className="px-5 py-5 leading-7">
                          <p>{row.date}</p>
                          <p>{row.time}</p>
                        </td>
                        <td className="px-5 py-5">{row.passenger}</td>
                        <td className="px-5 py-5">
                          <RoutingInfo />
                        </td>
                        <td className="px-5 py-5">
                          <StatusPill tab={row.tab} />
                        </td>
                        <td className="px-5 py-5">{row.total}</td>
                        <td className="px-5 py-5">Cancel</td>
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            <span className="flex items-center gap-1">
                              <LuCar size={17} />
                              Return Trip
                            </span>
                            <span className="flex items-center gap-1">
                              <FiEye size={16} />
                              View
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activeRideTab === 'Upcoming Ride' && (
                <div className="mt-5 ml-auto w-full max-w-[300px] rounded-xl bg-white p-6 text-[#191919] shadow-sm">
                  <p className="text-sm text-gray-500">Welcome</p>
                  <h3 className="text-4xl font-semibold leading-tight">Jayson Smith</h3>
                  <button className="mt-5 w-full rounded-full border border-[#1b2d5d] py-3 text-xl font-medium text-[#1b2d5d]">
                    View Profile
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
