import { createPortal } from 'react-dom'
import group from '../../assets/groupofpop.png'

export default function HourlySwitchPopup({ isOpen, onSwitch, onClose }) {
	if (!isOpen) return null

	return createPortal(
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
			<div className="bg-white rounded-3xl shadow-2xl px-10 py-10 flex flex-col items-center max-w-sm w-full mx-4 relative">
				<div className="mb-5">
					<img src={group} alt="Group of People" className="w-36 h-24 object-contain" />
				</div>
				<h2 className="text-xl font-bold text-gray-900 mb-3 text-center">Switch to Hourly Ride</h2>
				<p className="text-gray-400 text-sm text-center leading-relaxed mb-7">
					You've added more than 4 stops. An hourly ride may be more suitable and cost-effective for your journey.
				</p>
				<button
					onClick={onSwitch}
					className="w-full bg-[#1a2b5e] text-white font-semibold py-4 rounded-full text-base hover:bg-[#253576] transition-colors"
				>
					Switch to Hourly
				</button>
			</div>
		</div>,
		document.body
	)
}
