export interface MedicalFacility {
  id: string;
  name: string;
  type: 'hospital' | 'chemist' | 'clinic';
  address: string;
  phone?: string;
  distance?: string;
}

// Medical facilities (hospitals, chemists, clinics) near Murtizapur, Akola
export const MEDICAL_FACILITIES: MedicalFacility[] = [
  {
    id: 'gmch-akola',
    name: 'Government Medical College & Hospital, Akola',
    type: 'hospital',
    address: 'N.H. 6, Near Police Line, Akola, Maharashtra 444004',
    phone: '+91 724 225 2121',
    distance: '≈ 33 km',
  },
  {
    id: 'renuka-hospital',
    name: 'Renuka Hospital & Heart Care, Akola',
    type: 'hospital',
    address: 'Near Naka, Akola, Maharashtra 444001',
    phone: '+91 724 223 1234',
    distance: '≈ 32 km',
  },
  {
    id: 'rtn-hospital',
    name: 'RTN Hospital, Akola',
    type: 'hospital',
    address: 'Vidarbha Nagar, Akola, Maharashtra 444004',
    phone: '+91 724 223 1422',
    distance: '≈ 32 km',
  },
  {
    id: 'shri-satya-clinic',
    name: 'Shri Satya Medical Clinic, Murtizapur',
    type: 'clinic',
    address: 'Near Government Polytechnic, Murtizapur, Maharashtra 444107',
    phone: '+91 98765 12345',
    distance: '< 1 km',
  },
  {
    id: 'murtizapur-chemist-1',
    name: 'Murtizapur Medical Store',
    type: 'chemist',
    address: 'Main Bazaar, Murtizapur, Maharashtra 444107',
    phone: '+91 97654 32109',
    distance: '< 2 km',
  },
  {
    id: 'akola-chemist-1',
    name: 'Akola Pharmacy & Medical Centre',
    type: 'chemist',
    address: 'Market Yard, Akola, Maharashtra 444001',
    phone: '+91 724 222 5678',
    distance: '≈ 25 km',
  },
  {
    id: 'dr-sharma-clinic',
    name: 'Dr. Sharma\'s Medical Clinic',
    type: 'clinic',
    address: 'Vidarbha Nagar, Akola, Maharashtra 444004',
    phone: '+91 98765 54321',
    distance: '≈ 30 km',
  },
];

export function getMedicalFacilitiesByType(type: MedicalFacility['type']): MedicalFacility[] {
  return MEDICAL_FACILITIES.filter((f) => f.type === type);
}

export function getTypeIcon(type: MedicalFacility['type']): string {
  switch (type) {
    case 'hospital':
      return '🏥';
    case 'clinic':
      return '⚕️';
    case 'chemist':
      return '💊';
    default:
      return '📍';
  }
}

export function getTypeLabel(type: MedicalFacility['type']): string {
  switch (type) {
    case 'hospital':
      return 'Hospital';
    case 'clinic':
      return 'Clinic';
    case 'chemist':
      return 'Chemist/Pharmacy';
    default:
      return 'Medical Facility';
  }
}
