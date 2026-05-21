import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from './PrimaryButton'
import { createBookingStep1 } from '../services/bookingService'
import { hasAuthToken } from '../utils/authStorage'
import {
	normalizeBookingDate,
	normalizeBookingTime,
	normalizeHourlyDuration,
} from '../utils/bookingFormUtils'
import { persistBookingSession } from '../utils/bookingSession'
import HourlySwitchPopup from './booking-form/HourlySwitchPopup'
import PointToPointFields from './booking-form/PointToPointFields'
import HourlyFields from './booking-form/HourlyFields'

export default function BookingForm() {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState('point')
	const [pickupLocation, setPickupLocation] = useState('')
	const [stops, setStops] = useState([])
	const [stopLocations, setStopLocations] = useState([])
	const [dropoffLocation, setDropoffLocation] = useState('')
	const [dateValue, setDateValue] = useState('')
	const [timeValue, setTimeValue] = useState('')
	const [flightNumber, setFlightNumber] = useState('')
	const [showSwitchPopup, setShowSwitchPopup] = useState(false)
	const [hourlyDuration, setHourlyDuration] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState('')

	const handleGetQuote = async () => {
		if (isSubmitting) {
			return
		}

		setSubmitError('')

		if (activeTab === 'hourly') {
			const hoursValue = normalizeHourlyDuration(hourlyDuration)
			if (hoursValue === null) {
				setSubmitError('Please enter the number of hours for an hourly ride.')
				return
			}
		}

		setIsSubmitting(true)

		const mergedStops = [...stops, ...stopLocations]
			.map((stop) => stop.trim())
			.filter(Boolean)

		const payload = {
			type: activeTab === 'hourly' ? 'hourly' : 'ptop',
			pickupLocation: pickupLocation.trim(),
			stopLocations: mergedStops,
			dropoffLocation: dropoffLocation.trim(),
			date: normalizeBookingDate(dateValue.trim()),
			time: normalizeBookingTime(timeValue),
			flightNumber: flightNumber.trim(),
			isGuest: !hasAuthToken(),
		}

		if (activeTab === 'hourly') {
			payload.hours = normalizeHourlyDuration(hourlyDuration)
		}

		const result = await createBookingStep1(payload)

		if (!result?.success) {
			setSubmitError(result?.message || 'Failed to create booking draft.')
			setIsSubmitting(false)
			return
		}

		const bookingId = result?.data?.id || result?.data?._id || ''
		const bookingContext = {
			rideType: activeTab,
			hourlyDuration: activeTab === 'hourly' ? hourlyDuration.trim() : '',
			bookingId,
		}

		persistBookingSession({
			bookingId,
			bookingDraft: result?.data ?? null,
			bookingContext,
		})
		setIsSubmitting(false)
		navigate('/select-vehicle', { state: bookingContext })
	}

	const addStop = () => {
		if (stops.length >= 4) {
			setShowSwitchPopup(true)
		} else {
			setStops([...stops, ''])
		}
	}

	const removeStop = (i) => setStops(stops.filter((_, idx) => idx !== i))
	const updateStop = (index, value) => {
		setStops(stops.map((stop, idx) => (idx === index ? value : stop)))
	}
	const updateStopLocation = (index, value) => {
		setStopLocations((current) => {
			const nextStops = [...current]
			nextStops[index] = value
			return nextStops
		})
	}

	const sharedFieldProps = {
		pickupLocation,
		onPickupChange: setPickupLocation,
		stops,
		stopLocations,
		onAddStop: addStop,
		onRemoveStop: removeStop,
		onUpdateStop: updateStop,
		onUpdateStopLocation: updateStopLocation,
		dropoffLocation,
		onDropoffChange: setDropoffLocation,
		dateValue,
		onDateChange: setDateValue,
		timeValue,
		onTimeChange: setTimeValue,
		flightNumber,
		onFlightNumberChange: setFlightNumber,
	}

	return (
		<>
			<HourlySwitchPopup
				isOpen={showSwitchPopup}
				onSwitch={() => {
					setActiveTab('hourly')
					setShowSwitchPopup(false)
				}}
				onClose={() => setShowSwitchPopup(false)}
			/>

			<div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm">
				<div className="flex">
					<button
						onClick={() => setActiveTab('point')}
						className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === 'point'
							? 'bg-[#1a2b5e] text-white'
							: 'bg-gray-100 text-gray-400 hover:bg-gray-200'
							}`}
					>
						Point-to-Point
					</button>
					<button
						onClick={() => setActiveTab('hourly')}
						className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === 'hourly'
							? 'bg-[#1a2b5e] text-white'
							: 'bg-gray-100 text-gray-400 hover:bg-gray-200'
							}`}
					>
						Hourly
					</button>
				</div>

				<div className="bg-gray-50 p-1 md:p-5 space-y-3">
					{activeTab === 'point' ? (
						<PointToPointFields {...sharedFieldProps} />
					) : (
						<HourlyFields
							{...sharedFieldProps}
							hourlyDuration={hourlyDuration}
							onHourlyDurationChange={setHourlyDuration}
							onSameAsPickup={() => setDropoffLocation(pickupLocation)}
						/>
					)}

					<div className="mt-2">
						{submitError ? (
							<p className="text-sm text-red-500 text-center mb-3">{submitError}</p>
						) : null}
						<PrimaryButton
							fullWidth
							size="lg"
							className="tracking-wide mb-1 mt-5 bg-primary"
							onClick={handleGetQuote}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Creating Draft...' : 'Get Quote'}
						</PrimaryButton>
					</div>
				</div>
			</div>
		</>
	)
}
