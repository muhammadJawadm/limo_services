import { FiX } from 'react-icons/fi';
import { LuCar } from 'react-icons/lu';
import logouticon from '../../assets/logouticon.png'

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[400px] rounded-3xl bg-white p-8 text-center shadow-xl">
        <img src={logouticon} alt="Logout" className="mx-auto w-48" />

        <h3 className="mb-2 text-2xl font-semibold text-[#111111]">Log out</h3>
        <p className="mb-8 text-[#666666]">Are you sure you want to log out?</p>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-full bg-[#8c8c8c] py-3.5 text-base font-medium text-white transition-colors hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-[#ff4a40] py-3.5 text-base font-medium text-white transition-colors hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
