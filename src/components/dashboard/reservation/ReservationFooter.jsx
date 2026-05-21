export default function ReservationFooter({
	isReturnTrip,
	onReturnTripToggle,
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
							<div className="flex items-center gap-3 cursor-pointer group" onClick={onReturnTripToggle}>
								<div className="flex h-6 w-6 sm:h-[26px] sm:w-[26px] items-center justify-center rounded-full border-[1.5px] border-gray-400 group-hover:border-[#111] transition-colors overflow-hidden p-0.5 sm:p-[3px] bg-white">
									{isReturnTrip && <div className="h-full w-full bg-[#1b2d5d] rounded-full"></div>}
								</div>
								<span className="text-[16px] sm:text-[20px] font-semibold text-[#111] whitespace-nowrap">Return Trip</span>
							</div>
						</div>

						{isReturnTrip && (
							<div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-4 text-[#666] text-[14px] sm:text-[15px] font-medium sm:ml-6 xl:ml-0 lg:border-l lg:pl-6 border-gray-300">
								<span className="flex items-center gap-2.5">
									<div className="bg-blue-50/80 text-[#1b2d5d] p-1.5 rounded-md border border-[#1b2d5d]/10">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
									</div>
									<span className="text-[#333]">Pickup:</span>
									<span className="font-semibold text-[#111]">$450.00</span>
								</span>
								<span className="flex items-center gap-2.5">
									<div className="bg-blue-50/80 text-[#1b2d5d] p-1.5 rounded-md border border-[#1b2d5d]/10">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 8 9 12 5"></polyline><polyline points="12 19 8 15 12 19"></polyline><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
									</div>
									<span className="text-[#333]">Return:</span>
									<span className="font-semibold text-[#111]">$450.00</span>
								</span>
							</div>
						)}
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
