import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

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

import UserSidebar from '../../components/dashboard/UserSidebar';
import UserTopNav from '../../components/dashboard/UserTopNav';
import UserRidesTable from '../../components/dashboard/UserRidesTable';

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeSidebarTab, setActiveSidebarTab] = useState('Dashboard');
  const [activeTopNavTab, setActiveTopNavTab] = useState('Ride Details');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isRideDetailsModalOpen, setIsRideDetailsModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isAccountEditModalOpen, setIsAccountEditModalOpen] = useState(false);
  const [accountEditType, setAccountEditType] = useState('passenger');
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);
  const [isReturnTripModalOpen, setIsReturnTripModalOpen] = useState(false);
  const [selectedRideConfig, setSelectedRideConfig] = useState({ isReturnTrip: false, hasFlightInfo: false });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [profileRefreshKey, setProfileRefreshKey] = useState(0);

  // Helper functions
  const openRideDetails = (booking, isReturnTrip, hasFlightInfo) => {
    setSelectedBooking(booking);
    setSelectedRideConfig({ isReturnTrip, hasFlightInfo });
    setIsRideDetailsModalOpen(true);
  };

  const handleOpenMessages = () => {
    setIsRideDetailsModalOpen(false);
    setIsMessagesModalOpen(true);
  };

  return (
    <div className="h-screen bg-[#efefef] text-[#111111] overflow-hidden">
      <div className="mx-auto max-w-full lg:flex h-full">

        {/* SIDEBAR */}
        <UserSidebar 
          activeSidebarTab={activeSidebarTab}
          setActiveSidebarTab={setActiveSidebarTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsLogoutModalOpen={setIsLogoutModalOpen}
        />

        {/* MAIN CONTENT */}
        <main className="h-full bg-white flex-1 flex flex-col w-full overflow-hidden">

          {/* HEADER */}
          <div className="sticky top-0 z-20 bg-white">
            <UserTopNav 
              activeSidebarTab={activeSidebarTab} 
              activeTopNavTab={activeTopNavTab} 
              setActiveTopNavTab={setActiveTopNavTab}
              onViewProfile={() => {
                setActiveTopNavTab('Account Info');
              }}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeSidebarTab === 'Dashboard' ? (
              <>
                {activeTopNavTab === 'Ride Details' && (
                  <UserRidesTable 
                    setIsNewReservationModalOpen={setIsNewReservationModalOpen}
                    openRideDetails={openRideDetails}
                    setIsReturnTripModalOpen={setIsReturnTripModalOpen}
                    setSelectedBooking={setSelectedBooking}
                    onOpenMessage={handleOpenMessages}
                  />
                )}


                {activeTopNavTab === 'Account Info' && (
                  <div className="px-4 sm:px-6 lg:px-8 pb-6 bg-[#efefef] flex-1">
                    <AccountInfoView
                      onEditAccount={(type) => {
                        setAccountEditType(type);
                        setIsAccountEditModalOpen(true);
                      }}
                      onNewReservation={() => setIsNewReservationModalOpen(true)}
                      refreshKey={profileRefreshKey}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#efefef] flex-1">
                <RideAlertsView role="customer" />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => { logout(); navigate('/login'); }}
      />
      <RideDetailsModal
        isOpen={isRideDetailsModalOpen}
        onClose={() => setIsRideDetailsModalOpen(false)}
        isReturnTrip={selectedRideConfig.isReturnTrip}
        hasFlightInfo={selectedRideConfig.hasFlightInfo}
        onOpenMessage={handleOpenMessages}
        bookingDetails={selectedBooking}
      />
      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
        rideId={selectedBooking?.id || selectedBooking?._id || selectedBooking?.bookingId || null}
        bookingDetails={selectedBooking}
      />
      <AccountEditModal
        isOpen={isAccountEditModalOpen}
        onClose={() => setIsAccountEditModalOpen(false)}
        editType={accountEditType}
        onSave={() => setProfileRefreshKey(prev => prev + 1)}
      />
      <NewReservationModal
        isOpen={isNewReservationModalOpen}
        onClose={() => setIsNewReservationModalOpen(false)}
      />
      <ReturnTripModal
        isOpen={isReturnTripModalOpen}
        onClose={() => setIsReturnTripModalOpen(false)}
        bookingDetails={selectedBooking}
      />
    </div>
  );
}
