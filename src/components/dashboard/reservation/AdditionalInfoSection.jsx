import { FiChevronDown } from 'react-icons/fi'
import ReservationAccordion from './ReservationAccordion'

function ChildSeatSelect({ options }) {
	return (
		<div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 bg-white shadow-sm hover:border-[#1b2d5d] transition-colors overflow-hidden">
			<select className="w-full bg-transparent outline-none text-[#444] text-[13px] sm:text-[14px] appearance-none cursor-pointer py-2.5 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-xl sm:rounded-full h-full font-medium">
				{options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
			<FiChevronDown className="absolute right-3 sm:right-4 text-gray-500 pointer-events-none" />
		</div>
	)
}

export default function AdditionalInfoSection({ isOpen, onToggle }) {
	return (
		<ReservationAccordion title="Additional Information" isOpen={isOpen} onToggle={onToggle} contentClassName="p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gray-50/50">
			<div className="relative flex items-center rounded-xl sm:rounded-full border border-gray-200 px-4 py-2.5 sm:py-3 bg-white shadow-sm focus-within:border-[#1b2d5d]">
				<input type="text" placeholder="Flight Number" className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#222] outline-none placeholder:text-[#8c8c8c]" />
			</div>

			<div className="pt-3 sm:pt-4 border-t border-gray-200/60 mt-2">
				<label className="block text-[14px] sm:text-[15px] font-semibold text-[#111] mb-2 sm:mb-3">Child Seats:</label>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
					<ChildSeatSelect options={['0 Infant', '1 Infant', '2 Infant']} />
					<ChildSeatSelect options={['0 Toddler', '1 Toddler', '2 Toddler', '3 Toddler']} />
					<div className="col-span-2 sm:col-span-1">
						<ChildSeatSelect options={['0 Booster', '1 Booster', '2 Booster']} />
					</div>
				</div>
			</div>
		</ReservationAccordion>
	)
}
