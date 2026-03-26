import { useState } from 'react';

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
  const [activeSidebarTab, setActiveSidebarTab] = useState('Dashboard');
  const [activeTopNavTab, setActiveTopNavTab] = useState('Ride Details');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsRideDetailsModalOpen(false);
    setIsMessagesModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#efefef] text-[#111111]">
      <div className="mx-auto max-w-full lg:flex">

        {/* SIDEBAR */}
        <UserSidebar 
          activeSidebarTab={activeSidebarTab}
          setActiveSidebarTab={setActiveSidebarTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsLogoutModalOpen={setIsLogoutModalOpen}
        />

        {/* MAIN CONTENT */}
        <main className="min-h-screen bg-white flex-1 flex flex-col w-full overflow-hidden">

          {/* HEADER */}
          <UserTopNav 
            activeSidebarTab={activeSidebarTab} 
            activeTopNavTab={activeTopNavTab} 
            setActiveTopNavTab={setActiveTopNavTab} 
          />

          {activeSidebarTab === 'Dashboard' ? (
            <>
              {activeTopNavTab === 'Ride Details' && (
                <UserRidesTable 
                  setIsNewReservationModalOpen={setIsNewReservationModalOpen}
                  openRideDetails={openRideDetails}
                  setIsReturnTripModalOpen={setIsReturnTripModalOpen}
                />
              )}

              {activeTopNavTab === 'Passenger' && (
                <div className="px-4 sm:px-6 lg:px-8 pb-6 bg-[#efefef] flex-1">
                  <PassengerView onEditPassenger={() => setIsPassengerEditModalOpen(true)} />
                </div>
              )}

              {activeTopNavTab === 'Account Info' && (
                <div className="px-4 sm:px-6 lg:px-8 pb-6 bg-[#efefef] flex-1">
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
            <div className="bg-[#efefef] flex-1">
              <RideAlertsView />
            </div>
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
