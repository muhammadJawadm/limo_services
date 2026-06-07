import { useEffect, useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa6';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { useDriverStore } from '../../stores/driverStore';
import {
  acceptDriverRide,
  declineDriverRide,
  confirmDriverRidePickup,
  getDriverRideById,
  updateRideStatus
} from '../../services/driverService';
import CancelTripModal from './CancelTripModal';

const safeNameParts = (fullName) => {
  if (!fullName) return ['—', ''];
  const parts = String(fullName).trim().split(/\s+/);
  return [parts[0] || '—', parts.slice(1).join(' ') || ''];
};

export default function DriverDetailsModal({
  isOpen,
  onClose,
  hasFlightInfo = true,
  isViewMode = false,
  currentRideTab: currentRideTabProp = 'upcoming',
  onOpenMessage,
  bookingDetails,
}) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [fullBookingDetails, setFullBookingDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const { currentRideTab: storeRideTab, cancelRide, fetchRides } = useDriverStore();
  const currentRideTab = currentRideTabProp || storeRideTab || 'upcoming';

  useEffect(() => {
    if (!isOpen || !bookingDetails?.id) return;

    const hasChargeInfo = typeof bookingDetails?.tripPrice === 'number';
    if (hasChargeInfo) return;

    const fetchFullDetails = async () => {
      try {
        const result = await getDriverRideById(bookingDetails.id);
        if (result?.success && result?.data) {
          setFullBookingDetails(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch full booking details:', error);
      }
    };

    fetchFullDetails();
  }, [isOpen, bookingDetails?.id, bookingDetails?.tripPrice]);

  if (!isOpen) return null;

  const details = fullBookingDetails || bookingDetails;

  const passengerName = details?.passenger?.name
    || [details?.passengerDetails?.firstName, details?.passengerDetails?.lastName].filter(Boolean).join(' ')
    || [details?.bookerDetails?.firstName, details?.bookerDetails?.lastName].filter(Boolean).join(' ')
    || '—';
  const [passengerFirstName, passengerLastName] = safeNameParts(passengerName);
  const passengerEmail = details?.passenger?.email
    || details?.passengerDetails?.email
    || details?.bookerDetails?.email
    || '—';
  const passengerPhone = details?.passenger?.phone
    || details?.passengerDetails?.phone
    || details?.bookerDetails?.phone
    || '—';
  const confirmationNumber = details?.confNumber
    || details?.confirmationNumber
    || details?.id
    || details?._id
    || '—';
  const bookingType = details?.type === 'ptop' ? 'Point to Point' : details?.type || '—';

  const statusLabel = currentRideTab === 'past'
    ? 'Past'
    : currentRideTab === 'cancelled'
      ? 'Cancelled'
      : details?.rideStatus ? details.rideStatus.charAt(0).toUpperCase() + details.rideStatus.slice(1) : 'Upcoming';
  const rideStatus = (details?.rideStatus || '').toLowerCase();
  const isUpcomingTab = currentRideTab === 'upcoming';

  const isNewAssignedRide = isUpcomingTab && rideStatus === 'upcoming';
  const isAcceptedRide = isUpcomingTab && rideStatus === 'confirmed';
  const isOngoingRide = isUpcomingTab && rideStatus === 'ongoing';

  const isRideActionable =
    isUpcomingTab &&
    rideStatus !== 'cancelled' &&
    rideStatus !== 'completed';

  const canAcceptOrDecline = isNewAssignedRide;
  const canCancelRide = isRideActionable;

  const primaryActionLabel = isOngoingRide
    ? 'Complete Ride'
    : isAcceptedRide
      ? 'Confirm Pickup'
      : 'Accept';
  const createdAt = details?.createdAt ? new Date(details.createdAt).toLocaleDateString() : '—';
  const pickupLocation = details?.routingInformation?.pickupLocation || details?.pickupLocation || 'Pickup location';
  const dropoffLocation = details?.routingInformation?.dropoffLocation || details?.dropoffLocation || 'Drop-off location';
  const stopLocations = details?.routingInformation?.stopLocations || details?.stopLocations || [];
  const childSeats = details?.childSeats || {};
  const charges = details?.chargesAndFees || {};
  const tripPrice = charges?.tripPrice ?? details?.tripPrice ?? 0;
  const childSeatPrice = charges?.childSeatsFee ?? details?.childSeatsFee ?? 0;
  const tollCharges = charges?.tollCharges ?? details?.tollCharges ?? details?.tolls ?? 0;
  const otherFees = charges?.otherFees ?? details?.otherFees ?? 0;
  const paymentTotal = details?.totalAmount ?? charges?.totalAmount ?? 0;
  const tripNotes = details?.specialInstructions || details?.notes || '—';
  const tripDate = details?.date ? new Date(details.date).toLocaleDateString() : '—';
  const bookingId = details?.id ?? details?._id;

  const handlePrimaryAction = async () => {
    if (!bookingId) return;

    const confirmed = window.confirm(`Are you sure you want to ${primaryActionLabel.toLowerCase()}?`);
    if (!confirmed) return;

    setIsUpdating(true);

    try {
      let result;

      if (isOngoingRide) {
        result = await updateRideStatus(bookingId, 'completed');
      } else if (isAcceptedRide) {
        result = await confirmDriverRidePickup(bookingId);
      } else {
        result = await acceptDriverRide(bookingId);
      }

      if (result?.success) {
        await fetchRides({ tab: currentRideTab ?? 'upcoming', page: 1, scope: 'mine' }).catch(() => { });
        onClose();
        return;
      }

      alert(result?.message || `Failed to ${primaryActionLabel.toLowerCase()}.`);
    } catch {
      alert(`Failed to ${primaryActionLabel.toLowerCase()}.`);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleDeclineRide = async () => {
    if (!bookingId) return;

    const confirmed = window.confirm('Are you sure you want to decline this ride?');
    if (!confirmed) return;

    setIsDeclining(true);

    try {
      const result = await declineDriverRide(bookingId);

      if (result?.success) {
        await fetchRides({ tab: currentRideTab ?? 'upcoming', page: 1, scope: 'mine' }).catch(() => { });
        onClose();
        return;
      }

      alert(result?.message || 'Failed to decline ride.');
    } catch {
      alert('Failed to decline ride.');
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="relative flex max-h-[90vh] w-full max-w-[1100px] flex-col rounded-[20px] bg-white text-[#111111] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex shrink-0 items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={onClose}>
            <FaArrowLeft size={16} className="text-[#666] group-hover:text-[#111] transition-colors" />
            <span className="text-[15px] font-medium text-[#666] group-hover:text-[#111] transition-colors">Back</span>
          </div>

          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => onOpenMessage?.(details)}
              className="rounded-full bg-[#1b2d5d] px-6 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#132042]"
            >
              Message
            </button> */}
            {canCancelRide && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="rounded-full border border-gray-200 px-5 py-2 text-[14px] font-medium text-[#666] transition-colors hover:bg-gray-50 bg-white"
              >
                Cancel Trip
              </button>
            )}
          </div> 
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                <h3 className="mb-5 text-[17px] font-bold text-[#111]">Booking Details</h3>
                <div className="grid grid-cols-[115px_1fr] gap-y-3.5 text-[14px]">
                  <div className="text-[#666]">Confirmation#</div>
                  <div className="text-[#111]">{confirmationNumber}</div>
                  <div className="text-[#666]">Booking Type:</div>
                  <div className="text-[#111]">{bookingType}</div>
                  <div className="text-[#666]">Trip Status:</div>
                  <div className="text-[#111]">{statusLabel}</div>
                  <div className="text-[#666]">Created At:</div>
                  <div className="text-[#111]">{createdAt}</div>
                </div>
              </div>

              <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#111]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  User Info
                </h3>
                <div className="grid grid-cols-[90px_1fr] gap-y-3.5 text-[14px]">
                  <div className="text-[#666]">First Name:</div>
                  <div className="text-[#111]">{passengerFirstName}</div>
                  <div className="text-[#666]">Last Name:</div>
                  <div className="text-[#111]">{passengerLastName}</div>
                  <div className="text-[#666]">Contract No:</div>
                  <div className="text-[#111]">{passengerPhone}</div>
                  <div className="text-[#666]">Email</div>
                  <div className="text-[#111] break-all">{passengerEmail}</div>
                </div>
              </div>

              <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                  <AiOutlineDollarCircle className="w-[22px] h-[22px] text-[#111]" />
                  Charges & Fees
                </h3>
                <div className="flex flex-col text-[14px]">
                  {/* <div className="flex justify-between mb-3.5">
                    <span className="text-[#666]">Trip Price</span>
                    <span className="text-[#111] text-[15px]">${Number(tripPrice || 0).toFixed(2)}</span>
                  </div> */}
                  {/* <div className="flex justify-between mb-3.5">
                    <span className="text-[#666]">Child</span>
                    <span className="text-[#111] text-[15px]">${Number(childSeatPrice || 0).toFixed(2)}</span>
                  </div> */}
                  {/* <div className="flex justify-between mb-3.5">
                    <span className="text-[#666]">Toll Charges</span>
                    <span className="text-[#111] text-[15px]">${Number(tollCharges || 0).toFixed(2)}</span>
                  </div> */}
                  {/* <div className="flex justify-between mb-4">
                    <span className="text-[#666]">Others</span>
                    <span className="text-[#111] text-[15px]">${Number(otherFees || 0).toFixed(2)}</span>
                  </div> */}
                  <div className="h-px bg-gray-200 w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666]">Driver Payout</span>
                    <span className="text-[20px] font-bold text-[#111]">${Number(paymentTotal-30 || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
                <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white flex-1 min-h-[300px]">
                  <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                    <CiLocationOn className="w-[22px] h-[22px] text-[#111]" strokeWidth={0.5} />
                    Trip Info
                  </h3>
                  <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-y-4 text-[14px]">
                    <div className="text-[#111] font-medium">Pick-up</div>
                    <div className="text-[#666]">{pickupLocation}</div>

                    <div className="text-[#111] font-medium">Stop:</div>
                    <div className="text-[#666]">{stopLocations[0] || '—'}</div>

                    <div className="text-[#111] font-medium">Stop:</div>
                    <div className="text-[#888]">{stopLocations[1] || '+ Add Stop'}</div>

                    <div className="text-[#111] font-medium">Drop-off:</div>
                    <div className="text-[#666]">{dropoffLocation}</div>

                    <div className="text-[#111] font-medium">Duration:</div>
                    <div className="text-[#666]">{details?.hours ? `${details.hours} hours` : '—'}</div>

                    <div className="text-[#111] font-medium">Luggage:</div>
                    <div className="text-[#666]">{details?.luggage ?? '—'}</div>

                    <div className="text-[#111] font-medium">Child Seats:</div>
                    <div className="text-[#666]">{childSeats?.infant || 0} Infant, {childSeats?.toddler || 0} Toddler, {childSeats?.booster || 0} Booster</div>

                    <div className="text-[#111] font-medium">Date:</div>
                    <div className="text-[#666]">{tripDate}</div>

                    <div className="text-[#111] font-medium">Time:</div>
                    <div className="text-[#666]">{details?.time || '—'}</div>
                  </div>
                </div>

                {hasFlightInfo && (
                  <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white">
                    <h3 className="mb-4 text-[17px] font-bold text-[#111] flex items-center gap-2">
                      <FiFileText className="w-[18px] h-[18px] text-[#111]" />
                      Chauffeur / Trip Notes
                    </h3>
                    <div className="text-[#666] text-[14px] whitespace-pre-wrap">
                      {tripNotes}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
                

                {hasFlightInfo ? (
                  <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white min-h-[220px]">
                    <h3 className="mb-5 text-[17px] font-bold text-[#111] flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#111]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      Flight Information
                    </h3>
                    <div className="grid grid-cols-[145px_1fr] gap-y-3.5 text-[14px]">
                      <div className="text-[#666]">Airline Name or Code:</div>
                      <div className="text-[#111]">{details?.flightNumber || '—'}</div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[16px] border border-gray-200 p-5 sm:p-6 bg-white min-h-[140px]">
                    <h3 className="mb-4 text-[17px] font-bold text-[#111] flex items-center gap-2">
                      <FiFileText className="w-[18px] h-[18px] text-[#111]" />
                      Chauffeur / Trip Notes
                    </h3>
                    <div className="text-[#666] text-[14px] whitespace-pre-wrap">
                      {tripNotes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isRideActionable && (
          <div className="flex shrink-0 bg-white justify-end gap-3 px-6 py-5 sm:px-8 sm:py-6">
            {canAcceptOrDecline && (
              <button
                onClick={handleDeclineRide}
                disabled={isDeclining || isUpdating}
                className="rounded-full border border-red-200 bg-white px-8 py-3 w-full sm:w-auto text-[15px] font-medium text-red-500 transition-all hover:bg-red-50 shadow-sm disabled:opacity-60"
              >
                {isDeclining ? 'Declining...' : 'Decline'}
              </button>
            )}

            <button
              onClick={handlePrimaryAction}
              disabled={isUpdating || isDeclining}
              className="rounded-full bg-[#1b2d5d] px-8 py-3 w-full sm:w-auto text-[15px] font-medium text-white transition-all hover:bg-[#132042] shadow-sm disabled:opacity-60"
            >
              {isUpdating ? 'Processing...' : primaryActionLabel}
            </button>
          </div>
        )}

      </div>

      <CancelTripModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={async () => {
          const rideId = details?.id ?? details?._id;
          if (!rideId) {
            setIsCancelModalOpen(false);
            return;
          }
          const result = await cancelRide(rideId);
          setIsCancelModalOpen(false);
          if (result?.success) {
            await fetchRides({ tab: currentRideTab ?? 'upcoming', page: 1, scope: 'mine' }).catch(() => { });
            onClose();
          } else {
            alert(result?.message || 'Failed to cancel ride.');
          }
        }}
      />
    </div>
  );
}