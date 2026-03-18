export interface HelplineNumber {
  id: string;
  label: string;
  description?: string;
  number: string;
  country?: string;
}

// Publicly available government emergency helpline numbers.
// Adapt this list to match the region your app serves.
export const EMERGENCY_HELPLINES: HelplineNumber[] = [
  {
    id: 'general',
    label: 'General Emergency (Police/Fire/Medical)',
    description: 'One number for all emergencies (police, fire, ambulance).',
    number: '112',
  },
  {
    id: 'police',
    label: 'Police',
    description: 'Immediate police response for public safety and security.',
    number: '100',
  },
  {
    id: 'ambulance',
    label: 'Ambulance / Medical',
    description: 'Emergency medical services and ambulance dispatch.',
    number: '102',
  },
  {
    id: 'fire',
    label: 'Fire & Rescue',
    description: 'Report fires and request fire-rescue support.',
    number: '101',
  },
  {
    id: 'childhelpline',
    label: 'Child Helpline',
    description: 'Support for children in distress or danger.',
    number: '1098',
  },
];

export const DISASTER_HELPLINES: HelplineNumber[] = [
  {
    id: 'disaster_general',
    label: 'Disaster Helpline',
    description: 'National disaster management helpline (state-level coordination).',
    number: '108',
  },
  {
    id: 'ndrf',
    label: 'NDRF (Rescue)',
    description: 'National Disaster Response Force rescue assistance.',
    number: '1070',
  },
  {
    id: 'ndma',
    label: 'NDMA (Info)',
    description: 'National Disaster Management Authority helpline for advisory & info.',
    number: '1078',
  },
];
