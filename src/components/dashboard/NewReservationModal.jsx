import { useEffect, useMemo, useState } from 'react'
import { getStripePromise } from '../../config/stripe'
import { resolveBookingEntityId } from '../../utils/bookingId'
import BookingSuccessModal from './BookingSuccessModal'
import { getVehicleCategories } from '../../services/vehicleCategoryService'
import { createFullBooking } from '../../services/bookingService'
import { createPaymentIntent } from '../../services/paymentService'
import { buildReservationPayload } from './reservation/reservationPayload'
import TripDetailsSection from './reservation/TripDetailsSection'
import AdditionalInfoSection from './reservation/AdditionalInfoSection'
import VehicleInfoSection from './reservation/VehicleInfoSection'
// import PassengerInfoSection from './reservation/PassengerInfoSection'
import PaymentInfoSection from './reservation/PaymentInfoSection'
import ReservationFooter from './reservation/ReservationFooter'

export default function NewReservationModal({ isOpen, onClose }) {
	const [isReturnTrip, setIsReturnTrip] = useState(false)
	const [tripType, setTripType] = useState('ptop')
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [vehicleCategories, setVehicleCategories] = useState([])
	const [isLoadingVehicles, setIsLoadingVehicles] = useState(false)
	const [isBooking, setIsBooking] = useState(false)
	const [bookingError, setBookingError] = useState('')
	const [paymentClientSecret, setPaymentClientSecret] = useState('')
	const [paymentBookingId, setPaymentBookingId] = useState('')
	const [paymentBookingDetails, setPaymentBookingDetails] = useState(null)
	const [showPaymentForm, setShowPaymentForm] = useState(false)
	const [specialInstructions, setSpecialInstructions] = useState('')

	const stripePromise = useMemo(() => getStripePromise(), [])

	const [openSections, setOpenSections] = useState({
		tripDetails: true,
		additionalInfo: true,
		vehicleInfo: true,
		cardInfo: true,
	})

	const [stops, setStops] = useState([])
	const [selectedVehicleId, setSelectedVehicleId] = useState(null)

	const [pickupLocation, setPickupLocation] = useState('')
	const [dropoffLocation, setDropoffLocation] = useState('')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [noOfPassengers, setNoOfPassengers] = useState(3)
	const [luggage, setLuggage] = useState(0)
	const [hours, setHours] = useState('')

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const loadVehicleCategories = async () => {
			setIsLoadingVehicles(true)
			setBookingError('')
			const result = await getVehicleCategories()
			if (result?.success) {
				const categories = result?.data ?? []
				setVehicleCategories(categories)
				if (categories.length > 0) {
					setSelectedVehicleId(categories[0].id || categories[0]._id)
				}
			} else {
				setBookingError(result?.message || 'Failed to load vehicle categories.')
			}
			setIsLoadingVehicles(false)
		}

		loadVehicleCategories()
	}, [isOpen])

	if (!isOpen) return null

	const resetReservationState = () => {
		setIsReturnTrip(false)
		setTripType('ptop')
		setIsSuccessModalOpen(false)
		setBookingError('')
		setPaymentClientSecret('')
		setPaymentBookingId('')
		setPaymentBookingDetails(null)
		setShowPaymentForm(false)
		setStops([])
		setSpecialInstructions('')
		setPickupLocation('')
		setDropoffLocation('')
		setDate('')
		setTime('')
		setNoOfPassengers(3)
		setLuggage(0)
		setHours('')
		if (vehicleCategories.length > 0) {
			setSelectedVehicleId(vehicleCategories[0].id || vehicleCategories[0]._id)
		} else {
			setSelectedVehicleId(null)
		}
	}

	const handleCloseModal = () => {
		resetReservationState()
		onClose()
	}

	const toggleSection = (section) => {
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
	}

	const handleAddStop = () => {
		setStops([...stops, { id: Date.now(), value: '' }])
	}

	const handleRemoveStop = (idToRemove) => {
		setStops(stops.filter((stop) => stop.id !== idToRemove))
	}

	const handleUpdateStop = (id, value) => {
		setStops((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)))
	}

	const handleSaveBooking = async () => {
		setBookingError('')

		const bookingPayload = buildReservationPayload({
			tripType,
			selectedVehicleId,
			specialInstructions,
			pickupLocation,
			dropoffLocation,
			stopLocations: stops.map((s) => s.value).filter(Boolean),
			date,
			time,
			noOfPassengers,
			luggage,
			hours,
		})

		if (!bookingPayload.pickupLocation || !bookingPayload.dropoffLocation || !bookingPayload.date || !bookingPayload.time || !bookingPayload.vehicleCategoryId) {
			setBookingError('Please fill in all required fields')
			return
		}

		if (tripType === 'hourly' && !bookingPayload.hours) {
			setBookingError('Please specify duration for hourly trip')
			return
		}

		setIsBooking(true)
		const bookingResult = await createFullBooking(bookingPayload)
		if (!bookingResult?.success) {
			setIsBooking(false)
			setBookingError(bookingResult?.message || 'Failed to create booking.')
			return
		}

		const createdBooking = bookingResult?.data ?? bookingResult?.raw?.data ?? bookingResult?.raw ?? {}
		const bookingId = resolveBookingEntityId(createdBooking)
		if (!bookingId) {
			setIsBooking(false)
			setBookingError('Booking saved, but payment setup could not be initialized.')
			return
		}

		const paymentResult = await createPaymentIntent(bookingId);

		if (!paymentResult?.success) {
			setIsBooking(false)
			setBookingError(paymentResult?.message || 'Failed to initialize payment.')
			return
		}

		setPaymentBookingId(bookingId)
		setPaymentBookingDetails({ ...bookingPayload, ...createdBooking, id: bookingId })
		setPaymentClientSecret(paymentResult?.data?.clientSecret || '')
		setShowPaymentForm(true)
		setIsBooking(false)
	}

	const handlePaymentSuccess = (updatedBooking) => {
		setPaymentBookingDetails(updatedBooking)
		setIsSuccessModalOpen(true)
	}

	const handleBackToDetails = () => {
		setShowPaymentForm(false)
		setPaymentClientSecret('')
		setPaymentBookingId('')
		setBookingError('')
	}

	return (
		<>
			<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-0 sm:p-4 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				<div className="relative flex h-full sm:h-[90vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-none sm:rounded-[30px] bg-[#fafafa] shadow-2xl animate-in fade-in zoom-in duration-200">
					<div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
						<div className="flex items-center justify-between sm:hidden mb-4 px-2">
							<h2 className="text-xl font-bold text-[#111]">New Reservation</h2>
						</div>
						<div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
							<div className="space-y-5 lg:space-y-6">
								<TripDetailsSection
									isOpen={openSections.tripDetails}
									onToggle={() => toggleSection('tripDetails')}
									tripType={tripType}
									onTripTypeChange={setTripType}
									stops={stops}
									onAddStop={handleAddStop}
									onRemoveStop={handleRemoveStop}
									onUpdateStop={handleUpdateStop}
									pickupLocation={pickupLocation}
									onPickupChange={setPickupLocation}
									dropoffLocation={dropoffLocation}
									onDropoffChange={setDropoffLocation}
									date={date}
									onDateChange={setDate}
									time={time}
									onTimeChange={setTime}
									noOfPassengers={noOfPassengers}
									onPassengersChange={setNoOfPassengers}
									luggage={luggage}
									onLuggageChange={setLuggage}
									hours={hours}
									onHoursChange={setHours}
								/>
								<AdditionalInfoSection
									isOpen={openSections.additionalInfo}
									onToggle={() => toggleSection('additionalInfo')}
								/>
							</div>

							<div className="space-y-5 lg:space-y-6">
								<VehicleInfoSection
									isOpen={openSections.vehicleInfo}
									onToggle={() => toggleSection('vehicleInfo')}
									isLoadingVehicles={isLoadingVehicles}
									vehicleCategories={vehicleCategories}
									selectedVehicleId={selectedVehicleId}
									onSelectVehicle={setSelectedVehicleId}
								/>
								<PaymentInfoSection
									isOpen={openSections.cardInfo}
									onToggle={() => toggleSection('cardInfo')}
									showPaymentForm={showPaymentForm}
									stripePromise={stripePromise}
									paymentClientSecret={paymentClientSecret}
									paymentBookingId={paymentBookingId}
									paymentBookingDetails={paymentBookingDetails}
									onPaymentSuccess={handlePaymentSuccess}
								/>
							</div>
						</div>

						<div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus-within:border-[#1b2d5d] transition-colors">
							<label className="block text-[14px] sm:text-[15px] font-semibold text-[#111] mb-2 px-1">Special Instructions:</label>
							<textarea
								className="h-[80px] sm:h-[100px] w-full resize-none bg-transparent text-[14px] sm:text-[15px] text-[#222] p-2 outline-none placeholder:text-[#8c8c8c]"
								placeholder="Specific Priority for this passenger Notes..."
								value={specialInstructions}
								onChange={(e) => setSpecialInstructions(e.target.value)}
							/>
						</div>
					</div>

					<ReservationFooter
						isReturnTrip={isReturnTrip}
						onReturnTripToggle={() => setIsReturnTrip(!isReturnTrip)}
						showPaymentForm={showPaymentForm}
						isBooking={isBooking}
						bookingError={bookingError}
						onBack={showPaymentForm ? handleBackToDetails : handleCloseModal}
						onSaveBooking={handleSaveBooking}
					/>
				</div>
			</div>

			<BookingSuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseModal} bookingId={paymentBookingDetails?.id}  />
		</>
	)
}
