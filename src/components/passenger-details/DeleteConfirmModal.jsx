import { TbAlertTriangle } from 'react-icons/tb';

export default function DeleteConfirmModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-3xl shadow-2xl mx-4 w-full max-w-sm px-8 py-8 flex flex-col items-center">

        {/* Warning icon with decorative dots */}
        <div className="relative flex items-center justify-center w-28 h-28 mb-4">
          <span className="absolute top-1 left-6 w-4 h-4 rounded-full bg-red-100" />
          <span className="absolute top-4 right-2 w-2.5 h-2.5 rounded-full bg-red-100" />
          <span className="absolute top-0 left-2 w-2 h-2 rounded-full bg-red-200" />
          <span className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-red-100" />
          <span className="absolute bottom-1 left-5 w-2 h-2 rounded-full bg-red-100" />
          <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-200 z-10">
            <TbAlertTriangle size={38} className="text-white" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Are you Sure?</h2>
        <p className="text-sm text-gray-400 text-center mb-7 leading-relaxed">
          Would you like to delete your child seats.<br />Do you want to continue?
        </p>

        <div className="flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-[#1a2b5e] text-white text-sm font-semibold hover:bg-[#253576] transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
