import { DangerSignEvaluation } from '../types';

interface DangerPattern {
  name: string;
  category: 'MATERNAL' | 'NEWBORN' | 'CHILD' | 'GENERAL';
  match: (text: string) => boolean;
  referralInstruction: string;
  immediateActions: string[];
}

const DANGER_PATTERNS: DangerPattern[] = [
  {
    name: 'Third-Trimester Bleeding / Antepartum Hemorrhage',
    category: 'MATERNAL',
    match: (t: string) => {
      const hasBleed = /bleeding|bleed|haemorrhage|hemorrhage|blood/i.test(t);
      const isThirdTrimester = /third[- ]trimester|3rd[- ]trimester|(2[89]|[34]\d)\s*weeks/i.test(t);
      const isPregnancy = /pregnant|pregnancy|gestation/i.test(t);
      const specificTerms = /antepartum|aph|placenta\s+pra?evia|abruptio\s+placentae/i.test(t);
      return specificTerms || (hasBleed && (isThirdTrimester || (isPregnancy && /vaginal|heavy|severe|sudden/i.test(t))));
    },
    referralInstruction: 'EMERGENCY: Immediate referral to First Referral Unit (FRU) with surgical & blood banking facility. DO NOT perform vaginal (PV) exam.',
    immediateActions: [
      'Call 108 Emergency Ambulance immediately.',
      'Place mother in left-lateral recumbent position.',
      'Keep mother warm and Nil By Mouth (NBM).',
      'Alert Medical Officer and destination hospital.',
      'Strictly avoid internal vaginal examination.'
    ]
  },
  {
    name: 'Eclampsia / Convulsions in Pregnancy',
    category: 'MATERNAL',
    match: (t: string) => {
      const hasSeizure = /convulsion|convulsing|fit|fits|seizure|seizures|eclampsia/i.test(t);
      const hasPregnancy = /pregnant|pregnancy|labor|labour|postpartum|mother|woman/i.test(t);
      const hasSeverePreEclampsia =
        (/1[456789]\d\/\d+|high\s*bp|hypertension/i.test(t) &&
          /(severe\s*headache|frontal\s*headache|blurred\s*vision|blurry\s*vision|spots\s*before\s*eyes|epigastric\s*pain)/i.test(t));
      return (hasSeizure && hasPregnancy) || hasSeverePreEclampsia || /severe\s+preeclampsia|severe\s+pre-eclampsia/i.test(t);
    },
    referralInstruction: 'EMERGENCY: Imminent eclampsia or active seizure. Immediate referral to FRU with pre-referral Magnesium Sulfate.',
    immediateActions: [
      'Call 108 Emergency Ambulance immediately.',
      'Turn mother to left side; keep airway clear and suction secretions.',
      'Prevent physical fall or injury without restraining tightly.',
      'Do not put anything inside patient mouth during convulsions.',
      'Coordinate with ANM/MO for emergency Magnesium Sulfate protocol.'
    ]
  },
  {
    name: 'Postpartum Hemorrhage (PPH)',
    category: 'MATERNAL',
    match: (t: string) => {
      const hasPPHKeyword = /postpartum\s*(haemorrhage|hemorrhage)|pph/i.test(t);
      const isPostDelivery = /postpartum|delivered|after\s*delivery|childbirth|following\s*birth/i.test(t);
      const hasExcessBleeding =
        /heavy\s*bleeding|excessive\s*bleeding|torrential\s*bleeding|soaking\s*(\d+|two|three)\s*pads/i.test(t);
      return hasPPHKeyword || (isPostDelivery && hasExcessBleeding);
    },
    referralInstruction: 'CRITICAL EMERGENCY: Severe Postpartum Hemorrhage. Immediate uterine massage and urgent 108 referral to FRU.',
    immediateActions: [
      'Call 108 Emergency Ambulance immediately.',
      'Perform continuous firm uterine massage through abdomen until uterus contracts.',
      'Put baby to breast to trigger natural oxytocin release.',
      'Ensure bladder is emptied.',
      'Elevate legs and keep mother warm during transit.'
    ]
  },
  {
    name: 'Cord Prolapse / Limb Malpresentation in Labor',
    category: 'MATERNAL',
    match: (t: string) => {
      return (
        /cord\s*prolapse|hand\s*prolapse|foot\s*prolapse/i.test(t) ||
        (/cord/i.test(t) && /(protrud|visible|coming\s*out|hang)/i.test(t) && /(vagina|birth|labour|labor)/i.test(t))
      );
    },
    referralInstruction: 'CRITICAL OBSTETRIC EMERGENCY: Cord Prolapse. Urgent delivery required by Caesarean section.',
    immediateActions: [
      'Call 108 Ambulance immediately for emergency C-section transit.',
      'Place mother in knee-chest position or head-down elevation.',
      'Use sterile gloved hand to gently push presenting part off the cord to relieve cord compression; do not push cord back into vagina.',
      'Keep protruding cord warm and moist with sterile saline soaked gauze.'
    ]
  },
  {
    name: 'Newborn Asphyxia / Breathing Failure at Birth',
    category: 'NEWBORN',
    match: (t: string) => {
      const isNewborn = /baby|newborn|infant|neonate/i.test(t);
      const isAtBirth = /at\s*birth|after\s*(delivery|birth)|born/i.test(t);
      const notBreathing = /(not\s*breathing|not\s*crying|cannot\s*breathe|gasping|stopped\s*breathing|blue|pale|floppy|asphyxia)/i.test(t);
      return isNewborn && isAtBirth && notBreathing;
    },
    referralInstruction: 'GOLDEN MINUTE EMERGENCY: Initiate immediate newborn resuscitation with Bag and Mask.',
    immediateActions: [
      'Dry baby with warm towel and provide gentle tactile back stimulation.',
      'Position head in sniffing position to clear airway.',
      'If not breathing or gasping, begin Bag and Mask ventilation (40-60 breaths/min).',
      'Call 108 ambulance / SNCU notification immediately.',
      'Keep baby warm under radiant heat or skin-to-skin.'
    ]
  },
  {
    name: 'Severe Newborn Sepsis / Possible Serious Bacterial Infection (PSBI)',
    category: 'NEWBORN',
    match: (t: string) => {
      const isInfant = /baby|newborn|infant|neonate|child/i.test(t);
      const chestIndrawing = /chest\s*indrawing/i.test(t);
      const fastBreathing = /fast\s*breathing|respiratory\s*rate\s*(>|>=|over)?\s*6\d|\b6[5-9]\b\s*(breaths|bpm)/i.test(t);
      const hypothermia = /hypothermia|body\s*(is\s*)?cold|temperature\s*(<\s*)?3[0-5](\.\d)?/i.test(t);
      const unableToFeed = /unable\s*to\s*(feed|suck)|cannot\s*suck|refusing\s*(all\s*)?feeds/i.test(t);
      const umbilicusPus = /pus\s*from\s*umbilicus/i.test(t);

      return (
        chestIndrawing ||
        (isInfant && (fastBreathing || (hypothermia && unableToFeed) || (unableToFeed && /lethargic/i.test(t)) || umbilicusPus))
      );
    },
    referralInstruction: 'EMERGENCY: Possible Serious Bacterial Infection (PSBI). Immediate referral to Special Newborn Care Unit (SNCU) / District Hospital.',
    immediateActions: [
      'Call 108 Ambulance for SNCU referral.',
      'Keep newborn warm during transport using Kangaroo Mother Care (KMC).',
      'Do not give oral antibiotics without physician authorization.',
      'Encourage frequent breastfeeding if infant can swallow.'
    ]
  },
  {
    name: 'Severe Dehydration with Lethargy / Delayed Skin Pinch',
    category: 'CHILD',
    match: (t: string) => {
      const hasDiarrhea = /diarrhea|diarrhoea|loose\s*motion/i.test(t);
      const hasDehydration = /dehydration/i.test(t);
      const severeSigns =
        /sunken\s*eyes|skin\s*pinch\s*.*(slow|>|2\s*sec)|lethargic|unconscious|unable\s*to\s*drink/i.test(t);
      return (hasDiarrhea || hasDehydration) && severeSigns;
    },
    referralInstruction: 'EMERGENCY: Severe Dehydration with impending shock. Immediate 108 transfer for intravenous fluids (Ringer Lactate).',
    immediateActions: [
      'Call 108 Ambulance immediately for PHC/CHC referral.',
      'If child can drink, give spoonfuls of ORS while waiting.',
      'If child is drowsy or unconscious, DO NOT force oral fluids (aspiration risk).',
      'Keep child warm during transit.'
    ]
  },
  {
    name: 'High Fever with Stiff Neck / Petechial Rash',
    category: 'GENERAL',
    match: (t: string) => {
      const hasFever = /fever|high\s*temp/i.test(t);
      const hasMeningeal = /stiff\s*neck|neck\s*rigidity|petechi|purple\s*spots|bulging\s*fontanelle/i.test(t);
      return hasFever && hasMeningeal;
    },
    referralInstruction: 'EMERGENCY: Suspected Meningitis / Severe Sepsis. Immediate emergency transfer to hospital.',
    immediateActions: [
      'Call 108 Ambulance immediately.',
      'Turn child to recovery position if drowsy.',
      'Do not administer oral medications if sensorium is altered.',
      'Accompany family to hospital.'
    ]
  }
];

export const evaluateDangerSigns = (query: string): DangerSignEvaluation => {
  if (!query || typeof query !== 'string') {
    return {
      isEmergency: false,
      dangerSignName: null,
      category: null,
      severity: 'NONE',
      referralInstruction: null,
      immediateActions: [],
      emergencyHelpline: '108'
    };
  }

  const cleanQuery = query.toLowerCase().trim();

  for (const pattern of DANGER_PATTERNS) {
    if (pattern.match(cleanQuery)) {
      return {
        isEmergency: true,
        dangerSignName: pattern.name,
        category: pattern.category,
        severity: 'CRITICAL',
        referralInstruction: pattern.referralInstruction,
        immediateActions: pattern.immediateActions,
        emergencyHelpline: '108'
      };
    }
  }

  return {
    isEmergency: false,
    dangerSignName: null,
    category: null,
    severity: 'NONE',
    referralInstruction: null,
    immediateActions: [],
    emergencyHelpline: '108'
  };
};

export const DANGER_SIGN_EVAL_SET: { query: string; expectedDanger: boolean; label: string }[] = [
  { query: 'Patient is 32 weeks pregnant and experiencing sudden vaginal bleeding', expectedDanger: true, label: '32-wk pregnancy bleed' },
  { query: 'Mother has third-trimester bleeding with severe pain', expectedDanger: true, label: 'Third-trimester bleeding' },
  { query: 'Pregnant woman is having continuous convulsions and fits at home', expectedDanger: true, label: 'Eclampsia convulsions' },
  { query: 'Mother has BP 160/110 with severe frontal headache and blurred vision', expectedDanger: true, label: 'Severe pre-eclampsia' },
  { query: 'Postpartum mother delivered 1 hour ago and is soaking 2 pads in 20 minutes', expectedDanger: true, label: 'Postpartum hemorrhage' },
  { query: 'Umbilical cord is visible protruding from the vagina during active labour', expectedDanger: true, label: 'Cord prolapse' },
  { query: 'Newborn baby is blue and not breathing 1 minute after delivery', expectedDanger: true, label: 'Newborn asphyxia' },
  { query: '2-week-old baby has severe chest indrawing and respiratory rate 68 breaths per minute', expectedDanger: true, label: 'Infant chest indrawing & tachypnea' },
  { query: 'Newborn baby body is cold to touch with temperature 35.0 C and cannot suck breastmilk', expectedDanger: true, label: 'Hypothermia and inability to suck' },
  { query: 'Child with diarrhea has sunken eyes, skin pinch takes over 2 seconds to flatten, and is lethargic', expectedDanger: true, label: 'Severe dehydration' },
  // Negative control cases (Must NOT trigger danger emergency)
  { query: 'What is the schedule for 9-month immunization in infants?', expectedDanger: false, label: 'Routine immunization schedule' },
  { query: 'How many IFA tablets should be given during normal pregnancy?', expectedDanger: false, label: 'Normal IFA distribution' },
  { query: 'When should the first ANC checkup be completed?', expectedDanger: false, label: 'Normal ANC timing' },
  { query: 'How to prepare ORS solution with 1 liter of clean water?', expectedDanger: false, label: 'ORS preparation guidance' }
];

export const runDangerSignBenchmark = () => {
  let passed = 0;
  const results = DANGER_SIGN_EVAL_SET.map(testCase => {
    const evalResult = evaluateDangerSigns(testCase.query);
    const isMatch = evalResult.isEmergency === testCase.expectedDanger;
    if (isMatch) passed++;
    return {
      label: testCase.label,
      query: testCase.query,
      expected: testCase.expectedDanger,
      actual: evalResult.isEmergency,
      dangerSignName: evalResult.dangerSignName,
      passed: isMatch
    };
  });

  return {
    total: DANGER_SIGN_EVAL_SET.length,
    passed,
    successRate: (passed / DANGER_SIGN_EVAL_SET.length) * 100,
    results
  };
};
