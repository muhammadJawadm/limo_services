import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function ReservationAccordion({ title, isOpen, onToggle, children, contentClassName = 'p-4 sm:p-5 bg-gray-50/50' }) {
	return (
		<div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
			<button
				onClick={onToggle}
				className="flex w-full items-center justify-between bg-[#111] px-4 sm:px-5 py-3.5 text-white transition-colors hover:bg-black"
			>
				<h3 className="font-semibold text-base sm:text-lg tracking-wide">{title}</h3>
				{isOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
			</button>
			{isOpen && <div className={contentClassName}>{children}</div>}
		</div>
	)
}
