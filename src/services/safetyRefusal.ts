export interface SafetyCheckResult {
  isRefusal: boolean;
  reason?: string;
  prescribingWarning?: string;
  recommendedAction?: string;
}

const PRESCRIBING_REGEX = /(antibiotic\s+(dose|dosage|prescription|mg)|how\s+much\s+(amoxicillin|ciprofloxacin|cefixime|azithromycin|metronidazole|augmentin|doxycycline|gentamicin)|prescribe\s+(antibiotic|medication|drug)|dosage\s+of\s+(amox|cipro|cefixime|azithro)|give\s+(antibiotic|injection\s+antibiotic))/i;

export const checkPrescribingSafety = (query: string): SafetyCheckResult => {
  if (!query) {
    return { isRefusal: false };
  }

  if (PRESCRIBING_REGEX.test(query)) {
    return {
      isRefusal: true,
      reason: 'Out-of-scope antibiotic prescribing request.',
      prescribingWarning: 'SAFETY REFUSAL: Prescription antibiotic therapy requires physician diagnosis, clinical evaluation, and authorized medical prescription. ASHA workers are not authorized to prescribe or adjust antibiotic dosages independently.',
      recommendedAction: 'Advise the patient to visit the Primary Health Centre (PHC) / Community Health Centre (CHC) for physician assessment and formal prescription.'
    };
  }

  return { isRefusal: false };
};
