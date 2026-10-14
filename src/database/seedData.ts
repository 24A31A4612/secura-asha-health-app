import { Household, Visit } from '../types';

export const INITIAL_HOUSEHOLDS: Household[] = [
  {
    id: 'hh-101',
    householdNumber: 'H-101',
    headOfFamily: 'Rameshwar Verma',
    village: 'Rampur Sub-Centre',
    address: 'Near Gram Panchayat Well, Ward 2',
    phone: '+91 98765 43210',
    totalMembers: 5,
    socioeconomicCategory: 'BPL',
    riskLevel: 'HIGH',
    lastVisitedDate: '2026-10-02',
    nextScheduledVisit: '2026-10-14',
    notes: 'Sunitha Verma is 32 weeks pregnant with BP 138/88. High risk pregnancy monitoring required.',
    syncedToCloud: true,
    createdAt: '2026-08-10T09:00:00Z',
    updatedAt: '2026-10-02T11:30:00Z',
    members: [
      {
        id: 'mem-101-1',
        name: 'Rameshwar Verma',
        relationship: 'Head',
        age: 32,
        gender: 'MALE'
      },
      {
        id: 'mem-101-2',
        name: 'Sunitha Verma',
        relationship: 'Wife',
        age: 26,
        gender: 'FEMALE',
        isPregnant: true,
        lmpDate: '2026-03-04',
        eddDate: '2026-12-11',
        pregnancyWeek: 32,
        highRisk: true,
        riskFactors: ['Mild Gestational Hypertension (BP 138/88)', 'Mild Anemia (Hb 9.2 g/dL)'],
        chronicConditions: []
      },
      {
        id: 'mem-101-3',
        name: 'Aarav Verma',
        relationship: 'Son',
        age: 3,
        gender: 'MALE',
        immunizationStatus: 'UP_TO_DATE'
      }
    ]
  },
  {
    id: 'hh-102',
    householdNumber: 'H-102',
    headOfFamily: 'Suresh Kumar',
    village: 'Rampur Sub-Centre',
    address: 'Plot 14, Basti Tola',
    phone: '+91 98451 23456',
    totalMembers: 4,
    socioeconomicCategory: 'NFSA',
    riskLevel: 'HIGH',
    lastVisitedDate: '2026-09-28',
    nextScheduledVisit: '2026-10-14',
    notes: 'Baby Priya born 9 months ago. Measles-Rubella (MR-1) and Vitamin A dose is overdue by 5 days.',
    syncedToCloud: true,
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-09-28T14:15:00Z',
    members: [
      {
        id: 'mem-102-1',
        name: 'Suresh Kumar',
        relationship: 'Head',
        age: 29,
        gender: 'MALE'
      },
      {
        id: 'mem-102-2',
        name: 'Radhika Kumar',
        relationship: 'Wife',
        age: 25,
        gender: 'FEMALE',
        isPregnant: false
      },
      {
        id: 'mem-102-3',
        name: 'Baby Priya',
        relationship: 'Daughter',
        age: 0,
        gender: 'FEMALE',
        immunizationStatus: 'OVERDUE',
        infantDetails: {
          birthDate: '2026-01-09',
          birthWeight: 2.8,
          deliveryType: 'INSTITUTIONAL_GOVT',
          immunizationsDone: ['BCG', 'OPV-0', 'HepB-0', 'Pentavalent-1', 'OPV-1', 'Rotavirus-1', 'fIPV-1', 'PCV-1', 'Pentavalent-2', 'OPV-2', 'Pentavalent-3', 'fIPV-2'],
          immunizationsDue: ['MR-1', 'PCV-Booster', 'JE-1', 'Vitamin A (1st Dose)'],
          isExclusivelyBreastfed: false
        }
      }
    ]
  },
  {
    id: 'hh-103',
    householdNumber: 'H-103',
    headOfFamily: 'Kishan Yadav',
    village: 'Rampur Sub-Centre',
    address: 'Near Aanganwadi Center #3',
    phone: '+91 97123 45678',
    totalMembers: 6,
    socioeconomicCategory: 'BPL',
    riskLevel: 'NORMAL',
    lastVisitedDate: '2026-10-10',
    nextScheduledVisit: '2026-10-14',
    notes: 'Pooja delivered baby boy 5 days ago at PHC. Home PNC visit Day 7 checkup required.',
    syncedToCloud: true,
    createdAt: '2026-09-01T08:30:00Z',
    updatedAt: '2026-10-10T16:00:00Z',
    members: [
      {
        id: 'mem-103-1',
        name: 'Kishan Yadav',
        relationship: 'Head',
        age: 28,
        gender: 'MALE'
      },
      {
        id: 'mem-103-2',
        name: 'Pooja Yadav',
        relationship: 'Wife',
        age: 23,
        gender: 'FEMALE',
        isPregnant: false
      },
      {
        id: 'mem-103-3',
        name: 'Baby Boy of Pooja',
        relationship: 'Son',
        age: 0,
        gender: 'MALE',
        immunizationStatus: 'UP_TO_DATE',
        infantDetails: {
          birthDate: '2026-10-09',
          birthWeight: 3.1,
          deliveryType: 'INSTITUTIONAL_GOVT',
          immunizationsDone: ['BCG', 'OPV-0', 'HepB-0'],
          immunizationsDue: ['Pentavalent-1 (at 6 wks)'],
          isExclusivelyBreastfed: true
        }
      }
    ]
  },
  {
    id: 'hh-104',
    householdNumber: 'H-104',
    headOfFamily: 'Mohammad Rafiq',
    village: 'Rampur Sub-Centre',
    address: 'Old Masjid Road, Lane 4',
    phone: '+91 99001 12233',
    totalMembers: 4,
    socioeconomicCategory: 'APL',
    riskLevel: 'NORMAL',
    lastVisitedDate: '2026-09-20',
    nextScheduledVisit: '2026-10-16',
    notes: 'Routine nutrition counseling and IFA distribution.',
    syncedToCloud: true,
    createdAt: '2026-06-12T11:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
    members: [
      {
        id: 'mem-104-1',
        name: 'Mohammad Rafiq',
        relationship: 'Head',
        age: 38,
        gender: 'MALE'
      },
      {
        id: 'mem-104-2',
        name: 'Nasreen Begum',
        relationship: 'Wife',
        age: 34,
        gender: 'FEMALE',
        isPregnant: false,
        chronicConditions: ['Type 2 Diabetes (Under PHC medication)']
      }
    ]
  }
];

export const INITIAL_VISITS: Visit[] = [
  {
    id: 'vis-01',
    householdId: 'hh-101',
    householdNumber: 'H-101',
    memberId: 'mem-101-2',
    memberName: 'Sunitha Verma',
    visitType: 'ANC',
    scheduledDate: '2026-10-14',
    status: 'DUE_TODAY',
    priority: 'HIGH',
    reason: 'ANC 3rd Checkup (32 Weeks): BP check, IFA compliance, fetal movement check',
    syncedToCloud: true
  },
  {
    id: 'vis-02',
    householdId: 'hh-102',
    householdNumber: 'H-102',
    memberId: 'mem-102-3',
    memberName: 'Baby Priya (D/o Radhika)',
    visitType: 'IMMUNIZATION',
    scheduledDate: '2026-10-09',
    status: 'OVERDUE',
    priority: 'HIGH',
    reason: '9-Month Immunization Overdue: MR-1 Vaccine, PCV Booster, Vitamin A',
    syncedToCloud: true
  },
  {
    id: 'vis-03',
    householdId: 'hh-103',
    householdNumber: 'H-103',
    memberId: 'mem-103-3',
    memberName: 'Baby Boy of Pooja Yadav',
    visitType: 'PNC',
    scheduledDate: '2026-10-14',
    status: 'DUE_TODAY',
    priority: 'CRITICAL',
    reason: 'Home-Based Newborn Care (HBNC) Day 7 Visit: Cord inspection, jaundice check, feeding assessment',
    syncedToCloud: true
  },
  {
    id: 'vis-04',
    householdId: 'hh-104',
    householdNumber: 'H-104',
    memberId: 'mem-104-2',
    memberName: 'Nasreen Begum',
    visitType: 'CHRONIC',
    scheduledDate: '2026-10-16',
    status: 'UPCOMING',
    priority: 'NORMAL',
    reason: 'Non-Communicable Diseases (NCD) Follow-up: Blood sugar test reminder at PHC',
    syncedToCloud: true
  }
];
