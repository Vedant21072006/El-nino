import { 
  Assessment, 
  DistrictRiskData, 
  Warning, 
  Advisory, 
  Announcement,
  OfficerContact,
  FieldTask, 
  AuditLog, 
  FarmProfile, 
  User, 
  ScenarioResult,
  Language
} from '../types';
import { 
  MAHARASHTRA_DISTRICTS, 
  INITIAL_WARNINGS, 
  INITIAL_ADVISORIES, 
  INITIAL_FIELD_TASKS, 
  INITIAL_AUDIT_LOGS 
} from '../data/maharashtraData';

const STORAGE_KEYS = {
  USER: 'elnino_user',
  FARM: 'elnino_farm',
  ASSESSMENTS: 'elnino_assessments',
  WARNINGS: 'elnino_warnings',
  ANNOUNCEMENTS: 'elnino_announcements',
  ADVISORIES: 'elnino_advisories',
  TASKS: 'elnino_tasks',
  AUDIT_LOGS: 'elnino_audit_logs',
  DEMO_MODE: 'elnino_demo_mode',
  LANGUAGE: 'elnino_language',
  OFFICER_CONTACTS: 'elnino_officer_contacts'
};

// Default Farm Profile
export const DEFAULT_FARM: FarmProfile = {
  id: 'farm-001',
  farmerId: 'farmer-01',
  farmerName: 'Ramesh Patil',
  state: 'Maharashtra',
  district: 'Pune',
  taluka: 'Haveli',
  village: 'Khadakwasla',
  farmArea: 2.0,
  farmAreaUnit: 'acres',
  crop: 'Soybean',
  cropVariety: 'JS-335',
  sowingDate: '2026-06-25',
  cropStage: 'vegetative',
  waterSource: 'rain-fed',
  irrigationType: 'none',
  soilType: 'black_cotton',
  recentObservations: 'Rainfall breaks observed during early vegetative stage.',
  updatedAt: new Date().toISOString()
};

// Initial Verified Announcements
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-2026-01',
    title: 'Farmer Training Camp on Micro-Irrigation & Water Conservation',
    titleMr: 'सूक्ष्म सिंचन व जलसंधारण शेतकरी कार्यशाळा',
    titleHi: 'सूक्ष्म सिंचाई और जल संरक्षण किसान प्रशिक्षण शिविर',
    details: 'Free one-day practical demonstration on sprinkler operation, mulching techniques, and government subsidy applications under PM Krishi Sinchayee Yojana.',
    detailsMr: 'ठिबक व तुषार सिंचन वापर, आच्छादन तंत्रज्ञान आणि शासकीय अनुदान योजनांवर मोफत एकदिवसीय प्रात्यक्षिक कार्यशाळा.',
    detailsHi: 'ड्रिप व स्प्रिंकलर सिंचाई, मल्चिंग और सरकारी अनुदान योजनाओं पर निःशुल्क एक दिवसीय प्रशिक्षण।',
    targetDistricts: ['Pune', 'Latur', 'Nanded', 'Amravati'],
    targetCrop: 'Soybean',
    eventType: 'camp',
    eventDate: '2026-11-18',
    venue: 'Taluka Agriculture Office & Krishi Vigyan Kendra Campus',
    officialContact: 'Toll-free Kisan Call Center: 1800-180-1551',
    publishedBy: 'Dr. Suresh Patil',
    publishedByDesignation: 'District Agriculture Officer',
    createdAt: '2026-11-02T10:00:00Z',
    validUntil: '2026-11-20',
    status: 'published'
  },
  {
    id: 'ANN-2026-02',
    title: 'Soil Health & Fertilizer Advisory Drive for Kharif Pulses and Oilseeds',
    titleMr: 'खरीप गळीतधान्य व कडधान्य माती आरोग्य मोहीम',
    titleHi: 'खरीफ तिलहन एवं दलहन मृदा स्वास्थ्य अभियान',
    details: 'District mobile soil testing vans are visiting village centers this week. Farmers are invited to submit top-soil samples for instant deficiency reports.',
    detailsMr: 'फिरती माती परीक्षण प्रयोगशाळा या आठवड्यात गावपातळीवर भेट देणार आहे. शेतकऱ्यांनी मातीचे नमुने तपासणीसाठी द्यावेत.',
    detailsHi: 'मोबाइल मृदा परीक्षण वाहन इस सप्ताह गांवों में उपलब्ध रहेगा। किसान अपनी मिट्टी की जांच अवश्य करवाएं।',
    targetDistricts: ['Pune', 'Latur', 'Nanded', 'Beed'],
    targetCrop: 'Soybean',
    eventType: 'scheme',
    eventDate: '2026-11-15',
    venue: 'Gram Panchayat Office Grounds',
    officialContact: 'Extension Coordinator: +91 94220 88991',
    publishedBy: 'State Directorate of Agriculture',
    publishedByDesignation: 'Director of Extension, Maharashtra',
    createdAt: '2026-11-05T09:00:00Z',
    validUntil: '2026-11-25',
    status: 'published'
  }
];

// Initial Verified Officer Contacts by District
export const INITIAL_OFFICER_CONTACTS: OfficerContact[] = [
  {
    id: 'off-pune',
    name: 'Shri. Vikram R. Gaikwad',
    designation: 'District Agricultural Officer (DAO)',
    district: 'Pune',
    taluka: 'Haveli / City Area',
    department: 'Department of Agriculture, Govt. of Maharashtra',
    phone: '+91 20 2605 1243',
    email: 'dao.pune@agri.maharashtra.gov.in',
    officeAddress: 'Central Building, Near Sassoon Hospital, Pune 411001',
    officeHours: 'Monday to Friday: 10:00 AM – 5:30 PM',
    isVerified: true,
    generalSupportNumber: '1800-180-1551 (Kisan Call Center)'
  },
  {
    id: 'off-latur',
    name: 'Dr. Suresh Patil',
    designation: 'Sub-Divisional Agriculture Officer (SDAO)',
    district: 'Latur',
    taluka: 'Ausa & Latur Sub-Division',
    department: 'Directorate of Agriculture, Latur Division',
    phone: '+91 2382 243 189',
    email: 'sdao.latur@agri.maharashtra.gov.in',
    officeAddress: 'Administrative Building, Ambajogai Road, Latur 413512',
    officeHours: 'Monday to Friday: 9:30 AM – 5:30 PM',
    isVerified: true,
    generalSupportNumber: '1800-180-1551'
  },
  {
    id: 'off-nanded',
    name: 'Smt. Anjali M. Deshmukh',
    designation: 'District Agricultural Officer (DAO)',
    district: 'Nanded',
    taluka: 'Nanded & Mukhed Block',
    department: 'Department of Agriculture, Govt. of Maharashtra',
    phone: '+91 2462 251 402',
    email: 'dao.nanded@agri.maharashtra.gov.in',
    officeAddress: 'Collectorate Compound, Station Road, Nanded 431601',
    officeHours: 'Monday to Friday: 10:00 AM – 5:00 PM',
    isVerified: true,
    generalSupportNumber: '1800-180-1551'
  },
  {
    id: 'off-amravati',
    name: 'Shri. Rajesh S. Kulkarni',
    designation: 'District Superintending Agriculture Officer (SAO)',
    district: 'Amravati',
    taluka: 'Amravati Division',
    department: 'Vidarbha Agro-Climatic Monitoring Unit',
    phone: '+91 721 266 2380',
    email: 'sao.amravati@agri.maharashtra.gov.in',
    officeAddress: 'Morshi Road, Opposite Circuit House, Amravati 444602',
    officeHours: 'Monday to Friday: 10:00 AM – 5:30 PM',
    isVerified: true,
    generalSupportNumber: '1800-180-1551'
  }
];

export const api = {
  // User & Auth
  getUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  },

  setUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  // Farm Profile
  getFarm(): FarmProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.FARM);
    return raw ? JSON.parse(raw) : DEFAULT_FARM;
  },

  saveFarm(farm: FarmProfile): FarmProfile {
    farm.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.FARM, JSON.stringify(farm));
    return farm;
  },

  // Language
  getLanguage(): Language {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved as Language) || 'en';
  },

  setLanguage(lang: Language): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  },

  // Demo Mode
  isDemoMode(): boolean {
    return localStorage.getItem(STORAGE_KEYS.DEMO_MODE) === 'true';
  },

  setDemoMode(val: boolean): void {
    localStorage.setItem(STORAGE_KEYS.DEMO_MODE, val ? 'true' : 'false');
  },

  // Assessments
  getAssessments(): Assessment[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveAssessment(assessment: Assessment): void {
    const list = api.getAssessments();
    list.unshift(assessment);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(list));

    api.addAuditLog({
      action: 'Created Farm Assessment',
      performedBy: assessment.farmerId,
      userRole: 'farmer',
      entityType: 'assessment',
      entityId: assessment.id,
      details: `Generated risk assessment for ${assessment.district} (${assessment.riskLevel.toUpperCase()}).`
    });
  },

  getAssessmentById(id: string): Assessment | undefined {
    return api.getAssessments().find(a => a.id === id);
  },

  // Districts
  getDistricts(): DistrictRiskData[] {
    return MAHARASHTRA_DISTRICTS;
  },

  getDistrictById(id: string): DistrictRiskData | undefined {
    return MAHARASHTRA_DISTRICTS.find(d => d.id.toLowerCase() === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase());
  },

  // Warnings
  getWarnings(): Warning[] {
    const raw = localStorage.getItem(STORAGE_KEYS.WARNINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.WARNINGS, JSON.stringify(INITIAL_WARNINGS));
      return INITIAL_WARNINGS;
    }
    return JSON.parse(raw);
  },

  saveWarning(warning: Warning): void {
    const warnings = api.getWarnings();
    const index = warnings.findIndex(w => w.id === warning.id);
    if (index >= 0) {
      warnings[index] = warning;
    } else {
      warnings.unshift(warning);
    }
    localStorage.setItem(STORAGE_KEYS.WARNINGS, JSON.stringify(warnings));

    api.addAuditLog({
      action: index >= 0 ? `Updated Warning (${warning.status})` : 'Created Warning Alert',
      performedBy: warning.creatorName,
      userRole: 'officer',
      entityType: 'warning',
      entityId: warning.id,
      details: `${warning.title} in ${warning.affectedDistricts.join(', ')}`
    });
  },

  // Announcements
  getAnnouncements(): Announcement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
      return INITIAL_ANNOUNCEMENTS;
    }
    return JSON.parse(raw);
  },

  saveAnnouncement(announcement: Announcement): void {
    const list = api.getAnnouncements();
    const index = list.findIndex(a => a.id === announcement.id);
    if (index >= 0) {
      list[index] = announcement;
    } else {
      list.unshift(announcement);
    }
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));

    api.addAuditLog({
      action: 'Published Announcement',
      performedBy: announcement.publishedBy,
      userRole: 'officer',
      entityType: 'advisory',
      entityId: announcement.id,
      details: announcement.title
    });
  },

  // Advisories
  getAdvisories(): Advisory[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ADVISORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADVISORIES, JSON.stringify(INITIAL_ADVISORIES));
      return INITIAL_ADVISORIES;
    }
    return JSON.parse(raw);
  },

  saveAdvisory(advisory: Advisory): void {
    const advisories = api.getAdvisories();
    const index = advisories.findIndex(a => a.id === advisory.id);
    if (index >= 0) {
      advisories[index] = advisory;
    } else {
      advisories.unshift(advisory);
    }
    localStorage.setItem(STORAGE_KEYS.ADVISORIES, JSON.stringify(advisories));

    api.addAuditLog({
      action: 'Published Farmer Advisory',
      performedBy: advisory.publishedBy,
      userRole: 'officer',
      entityType: 'advisory',
      entityId: advisory.id,
      details: advisory.title
    });
  },

  // Officer Contacts
  getOfficerContacts(): OfficerContact[] {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFICER_CONTACTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.OFFICER_CONTACTS, JSON.stringify(INITIAL_OFFICER_CONTACTS));
      return INITIAL_OFFICER_CONTACTS;
    }
    return JSON.parse(raw);
  },

  getOfficerForDistrict(districtName: string): OfficerContact {
    const contacts = api.getOfficerContacts();
    const found = contacts.find(c => c.district.toLowerCase() === districtName.toLowerCase());
    return found || contacts[0];
  },

  // Field Tasks
  getFieldTasks(): FieldTask[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_FIELD_TASKS));
      return INITIAL_FIELD_TASKS;
    }
    return JSON.parse(raw);
  },

  saveFieldTask(task: FieldTask): void {
    const tasks = api.getFieldTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
      tasks[index] = task;
    } else {
      tasks.unshift(task);
    }
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    api.addAuditLog({
      action: index >= 0 ? `Updated Field Task (${task.status})` : 'Assigned Field Task',
      performedBy: task.assignedTo,
      userRole: 'officer',
      entityType: 'field_task',
      entityId: task.id,
      details: `${task.title} in ${task.district}`
    });
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    return JSON.parse(raw);
  },

  addAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const logs = api.getAuditLogs();
    const newLog: AuditLog = {
      ...entry,
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  },

  // Server Gemini Chat API caller
  async sendChatMessage(payload: {
    message: string;
    language: Language;
    mode: 'help' | 'crop_assistant';
    farmDetails?: any;
    latestAssessment?: any;
  }): Promise<{ reply: string; source: string }> {
    try {
      const res = await fetch('/api/v1/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network error reaching server assistant, using local fallback:', e);
    }

    // Local client fallback
    return {
      reply: payload.language === 'mr'
        ? 'सध्याच्या हवामान विश्लेषणानुसार, पावसाच्या खंडामुळे सोयाबीन पिकाला पाणी देणे गरजेचे आहे. तुषार सिंचनाने पाणी द्या किंवा १३:०:४५ ची फवारणी करा.'
        : payload.language === 'hi'
        ? 'वर्तमान मौसम विश्लेषण के अनुसार, वर्षा के अंतराल के कारण सोयाबीन को सुरक्षात्मक सिंचाई या 13:0:45 पोटेशियम नाइट्रेट स्प्रे की आवश्यकता है।'
        : 'Based on current weather conditions, supplemental irrigation or a 1% Potassium Nitrate foliar spray is advised to alleviate heat and moisture stress.',
      source: 'offline-rule-engine'
    };
  }
};
