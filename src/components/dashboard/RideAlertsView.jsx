import { FiBell, FiTrash2 } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { FiPlus } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import loadingvector from '../../assets/loadingvector.png'
import { AiOutlineFileProtect } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
function NotificationItem({ icon, title, description, isHighlighted, bgColor, iconColor, showDelete }) {
  return (
    <div
      className={`relative flex items-center justify-between rounded-[20px] p-5 mb-4 ${isHighlighted ? 'bg-[#d6def4]' : 'bg-transparent border-b border-gray-100 last:border-b-0'
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full ${bgColor} ${iconColor}`}>
          {icon}
        </div>
        <div>
          <h4 className="text-[17px] font-semibold text-[#111]">{title}</h4>
          <p className="text-sm text-[#666] mt-0.5">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Unread indicator */}
        <div className="h-2 w-2 rounded-full bg-[#1b2d5d]"></div>

        {/* Action Button (Delete) */}
        {showDelete && (
          <button className="flex h-12 w-10 items-center justify-center rounded-xl bg-[#ffe2de] text-[#ff4a40] transition hover:bg-red-100">
            <MdDelete size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function RideAlertsView() {
  return (
    <section className="rounded-xl bg-gray-50 flex-1">
      

      <div className="px-4 pb-8 sm:px-10 mt-6 max-w-[1000px]">
        {/* Today Section */}
        <div className="mb-8">
          <h3 className="mb-5 text-[17px] font-semibold text-[#111]">Today</h3>

          <NotificationItem
            icon={<FiBell size={22} />}
            title="Trip Booked successfull"
            description="Check the trip details below"
            isHighlighted={true}
            bgColor="bg-[#1b2d5d]"
            iconColor="text-white"
            showDelete={false}
          />

          <NotificationItem
            icon={<FiBell size={22} />}
            title="Trip Booked successful"
            description="Check the trip details below"
            isHighlighted={false}
            bgColor="bg-[#e4ebfc]"
            iconColor="text-[#1b2d5d]"
            showDelete={true}
          />
        </div>

        {/* Yesterday Section */}
        <div className="mb-8">
          <h3 className="mb-5 text-[17px] font-semibold text-[#111]">Yesterday</h3>

          <NotificationItem
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            }
            title="Lorem Ipsum Dolor"
            description="Check the trip details below"
            isHighlighted={false}
            bgColor="bg-[#ffe2de]"
            iconColor="text-[#ff4a40]"
            showDelete={false}
          />

          <NotificationItem
            icon={
              <img src={loadingvector} alt="" />
            }
            title="Lorem Ipsum Dolor"
            description="Check the trip details below"
            isHighlighted={false}
            bgColor="bg-[#dbf3e3]"
            iconColor="text-[#2b9f52]"
            showDelete={false}
          />
        </div>

        {/* Date Section */}
        <div>
          <h3 className="mb-5 text-[17px] font-semibold text-[#111]">June 22, 2025</h3>

          <NotificationItem
            icon={
              <AiOutlineFileProtect size={22} />
            }
            title="Lorem Ipsum Dolor"
            description="Check the trip details below"
            isHighlighted={false}
            bgColor="bg-[#FF81370D]"
            iconColor="text-[#FF8137]"
            showDelete={false}
          />

          <NotificationItem
            icon={
              <IoShieldCheckmarkSharp size={22} />
            }
            title="Lorem Ipsum Dolor"
            description="Check the trip details below"
            isHighlighted={false}
            bgColor="bg-[#fcf8e5]"
            iconColor="text-[#e2bc28]"
            showDelete={false}
          />
        </div>
      </div>
    </section>
  );
}
