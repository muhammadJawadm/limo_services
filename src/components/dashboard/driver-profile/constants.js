export const PROFILE_TABS = [
  'Personal Info',
  'Company Info',
  'Fleet Info',
  'Chauffeur Info',
  'Vehicle Info',
  'Required Document',
  'Partner Training',
  'Partner Contract',
  'Payment Details',
  'Weekly Schedule',
]

export const COMPANY_DOC_DEFS = [
  { key: 'w9Form', name: 'W-9 Form' },
  { key: 'articleOfIncorporation', name: 'Articles of Incorporation / Business Registration' },
  { key: 'einCertificate', name: 'Federal Tax ID / EIN Certificate' },
  { key: 'cityPermit', name: 'City of Houston – Vehicle for Hire Permit' },
  { key: 'voidCheck', name: 'Copy of void check for payment detail confirmation' },
]

export const CHAUFFEUR_DOC_DEFS = [
  { key: 'profilePicture', name: 'Chauffeur Profile Picture' },
  { key: 'licensePicture', name: 'License Picture Upload' },
]

export const VEHICLE_DOC_DEFS = [
  { key: 'limoLicenseDecal', name: 'Houston Limousine License Window Decal' },
  { key: 'liabilityInsurance', name: 'Certificate of Liability Insurance' },
  { key: 'vehicleRegistration', name: 'Texas Premium Sedan Vehicle Registration Paper and Sticker' },
  { key: 'cityPermittedSticker', name: 'City of Houston Permitted Vehicle Window Sticker' },
  { key: 'licensePlatePhoto', name: 'Photo of the whole vehicle showing the license plate' },
  { key: 'airportPermit', name: 'Airport Permit' },
]

export const SCHEDULE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const SCHEDULE_DAY_KEY_MAP = {
  Mon: 'monday',
  Tue: 'tuesday',
  Wed: 'wednesday',
  Thu: 'thursday',
  Fri: 'friday',
  Sat: 'saturday',
  Sun: 'sunday',
}
