import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import DriverSidebar from '../../components/dashboard/DriverSidebar';
import DriverTopNav from '../../components/dashboard/DriverTopNav';
import DriverRidesTable from '../../components/dashboard/DriverRidesTable';
import LogoutModal from '../../components/dashboard/LogoutModal';
import DriverDetailsModal from '../../components/dashboard/DriverDetailsModal';
import MessagesModal from '../../components/dashboard/MessagesModal';
import RideAlertsView from '../../components/dashboard/RideAlertsView';
import PassengerView from '../../components/dashboard/PassengerView';
import PassengerEditModal from '../../components/dashboard/PassengerEditModal';
import ReturnTripModal from '../../components/dashboard/ReturnTripModal';
import DriverProfileDetailsView from '../../components/dashboard/DriverProfileDetailsView';
import DriverAdminChatView from '../../components/dashboard/DriverAdminChatView';

export default function DriverDashboardPage() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [activeSidebarTab, setActiveSidebarTab] = useState('Dashboard'); // 'Dashboard' | 'Notification' | 'Admin Chat'
    const [activeTopNavTab, setActiveTopNavTab] = useState('Ride Details'); // 'Ride Details' | 'Profile Details'
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isRideDetailsModalOpen, setIsRideDetailsModalOpen] = useState(false);
    const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
    const [isPassengerEditModalOpen, setIsPassengerEditModalOpen] = useState(false);
    const [isReturnTripModalOpen, setIsReturnTripModalOpen] = useState(false);
    const [selectedRideConfig, setSelectedRideConfig] = useState({ hasFlightInfo: false, isViewMode: false });
    const [selectedRide, setSelectedRide] = useState(null);

    // Helper functions
    const openRideDetails = (ride, isViewMode = false) => {
        setSelectedRide(ride);
        setSelectedRideConfig({ hasFlightInfo: Boolean(ride?.flightNumber), isViewMode });
        setIsRideDetailsModalOpen(true);
    };

    const handleOpenMessages = () => {
        setIsRideDetailsModalOpen(false); // Optionally close details modal when opening chat
        setIsMessagesModalOpen(true);
    };

    return (
        <div className="relative h-screen bg-[#efefef] text-[#111111] overflow-hidden w-full">
            <div className="mx-auto max-w-full lg:flex h-full">
                <DriverSidebar 
                    activeSidebarTab={activeSidebarTab}
                    setActiveSidebarTab={setActiveSidebarTab}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    setIsLogoutModalOpen={setIsLogoutModalOpen}
                />

                <main className="h-full bg-white flex-1 flex flex-col w-full overflow-hidden">
                    <DriverTopNav 
                        activeSidebarTab={activeSidebarTab} 
                        activeTopNavTab={activeTopNavTab} 
                        setActiveTopNavTab={setActiveTopNavTab} 
                    />

                    <div className="flex-1 overflow-y-auto">
                        {activeSidebarTab === 'Dashboard' ? (
                            <>
                                {activeTopNavTab === 'Ride Details' && (
                                    <DriverRidesTable 
                                        openRideDetails={openRideDetails}
                                        setIsReturnTripModalOpen={setIsReturnTripModalOpen}
                                    />
                                )}

                                {activeTopNavTab === 'Passenger' && (
                                    <div className="px-4 sm:px-6 lg:px-8 pb-6">
                                        <PassengerView onEditPassenger={() => setIsPassengerEditModalOpen(true)} />
                                    </div>
                                )}

                                {activeTopNavTab === 'Profile Details' && (
                                    <DriverProfileDetailsView />
                                )}
                            </>
                        ) : activeSidebarTab === 'Notification' ? (
                            <RideAlertsView role="driver" />
                        ) : (
                            <DriverAdminChatView />
                        )}
                    </div>

                </main>
            </div>

            {/* Modals */}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={() => { logout(); navigate('/driver/login'); }}
            />
            <DriverDetailsModal
                isOpen={isRideDetailsModalOpen}
                onClose={() => setIsRideDetailsModalOpen(false)}
                hasFlightInfo={selectedRideConfig.hasFlightInfo}
                isViewMode={selectedRideConfig.isViewMode}
                onOpenMessage={handleOpenMessages}
                bookingDetails={selectedRide}
            />
            <MessagesModal
                isOpen={isMessagesModalOpen}
                onClose={() => setIsMessagesModalOpen(false)}
                rideId={selectedRide?.id || selectedRide?._id || selectedRide?.bookingId || null}
                bookingDetails={selectedRide}
            />
            <PassengerEditModal
                isOpen={isPassengerEditModalOpen}
                onClose={() => setIsPassengerEditModalOpen(false)}
            />
            <ReturnTripModal
                isOpen={isReturnTripModalOpen}
                onClose={() => setIsReturnTripModalOpen(false)}
                bookingDetails={selectedRide}
            />
        </div>
    );
}
