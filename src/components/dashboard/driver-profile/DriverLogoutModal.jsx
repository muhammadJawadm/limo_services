import redstarbg from '../../../assets/redstarbg.png'

export default function DriverLogoutModal({ isOpen, onCancel, onConfirm }) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
			<div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center shadow-2xl">
				<img className="mx-auto mb-6" src={redstarbg} alt="" />
				<h3 className="text-[22px] font-bold text-[#111] mb-2">Log out</h3>
				<p className="text-[14px] text-gray-400 mb-8">Are you sure you want to log out?</p>
				<div className="flex gap-3">
					<button
						onClick={onCancel}
						className="flex-1 py-3.5 rounded-full bg-gray-500 text-white text-[15px] font-medium hover:bg-gray-600 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 py-3.5 rounded-full bg-red-500 text-white text-[15px] font-medium hover:bg-red-600 transition-colors"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	)
}
