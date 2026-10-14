import { ProtocolDocument } from '../types';

export const OFFICIAL_PROTOCOLS: ProtocolDocument[] = [
  {
    id: 'mohfw-anc-01',
    code: 'MOHFW-ANC-2024-M5',
    title: 'Antenatal Care (ANC) & High-Risk Pregnancy Identification',
    titleTe: 'ప్రసవ పూర్వ సంరక్షణ (ANC) మరియు హై-రిస్క్ గర్భధారణ గుర్తింపు',
    titleHi: 'प्रसव पूर्व देखभाल (ANC) और उच्च जोखिम वाली गर्भावस्था की पहचान',
    category: 'MATERNAL',
    module: 'Module 5: Maternal Care',
    section: 'Section 3.2',
    citation: '[NHM ASHA Handbook 2024, Module 5: Maternal Care, Section 3.2]',
    summary: 'Standard schedule of 4 mandatory ANC checkups, IFA tablet distribution, calcium supplementation, identification of high-risk factors (severe anemia Hb < 7g/dl, hypertension BP >= 140/90, twin gestation, previous caesarean, adolescent pregnancy).',
    summaryTe: '4 తప్పనిసరి ANC పరీక్షలు, IFA మరియు కాల్షియం సప్లిమెంటేషన్, మరియు హై-రిస్క్ లక్షణాల గుర్తింపు (తీవ్ర రక్తహీనత Hb < 7g/dl, అధిక రక్తపోటు).',
    summaryHi: '4 अनिवार्य ANC जांचें, IFA और कैल्शियम पूरकता, तथा उच्च जोखिम कारकों (गंभीर एनीमिया, उच्च रक्तचाप) की पहचान।',
    dangerSignsCovered: [
      'High blood pressure (>= 140/90 mmHg)',
      'Severe pallor / severe anemia (Hb < 7 g/dL)',
      'Swelling of face, hands and feet',
      'Decreased fetal movements after 28 weeks',
      'Persistent severe headache'
    ],
    redFlags: [
      'Diastolic BP >= 90 mmHg with protein in urine',
      'Severe breathlessness at rest',
      'Fetal movements less than 10 in 12 hours'
    ],
    clinicalSteps: [
      'Register pregnancy within first 12 weeks and issue MCP card.',
      'Ensure at least 4 ANC visits (1st: <= 12 wks, 2nd: 14-26 wks, 3rd: 28-34 wks, 4th: 36 wks to term).',
      'Check BP, weight, abdominal palpation, and urine albumin at every visit.',
      'Provide 180 IFA tablets (start from 2nd trimester) and 360 Calcium tablets.',
      'Administer 2 doses of Td vaccine at least 4 weeks apart (or Td booster if vaccinated within last 3 years).',
      'Counsel on birth preparedness: 108 ambulance contact, nearest FRU, blood donor identification.'
    ],
    dosAndDonts: {
      dos: [
        'Measure BP in sitting position after 5 minutes of rest.',
        'Advise extra one meal per day and 2 hours of day rest plus 8 hours night sleep.',
        'Encourage institutional delivery under Janani Suraksha Yojana (JSY).'
      ],
      donts: [
        'Do not skip iron tablets due to mild nausea; advise taking after meals at bedtime.',
        'Never delay referring a woman with BP >= 140/90 mmHg.',
        'Never prescribe anti-hypertensive drugs independently; only physician can prescribe.'
      ]
    }
  },
  {
    id: 'mohfw-aph-02',
    code: 'MOHFW-APH-2023-S4',
    title: 'Third-Trimester Vaginal Bleeding (Antepartum Hemorrhage)',
    titleTe: 'గర్భధారణ చివరి త్రైమాసికంలో రక్తస్రావం (APH)',
    titleHi: 'गर्भावस्था की तीसरी तिमाही में योनि से रक्तस्राव (एंटीपार्टम रक्तस्राव)',
    category: 'MATERNAL',
    module: 'Obstetric Emergencies Manual',
    section: 'Section 4.1',
    citation: '[MoHFW Emergency Obstetric Care Guidelines 2023, Section 4.1]',
    summary: 'Any vaginal bleeding occurring after 28 weeks of gestation is an obstetric emergency indicative of Placenta Previa or Abruptio Placentae. Requires immediate 108 ambulance mobilization to a First Referral Unit (FRU) with surgical and blood transfusion facilities.',
    summaryTe: '28 వారాల తర్వాత కనిపించే రక్తస్రావం అత్యవసర పరిస్థితి. వెంటనే 108 అంబులెన్స్ ద్వారా బ్లడ్ బ్యాంక్ సౌకర్యం ఉన్న ఆసుపత్రికి తరలించాలి.',
    summaryHi: '28 सप्ताह के बाद कोई भी रक्तस్రాव आपातकालीन स्थिति है। तत्काल 108 एम्बुलेंस बुलाकर एफआरयू/ब्लड बैंक वाले अस्पताल ले जाएं।',
    dangerSignsCovered: [
      'Third-trimester bleeding',
      'Vaginal bleeding during pregnancy',
      'Painful bleeding with rigid abdomen (Abruptio)',
      'Painless bright red bleeding (Placenta Previa)'
    ],
    redFlags: [
      'Rapid weak pulse, low BP, cold clammy extremities (Shock)',
      'Severe abdominal pain with hard, tender uterus',
      'Continuous fresh bleeding soaking clothes'
    ],
    clinicalSteps: [
      'DO NOT perform any per-vaginal (PV) examination under any circumstances (risk of torrential fatal hemorrhage).',
      'Call 108 Emergency Ambulance immediately; inform emergency call center that this is an obstetric bleed.',
      'Place mother in left lateral recumbent position to prevent supine hypotension and improve placental perfusion.',
      'Keep mother warm; do not give oral fluids or food in case emergency caesarean section is required.',
      'If trained ANM is available, start wide-bore IV line (16G or 18G) with Normal Saline / Ringer Lactate.',
      'Accompany mother to FRU/District Hospital with MCP card and blood donor relatives.'
    ],
    dosAndDonts: {
      dos: [
        'Arrange transport immediately via 108 ambulance.',
        'Notify the Medical Officer and destination FRU before departure.',
        'Keep mother lying on her left side.'
      ],
      donts: [
        'ABSOLUTELY NEVER perform internal / vaginal examination (PV).',
        'Do not wait or observe at home.',
        'Do not give sedative medications or home remedies.'
      ]
    }
  },
  {
    id: 'mohfw-ecl-03',
    code: 'MOHFW-ECL-2023-M3',
    title: 'Severe Pre-Eclampsia and Eclampsia (Convulsions & Fits in Pregnancy)',
    titleTe: 'తీవ్ర ప్రీ-ఎక్లాంప్సియా మరియు ఎక్లాంప్సియా (గర్భిణీలో ఫిట్స్/మూర్ఛ)',
    titleHi: 'गंभीर प्री-एक्लेमप्सिया और एक्लेमप्सिया (गर्भावस्था में दौरे/आक्षेप)',
    category: 'MATERNAL',
    module: 'Module 3: Complications in Pregnancy',
    section: 'Section 2.4',
    citation: '[MoHFW Maternal Health Division Guidelines 2023, Module 3, Section 2.4]',
    summary: 'Convulsions occurring in pregnancy, labor, or postpartum accompanied by severe hypertension. Imminent signs include severe epigastric pain, headache, and blurred vision.',
    summaryTe: 'గర్భధారణ లేదా ప్రసవ సమయంలో వచ్చే ఫిట్స్ ప్రాణాంతకం. వెంటనే మెగ్నీషియం సల్ఫేట్ మరియు ఆసుపత్రి తరలింపు అవసరం.',
    summaryHi: 'गर्भावस्था में दौरे अत्यंत घातक स्थिति हैं। सिरदर्द और दृष्टि धुंधली होना इसके मुख्य पूर्व-लक्षण हैं। तत्काल रेफर करें।',
    dangerSignsCovered: [
      'Convulsions / fits / seizures in pregnancy',
      'Severe persistent frontal headache',
      'Blurring of vision / spots before eyes',
      'Severe epigastric pain or right upper quadrant pain',
      'Blood pressure >= 160/110 mmHg'
    ],
    redFlags: [
      'Active generalized tonic-clonic seizure',
      'Loss of consciousness or altered sensorium',
      'Diastolic BP >= 110 mmHg with hyperreflexia'
    ],
    clinicalSteps: [
      'Ensure airway safety: turn mother to left lateral side, clear mouth secretions, do not insert objects between teeth.',
      'Prevent physical injury during fit without forcibly restraining limbs.',
      'Call 108 ambulance immediately for priority dispatch to FRU.',
      'Alert ANM / Medical Officer for pre-referral loading dose of Magnesium Sulfate (MgSO4) if authorized protocol trained.',
      'Administer oxygen if available at sub-centre.',
      'Keep mother in quiet, dimly lit environment to minimize seizure triggers during transport.'
    ],
    dosAndDonts: {
      dos: [
        'Turn patient to left side immediately to maintain open airway.',
        'Ensure urgent referral with skilled companion.',
        'Monitor respiratory rate.'
      ],
      donts: [
        'Do not force wooden sticks, spoons, or hands into the mouth during convulsions.',
        'Do not give oral fluids or tablets to an unconscious or drowsy patient.',
        'Do not leave the mother unattended.'
      ]
    }
  },
  {
    id: 'mohfw-pph-04',
    code: 'NHM-PPH-2023-M4',
    title: 'Postpartum Hemorrhage (PPH - Excessive Bleeding After Delivery)',
    titleTe: 'ప్రసవానంతర అధిక రక్తస్రావం (PPH)',
    titleHi: 'प्रसवोत्तर अत्यधिक रक्तस्राव (PPH)',
    category: 'MATERNAL',
    module: 'Module 4: Labour & PPH',
    section: 'Section 2.1',
    citation: '[NHM SBA Protocol 2023, Module 4: Management of Third Stage of Labour & PPH, Section 2.1]',
    summary: 'Excessive blood loss after delivery: soaking 2 or more sanitary pads within 30 minutes, continuous trickle of dark or bright blood, or mother becoming pale, giddy, and sweating.',
    summaryTe: 'ప్రసవం తర్వాత 30 నిమిషాల్లో 2 కంటే ఎక్కువ ప్యాడ్లు తడిసేలా రక్తస్రావం కావడం అత్యవసరం. గర్భాశయ మసాజ్ మరియు తక్షణ ఆసుపత్రి తరలింపు ముఖ్యం.',
    summaryHi: 'प्रसव के बाद 30 मिनट में 2 से अधिक पैड भीगना अत्यधिक रक्तस्राव (PPH) का संकेत है। गर्भाशय की मालिश करें और तुरंत अस्पताल ले जाएं।',
    dangerSignsCovered: [
      'Postpartum hemorrhage / heavy bleeding after delivery',
      'Soaking 2 or more pads in 30 minutes',
      'Passage of large blood clots (> golf ball size)',
      'Pale, clammy skin, fast weak pulse, dizziness'
    ],
    redFlags: [
      'Uterus is soft, boggy, and relaxed above umbilicus',
      'Systolic BP < 90 mmHg, pulse > 110 bpm',
      'Sudden collapse or unconsciousness'
    ],
    clinicalSteps: [
      'Call 108 Emergency Ambulance immediately.',
      'Perform continuous uterine massage with palm through abdominal wall until uterus becomes firm and contracted like a cricket ball.',
      'Encourage mother to empty bladder (a full bladder prevents uterine contraction).',
      'Encourage immediate breastfeeding (stimulates natural oxytocin release).',
      'Expel clots from vagina gently while supporting uterine fundus.',
      'Accompany woman in ambulance, continuing uterine massage throughout transit.'
    ],
    dosAndDonts: {
      dos: [
        'Massage the fundus continuously until firm.',
        'Put newborn to the breast immediately to release natural oxytocin.',
        'Keep mother warm and legs elevated.'
      ],
      donts: [
        'Do not pack the vagina with cloth or cotton.',
        'Do not stop uterine massage if uterus remains soft.',
        'Do not delay transfer waiting for bleeding to stop.'
      ]
    }
  },
  {
    id: 'mohfw-resusc-05',
    code: 'NSSK-ENC-2023-M1',
    title: 'Newborn Asphyxia & Immediate Resuscitation',
    titleTe: 'నవజాత శిశువు ఊపిరి ఆడకపోవడం మరియు తక్షణ పునరుజ్జీవనం',
    titleHi: 'नवजात शिशु में सांस की समस्या और तत्काल पुनरुद्धार',
    category: 'NEWBORN',
    module: 'Navjaat Shishu Suraksha Karyakram (NSSK)',
    section: 'Section 1.3',
    citation: '[NSSK & INAP Protocols 2023, Module 1: Essential Newborn Care, Section 1.3]',
    summary: 'The Golden Minute: If newborn is not crying or breathing within 30 seconds of birth, immediate action is required to prevent hypoxic brain injury or neonatal death.',
    summaryTe: 'పుట్టిన వెంటనే మొదటి నిమిషంలో శిశువు ఏడవకపోయినా లేదా ఊపిరి తీసుకోకపోయినా వెంటనే వెచ్చదనం, పొడి గుడ్డతో తుడవడం మరియు బ్యాగ్ & మాస్క్ అవసరం.',
    summaryHi: 'स्वर्णिम मिनट (गोल्डन मिनट): जन्म के पहले 30 सेकंड में यदि शिशु रोए या सांस न ले, तो तत्काल सक्शन और बैग-मास्क वेंटिलेशन आवश्यक है।',
    dangerSignsCovered: [
      'Newborn not breathing / not crying at birth',
      'Gasping breathing in newborn',
      'Blue or pale skin (central cyanosis)',
      'Floppy baby with poor muscle tone'
    ],
    redFlags: [
      'Heart rate < 100 beats per minute',
      'Persistent apnoea after drying and tactile stimulation',
      'Severe respiratory grunting with retractions'
    ],
    clinicalSteps: [
      'Dry the baby immediately with a warm, dry towel and discard the wet towel.',
      'Provide tactile stimulation by gently rubbing the back 2-3 times.',
      'Keep head in slightly extended "sniffing" position to keep airway clear.',
      'If baby is still not breathing or gasping, call 108 and alert delivery team.',
      'Initiate Bag and Mask ventilation with room air at 40-60 breaths per minute within the first minute of life.',
      'Observe for gentle rise of baby chest with each ventilation squeeze.'
    ],
    dosAndDonts: {
      dos: [
        'Act within the first golden minute (first 60 seconds).',
        'Use room air initially for newborn ventilation.',
        'Keep baby under radiant warmer or on mother skin-to-skin.'
      ],
      donts: [
        'Do not hold baby upside down or slap the feet.',
        'Do not perform vigorous deep suctioning (causes vagal bradycardia).',
        'Do not bathe newborn within first 24 hours.'
      ]
    }
  },
  {
    id: 'mohfw-sepsis-06',
    code: 'IMNCI-INFANT-2024-M2',
    title: 'Possible Serious Bacterial Infection (PSBI) & Sepsis in Young Infant',
    titleTe: 'నవజాత శిశువులలో తీవ్ర బ్యాక్టీరియల్ ఇన్ఫెక్షన్ (సెప్సిస్)',
    titleHi: 'छोटे शिशुओं में गंभीर जीवाणु संक्रमण (सेप्सिस) के संकेत',
    category: 'NEWBORN',
    module: 'Module 2: Young Infant (0-2 Months)',
    section: 'Section 2.2',
    citation: '[IMNCI Operational Guidelines 2024, Module 2: Young Infant (0-2 Months), Section 2.2]',
    summary: 'Clinical algorithm for identifying Possible Serious Bacterial Infection (PSBI) in infants under 2 months: respiratory rate >= 60/min, severe chest indrawing, hypothermia, hyperthermia, poor feeding, or convulsions.',
    summaryTe: '2 నెలలలోపు శిశువులో పాలు తాగలేకపోవడం, నిమిషానికి 60 కంటే ఎక్కువ ఊపిరి, ఛాతీ లోపలికి లాగడం, లేదా శరీరం చల్లబడటం అత్యవసర ప్రమాదం.',
    summaryHi: '2 महीने से छोटे बच्चे में दूध न पीना, छाती का धंसना, 60 से तेज सांस या शरीर ठंडा पड़ना गंभीर संक्रमण के लक्षण हैं। तत्काल रेफर करें।',
    dangerSignsCovered: [
      'Severe newborn chest indrawing',
      'Fast breathing (> 60 breaths per minute)',
      'Hypothermia (temperature < 35.5°C) or high fever (> 37.5°C)',
      'Lethargic / unable to feed or suck breastmilk',
      'Umbilical redness extending to surrounding abdominal skin with pus',
      'Newborn convulsions or abnormally weak movement'
    ],
    redFlags: [
      'Inability to feed at all',
      'Stridor while calm or audible grunting',
      'Severe jaundice on palms and soles within 24 hours of birth'
    ],
    clinicalSteps: [
      'Count breaths for 1 full minute when infant is calm. If >= 60, recount.',
      'Check axillary temperature for 3 minutes.',
      'If any PSBI danger sign is present, classify as SEVERE BACTERIAL INFECTION.',
      'Initiate emergency referral via 108 ambulance to SNCU (Special Newborn Care Unit) / District Hospital.',
      'Advise mother to practice Kangaroo Mother Care (KMC) during transport to prevent hypothermia.',
      'If baby can suck, encourage breastfeeding during transit.'
    ],
    dosAndDonts: {
      dos: [
        'Keep baby warm with skin-to-skin contact (KMC) or cap and socks.',
        'Refer immediately to the nearest SNCU/FRU.',
        'Count respiratory rate for a full 60 seconds.'
      ],
      donts: [
        'Do not administer oral antibiotic syrups without physician prescription.',
        'Do not bathe a sick or hypothermic newborn.',
        'Never delay referral waiting for next morning.'
      ]
    }
  },
  {
    id: 'mohfw-nis-07',
    code: 'UIP-NIS-2024-S1',
    title: 'National Immunization Schedule (NIS) Guidelines',
    titleTe: 'జాతీయ టీకాల పట్టిక (NIS) మార్గదర్శకాలు',
    titleHi: 'राष्ट्रीय टीकाकरण सारणी (NIS) दिशानिर्देश',
    category: 'IMMUNIZATION',
    module: 'Universal Immunization Programme (UIP)',
    section: 'Section 1.1',
    citation: '[National Immunization Schedule (NIS) India 2024, Universal Immunization Programme (UIP), Section 1]',
    summary: 'Authoritative schedule of infant vaccines: At birth (BCG, OPV-0, Hep B-0); 6, 10, 14 weeks (Pentavalent-1/2/3, OPV-1/2/3, Rotavirus-1/2/3, fIPV-1/2, PCV-1/2); 9-12 months (MR-1, PCV booster, JE-1, Vitamin A-1); 16-24 months (MR-2, DPT booster-1, OPV booster, JE-2, Vitamin A-2).',
    summaryTe: 'జననం నుండి 2 సంవత్సరాల వరకు అందించే పూర్తి టీకాల జాబితా (BCG, పోలియో, పెంటావాలెంట్, రోటా, మీజిల్స్-రుబెల్లా).',
    summaryHi: 'जन्म से 2 वर्ष तक के संपूर्ण टीकाकरण का विवरण (बीसीजी, पोलियो, पेंटावैलेंट, रोटावायरस, खसरा-रूबेला)।',
    dangerSignsCovered: [
      'Missed vaccine / overdue immunization',
      'Adverse Event Following Immunization (AEFI)',
      'Severe allergic reaction (anaphylaxis) post-vaccination'
    ],
    redFlags: [
      'High fever > 39°C with convulsions post-vaccine',
      'Persistent inconsolable screaming for > 3 hours',
      'Abscess at injection site with cellulitis'
    ],
    clinicalSteps: [
      'Cross-check MCP card to identify age-appropriate vaccines due.',
      'Verify cold chain integrity: check Vaccine Vial Monitor (VVM) is in usable stage (stage 1 or 2).',
      'Maintain 4 Key Messages for mother: What vaccine is given, What mild side effects may happen, How to manage mild fever (paracetamol drops if advised by ANM, cool cloth), and When to return for next dose.',
      'Record batch number, injection site, and date on MCP card and RCH register.',
      'Report any suspected AEFI immediately to ANM and Medical Officer.'
    ],
    dosAndDonts: {
      dos: [
        'Always check VVM status before administering vaccine.',
        'Reassure mother that mild fever after Pentavalent is expected and normal.',
        'Keep child under observation for 30 minutes after immunization.'
      ],
      donts: [
        'Never use reconstituted BCG or MR vaccines after 4 hours of opening.',
        'Do not apply hot fomentation or press injection site vigorously.',
        'Never discard unused opened vials without recording.'
      ]
    }
  },
  {
    id: 'mohfw-diarrhea-08',
    code: 'IMNCI-DIARRHEA-2024-M3',
    title: 'Childhood Diarrhea, Dehydration Assessment & ORS/Zinc Protocol',
    titleTe: 'పిల్లలలో విరేచనాలు, డీహైడ్రేషన్ మరియు ORS / జింక్ ప్రోటోకాల్',
    titleHi: 'बच्चों में दस्त, डिहाइड्रेशन और ओआरएस/जिंक प्रोटोकॉल',
    category: 'COMMUNICABLE',
    module: 'Module 3: Diarrheal Diseases',
    section: 'Section 3.1',
    citation: '[IMNCI Guidelines 2024, Module 3: Diarrhea & Dehydration Management, Section 3.1]',
    summary: 'Classification of dehydration into No Dehydration, Some Dehydration, and Severe Dehydration. Standard administration of Oral Rehydration Salts (ORS) and 14 days of Zinc supplementation (10 mg for < 6 mo, 20 mg for >= 6 mo).',
    summaryTe: 'డీహైడ్రేషన్ తీవ్రతను అంచనా వేసి ORS ద్రావణం మరియు 14 రోజుల పాటు జింక్ మాత్రలు అందించాలి.',
    summaryHi: 'निर्जलीकरण के स्तर का आकलन करें तथा ओआरएस घोल और 14 दिनों के लिए जिंक की खुराक दें।',
    dangerSignsCovered: [
      'Severe dehydration / child lethargic or unconscious',
      'Sunken eyes',
      'Skin pinch goes back very slowly (> 2 seconds)',
      'Unable to drink or drinking poorly',
      'Blood in stools (dysentery)'
    ],
    redFlags: [
      'Child lethargic or unconscious with sunken eyes',
      'Skin pinch test takes > 2 seconds to flatten',
      'Signs of shock (cold hands, rapid thready pulse)'
    ],
    clinicalSteps: [
      'Assess for 4 signs: General condition (alert, restless, lethargic), Eyes (normal or sunken), Offer drink (eagerly or unable), Skin pinch on abdomen (immediate, slow, very slow).',
      'If two or more signs of Severe Dehydration: Classify as SEVERE DEHYDRATION -> Urgent 108 referral for IV Ringer Lactate.',
      'If Some Dehydration: Administer Plan B (ORS 75 ml/kg over 4 hours under ASHA observation).',
      'Provide Zinc tablets for 14 days without stopping even if diarrhea ceases.',
      'Advise continuous breastfeeding and increased home fluids (rice kanji, buttermilk, dal water).'
    ],
    dosAndDonts: {
      dos: [
        'Mix 1 packet of ORS in exactly 1 liter of clean drinking water.',
        'Give Zinc for the full 14 consecutive days.',
        'Continue frequent breastfeeding throughout diarrheal episode.'
      ],
      donts: [
        'Do not give commercial anti-motility drugs (Loperamide) to children under 12 years.',
        'Do not dilute ORS with tea, juice, or milk.',
        'Never restrict food or fluids during diarrhea.'
      ]
    }
  }
];
