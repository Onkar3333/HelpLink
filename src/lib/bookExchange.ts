export interface BookExchangeContact {
  id: string;
  name: string;
  address: string;
  phone?: string;
  notes?: string;
}

// Contacts for book exchange facilitation (net cafes / bookstores) near Murtizapur.
export const BOOK_EXCHANGE_CONTACTS: BookExchangeContact[] = [
  {
    id: 'netcafe-sankalp',
    name: 'Sankalp Net Cafe',
    address: 'Near Bus Stand, Murtizapur, Maharashtra 444107',
    phone: '+91 98765 43210',
    notes: 'Can act as a meetup point for book exchange.',
  },
  {
    id: 'bookbazaar',
    name: 'Book Bazaar',
    address: 'Main Road, Murtizapur, Maharashtra 444107',
    phone: '+91 91234 56789',
    notes: 'Offers used books and exchange facilitation.',
  },
  {
    id: 'digital-hub',
    name: 'Digital Hub Net Cafe',
    address: 'Opposite Govt. Polytechnic, Murtizapur',
    phone: '+91 99876 54321',
    notes: 'Good for coordination and online listing.',
  },
];
