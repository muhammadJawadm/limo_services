import { useMemo, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import blackcaricon from '../../assets/blackcaricon.png';
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

export default function DriverRidesTable({ openRideDetails, setIsReturnTripModalOpen }) {
    const [activeRideTab, setActiveRideTab] = useState('Upcoming Ride');

    const rows = useMemo(() => {
        return BASE_ROWS.map((row) => ({ ...row, tab: activeRideTab }));
    }, [activeRideTab]);

    return (
        <section className="bg-[#efefef] flex-1 flex flex-col">
            <div className="mb-4 flex flex-col gap-4 bg-[#EAEAEA] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold">Rides Details</h2>
            </div>

            <div className="px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex overflow-x-auto w-full lg:w-auto rounded-xl border border-gray-200 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {RIDE_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveRideTab(tab)}
                                className={`flex-1 min-w-[120px] whitespace-nowrap px-4 py-2.5 sm:py-3 text-xs sm:px-6 sm:text-[15px] transition-colors ${activeRideTab === tab
                                    ? 'bg-[#1b2d5d] text-white'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-200">
                    <table className="w-full min-w-[1000px] xl:min-w-[1150px] border-collapse">
                        <thead>
                            <tr className="bg-black text-left text-sm text-white sm:text-[16px]">
                                <th className="rounded-tl-2xl px-5 py-4 font-semibold">Conf #</th>
                                <th className="px-5 py-4 font-semibold">Date & Time</th>
                                <th className="px-5 py-4 font-semibold">Passenger</th>
                                <th className="px-5 py-4 font-semibold">Routing Information</th>
                                <th className="px-5 py-4 font-semibold">Status</th>
                                <th className="px-5 py-4 font-semibold">Total</th>
                                {activeRideTab === 'Upcoming Ride' && (
                                    <th className="px-5 py-4 font-semibold">Cancel</th>
                                )}
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
                                    {row.tab === 'Upcoming Ride' && (
                                        <td className="px-5 py-5">
                                            <span className="cursor-pointer hover:text-red-500 transition-colors">Cancel</span>
                                        </td>
                                    )}
                                    <td className="px-2 py-5">
                                        <div className="flex justify-center items-center gap-3 whitespace-nowrap">
                                            <span
                                                className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d]"
                                                onClick={() => openRideDetails(true, false)}
                                            >
                                                <img src={blackcaricon} alt="" />                                    Re-Book
                                            </span>
                                            <span
                                                className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d]"
                                                onClick={() => openRideDetails(true, true)}
                                            >
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

            </div>
        </section>
    );
}
