import { Language } from '../types';

export interface Translations {
  // App Branding & General
  appName: string;
  appTagline: string;
  appDescription: string;
  online: string;
  offline: string;
  onlineStatusText: string;
  offlineStatusText: string;
  switchToOffline: string;
  switchToOnline: string;
  syncQueue: string;
  synced: string;
  pendingSync: string;
  syncNow: string;
  lastSynced: string;
  neverSynced: string;

  // Navigation
  navHome: string;
  navVisits: string;
  navHouseholds: string;
  navAskSeva: string;
  navProtocols: string;
  navSync: string;
  navSettings: string;
  navEvaluator: string;

  // Auth & Welcome
  welcomeTitle: string;
  welcomeSub: string;
  welcomeDesc: string;
  signIn: string;
  signUp: string;
  signOut: string;
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  fullNameLabel: string;
  ashaIdLabel: string;
  subCentreLabel: string;
  villageLabel: string;
  phoneLabel: string;
  privacyConsentLabel: string;
  continueWithGoogle: string;
  signInWithBiometrics: string;
  biometricEnrolled: string;
  biometricNotEnrolled: string;
  enableBiometrics: string;
  biometricConsentNotice: string;
  biometricFallbackNote: string;
  noAccountPrompt: string;
  alreadyHaveAccount: string;
  loginSuccess: string;
  loginError: string;
  registrationSuccess: string;
  passwordsDoNotMatch: string;
  allFieldsRequired: string;
  selectLanguage: string;
  googleConfigNotice: string;

  // Dashboard / Home
  greeting: string;
  todaysVisitsTitle: string;
  todaysVisitsSubtitle: string;
  highRiskHouseholds: string;
  immunizationDue: string;
  pncFollowups: string;
  ancFollowups: string;
  activeHouseholds: string;
  dueToday: string;
  overdue: string;
  upcoming: string;
  completed: string;
  urgentActionNeeded: string;
  quickActions: string;
  newHousehold: string;
  askGuidance: string;
  browseProtocols: string;

  // Visits
  visitListTitle: string;
  filterAll: string;
  filterAnc: string;
  filterPnc: string;
  filterImm: string;
  filterOverdue: string;
  markCompleted: string;
  recordVitals: string;
  visitReason: string;
  visitNotes: string;
  visitCompletedSuccess: string;
  priorityCritical: string;
  priorityHigh: string;
  priorityNormal: string;

  // Households
  householdRegisterTitle: string;
  searchHouseholdsPlaceholder: string;
  addHouseholdTitle: string;
  headOfFamily: string;
  householdNo: string;
  totalMembers: string;
  socioeconomicStatus: string;
  pregnantWomen: string;
  infants: string;
  viewDetails: string;
  householdSavedSuccess: string;

  // Ask Seva (Health AI Assistant)
  askSevaTitle: string;
  askSevaSubtitle: string;
  askSevaPlaceholder: string;
  askSevaDisclaimer: string;
  protocolCitationTitle: string;
  protocolUnavailableNotice: string;
  safetyRefusalNotice: string;
  sendQuestion: string;
  thinking: string;
  suggestedQuestions: string;
  offlineAiNotice: string;

  // Emergency Danger Sign Escalation
  emergencyTitle: string;
  emergencyDetected: string;
  immediateReferralRequired: string;
  callAmbulance108: string;
  dangerSignsList: string;
  actionProtocol: string;
  closeAlert: string;
  notifyMO: string;

  // Protocols
  protocolsTitle: string;
  protocolsSubtitle: string;
  searchProtocols: string;
  clinicalActions: string;
  redFlagsTitle: string;
  dosAndDontsTitle: string;
  officialCitation: string;
  officialLanguageNote: string;

  // Settings & Evaluator
  settingsTitle: string;
  profileSection: string;
  deviceSection: string;
  languageSection: string;
  storageSection: string;
  evaluatorTitle: string;
  runEvaluator: string;
  evaluatorNotice: string;
}

const en: Translations = {
  appName: 'Secura',
  appTagline: 'Smarter Support for ASHA Workers',
  appDescription: 'Protocol-based clinical health guidance, automated household follow-ups, danger sign escalation, and offline access for frontline healthcare champions.',
  online: 'Online',
  offline: 'Offline Mode',
  onlineStatusText: 'Connected to cloud network',
  offlineStatusText: 'Working locally · All protocols cached',
  switchToOffline: 'Switch to Offline Mode',
  switchToOnline: 'Switch to Online Mode',
  syncQueue: 'Sync Queue',
  synced: 'Synchronized',
  pendingSync: 'Pending Cloud Sync',
  syncNow: 'Sync Queued Changes',
  lastSynced: 'Last Synced',
  neverSynced: 'Not Synced Yet',

  navHome: 'Dashboard',
  navVisits: 'Daily Visits',
  navHouseholds: 'Households',
  navAskSeva: 'Ask Seva',
  navProtocols: 'Protocols',
  navSync: 'Sync Centre',
  navSettings: 'Settings',
  navEvaluator: 'Safety Evaluator',

  welcomeTitle: 'Secura',
  welcomeSub: 'Smarter Support for ASHA Workers',
  welcomeDesc: 'Secura supports frontline health workers with protocol-based health guidance, household follow-ups, and offline access.',
  signIn: 'Sign In',
  signUp: 'Create ASHA Account',
  signOut: 'Sign Out',
  emailLabel: 'Email Address',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm Password',
  fullNameLabel: 'ASHA Full Name',
  ashaIdLabel: 'ASHA Worker ID / Code',
  subCentreLabel: 'Sub-Centre / PHC',
  villageLabel: 'Assigned Village / Ward',
  phoneLabel: 'Mobile Phone Number',
  privacyConsentLabel: 'I agree to the frontline healthcare data security & privacy standards',
  continueWithGoogle: 'Continue with Google',
  signInWithBiometrics: 'Sign In with Fingerprint / Passkey',
  biometricEnrolled: 'Device Passkey / Biometrics Active',
  biometricNotEnrolled: 'Set Up Biometric / Passkey Sign-In',
  enableBiometrics: 'Enroll Biometric Passkey',
  biometricConsentNotice: 'Biometrics use your device hardware security (WebAuthn). Secura never stores or transmits raw fingerprints or facial data.',
  biometricFallbackNote: 'Device does not support passkeys. Use secure password instead.',
  noAccountPrompt: "Don't have an account?",
  alreadyHaveAccount: 'Already have an account?',
  loginSuccess: 'Successfully authenticated. Welcome back!',
  loginError: 'Invalid email or password. Please try again.',
  registrationSuccess: 'Account created successfully! You can now sign in.',
  passwordsDoNotMatch: 'Passwords do not match.',
  allFieldsRequired: 'Please fill in all mandatory fields.',
  selectLanguage: 'Language / భాష / भाषा',
  googleConfigNotice: 'Google OAuth configuration required. Set GOOGLE_CLIENT_ID or use email/passkey authentication.',

  greeting: 'Namaste',
  todaysVisitsTitle: "Today's Visit Schedule",
  todaysVisitsSubtitle: 'Prioritized daily follow-ups by clinical urgency',
  highRiskHouseholds: 'High-Risk Mothers',
  immunizationDue: 'Immunization Due',
  pncFollowups: 'PNC Follow-ups',
  ancFollowups: 'ANC Checkups',
  activeHouseholds: 'Registered Households',
  dueToday: 'Due Today',
  overdue: 'Overdue',
  upcoming: 'Upcoming',
  completed: 'Completed',
  urgentActionNeeded: 'Requires Immediate Follow-up',
  quickActions: 'Quick Frontline Actions',
  newHousehold: 'Add Household',
  askGuidance: 'Ask Health Protocol',
  browseProtocols: 'Browse MoHFW Protocols',

  visitListTitle: 'Prioritized Visit Register',
  filterAll: 'All Visits',
  filterAnc: 'ANC Care',
  filterPnc: 'PNC Care',
  filterImm: 'Immunization',
  filterOverdue: 'Overdue Only',
  markCompleted: 'Mark Visited',
  recordVitals: 'Record Observations & Vitals',
  visitReason: 'Reason for Visit',
  visitNotes: 'ASHA Field Notes',
  visitCompletedSuccess: 'Visit successfully recorded and queued for sync.',
  priorityCritical: 'CRITICAL PRIORITY',
  priorityHigh: 'HIGH PRIORITY',
  priorityNormal: 'NORMAL',

  householdRegisterTitle: 'Household Health Register',
  searchHouseholdsPlaceholder: 'Search by family head, house number, or village...',
  addHouseholdTitle: 'Register New Household',
  headOfFamily: 'Head of Family',
  householdNo: 'House No.',
  totalMembers: 'Total Members',
  socioeconomicStatus: 'Socioeconomic Status',
  pregnantWomen: 'Pregnant Women',
  infants: 'Infants (0-1 yr)',
  viewDetails: 'View Household',
  householdSavedSuccess: 'Household record saved to local database.',

  askSevaTitle: 'Ask Seva — Clinical Protocol Assistant',
  askSevaSubtitle: 'Evidence-grounded health guidance strictly cited from official MoHFW & NHM protocols',
  askSevaPlaceholder: 'Ask a clinical or field question (e.g., third trimester bleeding, 9-month immunization, fever in newborn)...',
  askSevaDisclaimer: 'Safety Protocol: All queries are checked deterministically for danger signs before model reasoning. Prescriptions are refused.',
  protocolCitationTitle: 'Official Protocol Citation',
  protocolUnavailableNotice: 'Protocol evidence unavailable for this specific scenario. Please refer the patient immediately to the Medical Officer / PHC.',
  safetyRefusalNotice: 'Prescription antibiotic or medication dosage requires physician diagnosis. ASHA workers must not prescribe medications independently. Refer to Medical Officer.',
  sendQuestion: 'Send Question',
  thinking: 'Checking clinical safety protocols...',
  suggestedQuestions: 'Quick Protocol Prompts',
  offlineAiNotice: 'Operating in Offline Mode: Answers retrieved from verified local MoHFW knowledge base.',

  emergencyTitle: 'CRITICAL DANGER SIGN DETECTED',
  emergencyDetected: 'EMERGENCY ESCALATION TRIGGERED',
  immediateReferralRequired: 'IMMEDIATE REFERRAL REQUIRED TO FIRST REFERRAL UNIT (FRU) / PHC',
  callAmbulance108: 'Call 108 Ambulance Immediately',
  dangerSignsList: 'Identified Danger Signs',
  actionProtocol: 'Mandatory Emergency Actions',
  closeAlert: 'Acknowledge Emergency',
  notifyMO: 'Notify Medical Officer',

  protocolsTitle: 'Official MoHFW Health Protocols',
  protocolsSubtitle: 'Authoritative national guidelines for frontline maternal, newborn, and child healthcare',
  searchProtocols: 'Search protocols by symptom, module, or code...',
  clinicalActions: 'Mandatory Clinical Steps',
  redFlagsTitle: 'Emergency Red Flags',
  dosAndDontsTitle: "Do's and Don'ts",
  officialCitation: 'Official Ministry Citation',
  officialLanguageNote: 'Clinical guidance content is grounded in authoritative MoHFW/NHM national modules.',

  settingsTitle: 'Settings & Device Health',
  profileSection: 'ASHA Profile Information',
  deviceSection: 'Biometric & Device Security',
  languageSection: 'Application Language',
  storageSection: 'Offline Storage & Cache',
  evaluatorTitle: 'Protocol Safety & Escalation Evaluator',
  runEvaluator: 'Run 100% Safety Benchmark',
  evaluatorNotice: 'Automated evaluation suite verifying deterministic danger sign escalation, protocol citation integrity, and antibiotic refusal rules.',
};

const te: Translations = {
  appName: 'సెక్యురా',
  appTagline: 'ఆశా కార్యకర్తలకు సమగ్ర తోడ్పాటు',
  appDescription: 'ఆశా కార్యకర్తల కొరకు ప్రామాణిక ఆరోగ్య మార్గదర్శకాలు, గృహ పర్యవేక్షణ, అత్యవసర ప్రమాద హెచ్చరికలు మరియు ఆఫ్‌లైన్ సదుపాయం.',
  online: 'ఆన్‌లైన్',
  offline: 'ఆఫ్‌లైన్ మోడ్',
  onlineStatusText: 'నెట్‌వర్క్ కనెక్ట్ అయింది',
  offlineStatusText: 'ఆఫ్‌లైన్‌లో పనిచేస్తోంది · ప్రోటోకాల్స్ సిద్ధంగా ఉన్నాయి',
  switchToOffline: 'ఆఫ్‌లైన్ మోడ్‌కు మారండి',
  switchToOnline: 'ఆన్‌లైన్ మోడ్‌కు మారండి',
  syncQueue: 'సింక్ జాబితా',
  synced: 'సింక్ పూర్తయింది',
  pendingSync: 'సింక్ కావాల్సినవి',
  syncNow: 'డేటాను సింక్ చేయండి',
  lastSynced: 'చివరి సింక్',
  neverSynced: 'ఇంకా సింక్ కాలేదు',

  navHome: 'డ్యాష్‌బోర్డ్',
  navVisits: 'నేటి సందర్శనలు',
  navHouseholds: 'కుటుంబాల రిజిస్టర్',
  navAskSeva: 'సేవ సహాయకుడు',
  navProtocols: 'ప్రోటోకాల్స్',
  navSync: 'సింక్ కేంద్రం',
  navSettings: 'సెట్టింగ్‌లు',
  navEvaluator: 'భద్రతా మూల్యాంకనం',

  welcomeTitle: 'సెక్యురా',
  welcomeSub: 'ఆశా కార్యకర్తలకు సమగ్ర తోడ్పాటు',
  welcomeDesc: 'సెక్యురా ప్రామాణిక ఆరోగ్య మార్గదర్శకాలు, గృహ పర్యవేక్షణ మరియు ఆఫ్‌లైన్ సదుపాయంతో ఆరోగ్య కార్యకర్తలకు తోడ్పాటు అందిస్తుంది.',
  signIn: 'లాగిన్ అవ్వండి',
  signUp: 'ఆశా ఖాతా నమోదు',
  signOut: 'లాగ్ అవుట్',
  emailLabel: 'ఈమెయిల్ చిరునామా',
  passwordLabel: 'పాస్‌వర్డ్',
  confirmPasswordLabel: 'పాస్‌వర్డ్ నిర్ధారణ',
  fullNameLabel: 'ఆశా పూర్తి పేరు',
  ashaIdLabel: 'ఆశా వర్కర్ ఐడీ',
  subCentreLabel: 'ఉప-కేంద్రం / PHC',
  villageLabel: 'గ్రామం / వార్డు',
  phoneLabel: 'మొబైల్ ఫోన్ నంబర్',
  privacyConsentLabel: 'నేను ఆరోగ్య డేటా భద్రతా నిబంధనలను అంగీకరిస్తున్నాను',
  continueWithGoogle: 'గూగుల్‌తో కొనసాగండి',
  signInWithBiometrics: 'వేలిముద్ర / పాస్‌కీ ద్వారా లాగిన్',
  biometricEnrolled: 'బయోమెట్రిక్ పాస్‌కీ సక్రియంగా ఉంది',
  biometricNotEnrolled: 'బయోమెట్రిక్ లాగిన్ ఏర్పాటు చేసుకోండి',
  enableBiometrics: 'బయోమెట్రిక్ పాస్‌కీ నమోదు',
  biometricConsentNotice: 'బయోమెట్రిక్స్ మీ పరికర హార్డ్‌వేర్ సెక్యూరిటీని ఉపయోగిస్తుంది. సెక్యురా ముడి వేలిముద్రలను ఎప్పుడూ నిల్వ చేయదు.',
  biometricFallbackNote: 'పరికరంలో పాస్‌కీ సపోర్ట్ లేదు. పాస్‌వర్డ్ ఉపయోగించండి.',
  noAccountPrompt: 'ఖాతా లేదా?',
  alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
  loginSuccess: 'విజయవంతంగా లాగిన్ అయ్యారు!',
  loginError: 'ఈమెయిల్ లేదా పాస్‌వర్డ్ తప్పు. మళ్లీ ప్రయత్నించండి.',
  registrationSuccess: 'ఖాతా విజయవంతంగా సృష్టించబడింది! లాగిన్ అవ్వండి.',
  passwordsDoNotMatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.',
  allFieldsRequired: 'అన్ని తప్పనిసరి వివరాలను నమోదు చేయండి.',
  selectLanguage: 'భాష ఎంపిక / Select Language',
  googleConfigNotice: 'గూగుల్ లాగిన్ అందుబాటులో లేదు. ఈమెయిల్ మరియు పాస్‌వర్డ్ ఉపయోగించండి.',

  greeting: 'నమస్కారం',
  todaysVisitsTitle: 'నేటి సందర్శనల జాబితా',
  todaysVisitsSubtitle: 'వైద్య ప్రాధాన్యత ప్రకారం రూపొందించబడింది',
  highRiskHouseholds: 'హై-రిస్క్ గర్భిణీలు',
  immunizationDue: 'టీకాలు ఇవ్వాల్సినవి',
  pncFollowups: 'ప్రసవానంతర సంరక్షణ (PNC)',
  ancFollowups: 'గర్భధారణ తనిఖీలు (ANC)',
  activeHouseholds: 'నమోదైన గృహాలు',
  dueToday: 'నేడు చేయవలసినవి',
  overdue: 'గడువు ముగిసినవి',
  upcoming: 'రాబోయేవి',
  completed: 'పూర్తయినవి',
  urgentActionNeeded: 'తక్షణ చర్య అవసరం',
  quickActions: 'త్వరిత చర్యలు',
  newHousehold: 'కొత్త గృహం నమోదు',
  askGuidance: 'ప్రోటోకాల్ అడగండి',
  browseProtocols: 'ప్రోటోకాల్స్ చూడండి',

  visitListTitle: 'సందర్శనల జాబితా',
  filterAll: 'అన్ని సందర్శనలు',
  filterAnc: 'ANC సంరక్షణ',
  filterPnc: 'PNC సంరక్షణ',
  filterImm: 'టీకాలు',
  filterOverdue: 'గడువు దాటినవి',
  markCompleted: 'సందర్శన పూర్తి చేయండి',
  recordVitals: 'ఆరోగ్య వివరాలు నమోదు చేయండి',
  visitReason: 'సందర్శన కారణం',
  visitNotes: 'ఆశా ఫీల్డ్ నోట్స్',
  visitCompletedSuccess: 'సందర్శన విజయవంతంగా నమోదైంది.',
  priorityCritical: 'అత్యవసర ప్రాధాన్యత',
  priorityHigh: 'అధిక ప్రాధాన్యత',
  priorityNormal: 'సాధారణం',

  householdRegisterTitle: 'గృహాల ఆరోగ్య రిజిస్టర్',
  searchHouseholdsPlaceholder: 'కుటుంబ పెద్ద పేరు, ఇంటి నంబర్ లేదా గ్రామం ద్వారా శోధించండి...',
  addHouseholdTitle: 'కొత్త గృహం చేర్చండి',
  headOfFamily: 'కుటుంబ పెద్ద',
  householdNo: 'ఇంటి నం.',
  totalMembers: 'మొత్తం సభ్యులు',
  socioeconomicStatus: 'ఆర్థిక వర్గం',
  pregnantWomen: 'గర్భిణీ స్త్రీలు',
  infants: 'శిశువులు (0-1 సం.)',
  viewDetails: 'వివరాలు చూడండి',
  householdSavedSuccess: 'గృహ వివరాలు భద్రపరచబడ్డాయి.',

  askSevaTitle: 'సేవ సహాయకుడు — క్లినికల్ మార్గదర్శకత్వం',
  askSevaSubtitle: 'భారత ప్రభుత్వ MoHFW & NHM ప్రామాణిక నిబంధనల ఆధారంగా మార్గదర్శకాలు',
  askSevaPlaceholder: 'క్లినికల్ ప్రశ్న అడగండి (ఉదా: గర్భధారణలో రక్తస్రావం, 9వ నెల టీకా, శిశువులో జ్వరం)...',
  askSevaDisclaimer: 'భద్రతా నిబంధన: ప్రతి ప్రశ్నకు అత్యవసర ప్రమాద సంకేతాలు ముందుగా తనిఖీ చేయబడతాయి.',
  protocolCitationTitle: 'అధికారిక ప్రోటోకాల్ మూలం',
  protocolUnavailableNotice: 'ఈ నిర్దిష్ట స్థితికి తగిన ప్రోటోకాల్ సమాచారం అందుబాటులో లేదు. దయచేసి వెంటనే PHC డాక్టర్‌కు రిఫర్ చేయండి.',
  safetyRefusalNotice: 'యాంటీబయాటిక్స్ మోతాదు డాక్టర్ మాత్రమే నిర్ణయించాలి. ఆశా కార్యకర్తలు స్వతంత్రంగా మందులు ఇవ్వకూడదు.',
  sendQuestion: 'ప్రశ్నించండి',
  thinking: 'ప్రోటోకాల్స్ పరిశీలిస్తోంది...',
  suggestedQuestions: 'సూచించిన ప్రశ్నలు',
  offlineAiNotice: 'ఆఫ్‌లైన్ మోడ్: స్థానిక MoHFW నిబంధనల నుండి సమాధానం అందించబడుతోంది.',

  emergencyTitle: 'తీవ్రమైన ప్రమాద సంకేతం గుర్తించబడింది',
  emergencyDetected: 'అత్యవసర హెచ్చరిక!',
  immediateReferralRequired: 'వెంటనే మొదటి రిఫరల్ యూనిట్ (FRU) / PHCకి తరలించాలి',
  callAmbulance108: 'వెంటనే 108 అంబులెన్స్‌కు కాల్ చేయండి',
  dangerSignsList: 'గుర్తించిన ప్రమాద సంకేతాలు',
  actionProtocol: 'తక్షణ అత్యవసర చర్యలు',
  closeAlert: 'హెచ్చరికను గమనించాను',
  notifyMO: 'మెడికల్ ఆఫీసర్‌కు తెలియజేయండి',

  protocolsTitle: 'అధికారిక MoHFW ఆరోగ్య ప్రోటోకాల్స్',
  protocolsSubtitle: 'తల్లి మరియు బిడ్డల సంరక్షణ కొరకు జాతీయ మార్గదర్శకాలు',
  searchProtocols: 'లక్షణం లేదా ప్రోటోకాల్ ద్వారా శోధించండి...',
  clinicalActions: 'చేయవలసిన క్లినికల్ చర్యలు',
  redFlagsTitle: 'ప్రమాద సూచనలు (Red Flags)',
  dosAndDontsTitle: 'చేయదగినవి మరియు చేయకూడనివి',
  officialCitation: 'అధికారిక మూలం',
  officialLanguageNote: 'క్లినికల్ మార్గదర్శకాలు జాతీయ MoHFW/NHM నిబంధనల ప్రకారం రూపొందించబడ్డాయి.',

  settingsTitle: 'సెట్టింగ్‌లు మరియు పరికర భద్రత',
  profileSection: 'ఆశా ప్రొఫైల్ వివరాలు',
  deviceSection: 'బయోమెట్రిక్ & పరికర భద్రత',
  languageSection: 'యాప్ భాష',
  storageSection: 'ఆఫ్‌లైన్ స్టోరేజ్',
  evaluatorTitle: 'ప్రోటోకాల్ భద్రతా మూల్యాంకనం',
  runEvaluator: '100% టెస్ట్ సూట్ రన్ చేయండి',
  evaluatorNotice: 'అత్యవసర ప్రమాద హెచ్చరికలు మరియు వైద్య నిబంధనలను పరీక్షించే వ్యవస్థ.',
};

const hi: Translations = {
  appName: 'सेक्यूरा',
  appTagline: 'आशा कार्यकर्ताओं के लिए सुदृढ़ सहयोग',
  appDescription: 'आशा कार्यकर्ताओं के लिए मानक स्वास्थ्य दिशानिर्देश, घरेलू निगरानी, आपातकालीन खतरे के संकेत और ऑफ़लाइन सुविधा।',
  online: 'ऑनलाइन',
  offline: 'ऑफ़लाइन मोड',
  onlineStatusText: 'क्लाउड नेटवर्क से कनेक्टेड',
  offlineStatusText: 'स्थानीय रूप से सक्रिय · सभी प्रोटोकॉल सुरक्षित हैं',
  switchToOffline: 'ऑफ़लाइन मोड में बदलें',
  switchToOnline: 'ऑनलाइन मोड में बदलें',
  syncQueue: 'सिंक सूची',
  synced: 'सिंक पूर्ण हुआ',
  pendingSync: 'सिंक लंबित',
  syncNow: 'डेटा सिंक करें',
  lastSynced: 'अंतिम सिंक',
  neverSynced: 'अभी सिंक नहीं हुआ',

  navHome: 'डैशबोर्ड',
  navVisits: 'दैनिक दौरे',
  navHouseholds: 'परिवार रजिस्टर',
  navAskSeva: 'सेवा सहायक',
  navProtocols: 'प्रोटोकॉल',
  navSync: 'सिंक केंद्र',
  navSettings: 'सेटिंग्स',
  navEvaluator: 'सुरक्षा मूल्यांकन',

  welcomeTitle: 'सेक्यूरा',
  welcomeSub: 'आशा कार्यकर्ताओं के लिए सुदृढ़ सहयोग',
  welcomeDesc: 'सेक्यूरा मानक स्वास्थ्य दिशानिर्देशों, घरेलू निगरानी और ऑफ़लाइन सुविधा के साथ आशा कार्यकर्ताओं को सशक्त बनाता है।',
  signIn: 'साइन इन करें',
  signUp: 'आशा खाता बनाएं',
  signOut: 'साइन आउट',
  emailLabel: 'ईमेल पता',
  passwordLabel: 'पासवर्ड',
  confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
  fullNameLabel: 'आशा कार्यकर्ता का पूरा नाम',
  ashaIdLabel: 'आशा कार्यकर्ता आईडी / कोड',
  subCentreLabel: 'उप-केंद्र / PHC',
  villageLabel: 'आवंटित गाँव / वार्ड',
  phoneLabel: 'मोबाइल फ़ोन नंबर',
  privacyConsentLabel: 'मैं स्वास्थ्य डेटा सुरक्षा और गोपनीयता शर्तों से सहमत हूँ',
  continueWithGoogle: 'गूगल से जारी रखें',
  signInWithBiometrics: 'फ़िंगरप्रिंट / पासकी से साइन इन करें',
  biometricEnrolled: 'डिवाइस पासकी / बायोमेट्रिक्स सक्रिय है',
  biometricNotEnrolled: 'बायोमेट्रिक / पासकी साइन इन सेट करें',
  enableBiometrics: 'बायोमेट्रिक पासकी जोड़ें',
  biometricConsentNotice: 'बायोमेट्रिक्स आपके डिवाइस की हार्डवेयर सुरक्षा का उपयोग करता है। सेक्यूरा कभी भी बायोमेट्रिक डेटा स्टोर नहीं करता।',
  biometricFallbackNote: 'डिवाइस में पासकी उपलब्ध नहीं है। पासवर्ड का उपयोग करें।',
  noAccountPrompt: 'खाता नहीं है?',
  alreadyHaveAccount: 'पहले से खाता है?',
  loginSuccess: 'सफलतापूर्वक लॉग इन हुआ!',
  loginError: 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।',
  registrationSuccess: 'खाता सफलतापूर्वक बनाया गया! अब आप साइन इन कर सकते हैं।',
  passwordsDoNotMatch: 'पासवर्ड मेल नहीं खा रहे हैं।',
  allFieldsRequired: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
  selectLanguage: 'भाषा चुनें / Select Language',
  googleConfigNotice: 'गूगल साइन इन उपलब्ध नहीं है। ईमेल और पासवर्ड का उपयोग करें।',

  greeting: 'नमस्ते',
  todaysVisitsTitle: 'आज के दौरों की सूची',
  todaysVisitsSubtitle: 'चिकित्सीय प्राथमिकता के अनुसार क्रमबद्ध',
  highRiskHouseholds: 'उच्च जोखिम वाली गर्भवती महिलाएं',
  immunizationDue: 'टीकाकरण बाकी',
  pncFollowups: 'प्रसवोत्तर देखभाल (PNC)',
  ancFollowups: 'प्रसव पूर्व जांच (ANC)',
  activeHouseholds: 'पंजीकृत परिवार',
  dueToday: 'आज देय',
  overdue: 'विलंबित',
  upcoming: 'आगामी',
  completed: 'पूर्ण',
  urgentActionNeeded: 'तत्काल कार्रवाई आवश्यक',
  quickActions: 'त्वरित कार्य',
  newHousehold: 'नया परिवार जोड़ें',
  askGuidance: 'प्रोटोकॉल सलाह लें',
  browseProtocols: 'प्रोटोकॉल देखें',

  visitListTitle: 'प्राथमिकता अनुसार दौरों का रजिस्टर',
  filterAll: 'सभी दौरे',
  filterAnc: 'ANC देखभाल',
  filterPnc: 'PNC देखभाल',
  filterImm: 'टीकाकरण',
  filterOverdue: 'केवल विलंबित',
  markCompleted: 'दौरा पूर्ण दर्ज करें',
  recordVitals: 'स्वास्थ्य निरीक्षण और वाइटल्स दर्ज करें',
  visitReason: 'दौरे का कारण',
  visitNotes: 'आशा फ़ील्ड नोट्स',
  visitCompletedSuccess: 'दौरा सफलतापूर्वक दर्ज किया गया।',
  priorityCritical: 'अत्यंत गंभीर प्राथमिकता',
  priorityHigh: 'उच्च प्राथमिकता',
  priorityNormal: 'सामान्य',

  householdRegisterTitle: 'परिवार स्वास्थ्य रजिस्टर',
  searchHouseholdsPlaceholder: 'मुखिया का नाम, मकान नंबर या गाँव से खोजें...',
  addHouseholdTitle: 'नया परिवार पंजीकृत करें',
  headOfFamily: 'परिवार का मुखिया',
  householdNo: 'मकान नं.',
  totalMembers: 'कुल सदस्य',
  socioeconomicStatus: 'आर्थिक स्थिति',
  pregnantWomen: 'गर्भवती महिलाएं',
  infants: 'शिशु (0-1 वर्ष)',
  viewDetails: 'विवरण देखें',
  householdSavedSuccess: 'परिवार का विवरण सुरक्षित किया गया।',

  askSevaTitle: 'सेवा सहायक — क्लिनिकल प्रोटोकॉल सहायक',
  askSevaSubtitle: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय (MoHFW) के आधिकारिक प्रोटोकॉल पर आधारित',
  askSevaPlaceholder: 'चिकित्सीय प्रश्न पूछें (जैसे: तीसरी तिमाही में रक्तस्राव, 9 माह का टीका, नवजात में बुखार)...',
  askSevaDisclaimer: 'सुरक्षा नियम: हर प्रश्न में पहले खतरे के संकेत जाँचे जाते हैं। पर्चे वाली दवाइयाँ वर्जित हैं।',
  protocolCitationTitle: 'आधिकारिक प्रोटोकॉल संदर्भ',
  protocolUnavailableNotice: 'इस विशिष्ट स्थिति के लिए आधिकारिक प्रोटोकॉल साक्ष्य उपलब्ध नहीं है। कृपया मरीज को तुरंत चिकित्सा अधिकारी / PHC रेफर करें।',
  safetyRefusalNotice: 'एंटीबायोटिक दवाइयों की खुराक केवल डॉक्टर निर्धारित कर सकते हैं। आशा कार्यकर्ता स्वतंत्र रूप से दवा नहीं लिख सकतीं।',
  sendQuestion: 'प्रश्न भेजें',
  thinking: 'क्लिनिकल सुरक्षा प्रोटोकॉल की जांच हो रही है...',
  suggestedQuestions: 'सुझाए गए प्रश्न',
  offlineAiNotice: 'ऑफ़लाइन मोड: सत्यापित स्थानीय MoHFW ज्ञानकोश से उत्तर दिया जा रहा है।',

  emergencyTitle: 'गंभीर खतरे का संकेत पाया गया',
  emergencyDetected: 'आपातकालीन चेतावनी सक्रिय!',
  immediateReferralRequired: 'प्रथम रेफरल यूनिट (FRU) / PHC में तत्काल रेफरल आवश्यक है',
  callAmbulance108: 'तुरंत 108 एम्बुलेंस को कॉल करें',
  dangerSignsList: 'पहचाने गए खतरे के संकेत',
  actionProtocol: 'अनिवार्य आपातकालीन कदम',
  closeAlert: 'चेतावनी को समझा',
  notifyMO: 'चिकित्सा अधिकारी को सूचित करें',

  protocolsTitle: 'आधिकारिक MoHFW स्वास्थ्य प्रोटोकॉल',
  protocolsSubtitle: 'मातृ, नवजात एवं बाल स्वास्थ्य के लिए राष्ट्रीय दिशानिर्देश',
  searchProtocols: 'लक्षण या कोड से खोजें...',
  clinicalActions: 'अनिवार्य चिकित्सीय कदम',
  redFlagsTitle: 'खतरे के संकेत (Red Flags)',
  dosAndDontsTitle: 'क्या करें और क्या न करें',
  officialCitation: 'आधिकारिक संदर्भ',
  officialLanguageNote: 'क्लिनिकल मार्गदर्शन राष्ट्रीय MoHFW/NHM दिशानिर्देशों पर आधारित है।',

  settingsTitle: 'सेटिंग्स एवं डिवाइस सुरक्षा',
  profileSection: 'आशा प्रोफ़ाइल जानकारी',
  deviceSection: 'बायोमेट्रिक एवं पासकी सुरक्षा',
  languageSection: 'ऐप की भाषा',
  storageSection: 'ऑफ़लाइन डेटा स्टोरेज',
  evaluatorTitle: 'प्रोटोकॉल सुरक्षा मूल्यांकनकर्ता',
  runEvaluator: '100% सुरक्षा बेंचमार्क चलाएं',
  evaluatorNotice: 'आपातकालीन खतरे के संकेतों, संदर्भ सत्यापन और सुरक्षा नियमों का स्वचालित परीक्षण।',
};

const dictionaries: Record<Language, Translations> = { en, te, hi };

const LANGUAGE_KEY = 'secura_app_language';

export const getStoredLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'te' || saved === 'hi' || saved === 'en') {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'en';
};

export const setStoredLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch (err) {
    console.error('Failed to save language', err);
  }
};

export const useTranslation = (lang: Language): Translations => {
  return dictionaries[lang] || dictionaries.en;
};

export const getTranslations = (lang: Language): Translations => {
  return dictionaries[lang] || dictionaries.en;
};
