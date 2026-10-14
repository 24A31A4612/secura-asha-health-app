import { evaluateDangerSigns } from './dangerSignEngine';
import { checkPrescribingSafety } from './safetyRefusal';
import { retrieveProtocolForQuery } from './protocolRetrieval';
import { DangerSignEvaluation } from '../types';

export interface AssistantResponse {
  answer: string;
  citation: string | null;
  dangerSignDetected: boolean;
  dangerDetails?: DangerSignEvaluation;
  isRefusal: boolean;
  isOffline: boolean;
}

export const processHealthWorkerQuery = async (
  query: string,
  isForcedOffline: boolean = false
): Promise<AssistantResponse> => {
  // 1. STEP 1: DETERMINISTIC DANGER SIGN DETECTION (Hard-coded safety layer)
  // Must execute BEFORE any language-model or retrieval reasoning.
  const dangerEval = evaluateDangerSigns(query);
  if (dangerEval.isEmergency) {
    const retrieval = retrieveProtocolForQuery(query);
    const emergencyCitation = retrieval.citation || '[MoHFW Emergency Obstetric & Neonatal Guidelines 2023]';

    return {
      answer: `🚨 CRITICAL EMERGENCY ESCALATION TRIGGERED\n\nIdentified Danger Sign: ${dangerEval.dangerSignName}\n\nImmediate Protocol Referral:\n${dangerEval.referralInstruction}\n\nMandatory Life-Saving Actions:\n${dangerEval.immediateActions.map((action, i) => `${i + 1}. ${action}`).join('\n')}\n\nEmergency Helpline: Dial ${dangerEval.emergencyHelpline} Ambulance Immediately.\nNotify the Primary Health Centre (PHC) / Community Health Centre (CHC) medical officer on duty.`,
      citation: emergencyCitation,
      dangerSignDetected: true,
      dangerDetails: dangerEval,
      isRefusal: false,
      isOffline: isForcedOffline
    };
  }

  // 2. STEP 2: SAFETY PRESCRIBING REFUSAL
  const safetyCheck = checkPrescribingSafety(query);
  if (safetyCheck.isRefusal) {
    return {
      answer: `${safetyCheck.prescribingWarning}\n\n${safetyCheck.recommendedAction}`,
      citation: '[National Health Mission ASHA Guidelines: Scope of Practice & Medicines]',
      dangerSignDetected: false,
      isRefusal: true,
      isOffline: isForcedOffline
    };
  }

  // 3. STEP 3: PROTOCOL RETRIEVAL (Local MoHFW Verified Database)
  const retrieval = retrieveProtocolForQuery(query);

  if (!retrieval.found) {
    return {
      answer: 'Protocol evidence unavailable for this specific scenario. Please refer the patient immediately to the Medical Officer / PHC for clinical evaluation.',
      citation: null,
      dangerSignDetected: false,
      isRefusal: false,
      isOffline: isForcedOffline
    };
  }

  // 4. STEP 4: OFFLINE OR ONLINE SYNTHESIS
  // In offline mode, use the verified protocol snippet directly
  if (isForcedOffline || !navigator.onLine) {
    return {
      answer: retrieval.extractedSnippet,
      citation: retrieval.citation,
      dangerSignDetected: false,
      isRefusal: false,
      isOffline: true
    };
  }

  // In online mode, try calling Gemini API if configured or fall back safely to local protocol synthesis
  try {
    // If window has an env key or server endpoint
    const response = await fetch('/api/ask-seva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, contextProtocol: retrieval.extractedSnippet })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        answer: data.answer || retrieval.extractedSnippet,
        citation: retrieval.citation,
        dangerSignDetected: false,
        isRefusal: false,
        isOffline: false
      };
    }
  } catch {
    // Network or server fallback
  }

  // Graceful fallback to verified local retrieval
  return {
    answer: retrieval.extractedSnippet,
    citation: retrieval.citation,
    dangerSignDetected: false,
    isRefusal: false,
    isOffline: true
  };
};
