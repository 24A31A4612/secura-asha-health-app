import { OFFICIAL_PROTOCOLS } from '../database/protocolsData';
import { ProtocolDocument } from '../types';

export interface RetrievalResult {
  found: boolean;
  protocol: ProtocolDocument | null;
  citation: string | null;
  relevanceScore: number;
  extractedSnippet: string;
}

// Tokenize and clean text
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);
};

export const retrieveProtocolForQuery = (query: string): RetrievalResult => {
  if (!query || query.trim().length === 0) {
    return {
      found: false,
      protocol: null,
      citation: null,
      relevanceScore: 0,
      extractedSnippet: 'Protocol evidence unavailable for this specific scenario. Please refer the patient immediately to the Medical Officer / PHC.'
    };
  }

  const queryTokens = tokenize(query);

  let bestProtocol: ProtocolDocument | null = null;
  let highestScore = 0;

  for (const protocol of OFFICIAL_PROTOCOLS) {
    const docText = `${protocol.title} ${protocol.summary} ${protocol.dangerSignsCovered.join(' ')} ${protocol.redFlags.join(' ')} ${protocol.clinicalSteps.join(' ')} ${protocol.dosAndDonts.dos.join(' ')}`;
    const docTokens = new Set(tokenize(docText));

    let matches = 0;
    for (const token of queryTokens) {
      if (docTokens.has(token)) {
        matches++;
      }
    }

    // Weight score by match ratio and critical keyword boosts
    let score = matches / Math.max(queryTokens.length, 1);

    // Boost on exact category/title match
    if (query.toLowerCase().includes('bleeding') && protocol.id === 'mohfw-aph-02') score += 1.5;
    if (query.toLowerCase().includes('pph') && protocol.id === 'mohfw-pph-04') score += 1.5;
    if (query.toLowerCase().includes('convulsion') && protocol.id === 'mohfw-ecl-03') score += 1.5;
    if (query.toLowerCase().includes('seizure') && protocol.id === 'mohfw-ecl-03') score += 1.5;
    if (query.toLowerCase().includes('resuscitation') && protocol.id === 'mohfw-resusc-05') score += 1.5;
    if ((query.toLowerCase().includes('immuniz') || query.toLowerCase().includes('vaccin') || query.toLowerCase().includes('pentavalent') || query.toLowerCase().includes('measles')) && protocol.id === 'mohfw-nis-07') score += 1.5;
    if ((query.toLowerCase().includes('diarrhea') || query.toLowerCase().includes('dehydration') || query.toLowerCase().includes('ors')) && protocol.id === 'mohfw-diarrhea-08') score += 1.5;
    if ((query.toLowerCase().includes('anc') || query.toLowerCase().includes('ifa') || query.toLowerCase().includes('calcium') || query.toLowerCase().includes('antenatal')) && protocol.id === 'mohfw-anc-01') score += 1.5;
    if ((query.toLowerCase().includes('chest indrawing') || query.toLowerCase().includes('psbi') || query.toLowerCase().includes('hypothermia')) && protocol.id === 'mohfw-sepsis-06') score += 1.5;

    if (score > highestScore) {
      highestScore = score;
      bestProtocol = protocol;
    }
  }

  // Minimum threshold to avoid inventing protocol match
  if (highestScore < 0.25 || !bestProtocol) {
    return {
      found: false,
      protocol: null,
      citation: null,
      relevanceScore: highestScore,
      extractedSnippet: 'Protocol evidence unavailable for this specific scenario. Please refer the patient immediately to the Medical Officer / PHC.'
    };
  }

  // Format verified snippet
  const snippet = `### Guidance from ${bestProtocol.citation}

**Summary:** ${bestProtocol.summary}

**Mandatory Clinical Steps:**
${bestProtocol.clinicalSteps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

**Key Red Flags:**
${bestProtocol.redFlags.map(rf => `• ${rf}`).join('\n')}

**Standard Care Guidance:**
• Do: ${bestProtocol.dosAndDonts.dos.join('; ')}
• Don't: ${bestProtocol.dosAndDonts.donts.join('; ')}`;

  return {
    found: true,
    protocol: bestProtocol,
    citation: bestProtocol.citation,
    relevanceScore: highestScore,
    extractedSnippet: snippet
  };
};
