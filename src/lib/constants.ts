import { 
  Droplets, 
  Stethoscope, 
  AlertTriangle, 
  Utensils, 
  GraduationCap, 
  Wallet, 
  Home, 
  Briefcase, 
  Heart, 
  CloudRain,
  LucideIcon
} from "lucide-react";

export type HelpCategory = 
  | 'blood_donation'
  | 'medical_assistance'
  | 'emergency'
  | 'food_grocery'
  | 'education'
  | 'financial'
  | 'shelter_housing'
  | 'job_skills'
  | 'senior_citizen'
  | 'disaster_relief';

export type UrgencyLevel = 'normal' | 'urgent' | 'critical';
export type RequestStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface CategoryInfo {
  id: HelpCategory;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const HELP_CATEGORIES: CategoryInfo[] = [
  {
    id: 'blood_donation',
    label: 'Blood Donation',
    description: 'Request or donate blood for patients in need',
    icon: Droplets,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 'medical_assistance',
    label: 'Medical Assistance',
    description: 'Hospital, medicines, surgery, doctor help',
    icon: Stethoscope,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'emergency',
    label: 'Emergency Help',
    description: 'Urgent situations requiring immediate response',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'food_grocery',
    label: 'Food & Grocery',
    description: 'Food packets, groceries, meal support',
    icon: Utensils,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'education',
    label: 'Education Support',
    description: 'Books, fees, mentorship, online classes',
    icon: GraduationCap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'financial',
    label: 'Financial Help',
    description: 'Monetary assistance for emergencies',
    icon: Wallet,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'shelter_housing',
    label: 'Shelter & Housing',
    description: 'Temporary shelter, rent help, safe housing',
    icon: Home,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    id: 'job_skills',
    label: 'Job & Skills',
    description: 'Job referrals, training, skill guidance',
    icon: Briefcase,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 'senior_citizen',
    label: 'Senior Citizen Help',
    description: 'Assistance for elderly with daily needs',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    id: 'disaster_relief',
    label: 'Disaster Relief',
    description: 'Natural disaster support and relief',
    icon: CloudRain,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
];

export const URGENCY_CONFIG = {
  normal: {
    label: 'Normal',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
    borderColor: 'border-muted',
  },
  urgent: {
    label: 'Urgent',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning',
  },
  critical: {
    label: 'Critical',
    color: 'text-critical',
    bgColor: 'bg-critical/10',
    borderColor: 'border-critical',
  },
};

export const STATUS_CONFIG = {
  open: {
    label: 'Open',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  resolved: {
    label: 'Resolved',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  closed: {
    label: 'Closed',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
};

export function getCategoryById(id: HelpCategory): CategoryInfo | undefined {
  return HELP_CATEGORIES.find(cat => cat.id === id);
}