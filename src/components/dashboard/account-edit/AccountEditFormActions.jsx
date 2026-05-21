export default function AccountEditFormActions({ onClose, isSaving, saveError, saveSuccess, successMessage }) {
	return (
		<>
			{saveError && <div className="text-red-600 text-sm">{saveError}</div>}
			{saveSuccess && <div className="text-green-600 text-sm">{successMessage}</div>}
			<div className="flex items-center gap-4 px-2 max-w-[500px] mx-auto">
				<button
					type="button"
					onClick={onClose}
					className="flex-1 rounded-full bg-gray-500 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-gray-600"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSaving}
					className="flex-1 rounded-full bg-[#1b2d5d] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#132042] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSaving ? 'Saving...' : 'Update'}
				</button>
			</div>
		</>
	)
}
