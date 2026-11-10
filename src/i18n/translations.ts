import { Language } from '../types';

export const translations = {
  en: {
    // Branding
    appName: 'EL NIÑO',
    tagline: 'Global Climate Signals. Local Agricultural Action.',
    landingTitle: 'Climate insights for smarter farming.',
    landingSubtitle: 'Understand climate risks, receive agricultural advisories, and get practical guidance for your farm.',
    farmerOptionTitle: "I'm a Farmer",
    farmerOptionDesc: 'Check crop risks, ask AI, and receive local advisories.',
    farmerOptionBtn: 'Continue as Farmer',
    continueAsFarmer: 'Continue as Farmer',
    officerOptionTitle: "I'm an Officer",
    officerOptionDesc: 'Monitor district risks and publish farmer advisories.',
    officerOptionBtn: 'Continue as Officer',
    continueAsOfficer: 'Continue as Officer',
    welcomeFarmer: 'Welcome, Farmer',

    // Role
    selectLanguage: 'Language',
    demoModeBanner: 'DEMO TEST MODE (Sample Data)',
    liveDataBanner: 'LIVE MONSOON & WEATHER DATA',
    
    // Nav
    home: 'Home',
    askAi: 'Ask AI',
    history: 'History',
    profile: 'Profile',
    advisoriesAndAnnouncements: 'Warnings & Announcements',
    contactOfficer: 'Contact Officer',
    logout: 'Log Out',
    back: 'Back',

    // Farmer Home (Exact Order)
    namaskar: 'Namaskar! 👋',
    latestWarningTitle: 'Latest warning',
    noActiveWarnings: 'No active warnings for your district at this time.',
    readFullWarning: 'Read full warning →',
    issuedBy: 'Issued by',

    askAiSectionTitle: 'Ask EL NIÑO AI',
    askAiSubtitle: 'Ask anything about your crop or climate assessment.',
    askAiPlaceholder: 'Ask your question in Marathi, Hindi, or English…',
    tryPrompt: 'Try: Explain my crop risk',

    myCropStatusTitle: 'My crop status',
    viewAssessmentAndIndicators: 'View your latest assessment and climate indicators →',
    whatShouldIDoTitle: 'What should I do?',

    contactOfficerTitle: 'Contact your agriculture officer',
    assignedDistrictOfficer: 'Assigned district officer',
    callBtn: 'Call',
    contactDetailsBtn: 'Contact Details',

    announcementsTitle: 'Announcements',
    announcementsSubtitle: 'Training programmes, agriculture camps, and relevant scheme updates.',
    viewAllAnnouncements: 'View all announcements →',

    // Risk levels
    lowRisk: 'Safe',
    moderateRisk: 'Moderate Risk',
    highRisk: 'High Risk',
    criticalRisk: 'Critical Risk',
    unavailable: 'No Data',

    // Setup Wizard
    setupTitle: 'Analyze My Farm',
    setupSubtitle: 'Tell us a few quick details about your crop to receive localized climate advisories.',
    cropType: 'Crop type',
    district: 'District',
    village: 'Village (optional)',
    farmArea: 'Farm area and unit',
    sowingDate: 'Sowing date',
    waterAvailability: 'Water availability',
    cropStage: 'Current crop stage',
    soilType: 'Soil type (optional)',
    analyzeBtn: 'Analyze My Farm',

    // Auth
    authWelcome: 'Welcome to EL NIÑO',
    authSub: 'Your farm, your climate insights.',
    loginTab: 'Login',
    signupTab: 'Sign up',
    mobileNumber: 'Mobile number',
    continueOtp: 'Continue with OTP',
    otpNotice: 'Concept preview: Development test OTP is 1234.',
    enterOtp: 'Enter 4-digit OTP',
    verifyBtn: 'Verify and Continue',
    fullName: 'Your name',
    officerLoginTitle: 'Officer Authorized Portal',
    officerLoginSub: 'Official verified accounts only. Designations and districts are managed by authorized administrators.',
    officerAuthBtn: 'Sign In with Authorized Mobile OTP'
  },

  mr: {
    // Branding
    appName: 'EL NIÑO (एल निनो)',
    tagline: 'जागतिक हवामान संकेत. स्थानिक शेती कृती.',
    landingTitle: 'स्मार्ट शेतीसाठी अचूक हवामान मार्गदर्शन.',
    landingSubtitle: 'हवामानाचे धोके समजून घ्या, कृषी सल्ले मिळवा आणि तुमच्या शेतासाठी उपयुक्त कृती करा.',
    farmerOptionTitle: 'मी शेतकरी आहे',
    farmerOptionDesc: 'पिकाचा धोका तपासा, एआय ला प्रश्न विचारा आणि स्थानिक कृषी सल्ले मिळवा.',
    farmerOptionBtn: 'शेतकरी म्हणून पुढे जा',
    continueAsFarmer: 'शेतकरी म्हणून पुढे जा',
    officerOptionTitle: 'मी कृषी अधिकारी आहे',
    officerOptionDesc: 'जिल्हास्तरीय धोक्यांवर लक्ष ठेवा आणि शेतकऱ्यांसाठी सल्ले प्रसिद्ध करा.',
    officerOptionBtn: 'कृषी अधिकारी म्हणून पुढे जा',
    continueAsOfficer: 'कृषी अधिकारी म्हणून पुढे जा',
    welcomeFarmer: 'नमस्कार',

    // Role
    selectLanguage: 'भाषा',
    demoModeBanner: 'डेमो टेस्ट मोड (चाचणी माहिती)',
    liveDataBanner: 'सक्रिय हवामान व पाऊस डेटा',

    // Nav
    home: 'होम',
    askAi: 'एआय सहाय्यक',
    history: 'इतिहास',
    profile: 'प्रोफाईल',
    advisoriesAndAnnouncements: 'इशारे व सूचना',
    contactOfficer: 'कृषी अधिकारी',
    logout: 'लॉग आऊट',
    back: 'मागे',

    // Farmer Home
    namaskar: 'नमस्कार! 👋',
    latestWarningTitle: 'ताजा इशारा',
    noActiveWarnings: 'सध्या तुमच्या जिल्ह्यासाठी कोणताही सक्रिय इशारा नाही.',
    readFullWarning: 'पूर्ण इशारा वाचा →',
    issuedBy: 'प्रसिद्धी',

    askAiSectionTitle: 'EL NIÑO एआय ला विचारा',
    askAiSubtitle: 'तुमचे पीक किंवा हवामान अंदाजाबाबत कोणताही प्रश्न विचारा.',
    askAiPlaceholder: 'मराठी, हिंदी किंवा इंग्रजीत प्रश्न विचारा…',
    tryPrompt: 'उदा: माझ्या पिकाची जोखीम समजावून सांगा',

    myCropStatusTitle: 'माझ्या पिकाची स्थिती',
    viewAssessmentAndIndicators: 'तुमचे ताजे विश्लेषण व हवामान घटक पहा →',
    whatShouldIDoTitle: 'मी काय करावे?',

    contactOfficerTitle: 'आपल्या कृषी अधिकाऱ्यांशी संपर्क साधा',
    assignedDistrictOfficer: 'नियुक्त जिल्हा कृषी अधिकारी',
    callBtn: 'कॉल करा',
    contactDetailsBtn: 'तपशील',

    announcementsTitle: 'सूचना व उपक्रम',
    announcementsSubtitle: 'शेतकरी कार्यशाळा, कृषी शिबिरे आणि शासकीय योजनांचे अपडेट्स.',
    viewAllAnnouncements: 'सर्व सूचना पहा →',

    // Risk levels
    lowRisk: 'कमी जोखीम (सुरक्षित)',
    moderateRisk: 'मध्यम जोखीम',
    highRisk: 'उच्च जोखीम',
    criticalRisk: 'गंभीर जोखीम',
    unavailable: 'माहिती उपलब्ध नाही',

    // Setup Wizard
    setupTitle: 'माझ्या शेताचे विश्लेषण करा',
    setupSubtitle: 'स्थानिक सल्ला मिळवण्यासाठी शेताची थोडी प्राथमिक माहिती भरा.',
    cropType: 'पिकाचा प्रकार',
    district: 'जिल्हा',
    village: 'गाव (ऐच्छिक)',
    farmArea: 'शेताचे क्षेत्र',
    sowingDate: 'पेरणीची तारीख',
    waterAvailability: 'पाण्याची उपलब्धता',
    cropStage: 'सध्याची अवस्था',
    soilType: 'जमिनीचा प्रकार (ऐच्छिक)',
    analyzeBtn: 'माझ्या शेताचे विश्लेषण करा',

    // Auth
    authWelcome: 'EL NIÑO मध्ये आपले स्वागत आहे',
    authSub: 'तुमचे शेत, तुमचे हवामान मार्गदर्शन.',
    loginTab: 'लॉगिन',
    signupTab: 'नोंदणी',
    mobileNumber: 'मोबाईल नंबर',
    continueOtp: 'ओटीपी मिळवा',
    otpNotice: 'चाचणी ओटीपी: 1234 वापरा.',
    enterOtp: '४ अंकी ओटीपी टाका',
    verifyBtn: 'पडताळणी करा आणि पुढे जा',
    fullName: 'पूर्ण नाव',
    officerLoginTitle: 'कृषी अधिकारी अधिकृत पोर्टल',
    officerLoginSub: 'केवळ अधिकृत अधिकाऱ्यांसाठी. पद आणि जिल्हे प्रशासकाद्वारे प्रमाणित केले जातात.',
    officerAuthBtn: 'अधिकृत मोबाईल ओटीपीने प्रवेश करा'
  },

  hi: {
    // Branding
    appName: 'EL NIÑO (एल नीनो)',
    tagline: 'वैश्विक जलवायु संकेत। स्थानीय कृषि कार्रवाई।',
    landingTitle: 'स्मार्ट खेती के लिए सटीक जलवायु अंतर्दृष्टि।',
    landingSubtitle: 'जलवायु जोखिमों को समझें, कृषि सलाह प्राप्त करें और अपने खेत के लिए व्यावहारिक कदम उठाएं।',
    farmerOptionTitle: 'मैं किसान हूँ',
    farmerOptionDesc: 'फसल जोखिम जांचें, एआई से सवाल पूछें और स्थानीय सलाह प्राप्त करें।',
    farmerOptionBtn: 'किसान के रूप में आगे बढ़ें',
    continueAsFarmer: 'किसान के रूप में आगे बढ़ें',
    officerOptionTitle: 'मैं कृषि अधिकारी हूँ',
    officerOptionDesc: 'जिलास्तरीय जोखिमों की निगरानी करें और किसानों के लिए सलाह जारी करें।',
    officerOptionBtn: 'कृषि अधिकारी के रूप में आगे बढ़ें',
    continueAsOfficer: 'कृषि अधिकारी के रूप में आगे बढ़ें',
    welcomeFarmer: 'नमस्ते',

    // Role
    selectLanguage: 'भाषा',
    demoModeBanner: 'डेमो टेस्ट मोड (नमूना डेटा)',
    liveDataBanner: 'सक्रिय मौसम व वर्षा डेटा',

    // Nav
    home: 'होम',
    askAi: 'एआई सहायक',
    history: 'इतिहास',
    profile: 'प्रोफाइल',
    advisoriesAndAnnouncements: 'चेतावनियां और घोषणाएं',
    contactOfficer: 'कृषि अधिकारी',
    logout: 'लॉग आउट',
    back: 'वापस',

    // Farmer Home
    namaskar: 'नमस्कार! 👋',
    latestWarningTitle: 'नवीनतम चेतावनी',
    noActiveWarnings: 'वर्तमान में आपके जिले के लिए कोई सक्रिय चेतावनी नहीं है।',
    readFullWarning: 'पूरी चेतावनी पढ़ें →',
    issuedBy: 'जारीकर्ता',

    askAiSectionTitle: 'EL NIÑO एआई से पूछें',
    askAiSubtitle: 'अपनी फसल या मौसम के बारे में कोई भी प्रश्न पूछें।',
    askAiPlaceholder: 'मराठी, हिंदी या अंग्रेजी में सवाल पूछें…',
    tryPrompt: 'उदा: मेरी फसल का जोखिम समझाएं',

    myCropStatusTitle: 'मेरी फसल की स्थिति',
    viewAssessmentAndIndicators: 'नवीनतम मूल्यांकन और मौसम संकेतक देखें →',
    whatShouldIDoTitle: 'मुझे क्या करना चाहिए?',

    contactOfficerTitle: 'अपने कृषि अधिकारी से संपर्क करें',
    assignedDistrictOfficer: 'नियुक्त जिला कृषि अधिकारी',
    callBtn: 'कॉल करें',
    contactDetailsBtn: 'संपर्क विवरण',

    announcementsTitle: 'घोषणाएं एवं कार्यक्रम',
    announcementsSubtitle: 'प्रशिक्षण शिविर, कृषि कार्यशालाएं और सरकारी योजनाएं।',
    viewAllAnnouncements: 'सभी घोषणाएं देखें →',

    // Risk levels
    lowRisk: 'कम जोखिम (सुरक्षित)',
    moderateRisk: 'मध्यम जोखिम',
    highRisk: 'उच्च जोखिम',
    criticalRisk: 'गंभीर जोखिम',
    unavailable: 'डेटा उपलब्ध नहीं',

    // Setup Wizard
    setupTitle: 'मेरे खेत का विश्लेषण करें',
    setupSubtitle: 'सटीक सलाह के लिए अपने खेत की संक्षिप्त जानकारी दें।',
    cropType: 'फसल का प्रकार',
    district: 'जिला',
    village: 'गांव (वैकल्पिक)',
    farmArea: 'खेत का क्षेत्रफल',
    sowingDate: 'बुवाई की तारीख',
    waterAvailability: 'पानी की सुविधा',
    cropStage: 'फसल की अवस्था',
    soilType: 'मिट्टी का प्रकार (वैकल्पिक)',
    analyzeBtn: 'खेत का विश्लेषण करें',

    // Auth
    authWelcome: 'EL NIÑO में आपका स्वागत है',
    authSub: 'आपका खेत, आपकी जलवायु अंतर्दृष्टि।',
    loginTab: 'लॉगिन',
    signupTab: 'साइन अप',
    mobileNumber: 'मोबाइल नंबर',
    continueOtp: 'ओटीपी प्राप्त करें',
    otpNotice: 'टेस्ट ओटीपी: 1234 का उपयोग करें।',
    enterOtp: '4 अंकों का ओटीपी दर्ज करें',
    verifyBtn: 'सत्यापित करें और आगे बढ़ें',
    fullName: 'पूरा नाम',
    officerLoginTitle: 'कृषि अधिकारी अधिकृत पोर्टल',
    officerLoginSub: 'केवल अधिकृत अधिकारियों के लिए। पद और जिले व्यवस्थापक द्वारा सत्यापित हैं।',
    officerAuthBtn: 'अधिकृत मोबाइल ओटीपी से लॉगिन करें'
  }
};

export function t(key: keyof typeof translations['en'], lang: Language): string {
  const dict = translations[lang] || translations.en;
  return (dict[key] as string) || translations.en[key] || (key as string);
}
