import { FiChevronDown, FiUser } from 'react-icons/fi'
import ReservationAccordion from './ReservationAccordion'
import SharedPhoneInput from '../../SharedPhoneInput'

export default function PassengerInfoSection({ isOpen, onToggle }) {
	return (
		<ReservationAccordion title="Passenger Information" isOpen={isOpen} onToggle={onToggle} contentClassName="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gray-50/50">
			<div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
				<FiUser className="text-gray-400 shrink-0" size={18} />
				<input type="text" placeholder="First Name" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
			</div>
			<div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
				<FiUser className="text-gray-400 shrink-0" size={18} />
				<input type="text" placeholder="Last Name" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
			</div>
			<div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d] transition-colors">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
				<input type="email" placeholder="Email" className="ml-3 w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] font-medium outline-none placeholder:text-[#8c8c8c]" />
			</div>
			<div className="w-full">
				<SharedPhoneInput />
			</div>
		</ReservationAccordion>
	)
}
