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
import DriverProfileDetailsView from '../../components/dashboard/DriverProfileDetailsView';
import DriverAdminChatView from '../../components/dashboard/DriverAdminChatView';

export default function DriverDashboardPage() {
	const navigate = useNavigate();
	const logout = useAuthStore((s) => s.logout);

	const [activeSidebarTab, setActiveSidebarTab] = useState('Dashboard');
	const [activeTopNavTab, setActiveTopNavTab] = useState('Ride Details');
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const [isRideDetailsModalOpen, setIsRideDetailsModalOpen] = useState(false);
	const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);

	const [selectedRideConfig, setSelectedRideConfig] = useState({
		hasFlightInfo: false,
		isViewMode: false,
		rideTab: 'upcoming',
	});

	const [selectedRide, setSelectedRide] = useState(null);

	const openRideDetails = (ride, isViewMode = false, rideTab = 'upcoming') => {
		setSelectedRide(ride);
		setSelectedRideConfig({
			hasFlightInfo: Boolean(ride?.flightNumber),
			isViewMode,
			rideTab,
		});
		setIsRideDetailsModalOpen(true);
	};

	const handleOpenMessages = (ride = selectedRide) => {
		if (ride) {
			setSelectedRide(ride);
		}

		setIsRideDetailsModalOpen(false);
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
										onOpenMessage={handleOpenMessages}
									/>
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

			<LogoutModal
				isOpen={isLogoutModalOpen}
				onClose={() => setIsLogoutModalOpen(false)}
				onConfirm={() => {
					logout();
					navigate('/driver/login');
				}}
			/>

			<DriverDetailsModal
				isOpen={isRideDetailsModalOpen}
				onClose={() => setIsRideDetailsModalOpen(false)}
				hasFlightInfo={selectedRideConfig.hasFlightInfo}
				isViewMode={selectedRideConfig.isViewMode}
				currentRideTab={selectedRideConfig.rideTab}
				onOpenMessage={handleOpenMessages}
				bookingDetails={selectedRide}
			/>

			<MessagesModal
				isOpen={isMessagesModalOpen}
				onClose={() => setIsMessagesModalOpen(false)}
				rideId={selectedRide?.id || selectedRide?._id || selectedRide?.bookingId || null}
				bookingDetails={selectedRide}
			/>
		</div>
	);
}
