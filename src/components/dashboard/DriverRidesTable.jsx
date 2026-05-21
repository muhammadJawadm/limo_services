import { useEffect, useMemo, useState } from 'react';
import { FiEye, FiPlus, FiLoader } from 'react-icons/fi';
import blackcaricon from '../../assets/blackcaricon.png';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useDriverStore } from '../../stores/driverStore';

const RIDE_TABS = [
    { label: 'Upcoming Ride', apiTab: 'upcoming' },
    { label: 'Past Rides', apiTab: 'past' },
    { label: 'Cancelled Rides', apiTab: 'cancelled' },
];

function StatusPill({ status, tab }) {
    const label = tab === 'past'
        ? 'Past'
        : status ?? (tab === 'cancelled' ? 'Cancelled' : 'Upcoming');
    const colorMap = {
        cancelled: 'border-[#ff7a73] text-[#ff6258]',
        past: 'border-green-300 text-green-600',
        completed: 'border-green-300 text-green-600',
        ongoing: 'border-blue-300 text-blue-600',
        upcoming: 'border-gray-200 text-gray-500',
    };
    const key = label?.toLowerCase() ?? 'upcoming';
    const cls = colorMap[key] ?? colorMap.upcoming;
    return (
        <span className={`rounded-full border px-4 py-1 text-xs ${cls}`}>
            {label}
        </span>
    );
}

function RoutingInfo({ pickup, dropoff, stop }) {
    return (
        <div className="space-y-1 text-[15px] text-gray-500 leading-6">
            <p className="flex items-center gap-2">
                <MdOutlineLocationOn className="text-green-500 flex-shrink-0" size={24} />
                <span className="truncate max-w-[200px]">{pickup || '—'}</span>
            </p>
            {stop && (
                <p className="flex items-center gap-2">
                    <MdOutlineLocationOn className="text-yellow-500 flex-shrink-0" size={24} />
                    <span className="truncate max-w-[200px]">{stop}</span>
                </p>
            )}
            <p className="flex items-center gap-2">
                <MdOutlineLocationOn className="text-red-500 flex-shrink-0" size={24} />
                <span className="truncate max-w-[200px]">{dropoff || '—'}</span>
            </p>
        </div>
    );
}

export default function DriverRidesTable({ openRideDetails }) {
    const [activeRideTab, setActiveRideTab] = useState('Upcoming Ride');
    const { rides, isLoading, pagination, fetchRides, cancelRide } = useDriverStore();

    const currentApiTab = useMemo(
        () => RIDE_TABS.find((t) => t.label === activeRideTab)?.apiTab ?? 'upcoming',
        [activeRideTab]
    );

    useEffect(() => {
        fetchRides({ tab: currentApiTab, page: 1, scope: 'mine' });
    }, [currentApiTab, fetchRides]);

    const handleCancelRide = async (rideId) => {
        if (!rideId) return;
        const confirmed = window.confirm('Cancel this ride?');
        if (!confirmed) return;

        const result = await cancelRide(rideId);
        if (result?.success) {
            fetchRides({ tab: currentApiTab, page: pagination?.page ?? 1, scope: 'mine' });
        }
    };

    return (
        <section className="bg-[#efefef] flex-1 flex flex-col">
            <div className="mb-3 flex flex-col gap-3 bg-[#EAEAEA] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <h2 className="text-4xl font-semibold">Ride Details</h2>
                
            </div>

            <div className="px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex overflow-x-auto w-full lg:w-auto rounded-xl border border-gray-200 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {RIDE_TABS.map(({ label }) => (
                            <button
                                key={label}
                                onClick={() => setActiveRideTab(label)}
                                className={`flex-1 min-w-[120px] whitespace-nowrap px-4 py-2.5 sm:py-3 text-xs sm:px-6 sm:text-[15px] transition-colors ${activeRideTab === label
                                    ? 'bg-[#1b2d5d] text-white'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-200">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
                            <FiLoader size={20} className="animate-spin" />
                            <span className="text-[15px]">Loading rides…</span>
                        </div>
                    ) : (
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
                                {rides.length === 0 ? (
                                    <tr>
                                        <td colSpan={activeRideTab === 'Upcoming Ride' ? 8 : 7} className="py-12 text-center text-gray-400 text-[15px]">
                                            No {activeRideTab.toLowerCase()} found.
                                        </td>
                                    </tr>
                                ) : (
                                    rides.map((ride, idx) => {
                                        const passenger = ride.passenger?.name
                                            || (ride.passengerDetails
                                                ? `${ride.passengerDetails?.firstName ?? ''} ${ride.passengerDetails?.lastName ?? ''}`.trim()
                                                : ride.bookerDetails
                                                ? `${ride.bookerDetails.firstName ?? ''} ${ride.bookerDetails.lastName ?? ''}`.trim()
                                                : '—');

                                        const dateStr = ride.date
                                            ? new Date(ride.date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })
                                            : '—';

                                        const totalValue = ride.totalAmount ?? ride.totalFare;
                                        const total = totalValue != null ? `$${Number(totalValue).toFixed(2)}` : '—';

                                        const pickup = ride.routingInformation?.pickupLocation ?? ride.pickupLocation;
                                        const dropoff = ride.routingInformation?.dropoffLocation ?? ride.dropoffLocation;
                                        const stop = ride.routingInformation?.stopLocations?.length
                                            ? ride.routingInformation.stopLocations.join(', ')
                                            : ride.stopLocation?.length
                                            ? ride.stopLocation.join(', ')
                                            : '';

                                        return (
                                            <tr key={ride.id ?? ride._id ?? idx} className="border-b border-gray-200 text-sm text-gray-500 sm:text-[15px]">
                                                <td className="px-2 py-5">{ride.confNumber ?? ride.confirmationNumber ?? ride._id?.slice(-4) ?? '—'}</td>
                                                <td className="px-2 py-5 leading-7">
                                                    <p>{dateStr}</p>
                                                    <p>{ride.time ?? '—'}</p>
                                                </td>
                                                <td className="px-2 py-5">{passenger}</td>
                                                <td className="px-2 py-5">
                                                    <RoutingInfo
                                                        pickup={pickup}
                                                        dropoff={dropoff}
                                                        stop={stop}
                                                    />
                                                </td>
                                                <td className="px-2 py-5">
                                                    <StatusPill status={ride.rideStatus} tab={currentApiTab} />
                                                </td>
                                                <td className="px-2 py-5">{total}</td>
                                                {activeRideTab === 'Upcoming Ride' && (
                                                    <td className="px-5 py-5">
                                                        <span
                                                            className="cursor-pointer hover:text-red-500 transition-colors"
                                                            onClick={() => handleCancelRide(ride.id ?? ride._id)}
                                                        >
                                                            Cancel
                                                        </span>
                                                    </td>
                                                )}
                                                <td className="px-2 py-5">
                                                    <div className="flex justify-center items-center gap-3 whitespace-nowrap">
                                                        <span
                                                            className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d] transition-colors"
                                                            onClick={() => openRideDetails(ride, false)}
                                                        >
                                                            <img src={blackcaricon} alt="" /> confirm pickup
                                                        </span>
                                                        <span
                                                            className="flex cursor-pointer items-center gap-1 hover:text-[#1b2d5d] transition-colors"
                                                            onClick={() => openRideDetails(ride, true)}
                                                        >
                                                            <FiEye size={16} /> View
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 px-2">
                        <p className="text-[13px] text-gray-500">
                            Page {pagination.page} of {pagination.totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={pagination.page <= 1}
                                onClick={() => fetchRides({ tab: currentApiTab, page: pagination.page - 1 })}
                                className="px-4 py-1.5 text-sm rounded-full border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => fetchRides({ tab: currentApiTab, page: pagination.page + 1 })}
                                className="px-4 py-1.5 text-sm rounded-full border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
