export interface HospitalInfo {
  id: string;
  name: string;
  address: string;
  phone?: string;
  distance?: string;
}

// Hospitals near Government Polytechnic Murtizapur (Akola District) that often request blood donations.
export const BLOOD_DONATION_HOSPITALS: HospitalInfo[] = [
  {
    id: 'gmch-akola',
    name: 'Government Medical College & Hospital, Akola',
    address: 'N.H. 6, Near Police Line, Akola, Maharashtra 444004',
    phone: '+91 724 225 2121',
    distance: '≈ 33 km',
  },
  {
    id: 'renuka-hospital',
    name: 'Renuka Hospital & Heart Care, Akola',
    address: 'Near Naka, Akola, Maharashtra 444001',
    phone: '+91 724 223 1234',
    distance: '≈ 32 km',
  },
  {
    id: 'rtn-hospital',
    name: 'RTN Hospital, Akola',
    address: 'Vidarbha Nagar, Akola, Maharashtra 444004',
    phone: '+91 724 223 1422',
    distance: '≈ 32 km',
  },
];
