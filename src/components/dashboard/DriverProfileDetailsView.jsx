import React, { useState } from 'react';
import usFlag from '../../assets/us.png';
import testpdf from '../../assets/testpdf.pdf';
import { TbWorld, TbLockPassword } from "react-icons/tb";
import { FaCity, FaRegEnvelope } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FiEdit, FiCheck } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { MdEdit } from "react-icons/md";
import whitewallet from '../../assets/whitewallet.png'

const TABS = ['Personal Info', 'Company Info', 'Fleet Info', 'Chauffeur Info', 'Vehicle Info', 'Required Document', 'Partner Training', 'Partner Contract', 'Payment Details', 'Weekly Schedule'];

const InputDiv = ({ label, value, type = "text", icon }) => (
    <div className="w-full">
        <label className="block text-[14px] text-gray-700 mb-2">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {icon}
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className="text-gray-500"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>}
            <input
                type={type}
                value={value}
                readOnly
                className={`w-full appearance-none rounded-full border border-gray-100 bg-white py-3.5 px-5 text-[14px] text-gray-800 outline-none ${icon ? 'pl-[70px]' : ''}`}
            />
        </div>
    </div>
)

const SelectDiv = ({ label, value, icon }) => (
    <div className="w-full relative">
        <label className="block text-[14px] text-gray-700 mb-2">{label}</label>
        <div className="relative">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10 text-gray-500">
                    {icon}
                </div>
            )}
            <select
                value={value}
                readOnly
                className={`w-full appearance-none rounded-full border border-gray-100 bg-white py-3.5 pr-10 text-[14px] text-gray-800 outline-none ${icon ? 'pl-10' : 'pl-5'}`}
            >
                <option value={value}>{value}</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gray-500"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
        </div>
    </div>
)

const Radio = ({ label, checked }) => (
    <label className="flex items-center gap-2 cursor-pointer w-max">
        <div className={`w-4 h-4 flex-shrink-0 rounded-full border flex items-center justify-center ${checked ? 'border-[#1b2d5d]' : 'border-gray-300'}`}>
            {checked && <div className="w-2 h-2 rounded-full bg-[#1b2d5d]"></div>}
        </div>
        <span className="text-[14px] text-gray-600 truncate">{label}</span>
    </label>
)

const ToggleSwitch = ({ checked, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#1b2d5d]' : 'bg-gray-200 shadow-inner'}`}
    >
        <span className="sr-only">Use setting</span>
        <span
            className={`pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}
        />
    </button>
);

const DocumentTable = ({ data }) => (
    <div className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-xl bg-white mt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[700px]">
            <div className="flex items-center bg-black text-white px-5 sm:px-6 py-4 rounded-t-xl text-xs sm:text-[14px] font-medium">
                <div className="flex-[2] min-w-[300px] pr-4">Name</div>
                <div className="w-[120px] sm:w-[140px] shrink-0">Expiry Date</div>
                <div className="w-[100px] sm:w-[120px] shrink-0">Status</div>
                <div className="w-[80px] shrink-0 text-right">Action</div>
            </div>
            <div className="px-5 sm:px-6">
                {data.map((doc, i) => (
                    <div key={i} className="flex items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className="flex-[2] min-w-[300px] pr-4 text-xs sm:text-[14px] text-gray-600 font-medium leading-relaxed">{doc.name}</div>
                        <div className="w-[120px] sm:w-[140px] shrink-0 text-xs sm:text-[14px] text-gray-500">{doc.expiry || '-'}</div>
                        <div className="w-[100px] sm:w-[120px] shrink-0 flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${doc.status === 'Uploaded' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-xs sm:text-[14px] text-gray-500 font-light">{doc.status}</span>
                        </div>
                        <div className="w-[80px] shrink-0 text-right">
                            <button className="text-[#1b2d5d] text-xs sm:text-[14px] hover:underline font-medium">Upload</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


export default function DriverProfileDetailsView() {
    const [activeTab, setActiveTab] = useState('Personal Info');

    return (
        <section className="bg-gray-50/50 flex-1 flex flex-col">
            <div className="mb-3 flex flex-col gap-3 bg-[#EAEAEA] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <h2 className="text-2xl font-semibold">View Details</h2>
            </div>

            <div className="px-4 pb-12 sm:px-8 flex-1">
                {/* Tabs */}
                <div className="mb-8 flex overflow-x-auto overflow-y-hidden bg-white rounded-xl shadow-sm hide-scrollbar sticky top-0 z-10 w-full max-w-full">
                    <div className="flex w-max items-center">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 whitespace-nowrap text-[14px] font-medium transition-colors ${activeTab === tab ? 'bg-[#1b2d5d] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="w-full max-w-[850px]">
                    {activeTab === 'Personal Info' && (
                        <div className="animate-fade-in">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                                <SelectDiv label="Select Country" value="USA" icon={<TbWorld className="w-5 h-5 object-contain" />} />
                                <div className="hidden sm:block"></div>
                                <SelectDiv label="Select City" value="New York" icon={<FaCity className="w-5 h-5 object-contain" />} />
                                <div className="hidden sm:block"></div>
                                <InputDiv label="Fast Name" value="Jayson Smi" icon={<CiUser className="w-5 h-5 object-contain" />} />
                                <InputDiv label="Last Name" value="Jayson Smi" icon={<CiUser className="w-5 h-5 object-contain" />} />
                                <InputDiv label="Email Address" value="jayson@gmail.com" icon={<FaRegEnvelope className="w-5 h-5 object-contain opacity-60" />} />
                                <InputDiv label="Phone Number" value="+1" icon={<img src={usFlag} alt="US" className="w-6 h-4 object-cover rounded-[2px]" />} />
                                <InputDiv label="Password" value="........." type="password" icon={<TbLockPassword className="w-5 h-5 object-contain opacity-60" />} />
                            </div>
                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {activeTab === 'Company Info' && (
                        <div className="animate-fade-in">
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">Company Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                                <InputDiv label="Company Name" value="UX Pilot" />
                                <SelectDiv label="Company Type ( Legal Form)" value="Sole Proprietorship" />
                            </div>

                            <h3 className="text-[18px] text-[#111] font-medium mt-10 mb-6">Company Address</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                                <SelectDiv label="Country" value="USA" />
                                <InputDiv label="Street" value="4744" />
                                <SelectDiv label="Zip/Postal Code" value="6587" />
                                <InputDiv label="City" value="4744" />
                                <SelectDiv label="State/Province" value="None" />
                                <InputDiv label="Tax Identification Number" value="7784" />
                                <InputDiv label="Business Registration Number" value="Please enter your registration number" />
                            </div>
                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {activeTab === 'Fleet Info' && (
                        <div className="animate-fade-in">
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">Company Information</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[14px] text-gray-700 mb-3">Do you have Prior Limo Services Experience?</p>
                                    <div className="flex gap-6">
                                        <Radio label="Yes" checked={true} />
                                        <Radio label="No" checked={false} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[14px] text-gray-700 mb-3">Do you have electric vehicles in your fleet?</p>
                                    <div className="flex gap-6">
                                        <Radio label="Yes" checked={true} />
                                        <Radio label="No" checked={false} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[14px] text-gray-700 mb-3">Do you have femaile chauffeurs?</p>
                                    <div className="flex gap-6">
                                        <Radio label="Yes" checked={true} />
                                        <Radio label="No" checked={false} />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-[18px] text-[#111] font-medium mt-10 mb-6">Company Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <InputDiv label="How many chauffeurs do you have?" value="3" />
                                <InputDiv label="How many first class vehicles do you have?" value="2" />
                                <SelectDiv label="How many business class vans do you have?" value="4" />
                                <InputDiv label="How many business class vans do you have?" value="3" />
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-[14px] text-gray-700 mb-2">How many busineDescribe the vehicles in your fleet ( brand, model and year)ss class vans do you have?</label>
                                    <textarea className="w-full rounded-[24px] border border-gray-100 bg-white p-5 text-[14px] text-gray-800 outline-none min-h-[140px] resize-none" readOnly value="Lorem ipsum.." />
                                </div>
                            </div>
                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {activeTab === 'Chauffeur Info' && (
                        <div className="animate-fade-in mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <InputDiv label="Chauffeur First Name" value="Jayson" />
                                <InputDiv label="Chauffeur Last Name" value="Smith" />
                                <InputDiv label="Chauffeur Email" value="jaysonsmithgmail.com" />
                                <InputDiv label="Chauffeur Mobile Phone" value="+1" icon={<img src={usFlag} alt="US" className="w-6 h-4 object-cover rounded-[2px]" />} />
                                <InputDiv label="Driver License Id" value="121 454 789" />
                            </div>
                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {activeTab === 'Vehicle Info' && (
                        <div className="animate-fade-in mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <SelectDiv label="Vehicle Year of Manufacture (YoM)" value="Select Option" />
                                <SelectDiv label="Vehicle Brand & Model" value="Select Option" />
                                <SelectDiv label="Vehicle Class" value="Select Option" />
                                <SelectDiv label="Vehicle Color" value="Select Option" />
                                <InputDiv label="Passenger" value="4" />
                                <InputDiv label="Luggage" value="3" />
                                <InputDiv label="Wi-Fi" value="Available" />
                                <InputDiv label="Smoking" value="Allowed" />
                                <InputDiv label="License Number Plate" value="1122" />
                                <InputDiv label="Vehicle VIN" value="121 454 789" />
                            </div>
                            <div className="mt-10 text-[13px] text-gray-500 leading-relaxed max-w-2xl">
                                <p className="mb-2">Upon clicking "Next" the following information will be submitted for review:</p>
                                <ul className="list-disc pl-5 space-y-1.5 mb-6 marker:text-gray-800">
                                    <li>Company Information</li>
                                    <li>Fleet Information</li>
                                    <li>First Chauffeur Information</li>
                                    <li>First Vehicle Information</li>
                                </ul>
                                <p className="font-semibold text-[#111] text-[14px] leading-snug">Please confirm the above provided information is accurate as you will not be able to update it once submitted</p>
                            </div>
                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {/* Required Document */}
                    {activeTab === 'Required Document' && (
                        <div className="animate-fade-in mt-6">
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Company Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-4">Company documents required for Sunrise Correlation:</p>

                            <DocumentTable data={[
                                { name: 'W-9 Form', expiry: '02-6-2028', status: 'Missing' },
                                { name: 'Articles of Incorporation, articles of organization, or business registration.', expiry: '02-6-2028', status: 'Uploaded' },
                                { name: 'Federal Tax ID / EIN Certificate', expiry: '02-6-2028', status: 'Uploaded' },
                                { name: 'City of Houston- Vehicle for Hire Permit', expiry: '02-6-2028', status: 'Missing' },
                                { name: 'Copy of void check for payment detail confirmation', expiry: '-', status: 'Missing' }
                            ]} />

                            <h3 className="text-[18px] text-[#111] font-medium mb-1 mt-8">Chauffeur Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-4">Chauffeur documents required for Jayson smith:</p>

                            <DocumentTable data={[
                                { name: 'Chauffeur Profile Picture', expiry: '02-6-2028', status: 'Missing' },
                                { name: 'City of Houston Limo License', expiry: '02-6-2028', status: 'Uploaded' }
                            ]} />

                            <h3 className="text-[18px] text-[#111] font-medium mb-1 mt-8">Vehicle Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-4">Vehicle documents required for Premium Sedan (TYR45454):</p>

                            <DocumentTable data={[
                                { name: 'Houston Limousine License window Decal', expiry: '02-6-2028', status: 'Missing' },
                                { name: 'Certificate of liability Insurance (min.$1M CSL (Sedan/SUV) $1.5MCSL (Spri...', expiry: '02-6-2028', status: 'Uploaded' },
                                { name: 'Taxas Premium Sedan Vehicle Registration Paper and Sticker', expiry: '02-6-2028', status: 'Uploaded' },
                                { name: 'City o Houston Permitted Vehicle Window Sticker', expiry: '02-6-2028', status: 'Missing' },
                                { name: 'Texas of the whole vehicle showing the license palte', expiry: '-', status: 'Missing' },
                                { name: 'Airport Permit', expiry: '-', status: 'Missing' }
                            ]} />

                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {/* Partner Training */}
                    {activeTab === 'Partner Training' && (
                        <div className="animate-fade-in mt-6">
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Vehicle Documents</h3>
                            <p className="text-[13px] text-gray-400 mb-6">Vehicle documents required for Premium Sedan (TYR45454):</p>

                            <p className="text-[14px] text-[#111] font-medium mb-4">You have competed out of 15 modules</p>

                            <div className="w-full overflow-x-auto border border-gray-100 rounded-xl shadow-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-2">
                                <div className="min-w-[650px] bg-white">
                                    <div className="flex items-center justify-between bg-black text-white px-5 sm:px-6 py-4 text-xs sm:text-[14px] font-medium">
                                        <div className="w-16 sm:w-20 shrink-0">Module#</div>
                                        <div className="flex-[2] min-w-[200px] pr-4">Training Modules</div>
                                        <div className="w-40 sm:w-48 shrink-0 text-right">Progress Percentage</div>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {[
                                            { num: 1, name: 'Who We Are', progress: '0%' },
                                            { num: 2, name: 'The Chauffeur App', progress: '0%' },
                                            { num: 3, name: 'Reviewing Rides and Waiting Time Policy', progress: '0%' },
                                            { num: 4, name: 'Service improvement opportunities', progress: '0%' },
                                            { num: 5, name: 'Chauffeur Values - Act with Integrity', progress: '0%' },
                                            { num: 6, name: 'Chauffeur Values - Be Adaptable', progress: '0%' },
                                            { num: 7, name: 'Chauffeur Values - Be Consistent', progress: '0%' },
                                            { num: 8, name: 'Chauffeur Values - Be Discreet', progress: '0%' },
                                            { num: 9, name: 'Chauffeur Values - Be Refined', progress: '0%' },
                                            { num: 10, name: 'Chauffeur Values - Be Reliable', progress: '0%' },
                                            { num: 11, name: 'Chauffeur Values - Be Reliable', progress: '0%' },
                                            { num: 12, name: 'Chauffeur Values - Be Respectful', progress: '0%' },
                                            { num: 13, name: 'Chauffeur Values - Be Vehicle Champions', progress: '0%' },
                                            { num: 14, name: 'Chauffeur Values - Go Above and Beyond', progress: '0%' },
                                            { num: 15, name: 'Chauffeur Values - Prioritize Safety', progress: '0%' }
                                        ].map((mod) => (
                                            <div key={mod.num} className="flex items-center px-5 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 transition-colors">
                                                <div className="w-16 sm:w-20 shrink-0 text-xs sm:text-[14px] text-gray-400">{mod.num}</div>
                                                <div className="flex-[2] min-w-[200px] pr-4 text-xs sm:text-[14px] text-gray-500 font-light cursor-pointer hover:text-[#1b2d5d] truncate" title={`${mod.num}. ${mod.name}`}>{mod.num}. {mod.name}</div>
                                                <div className="w-40 sm:w-48 shrink-0 text-right text-xs sm:text-[14px] text-[#1b2d5d] font-medium">{mod.progress}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {/* Partner Contract */}
                    {activeTab === 'Partner Contract' && (
                        <div className="animate-fade-in mt-6">
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Partner Contract</h3>
                            <p className="text-[13px] text-gray-400 mb-6">Please review our contract below and accept your contractual agreement.</p>

                            <div className="w-full bg-[#323639] rounded-lg overflow-hidden flex flex-col h-[600px] border border-gray-200">
                                <iframe
                                    src={testpdf}
                                    title="Partner Contract"
                                    className="w-full h-full"
                                    style={{ border: 'none' }}
                                >
                                    <p>Your browser does not support PDFs. <a href={testpdf}>Download the PDF</a>.</p>
                                </iframe>
                            </div>

                            <div className="pt-4 mb-8">
                                <a href="#" className="text-[14px] text-[#1b2d5d] hover:underline">Click here to download a copy of your contractual agreement.</a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                                <InputDiv label="Place" value="Jayson" />
                            </div>

                            <div className="mt-6 flex items-start gap-3 ml-1 mb-6">
                                <div className="mt-0.5 relative flex items-center justify-center flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        className="w-5 h-5 rounded-full border-gray-300 text-[#1b2d5d] focus:ring-[#1b2d5d] cursor-pointer"
                                        style={{ borderRadius: '50%', appearance: 'none', border: '1px solid #d1d5db', background: 'transparent' }}
                                    />
                                </div>
                                <label className="text-[14px] text-gray-400 cursor-pointer select-none leading-relaxed">
                                    I have reviewed and agree to the local service provider U.S General Terms and Conditions
                                </label>
                            </div>

                            <div>
                                <p className="text-[14px] text-[#111] font-medium">By clicking Agree, you hereby accept the terms of the pertner agreement and have provided a digital signature for the contract.</p>
                            </div>

                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {/* Payment Details */}
                    {activeTab === 'Payment Details' && (
                        <div className="animate-fade-in mt-6">
                            <h3 className="text-[18px] text-[#111] font-medium mb-6">Payment Details</h3>

                            <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-start gap-4 mb-3 shadow-sm max-w-xl">
                                <div className="w-10 h-10 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white mt-0.5">
                                    <img src={whitewallet} alt="whitewallet" className='w-6 h-6' />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[15px] font-medium text-[#111]">Debit Card</div>
                                    <div className="text-[13px] text-gray-400">Pay directly form your bank</div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-3 max-w-xl">
                                <InputDiv label="" icon={<LuUser className="text-gray-400" size={18} />} value="Card Holder Name" />
                                <InputDiv label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} value="Card Number" />
                                <div className="grid grid-cols-2 gap-3">
                                    <InputDiv label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} value="Date Expiry" />
                                    <InputDiv label="" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} value="CVC" />
                                </div>
                            </div>

                            <button className="mt-8 bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}

                    {/* Weekly Schedule */}
                    {activeTab === 'Weekly Schedule' && (
                        <div className="animate-fade-in mt-6">
                            <h3 className="text-[18px] text-[#111] font-medium mb-1">Availability</h3>
                            <p className="text-[13px] text-gray-400 mb-6">Set your preferred working hours.</p>

                            <div className="max-w-md bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-8">
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <h3 className="text-[15px] font-semibold text-[#111]">Weekly Schedule</h3>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <div className="p-6 space-y-6">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'].map((day) => (
                                        <div key={day} className="flex items-center justify-between">
                                            <span className="text-[14px] font-medium text-gray-500 w-12">{day}</span>
                                            <div className="flex items-center gap-6">
                                                <span className="text-[13px] text-gray-400">9:00 AM</span>
                                                <span className="text-[13px] text-gray-400">9:00 AM</span>
                                            </div>
                                            <ToggleSwitch
                                                checked={day !== 'Tue'}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="bg-[#1b2d5d] hover:bg-[#132042] transition-colors text-white rounded-full px-16 py-3 flex items-center justify-center gap-2 font-medium text-[15px] min-w-[140px]">
                                Edit <MdEdit size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* simple style for scrollbar hide inside component */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
