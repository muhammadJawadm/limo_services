import { FiBriefcase, FiClock, FiTrash2, FiUsers } from 'react-icons/fi'
import BookingAddressRow from '../../booking-form/BookingAddressRow'
import ReservationAccordion from './ReservationAccordion'

export default function TripDetailsSection({
	isOpen,
	onToggle,
	tripType,
	onTripTypeChange,
	stops,
	onAddStop,
	onRemoveStop,
	onUpdateStop,
	pickupLocation,
	onPickupChange,
	dropoffLocation,
	onDropoffChange,
	date,
	onDateChange,
	time,
	onTimeChange,
	noOfPassengers,
	onPassengersChange,
	luggage,
	onLuggageChange,
	hours,
	onHoursChange,
}) {
	const today = new Date().toISOString().split('T')[0]

	return (
		<ReservationAccordion title="Trip Details" isOpen={isOpen} onToggle={onToggle}>
			<div className="mb-5 sm:mb-6 flex overflow-hidden rounded-xl border border-[#1b2d5d] bg-white text-[#111] shadow-sm">
				<button
					onClick={() => onTripTypeChange('ptop')}
					className={`flex-1 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium transition-colors ${tripType === 'ptop' ? 'bg-[#1b2d5d] text-white' : 'hover:bg-gray-50'}`}
				>
					Point-to-Point
				</button>
				<button
					onClick={() => onTripTypeChange('hourly')}
					className={`flex-1 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium transition-colors ${tripType === 'hourly' ? 'bg-[#1b2d5d] text-white' : 'hover:bg-gray-50'}`}
				>
					Hourly
				</button>
			</div>

			<div className="space-y-3 sm:space-y-4">
				<BookingAddressRow
					value={pickupLocation}
					onChange={onPickupChange}
					placeholder="Pickup Location"
					iconColor="text-[#20c997]"
				/>

				{stops.map((stop) => (
					<div key={stop.id} className="flex items-center gap-2 sm:gap-3">
						<BookingAddressRow
							className="flex-1"
							value={stop.value}
							onChange={(val) => onUpdateStop(stop.id, val)}
							placeholder="Stop location"
							iconColor="text-yellow-500"
						/>
						<button
							onClick={() => onRemoveStop(stop.id)}
							className="flex shrink-0 items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#ff4a40]/10 text-[#ff4a40] transition-colors hover:bg-[#ff4a40]/20"
						>
							<FiTrash2 size={18} />
						</button>
					</div>
				))}

				<div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-dashed border-gray-300 px-4 py-1 bg-white hover:bg-gray-50 transition-colors">
					<button onClick={onAddStop} className="w-full flex justify-center items-center py-2 sm:py-1.5 text-[#8c8c8c] text-[13px] sm:text-sm font-medium hover:text-[#1b2d5d] transition-colors">
						+ Add Stop
					</button>
				</div>

				{tripType === 'hourly' ? (
					<>
						<BookingAddressRow
							value={dropoffLocation}
							onChange={onDropoffChange}
							placeholder="Drop-off Location"
							iconColor="text-[#ff4a40]"
							actions={
								<button
									type="button"
									onClick={() => onDropoffChange(pickupLocation)}
									className="rounded-full bg-[#1b2d5d] px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs text-white hover:bg-[#132042] transition-colors whitespace-nowrap"
								>
									Same as pickup
								</button>
							}
						/>
						<div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
							<FiClock className="text-gray-400 shrink-0" size={18} />
							<input
								type="number"
								min="1"
								placeholder="Duration (hours)"
								value={hours}
								onChange={(e) => onHoursChange(e.target.value)}
								className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]"
							/>
						</div>
					</>
				) : (
					<BookingAddressRow
						value={dropoffLocation}
						onChange={onDropoffChange}
						placeholder="Drop-off Location"
						iconColor="text-[#ff4a40]"
					/>
				)}

				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
					<div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
						<input
							type="date"
							min={today}
							value={date}
							onChange={(e) => onDateChange(e.target.value)}
							className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c] appearance-none"
						/>
					</div>
					<div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
						<FiClock className="text-[#8c8c8c] shrink-0 sm:hidden mr-2" size={18} />
						<input
							type="time"
							value={time}
							onChange={(e) => onTimeChange(e.target.value)}
							className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c] appearance-none"
						/>
					</div>
				</div>

				<div className="flex flex-row gap-3 sm:gap-4">
					<div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
						<FiUsers className="text-gray-400 shrink-0" size={18} />
						<input
							type="number"
							min="1"
							placeholder="Passengers"
							value={noOfPassengers}
							onChange={(e) => onPassengersChange(e.target.value)}
							className="ml-2 sm:ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]"
						/>
					</div>
					<div className="relative flex flex-1 items-center rounded-xl sm:rounded-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
						<FiBriefcase className="text-gray-400 shrink-0" size={18} />
						<input
							type="number"
							min="0"
							placeholder="Luggage"
							value={luggage}
							onChange={(e) => onLuggageChange(e.target.value)}
							className="ml-2 sm:ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]"
						/>
					</div>
				</div>
			</div>
		</ReservationAccordion>
	)
}
