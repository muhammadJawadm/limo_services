import { Link } from 'react-router-dom'
import { LuUser } from 'react-icons/lu'
import { BsArrowLeft } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import logoImg from '../../../assets/navbarlogo.png'

export default function DriverProfileHeader({ onLogoutClick }) {
	return (
		<header className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 xl:px-12 h-16 md:h-20 flex items-center justify-between w-full">
			<div className="flex-shrink-0">
				<img src={logoImg} alt="Prvyn Services" className="h-8 md:h-10 object-contain" />
			</div>

			<div className="flex-shrink-0 flex justify-end sm:min-w-[150px] xl:min-w-[200px]">
				<div className="relative group">
					<button className="flex items-center gap-2 md:gap-3 bg-white border rounded-full py-2 px-3 md:py-2.5 md:px-5 hover:bg-gray-50 transition-colors shadow-sm">
						<LuUser className="text-gray-600" size={16} />
						<span className="text-[13px] md:text-[14px] font-medium text-gray-600 hidden sm:block">Profile</span>
						<FiChevronDown className="text-gray-400 sm:ml-1" />
					</button>

					<div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
						<Link to="/driver/onboarding" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 mb-1 cursor-pointer">
							<div className="w-2 h-2 rounded-full bg-gray-300"></div>
							<span className="text-[14px] text-gray-600">Onboarding Registration</span>
						</Link>
						<div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9fa] border border-gray-100 cursor-pointer">
							<LuUser className="text-[#1b2d5d]" size={18} />
							<span className="text-[14px] font-medium text-gray-800">My Profile</span>
						</div>
						<button
							onClick={onLogoutClick}
							className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer text-red-500 w-full"
						>
							<BsArrowLeft className="text-red-500" size={18} />
							<span className="text-[14px]">Logout</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}
