import AccountEditFormActions from './AccountEditFormActions'

export default function PassengerEditForm({ formData, onInputChange, onSubmit, onClose, isSaving, saveError, saveSuccess }) {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
				<div className="space-y-4">
					<div>
						<label className="mb-2 block text-sm text-[#666]">First Name:</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={onInputChange}
							className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
						/>
					</div>
					<div>
						<label className="mb-2 block text-sm text-[#666]">Company Name:</label>
						<input
							type="text"
							name="companyName"
							value={formData.companyName}
							onChange={onInputChange}
							className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
						/>
					</div>
				</div>
				<div className="space-y-4">
					<div>
						<label className="mb-2 block text-sm text-[#666]">Last Name:</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={onInputChange}
							className="w-full rounded-full border border-gray-200 px-4 py-3 text-[15px] text-[#111] outline-none placeholder:text-gray-400 focus:border-[#1b2d5d]"
						/>
					</div>
					<div>
						<label className="mb-2 block text-sm text-[#666]">Email Address:</label>
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
				</div>
			</div>
			<AccountEditFormActions
				onClose={onClose}
				isSaving={isSaving}
				saveError={saveError}
				saveSuccess={saveSuccess}
				successMessage="Profile updated successfully!"
			/>
		</form>
	)
}
