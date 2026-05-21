import { FiUsers } from 'react-icons/fi'
import briefcaseicon from '../../../assets/briefcaseblack.png'
import ReservationAccordion from './ReservationAccordion'

export default function VehicleInfoSection({
	isOpen,
	onToggle,
	isLoadingVehicles,
	vehicleCategories,
	selectedVehicleId,
	onSelectVehicle,
}) {
	return (
		<ReservationAccordion title="Vehicle Information" isOpen={isOpen} onToggle={onToggle} contentClassName="p-4 sm:p-5 space-y-2 sm:space-y-3 bg-gray-50/50">
			{isLoadingVehicles ? (
				<div className="text-center py-4 text-gray-500">Loading vehicles...</div>
			) : vehicleCategories.length > 0 ? (
				vehicleCategories.map((vehicle) => {
					const vehicleId = vehicle.id || vehicle._id
					return (
						<div
							key={vehicleId}
							onClick={() => onSelectVehicle(vehicleId)}
							className={`flex items-center justify-between rounded-xl sm:rounded-full border px-4 sm:px-5 py-3 sm:py-3.5 bg-white cursor-pointer shadow-sm transition-all focus:outline-none ${selectedVehicleId === vehicleId ? 'border-[#1b2d5d] ring-1 ring-[#1b2d5d]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'}`}
						>
							<span className={`text-[14px] sm:text-[15px] font-medium transition-colors ${selectedVehicleId === vehicleId ? 'text-[#111]' : 'text-[#666]'}`}>
								{vehicle.name || vehicle.type}
							</span>
							<div className={`flex items-center gap-3 sm:gap-4 text-[13px] sm:text-[15px] transition-colors ${selectedVehicleId === vehicleId ? 'text-[#222]' : 'text-[#8c8c8c]'}`}>
								<span className="flex items-center gap-1.5 font-medium">
									<FiUsers size={16} className={selectedVehicleId === vehicleId ? 'text-[#1b2d5d]' : 'text-[#8c8c8c]'} /> {vehicle.maxPassengers || '3'}
								</span>
								<span className="flex items-center gap-1.5 font-medium">
									<img src={briefcaseicon} className={`w-[14px] sm:w-[16px] object-contain ${selectedVehicleId === vehicleId ? 'opacity-100' : 'opacity-60'}`} alt="briefcase" /> {vehicle.luggage || '3'}
								</span>
							</div>
						</div>
					)
				})
			) : (
				<div className="text-center py-4 text-gray-500">No vehicles available</div>
			)}
		</ReservationAccordion>
	)
}
