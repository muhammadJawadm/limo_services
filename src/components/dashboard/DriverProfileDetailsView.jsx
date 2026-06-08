import { useMemo, useState, useEffect } from 'react';
import SharedPhoneInput from '../SharedPhoneInput';
import testpdf from '../../assets/testpdf.pdf';
import { FaRegEnvelope } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { FiCheck } from 'react-icons/fi';
import whitewallet from '../../assets/whitewallet.png';
import { useDriverStore } from '../../stores/driverStore';
import { updateOnboardingStep, updateDriverProfile } from '../../services/driverService';
import {
  CHAUFFEUR_DOC_DEFS,
  COMPANY_DOC_DEFS,
  PROFILE_TABS,
  SCHEDULE_DAY_KEY_MAP,
  SCHEDULE_DAYS,
  VEHICLE_DOC_DEFS,
} from './driver-profile/constants';
import {
  EditBar,
  Field,
  RadioGroup,
  ToggleSwitch,
} from './driver-profile/ProfileFormFields';
import { DocumentTable } from './driver-profile/ProfileDocuments';
import ProfileToast from './driver-profile/ProfileToast';
import { mapProfileLocalData } from './driver-profile/mapProfileLocalData';
import { buildPersonalInfoPayload, getOnboardingSaveEntry } from './driver-profile/profileSaveHandlers';

export default function DriverProfileDetailsView() {
    const onboarding = useDriverStore((s) => s.onboarding);
    const profile = useDriverStore((s) => s.profile);
    const fetchOnboarding = useDriverStore((s) => s.fetchOnboarding);
    const fetchProfile = useDriverStore((s) => s.fetchProfile);
    const isOnboardingLoading = useDriverStore((s) => s.isOnboardingLoading);
    const [activeTab, setActiveTab] = useState('Personal Info');
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editData, setEditData] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'success' });

    useEffect(() => {
        fetchOnboarding();
        fetchProfile();
    }, [fetchOnboarding, fetchProfile]);

    const storeData = useMemo(
        () => (onboarding ? mapProfileLocalData(onboarding, profile) : null),
        [onboarding, profile],
    );

    const localData = editing ? editData : storeData;

    const set = (key, value) => setEditData((prev) => ({ ...prev, [key]: value }));
    const setNested = (group, key, value) =>
        setEditData((prev) => ({ ...prev, [group]: { ...prev[group], [key]: value } }));

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
    };

    const handleEdit = () => {
        setEditData(storeData);
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    // Build and send the payload for the current tab
    const handleSave = async () => {
        if (!localData) return;
        setSaving(true);

        if (activeTab === 'Personal Info') {
            const result = await updateDriverProfile(buildPersonalInfoPayload(localData));
            setSaving(false);

            if (result.success) {
                setEditing(false);
                showToast('Saved successfully!', 'success');
                fetchProfile();
            } else {
                showToast(result.message || 'Save failed. Please try again.', 'error');
            }
            return;
        }

        const entry = getOnboardingSaveEntry(activeTab, localData);
        if (!entry) {
            setSaving(false);
            setEditing(false);
            return;
        }

        const result = await updateOnboardingStep(entry.slug, entry.payload);
        setSaving(false);

        if (result.success) {
            setEditing(false);
            showToast('Saved successfully!', 'success');
            fetchOnboarding(); // refresh store
        } else {
            showToast(result.message || 'Save failed. Please try again.', 'error');
        }
    };

    // ── LOADING STATE ──────────────────────────────────────────────────────────
    if (isOnboardingLoading || !localData) {
        return (
            <section className="bg-gray-50/50 flex-1 flex flex-col">
                <div className="mb-3 flex flex-col gap-3 bg-[#EAEAEA] px-6 py-4 sm:px-10">
                    <h2 className="text-2xl font-semibold">View Details</h2>
                </div>
                <div className="flex-1 flex items-center justify-center text-[14px] text-gray-400">
                    Loading profile details...
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gray-50/50 flex-1 flex flex-col">
            <ProfileToast message={toast.message} type={toast.type} />

            <div className="mb-3 flex flex-col gap-3 bg-[#EAEAEA] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <h2 className="text-2xl font-semibold">View Details</h2>
            </div>

            <div className="px-4 pb-12 sm:px-8 flex-1">
                {/* Tabs */}
                <div className="mb-8 flex overflow-x-auto overflow-y-hidden bg-white rounded-xl shadow-sm sticky top-0 z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max items-center">
                        {PROFILE_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setEditing(false); }}
                                className={`px-6 py-4 whitespace-nowrap text-[14px] font-medium transition-colors
                                    ${activeTab === tab ? 'bg-[#1b2d5d] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="w-full max-w-[850px]">

                    {/* ── PERSONAL INFO ─────────────────────────────────────── */}
                    {activeTab === 'Personal Info' && (
                        <div className="gap-y-7">
                            <div className="mb-6">
                                <Field label="Address" value={localData.location} editing={editing}
                                    onChange={(v) => set('location', v)}
                                    icon={<CiUser className="w-5 h-5" />} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">

                                <Field label="First Name" value={localData.firstName} editing={editing}
                                    onChange={(v) => set('firstName', v)}
                                    icon={<CiUser className="w-5 h-5" />} />
                                <Field label="Last Name" value={localData.lastName} editing={editing}
                                    onChange={(v) => set('lastName', v)}
                                    icon={<CiUser className="w-5 h-5" />} />
                                <Field label="Email Address" value={localData.email} 
                                    icon={<FaRegEnvelope className="w-5 h-5 opacity-60" />} />
                                <div className="w-full">
                                    <label className="block text-[14px] text-gray-700 mb-2">Phone Number</label>
                                    <div className={editing ? "" : "pointer-events-none opacity-80"}>
                                        <SharedPhoneInput
                                            value={localData.phone}
                                            onChange={(e) => set('phone', e.target.value)}
                                            className={editing ? "" : "bg-gray-50 border-gray-100"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}

                    {/* ── COMPANY INFO ──────────────────────────────────────── */}
                    {activeTab === 'Company Info' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">Company Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                                <Field label="Company Name" value={localData.companyName} editing={editing}
                                    onChange={(v) => set('companyName', v)} />
                                <Field label="Company Type (Legal Form)" value={localData.companyType} editing={editing}
                                    onChange={(v) => set('companyType', v)} />
                            </div>

                            <h3 className="text-[18px] text-[#111] font-medium mt-10 mb-6">Company Address</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                                <Field label="Country" value={localData.country} editing={editing}
                                    onChange={(v) => set('country', v)} />
                                <Field label="Street" value={localData.street} editing={editing}
                                    onChange={(v) => set('street', v)} />
                                <Field label="Zip / Postal Code" value={localData.zipCode} editing={editing}
                                    onChange={(v) => set('zipCode', v)} />
                                <Field label="City" value={localData.city} editing={editing}
                                    onChange={(v) => set('city', v)} />
                                <Field label="State / Province" value={localData.stateProvince} editing={editing}
                                    onChange={(v) => set('stateProvince', v)} />
                                <Field label="Tax Identification Number" value={localData.taxId} editing={editing}
                                    onChange={(v) => set('taxId', v)} />
                                <Field label="Business Registration Number" value={localData.businessRegistration} editing={editing}
                                    onChange={(v) => set('businessRegistration', v)} />
                            </div>
                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}

                    {/* ── FLEET INFO ────────────────────────────────────────── */}
                    {activeTab === 'Fleet Info' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">Fleet Information</h3>
                            <div className="space-y-6">
                                <RadioGroup label="Do you have Prior Limo Services Experience?"
                                    value={localData.priorLimoExperience} editing={editing}
                                    onChange={(v) => set('priorLimoExperience', v === 'yes')} />
                                <RadioGroup label="Do you have electric vehicles in your fleet?"
                                    value={localData.electricVehicleFleet} editing={editing}
                                    onChange={(v) => set('electricVehicleFleet', v === 'yes')} />
                                <RadioGroup label="Do you have female chauffeurs?"
                                    value={localData.femaleChauffeurs} editing={editing}
                                    onChange={(v) => set('femaleChauffeurs', v === 'yes')} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 mt-8">
                                <Field label="How many chauffeurs do you have?" value={String(localData.numberOfChauffeurs ?? '')}
                                    editing={editing} onChange={(v) => set('numberOfChauffeurs', v)} type="number" />
                                <Field label="How many first class vehicles?" value={String(localData.numberOfFirstClassVehicles ?? '')}
                                    editing={editing} onChange={(v) => set('numberOfFirstClassVehicles', v)} type="number" />
                                <Field label="How many business class vans?" value={String(localData.numberOfBusinessClassVans ?? '')}
                                    editing={editing} onChange={(v) => set('numberOfBusinessClassVans', v)} type="number" />
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-[14px] text-gray-700 mb-2">Describe the vehicles in your fleet</label>
                                    <textarea
                                        readOnly={!editing}
                                        value={localData.businessClassVansDescription}
                                        onChange={editing ? (e) => set('businessClassVansDescription', e.target.value) : undefined}
                                        className={`w-full rounded-[24px] border p-5 text-[14px] text-gray-800 outline-none min-h-[140px] resize-none transition-colors
                                            ${editing ? 'border-[#1b2d5d] focus:ring-2 focus:ring-[#1b2d5d]/20' : 'border-gray-100 bg-white cursor-default'}`}
                                    />
                                </div>
                            </div>
                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}

                    {/* ── CHAUFFEUR INFO ────────────────────────────────────── */}
                    {activeTab === 'Chauffeur Info' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">First Chauffeur Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <Field label="First Name" value={localData.chauffeurFirstName} editing={editing}
                                    onChange={(v) => set('chauffeurFirstName', v)} />
                                <Field label="Last Name" value={localData.chauffeurLastName} editing={editing}
                                    onChange={(v) => set('chauffeurLastName', v)} />
                                <Field label="Email" value={localData.chauffeurEmail} editing={editing}
                                    onChange={(v) => set('chauffeurEmail', v)} type="email" />
                                <div className="w-full">
                                    <label className="block text-[14px] text-gray-700 mb-2">Mobile Phone</label>
                                    <div className={editing ? "" : "pointer-events-none opacity-80"}>
                                        <SharedPhoneInput
                                            value={localData.chauffeurPhone}
                                            onChange={(e) => set('chauffeurPhone', e.target.value)}
                                            className={editing ? "" : "bg-gray-50 border-gray-100"}
                                        />
                                    </div>
                                </div>
                                <Field label="Driver License ID" value={localData.driverLicenseId} editing={editing}
                                    onChange={(v) => set('driverLicenseId', v)} />
                            </div>
                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}

                    {/* ── VEHICLE INFO ──────────────────────────────────────── */}
                    {activeTab === 'Vehicle Info' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">First Vehicle Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <Field label="Year of Manufacture" value={localData.vehicleYear} editing={editing}
                                    onChange={(v) => set('vehicleYear', v)} />
                                <Field label="Brand & Model" value={localData.vehicleBrand} editing={editing}
                                    onChange={(v) => set('vehicleBrand', v)} />
                                <Field label="Vehicle Class" value={localData.vehicleClass} editing={editing}
                                    onChange={(v) => set('vehicleClass', v)} />
                                <Field label="Color" value={localData.vehicleColor} editing={editing}
                                    onChange={(v) => set('vehicleColor', v)} />
                                <Field label="Passenger Capacity" value={String(localData.passengerCapacity ?? '')}
                                    editing={editing} onChange={(v) => set('passengerCapacity', v)} type="number" />
                                <Field label="Luggage Capacity" value={String(localData.luggageCapacity ?? '')}
                                    editing={editing} onChange={(v) => set('luggageCapacity', v)} type="number" />
                                <RadioGroup label="Wi-Fi Available?" value={localData.wifi} editing={editing}
                                    onChange={(v) => set('wifi', v === 'yes')} />
                                <RadioGroup label="Smoking Allowed?" value={localData.smokingAllowed} editing={editing}
                                    onChange={(v) => set('smokingAllowed', v === 'yes')} />
                                <Field label="License Number Plate" value={localData.vehicleNumberPlate} editing={editing}
                                    onChange={(v) => set('vehicleNumberPlate', v)} />
                                <Field label="Vehicle VIN" value={localData.vehicleVIN} editing={editing}
                                    onChange={(v) => set('vehicleVIN', v)} />
                            </div>
                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}

                    {/* ── REQUIRED DOCUMENTS ────────────────────────────────── */}
                    {activeTab === 'Required Document' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Company Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-4">Company documents for {localData.companyName || '—'}:</p>
                            <DocumentTable docs={COMPANY_DOC_DEFS} docData={localData.docs} />

                            <h3 className="text-[18px] text-[#111] font-medium mb-1 mt-8">Chauffeur Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-4">Chauffeur documents for {localData.chauffeurFirstName} {localData.chauffeurLastName}:</p>
                            <DocumentTable docs={CHAUFFEUR_DOC_DEFS} docData={localData.docs} />

                            <h3 className="text-[18px] text-[#111] font-medium mb-1 mt-8">Vehicle Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-4">Vehicle documents for {localData.vehicleBrand} ({localData.vehicleNumberPlate || '—'}):</p>
                            <DocumentTable docs={VEHICLE_DOC_DEFS} docData={localData.docs} />
                        </div>
                    )}

                    {/* ── PARTNER TRAINING ──────────────────────────────────── */}
                    {activeTab === 'Partner Training' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Partner Training</h3>
                            <p className="text-[14px] text-[#111] font-medium mb-4">
                                You have completed {localData.trainingCompleted} out of {localData.trainingTotal} modules
                            </p>

                            <div className="w-full overflow-x-auto border border-gray-100 rounded-xl shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-2">
                                <div className="min-w-[650px] bg-white">
                                    <div className="flex items-center justify-between bg-black text-white px-6 py-4 text-[14px] font-medium">
                                        <div className="w-20 shrink-0">Module #</div>
                                        <div className="flex-[2] min-w-[200px] pr-4">Training Module</div>
                                        <div className="w-48 shrink-0 text-right">Progress</div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {localData.training.map((mod) => (
                                            <div key={mod.moduleNumber} className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                                                <div className="w-20 shrink-0 text-[14px] text-gray-400">{mod.moduleNumber}</div>
                                                <div className="flex-[2] min-w-[200px] pr-4 text-[14px] text-gray-500 font-light">
                                                    {mod.moduleNumber}. {mod.title}
                                                </div>
                                                <div className="w-48 shrink-0 text-right text-[14px] text-[#1b2d5d] font-medium">
                                                    {mod.progressPercentage ?? 0}%
                                                    {mod.completed && <FiCheck className="inline ml-2 text-green-500" size={14} />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PARTNER CONTRACT ──────────────────────────────────── */}
                    {activeTab === 'Partner Contract' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Partner Contract</h3>
                            <p className="text-[13px] text-gray-400 mb-6">Review the contract and accept your contractual agreement.</p>

                            <div className="w-full bg-[#323639] rounded-lg overflow-hidden flex flex-col h-[600px] border border-gray-200">
                                <iframe src={testpdf} title="Partner Contract" className="w-full h-full" style={{ border: 'none' }}>
                                    <p>Your browser does not support PDFs. <a href={testpdf}>Download the PDF</a>.</p>
                                </iframe>
                            </div>

                            <div className="pt-4 mb-8">
                                <a href={testpdf} download className="text-[14px] text-[#1b2d5d] hover:underline">
                                    Click here to download a copy of your contractual agreement.
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <Field label="Place" value={localData.contractPlace} editing={editing}
                                    onChange={(v) => set('contractPlace', v)} />
                            </div>

                            <div className="mt-6 flex items-start gap-3 ml-1 mb-6">
                                <input
                                    type="checkbox"
                                    checked={localData.contractAgreed}
                                    disabled={!editing}
                                    onChange={editing ? (e) => set('contractAgreed', e.target.checked) : undefined}
                                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d] cursor-pointer disabled:cursor-default"
                                />
                                <label className="text-[14px] text-gray-400 leading-relaxed">
                                    I have reviewed and agree to the local service provider U.S General Terms and Conditions
                                </label>
                            </div>

                            {localData.contractAgreed && (
                                <p className="text-[14px] text-[#111] font-medium">
                                    By clicking Agree, you hereby accept the terms of the partner agreement and have provided a digital signature for the contract.
                                </p>
                            )}

                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}

                    {/* ── PAYMENT DETAILS ───────────────────────────────────── */}
                    {activeTab === 'Payment Details' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">Payment Details</h3>
                            <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-start gap-4 mb-5 shadow-sm max-w-xl">
                                <div className="w-10 h-10 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white mt-0.5">
                                    <img src={whitewallet} alt="wallet" className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[15px] font-medium text-[#111]">Stripe Account</div>
                                    <div className="text-[13px] text-gray-400">Secure payment processing</div>
                                </div>
                            </div>
                            
                            <p className="text-[13px] text-gray-400 mt-4">
                                Onboarding status: <span className={`font-medium ${onboarding?.stripeOnboarded ? 'text-green-600' : 'text-red-500'}`}>
                                    {onboarding?.stripeOnboarded ? 'Onboarded' : 'Not onboarded'}
                                </span>
                            </p>
                            
                            {onboarding?.stripeAccountId && (
                                <p className="text-[13px] text-gray-400 mt-2">
                                    Account ID: <span className="font-mono text-[12px] text-gray-600">{onboarding.stripeAccountId}</span>
                                </p>
                            )}
                            
                            <p className="text-[13px] text-gray-400 mt-3">Payment card details are not stored for security reasons.</p>
                        </div>
                    )}

                    {/* ── WEEKLY SCHEDULE ───────────────────────────────────── */}
                    {activeTab === 'Weekly Schedule' && (
                        <div>
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Availability</h3>
                            <p className="text-[13px] text-gray-400 mb-6">Set your preferred working hours.</p>

                            <div className="max-w-md bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-8">
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <h3 className="text-[15px] font-semibold text-[#111]">Weekly Schedule</h3>
                                </div>
                                <div className="p-6 space-y-5">
                                    {SCHEDULE_DAYS.map((day) => {
                                        const dk = SCHEDULE_DAY_KEY_MAP[day];
                                        const startKey = `${dk}Start`;
                                        const endKey = `${dk}End`;
                                        return (
                                            <div key={day} className="flex items-center gap-4">
                                                <span className="text-[14px] font-medium text-gray-500 w-10">{day}</span>
                                                <div className="flex items-center gap-3 flex-1">
                                                    {editing ? (
                                                        <>
                                                            <input
                                                                type="time"
                                                                value={localData.weeklySchedule[startKey] || '09:00'}
                                                                onChange={(e) => setNested('weeklySchedule', startKey, e.target.value)}
                                                                className="border border-[#1b2d5d] rounded-full px-3 py-1.5 text-[13px] outline-none"
                                                            />
                                                            <span className="text-gray-400 text-[13px]">to</span>
                                                            <input
                                                                type="time"
                                                                value={localData.weeklySchedule[endKey] || '18:00'}
                                                                onChange={(e) => setNested('weeklySchedule', endKey, e.target.value)}
                                                                className="border border-[#1b2d5d] rounded-full px-3 py-1.5 text-[13px] outline-none"
                                                            />
                                                        </>
                                                    ) : (
                                                        <span className="text-[13px] text-gray-400">
                                                            {localData.weeklySchedule[startKey] || '09:00 AM'} – {localData.weeklySchedule[endKey] || '06:00 PM'}
                                                        </span>
                                                    )}
                                                </div>
                                                <ToggleSwitch
                                                    checked={Boolean(localData.weeklySchedule[day])}
                                                    disabled={!editing}
                                                    onChange={(v) => setNested('weeklySchedule', day, v)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <EditBar editing={editing} saving={saving} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}