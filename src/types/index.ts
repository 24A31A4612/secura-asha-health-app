export type Language = 'en' | 'te' | 'hi';

export interface User {
  id: string;
  email: string;
  fullName: string;
  ashaId: string;
  subCentre: string;
  village: string;
  phone: string;
  avatarUrl?: string;
  biometricEnrolled?: boolean;
  biometricCredentialId?: string;
  createdAt: string;
  lastLoginAt: string;
}

export type RiskLevel = 'NORMAL' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface InfantDetails {
  birthDate: string;
  birthWeight: number; // in kg
  deliveryType: 'INSTITUTIONAL_GOVT' | 'INSTITUTIONAL_PVT' | 'HOME';
  immunizationsDone: string[];
  immunizationsDue: string[];
  isExclusivelyBreastfed?: boolean;
  dangerSignsObserved?: string[];
}

export interface Member {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: 'FEMALE' | 'MALE' | 'OTHER';
  isPregnant?: boolean;
  lmpDate?: string;
  eddDate?: string;
  pregnancyWeek?: number;
  highRisk?: boolean;
  riskFactors?: string[];
  infantDetails?: InfantDetails;
  immunizationStatus?: 'UP_TO_DATE' | 'DUE' | 'OVERDUE';
  chronicConditions?: string[];
}

export interface Household {
  id: string;
  householdNumber: string;
  headOfFamily: string;
  village: string;
  address: string;
  phone: string;
  totalMembers: number;
  socioeconomicCategory: 'BPL' | 'APL' | 'NFSA';
  members: Member[];
  riskLevel: RiskLevel;
  lastVisitedDate?: string;
  nextScheduledVisit: string;
  notes?: string;
  syncedToCloud: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VisitType = 'ANC' | 'PNC' | 'IMMUNIZATION' | 'CHRONIC' | 'NEWBORN' | 'ROUTINE';
export type VisitStatus = 'OVERDUE' | 'DUE_TODAY' | 'UPCOMING' | 'COMPLETED';
export type VisitPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL';

export interface Visit {
  id: string;
  householdId: string;
  householdNumber: string;
  memberId: string;
  memberName: string;
  visitType: VisitType;
  scheduledDate: string;
  status: VisitStatus;
  priority: VisitPriority;
  reason: string;
  completedDate?: string;
  notes?: string;
  dangerSignsDetected?: string[];
  vitals?: {
    bpSystolic?: number;
    bpDiastolic?: number;
    weight?: number;
    hemoglobin?: number;
    temperature?: number;
  };
  syncedToCloud: boolean;
}

export interface ProtocolDocument {
  id: string;
  code: string;
  title: string;
  titleTe: string;
  titleHi: string;
  category: 'MATERNAL' | 'NEWBORN' | 'IMMUNIZATION' | 'COMMUNICABLE' | 'NUTRITION';
  module: string;
  section: string;
  citation: string;
  summary: string;
  summaryTe: string;
  summaryHi: string;
  dangerSignsCovered: string[];
  redFlags: string[];
  clinicalSteps: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export interface DangerSignEvaluation {
  isEmergency: boolean;
  dangerSignName: string | null;
  category: 'MATERNAL' | 'NEWBORN' | 'CHILD' | 'GENERAL' | null;
  severity: 'CRITICAL' | 'HIGH' | 'NONE';
  referralInstruction: string | null;
  immediateActions: string[];
  emergencyHelpline: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  protocolCitation?: string;
  dangerSignDetected?: boolean;
  dangerSignDetails?: DangerSignEvaluation;
  isRefusal?: boolean;
  isOffline?: boolean;
}

export interface SyncQueueItem {
  id: string;
  type: 'ADD_HOUSEHOLD' | 'UPDATE_HOUSEHOLD' | 'COMPLETE_VISIT' | 'REGISTER_USER';
  payload: any;
  timestamp: number;
  synced: boolean;
}
