import AccountEditFormActions from './AccountEditFormActions'
import SharedPhoneInput from '../../SharedPhoneInput'

export default function ContactEditForm({ formData, onInputChange, onSubmit, onClose, isSaving, saveError, saveSuccess }) {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="flex flex-col gap-5 max-w-[500px] mx-auto">
				<div>
					<label className="mb-2 block text-sm text-[#666]">Email Address</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={onInputChange}
						disabled
						className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#999] outline-none placeholder:text-gray-400 bg-gray-50 cursor-not-allowed"
					/>
					<p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
				</div>
				<div>
					<label className="mb-2 block text-sm text-[#666]">Phone Number</label>
					<SharedPhoneInput
						value={formData.phone}
						onChange={onInputChange}
					/>
				</div>
			</div>
			<AccountEditFormActions
				onClose={onClose}
				isSaving={isSaving}
				saveError={saveError}
				saveSuccess={saveSuccess}
				successMessage="Contact updated successfully!"
			/>
		</form>
	)
}
