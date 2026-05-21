import AccountEditFormActions from './AccountEditFormActions'

export default function AddressEditForm({ formData, onInputChange, onSubmit, onClose, isSaving, saveError, saveSuccess }) {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="flex flex-col gap-5 max-w-[500px] mx-auto">
				<div>
					<label className="mb-2 block text-sm text-[#666]">Location</label>
					<input
						type="text"
						name="location"
						value={formData.location}
						onChange={onInputChange}
						className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
					/>
				</div>
			</div>
			<AccountEditFormActions
				onClose={onClose}
				isSaving={isSaving}
				saveError={saveError}
				saveSuccess={saveSuccess}
				successMessage="Location updated successfully!"
			/>
		</form>
	)
}
