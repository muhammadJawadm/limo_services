import { useEffect, useState } from 'react';
import { FiPlus, FiSearch, FiEye, FiEdit, FiMessageSquare } from 'react-icons/fi';
import blackcaricon from '../../assets/blackcaricon.png';
import { MdOutlineLocationOn } from 'react-icons/md';
import { getMyBookings, cancelBooking } from '../../services/bookingService';
import { useUserStore } from '../../stores/userStore';
import { formatTableDate } from '../../utils/bookingFormatters';

const RIDE_TABS = ['Upcoming Ride', 'Past Rides', 'Cancelled Rides'];

const tabToApiMap = {
	'Upcoming Ride': 'upcoming',
	'Past Rides': 'past',
	'Cancelled Rides': 'cancelled',
};

function StatusPill({ tab }) {
  if (tab === 'Cancelled Rides') {
    return (
      <span className="rounded-full border border-[#ff7a73] px-3 py-1 sm:px-4 text-[11px] sm:text-xs text-[#ff6258] whitespace-nowrap">
        Cancel
      </span>
    );
  }

  return (
    <span className="rounded-full border border-gray-200 px-3 py-1 sm:px-4 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">
      {tab === 'Past Rides' ? 'Past Rides' : 'Upcoming'}
    </span>
  );
}

function RoutingInfo({ booking }) {
  const stops = booking?.stopLocations || [];
  return (
    <div className="space-y-1 text-xs sm:text-[14px] md:text-[15px] text-gray-500 leading-5 sm:leading-6 min-w-[200px]">
      <p className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-green-500 flex-shrink-0" size={20} />
        {booking?.pickupLocation || 'Pickup location'}
      </p>
      {stops[0] ? (
        <p className="flex items-center gap-2">
          <MdOutlineLocationOn className="text-yellow-500 flex-shrink-0" size={20} />
          {stops[0]}
        </p>
      ) : null}
      <p className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-red-500 flex-shrink-0" size={20} />
        {booking?.dropoffLocation || 'Drop-off location'}
      </p>
    </div>
  );
}

export default function UserRidesTable({ setIsNewReservationModalOpen, openRideDetails, setSelectedBooking, onOpenMessage }) {
  const [activeRideTab, setActiveRideTab] = useState('Upcoming Ride');
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [cancellingId, setCancellingId] = useState(null);
  const { setCurrentBookingTab } = useUserStore();

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      setBookingError('');
      const result = await getMyBookings({ tab: currentTab });
      if (!result?.success) {
        setBookingError(result?.message || 'Failed to load rides.');
        setBookings([]);
        setIsLoading(false);
        return;
      }

      setBookings(result?.data ?? []);
      setIsLoading(false);
    };

    loadBookings();
  }, [currentTab]);

  const handleTabChange = (tab) => {
    setActiveRideTab(tab);
    setCurrentTab(tabToApiMap[tab]);
    setCurrentBookingTab(tabToApiMap[tab]);
  };

  const handleCancelRide = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);
    const result = await cancelBooking(bookingId);
    setCancellingId(null);

    if (result?.success) {
      // Reload bookings to reflect the cancellation
      const reloadResult = await getMyBookings({ tab: currentTab });
      if (reloadResult?.success) {
        setBookings(reloadResult?.data ?? []);
      }
    } else {
      setBookingError(result?.message || 'Failed to cancel booking.');
    }
  };

  return (
    <section className="bg-[#efefef] flex-1 flex flex-col">
      <div className="mb-4 flex flex-col gap-4 bg-[#EAEAEA] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold">Rides Details</h2>
        <button
          onClick={() => setIsNewReservationModalOpen(true)}
          className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-[#1b2d5d] px-6 py-3 text-[15px] sm:text-[16px] font-medium text-white hover:bg-[#132042] transition-colors"
        >
          <FiPlus size={20} />
          New Reservation
        </button>
      </div>

      <div className="px-4 pb-8 sm:px-6 lg:px-8">

        {/* Ride Tabs & Search Filters */}
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          <div className="flex overflow-x-auto w-full lg:w-auto rounded-xl border border-gray-200 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {RIDE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 min-w-[120px] whitespace-nowrap px-4 py-2.5 sm:py-3 text-xs sm:px-6 sm:text-[15px] transition-colors ${activeRideTab === tab
                  ? 'bg-[#1b2d5d] text-white'
                  : 'text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none text-center rounded-full border border-gray-300 bg-white px-3 py-2 sm:py-2.5 text-xs sm:px-6 sm:text-[15px] text-gray-500 whitespace-nowrap">
              Trip Count: {bookings.length}
            </div>
            <label className="flex flex-[2] lg:flex-none items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 sm:px-5 sm:py-2.5 focus-within:border-gray-400 transition-colors">
              <input
                type="text"
                placeholder="Search"
                className="w-full min-w-[50px] lg:w-[130px] border-none text-xs sm:text-[15px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <FiSearch className="text-gray-500 flex-shrink-0" size={16} />
            </label>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-200">
          {bookingError ? (
            <div className="px-4 py-4 text-sm text-red-500">{bookingError}</div>
          ) : null}
          {isLoading ? (
            <div className="px-4 py-4 text-sm text-gray-500">Loading rides...</div>
          ) : null}
          <table className="w-full min-w-[1000px] xl:min-w-[1150px] border-collapse">
            <thead>
              <tr className="bg-[#111] text-left text-xs sm:text-[15px] text-white">
                <th className="rounded-tl-xl px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Conf #</th>
                <th className="px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Date & Time</th>
                <th className="px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Passenger</th>
                <th className="px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Routing Information</th>
                <th className="px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Total</th>
                {activeRideTab === 'Upcoming Ride' && (
                  <th className="px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Cancel</th>
                )}
                <th className="rounded-tr-xl text-center px-4 lg:px-5 py-4 font-medium whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 last:border-0 text-xs sm:text-[14px] text-gray-600 hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-5 py-5 align-top pt-6">{row.confNumber || '--'}</td>
                  <td className="px-4 lg:px-5 py-5 leading-6 align-top pt-6 whitespace-nowrap text-gray-800 font-medium">
                    <p>{formatTableDate(row.date)}</p>
                    <p className="text-gray-500 font-normal">{row.time || '--'}</p>
                  </td>
                  <td className="px-4 lg:px-5 py-5 align-top pt-6 whitespace-nowrap">
                    {row.passengerDetails?.firstName || row.user?.firstName || '--'} {row.passengerDetails?.lastName || row.user?.lastName || ''}
                  </td>
                  <td className="px-4 lg:px-5 py-5 align-top pt-6">
                    <RoutingInfo booking={row} />
                  </td>
                  <td className="px-4 lg:px-5 py-5 align-top pt-6">
                    <StatusPill tab={activeRideTab} />
                  </td>
                  <td className="px-4 lg:px-5 py-5 align-top pt-6 font-medium text-gray-800">${Number(row.totalAmount ?? 0).toFixed(2)}</td>
                  {activeRideTab === 'Upcoming Ride' && (
                    <td className="px-4 lg:px-5 py-5 align-top pt-6">
                      <span
                        onClick={() => handleCancelRide(row.id || row._id)}
                        disabled={cancellingId === (row.id || row._id)}
                        className={`text-gray-500 hover:text-red-500 cursor-pointer transition-colors ${
                          cancellingId === (row.id || row._id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {cancellingId === (row.id || row._id) ? 'Cancelling...' : 'Cancel'}
                      </span>
                    </td>
                  )}
                  <td className="px-4 lg:px-5 py-5 align-top pt-6">
                    <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-5 whitespace-nowrap text-gray-500 font-medium">
                      <span
                        className="flex cursor-pointer items-center gap-1.5 hover:text-[#1b2d5d] transition-colors"
                        onClick={() => {
                          setSelectedBooking?.(row);
                          onOpenMessage?.(row);
                        }}
                      >
                        <FiMessageSquare size={16} />
                        Message
                      </span>

                      <span
                        className="flex cursor-pointer items-center gap-1.5 hover:text-[#1b2d5d] transition-colors"
                        onClick={() => openRideDetails(row, true, Boolean(row.flightNumber))}
                      >
                        <img src={blackcaricon} alt="car" className="w-[15px] h-[15px] object-contain opacity-70" />
                        Return Trip
                      </span>

                      {activeRideTab === 'Upcoming Ride' && (
                        <span
                          className="flex cursor-pointer items-center gap-1.5 hover:text-[#1b2d5d] transition-colors"
                          onClick={() => openRideDetails(row, false, Boolean(row.flightNumber))}
                        >
                          <FiEdit size={16} />
                          View
                        </span>
                      )}
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
