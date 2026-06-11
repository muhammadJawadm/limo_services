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
		<ReservationAccordion title="Vehicle Information" isOpen={isOpen} onToggle={onToggle}>
			{isLoadingVehicles ? (
				<div className="text-center py-4 text-gray-500 text-[14px]">Loading vehicles…</div>
			) : vehicleCategories.length > 0 ? (
				<select
					value={selectedVehicleId || ''}
					onChange={(e) => onSelectVehicle(e.target.value)}
					className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] sm:text-[15px] text-[#222] outline-none focus:border-[#1b2d5d] shadow-sm transition-colors cursor-pointer"
				>
					{vehicleCategories.map((vehicle) => {
						const vid = vehicle.id || vehicle._id
						return (
							<option key={vid} value={vid}>
								{vehicle.name || vehicle.type}
								{vehicle.maxPassengers ? ` — up to ${vehicle.maxPassengers} pax` : ''}
							</option>
						)
					})}
				</select>
			) : (
				<div className="text-center py-4 text-gray-500 text-[14px]">No vehicles available</div>
			)}
		</ReservationAccordion>
	)
}
