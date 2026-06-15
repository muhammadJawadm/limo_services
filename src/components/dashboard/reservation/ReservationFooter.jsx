export default function ReservationFooter({
	showPaymentForm,
	isBooking,
	bookingError,
	onBack,
	onSaveBooking,
}) {
	return (
		<>
			{bookingError && (
				<div className="border-t border-red-200 bg-red-50 px-4 sm:px-6 lg:px-8 py-3 text-sm text-red-600">
					{bookingError}
				</div>
			)}

			<div className="border-t border-gray-200 bg-white p-4 sm:px-6 sm:py-5 lg:px-8 z-10 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center xl:gap-6">
						<div className="flex items-center justify-between sm:justify-start gap-4">
							
						</div>

				
					</div>

					<div className="flex items-center justify-between gap-3 w-full sm:w-[350px] lg:w-[400px]">
						<button
							onClick={onBack}
							disabled={isBooking}
							className="flex-1 rounded-full border border-gray-300 bg-white py-3 sm:py-3.5 text-[15px] font-semibold text-[#444] shadow-sm transition-all hover:bg-gray-50 hover:text-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{showPaymentForm ? 'Back to Details' : 'Back'}
						</button>
						{!showPaymentForm ? (
							<button
								onClick={onSaveBooking}
								disabled={isBooking}
								className="flex-[1.5] rounded-full bg-[#1b2d5d] py-3 sm:py-3.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#132042] hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
							>
								{isBooking ? 'Saving...' : 'Save Booking'}
							</button>
						) : (
							<div className="flex-[1.5] rounded-full border border-dashed border-gray-300 py-3 sm:py-3.5 text-center text-[15px] font-semibold text-gray-500">
								Complete payment above
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
