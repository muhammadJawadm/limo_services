import { BsTrash, BsCheck2, BsAirplane } from 'react-icons/bs'
import { LuCalendarDays, LuClock3 } from 'react-icons/lu'
import BookingAddressRow from './BookingAddressRow'

export default function PointToPointFields({
	pickupLocation,
	onPickupChange,
	stops,
	stopLocations,
	onAddStop,
	onRemoveStop,
	onUpdateStop,
	onUpdateStopLocation,
	dropoffLocation,
	onDropoffChange,
	dateValue,
	onDateChange,
	timeValue,
	onTimeChange,
	flightNumber,
	onFlightNumberChange,
}) {
	const today = new Date().toISOString().split('T')[0];
	return (
		<>
			<BookingAddressRow
				value={pickupLocation}
				onChange={onPickupChange}
				placeholder="Pickup Location"
				iconColor="text-green-500"
				actions={
					<button
						onClick={onAddStop}
						className="flex items-center gap-1.5 bg-[#1a2b5e] text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#253576] transition-colors"
					>
						<span className="text-base leading-none">+</span> Add Stop
					</button>
				}
			/>

			{stops.map((stop, i) => (
				<div key={i} className="flex items-center gap-2">
					<BookingAddressRow
						className="flex-1"
						value={stop}
						onChange={(val) => onUpdateStop(i, val)}
						placeholder="Stop address"
						iconColor="text-yellow-500"
					/>
					<button
						onClick={() => onRemoveStop(i)}
						className="w-11 h-11 flex items-center justify-center bg-red-100 text-red-500 rounded-full flex-shrink-0 hover:bg-red-200 transition-colors"
					>
						<BsTrash size={16} />
					</button>
				</div>
			))}

			{stopLocations.map((sl, i) => (
				<div key={i} className="flex items-center gap-2">
					<BookingAddressRow
						className="flex-1"
						value={sl}
						onChange={(val) => onUpdateStopLocation(i, val)}
						placeholder="Stop Location"
						iconColor="text-gray-400"
					/>
					<button className="w-11 h-11 flex items-center justify-center bg-yellow-500 text-white rounded-full flex-shrink-0 hover:bg-yellow-600 transition-colors">
						<BsCheck2 size={18} />
					</button>
				</div>
			))}

			<BookingAddressRow
				value={dropoffLocation}
				onChange={onDropoffChange}
				placeholder="Drop-off address"
				iconColor="text-red-400"
			/>

			<div className="flex gap-3">
				<div className="flex items-center bg-white rounded-full px-4 py-4 shadow-sm gap-2 flex-1">
					<label htmlFor="point-date" className="text-gray-400 flex-shrink-0 cursor-pointer">
						<LuCalendarDays size={16} />
					</label>
					<input
						id="point-date"
						type="date"
						min={today}
						placeholder="dd----YYYY"
						value={dateValue}
						onChange={(e) => onDateChange(e.target.value)}
						className="flex-1 text-xs outline-none bg-transparent placeholder-gray-400 text-gray-700 w-0"
					/>
				</div>
				<div className="flex items-center bg-white rounded-full px-4 py-4 shadow-sm gap-2 flex-1">
					<label htmlFor="point-time" className="text-gray-400 flex-shrink-0 cursor-pointer">
						<LuClock3 size={16} />
					</label>
					<input
						id="point-time"
						type="time"
						min={today}
						placeholder="12:11 pm"
						value={timeValue}
						onChange={(e) => onTimeChange(e.target.value)}
						className="flex-1 text-xs outline-none bg-transparent placeholder-gray-400 text-gray-700 w-0"
					/>
				</div>
			</div>

			<div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-3">
				<BsAirplane className="text-gray-400 flex-shrink-0" size={16} />
				<input
					type="text"
					placeholder="Flight Number (Option)"
					value={flightNumber}
					onChange={(e) => onFlightNumberChange(e.target.value)}
					className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
				/>
			</div>
		</>
	)
}
