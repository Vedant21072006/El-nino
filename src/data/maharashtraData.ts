import { DistrictRiskData, Warning, Advisory, FieldTask, DataSourceStatus, ModelMetadata, AuditLog } from '../types';

export const MAHARASHTRA_DISTRICTS: DistrictRiskData[] = [
  {
    id: 'latur',
    name: 'Latur',
    nameMr: 'लातूर',
    nameHi: 'लातुर',
    region: 'Marathwada',
    lat: 18.4088,
    lng: 76.5604,
    crop: 'Soybean',
    soybeanAcreageHa: 385000,
    historicalYieldBaselineKgHa: 1350,
    predictedYieldKgHa: 1045,
    yieldAnomalyPct: -22.6,
    riskLevel: 'high',
    rainfallObservedMm: 462,
    rainfallNormalMm: 680,
    rainfallAnomalyPct: -32.1,
    tempAnomalyMaxC: +2.4,
    soilMoisturePct: 34,
    ndviAnomalyPct: -18.5,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 19,
    activeWarningsCount: 2,
    warningStatus: 'active',
    dataCompleteness: 98,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Monsoon Rainfall Deficit (-32%)',
        impact: -12.4,
        valueDisplay: '-32.1% deficit',
        direction: 'increases_risk',
        explanation: 'Cumulative rainfall significantly below 30-year IMD normal during vegetative and flowering stages.'
      },
      {
        feature: 'consecutive_dry_days',
        label: 'Consecutive Dry Spell (19 Days)',
        impact: -7.1,
        valueDisplay: '19 days without rain',
        direction: 'increases_risk',
        explanation: 'Prolonged dry spell during flower-to-pod transition caused substantial flower drop.'
      },
      {
        feature: 'oni_index',
        label: 'Pacific ENSO / ONI Index (+1.4°C)',
        impact: -4.2,
        valueDisplay: '+1.4°C (El Niño)',
        direction: 'increases_risk',
        explanation: 'Strong positive ocean temperature anomaly weakened monsoon circulation over Central Peninsula.'
      },
      {
        feature: 'temp_anomaly_max_c',
        label: 'Elevated Max Temp (+2.4°C)',
        impact: -3.3,
        valueDisplay: '+2.4°C above normal',
        direction: 'increases_risk',
        explanation: 'Afternoon heat stress above 35°C accelerated canopy evapotranspiration.'
      },
      {
        feature: 'soil_moisture_pct',
        label: 'Low Root-Zone Moisture (34%)',
        impact: -2.8,
        valueDisplay: '34% available water',
        direction: 'increases_risk',
        explanation: 'Vertisol moisture retention depleted below wilting threshold in top 30cm.'
      }
    ]
  },
  {
    id: 'nanded',
    name: 'Nanded',
    nameMr: 'नांदेड',
    nameHi: 'नांदेड़',
    region: 'Marathwada',
    lat: 19.1383,
    lng: 77.321,
    crop: 'Soybean',
    soybeanAcreageHa: 360000,
    historicalYieldBaselineKgHa: 1320,
    predictedYieldKgHa: 960,
    yieldAnomalyPct: -27.3,
    riskLevel: 'critical',
    rainfallObservedMm: 490,
    rainfallNormalMm: 740,
    rainfallAnomalyPct: -33.8,
    tempAnomalyMaxC: +2.8,
    soilMoisturePct: 29,
    ndviAnomalyPct: -22.4,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 22,
    activeWarningsCount: 2,
    warningStatus: 'active',
    dataCompleteness: 96,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Rainfall Deficit (-33.8%)',
        impact: -14.2,
        valueDisplay: '-33.8%',
        direction: 'increases_risk',
        explanation: 'Severe precipitation shortfall across Mukhed, Kandhar, and Degloor talukas.'
      },
      {
        feature: 'consecutive_dry_days',
        label: 'Extreme Dry Spell (22 Days)',
        impact: -8.6,
        valueDisplay: '22 dry days',
        direction: 'increases_risk',
        explanation: 'Critical moisture deficit during pod enlargement phase.'
      },
      {
        feature: 'oni_index',
        label: 'ENSO Factor (+1.4°C)',
        impact: -4.5,
        valueDisplay: '+1.4°C',
        direction: 'increases_risk',
        explanation: 'Consistent dry monsoon breaks associated with Pacific warm phase.'
      }
    ]
  },
  {
    id: 'amravati',
    name: 'Amravati',
    nameMr: 'अमरावती',
    nameHi: 'अमरावती',
    region: 'Vidarbha',
    lat: 20.9374,
    lng: 77.7796,
    crop: 'Soybean',
    soybeanAcreageHa: 295000,
    historicalYieldBaselineKgHa: 1420,
    predictedYieldKgHa: 1220,
    yieldAnomalyPct: -14.1,
    riskLevel: 'moderate',
    rainfallObservedMm: 620,
    rainfallNormalMm: 750,
    rainfallAnomalyPct: -17.3,
    tempAnomalyMaxC: +1.2,
    soilMoisturePct: 48,
    ndviAnomalyPct: -8.5,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 11,
    activeWarningsCount: 1,
    warningStatus: 'watch',
    dataCompleteness: 99,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Moderate Rainfall Deficit (-17%)',
        impact: -7.5,
        valueDisplay: '-17.3%',
        direction: 'increases_risk',
        explanation: 'August dry spell compensated partly by late July showers.'
      },
      {
        feature: 'soil_moisture_pct',
        label: 'Adequate Deep Soil Moisture (48%)',
        impact: +3.2,
        valueDisplay: '48% moisture',
        direction: 'decreases_risk',
        explanation: 'Deep heavy black cotton soils in Chandur and Dhamangaon cushioned heat stress.'
      }
    ]
  },
  {
    id: 'yavatmal',
    name: 'Yavatmal',
    nameMr: 'यवतमाळ',
    nameHi: 'यवतमाल',
    region: 'Vidarbha',
    lat: 20.3888,
    lng: 78.1204,
    crop: 'Soybean',
    soybeanAcreageHa: 310000,
    historicalYieldBaselineKgHa: 1280,
    predictedYieldKgHa: 1040,
    yieldAnomalyPct: -18.8,
    riskLevel: 'high',
    rainfallObservedMm: 580,
    rainfallNormalMm: 780,
    rainfallAnomalyPct: -25.6,
    tempAnomalyMaxC: +1.9,
    soilMoisturePct: 37,
    ndviAnomalyPct: -14.2,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 16,
    activeWarningsCount: 1,
    warningStatus: 'active',
    dataCompleteness: 97,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Rainfall Deficit (-25.6%)',
        impact: -10.8,
        valueDisplay: '-25.6%',
        direction: 'increases_risk',
        explanation: 'Deficit across Darwha, Pusad, and Ner talukas.'
      },
      {
        feature: 'consecutive_dry_days',
        label: 'Dry Days (16 Days)',
        impact: -5.4,
        valueDisplay: '16 days',
        direction: 'increases_risk',
        explanation: 'Moisture stress during flowering stage.'
      }
    ]
  },
  {
    id: 'akola',
    name: 'Akola',
    nameMr: 'अकोला',
    nameHi: 'अकोला',
    region: 'Vidarbha',
    lat: 20.7002,
    lng: 77.0082,
    crop: 'Soybean',
    soybeanAcreageHa: 240000,
    historicalYieldBaselineKgHa: 1390,
    predictedYieldKgHa: 1210,
    yieldAnomalyPct: -12.9,
    riskLevel: 'moderate',
    rainfallObservedMm: 590,
    rainfallNormalMm: 710,
    rainfallAnomalyPct: -16.9,
    tempAnomalyMaxC: +1.6,
    soilMoisturePct: 45,
    ndviAnomalyPct: -9.1,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 12,
    activeWarningsCount: 0,
    warningStatus: 'none',
    dataCompleteness: 99,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'temp_anomaly_max_c',
        label: 'Elevated Max Temp (+1.6°C)',
        impact: -4.5,
        valueDisplay: '+1.6°C',
        direction: 'increases_risk',
        explanation: 'Higher vapor pressure deficit in Patur and Balapur.'
      }
    ]
  },
  {
    id: 'buldhana',
    name: 'Buldhana',
    nameMr: 'बुलढाणा',
    nameHi: 'बुलढाणा',
    region: 'Vidarbha',
    lat: 20.5293,
    lng: 76.1843,
    crop: 'Soybean',
    soybeanAcreageHa: 345000,
    historicalYieldBaselineKgHa: 1340,
    predictedYieldKgHa: 1080,
    yieldAnomalyPct: -19.4,
    riskLevel: 'high',
    rainfallObservedMm: 485,
    rainfallNormalMm: 650,
    rainfallAnomalyPct: -25.4,
    tempAnomalyMaxC: +2.0,
    soilMoisturePct: 36,
    ndviAnomalyPct: -16.0,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 17,
    activeWarningsCount: 1,
    warningStatus: 'active',
    dataCompleteness: 98,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Rainfall Shortfall (-25.4%)',
        impact: -10.2,
        valueDisplay: '-25.4%',
        direction: 'increases_risk',
        explanation: 'Chikhli, Mehkar, and Lonar experienced poor distribution.'
      }
    ]
  },
  {
    id: 'washim',
    name: 'Washim',
    nameMr: 'वाशिम',
    nameHi: 'वाशिम',
    region: 'Vidarbha',
    lat: 20.1118,
    lng: 77.1352,
    crop: 'Soybean',
    soybeanAcreageHa: 275000,
    historicalYieldBaselineKgHa: 1410,
    predictedYieldKgHa: 1240,
    yieldAnomalyPct: -12.1,
    riskLevel: 'moderate',
    rainfallObservedMm: 640,
    rainfallNormalMm: 760,
    rainfallAnomalyPct: -15.8,
    tempAnomalyMaxC: +1.4,
    soilMoisturePct: 49,
    ndviAnomalyPct: -8.0,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 10,
    activeWarningsCount: 0,
    warningStatus: 'none',
    dataCompleteness: 99,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Minor Rain Deficit (-15.8%)',
        impact: -6.4,
        valueDisplay: '-15.8%',
        direction: 'increases_risk',
        explanation: 'Adequate vegetative growth with minor flowering stress.'
      }
    ]
  },
  {
    id: 'wardha',
    name: 'Wardha',
    nameMr: 'वर्धा',
    nameHi: 'वर्धा',
    region: 'Vidarbha',
    lat: 20.7453,
    lng: 78.6022,
    crop: 'Soybean',
    soybeanAcreageHa: 210000,
    historicalYieldBaselineKgHa: 1380,
    predictedYieldKgHa: 1290,
    yieldAnomalyPct: -6.5,
    riskLevel: 'moderate',
    rainfallObservedMm: 720,
    rainfallNormalMm: 810,
    rainfallAnomalyPct: -11.1,
    tempAnomalyMaxC: +0.9,
    soilMoisturePct: 56,
    ndviAnomalyPct: -4.2,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 8,
    activeWarningsCount: 0,
    warningStatus: 'none',
    dataCompleteness: 99,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'soil_moisture_pct',
        label: 'Good Soil Moisture (56%)',
        impact: +4.8,
        valueDisplay: '56%',
        direction: 'decreases_risk',
        explanation: 'Higher canal and reservoir seepage maintained soil wetness.'
      }
    ]
  },
  {
    id: 'jalna',
    name: 'Jalna',
    nameMr: 'जालना',
    nameHi: 'जालना',
    region: 'Marathwada',
    lat: 19.8347,
    lng: 75.8816,
    crop: 'Soybean',
    soybeanAcreageHa: 260000,
    historicalYieldBaselineKgHa: 1290,
    predictedYieldKgHa: 1010,
    yieldAnomalyPct: -21.7,
    riskLevel: 'high',
    rainfallObservedMm: 440,
    rainfallNormalMm: 620,
    rainfallAnomalyPct: -29.0,
    tempAnomalyMaxC: +2.3,
    soilMoisturePct: 32,
    ndviAnomalyPct: -17.8,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 20,
    activeWarningsCount: 1,
    warningStatus: 'active',
    dataCompleteness: 97,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'rainfall_anomaly_pct',
        label: 'Rainfall Deficit (-29%)',
        impact: -11.9,
        valueDisplay: '-29.0%',
        direction: 'increases_risk',
        explanation: 'Deficit across Ambad, Partur, and Mantha.'
      }
    ]
  },
  {
    id: 'beed',
    name: 'Beed',
    nameMr: 'बीड',
    nameHi: 'बीड',
    region: 'Marathwada',
    lat: 18.9891,
    lng: 75.7601,
    crop: 'Soybean',
    soybeanAcreageHa: 290000,
    historicalYieldBaselineKgHa: 1250,
    predictedYieldKgHa: 920,
    yieldAnomalyPct: -26.4,
    riskLevel: 'critical',
    rainfallObservedMm: 410,
    rainfallNormalMm: 610,
    rainfallAnomalyPct: -32.8,
    tempAnomalyMaxC: +2.6,
    soilMoisturePct: 28,
    ndviAnomalyPct: -23.1,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 24,
    activeWarningsCount: 2,
    warningStatus: 'active',
    dataCompleteness: 98,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'consecutive_dry_days',
        label: 'Severe Dry Spell (24 Days)',
        impact: -10.1,
        valueDisplay: '24 dry days',
        direction: 'increases_risk',
        explanation: 'Extreme drought stress during pod development stage.'
      },
      {
        feature: 'soil_moisture_pct',
        label: 'Depleted Moisture (28%)',
        impact: -7.5,
        valueDisplay: '28%',
        direction: 'increases_risk',
        explanation: 'Shallow black soils in Georai and Ashti reached permanent wilting point.'
      }
    ]
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    nameMr: 'कोल्हापूर',
    nameHi: 'कोल्हापुर',
    region: 'Western Maharashtra',
    lat: 16.705,
    lng: 74.2433,
    crop: 'Soybean',
    soybeanAcreageHa: 110000,
    historicalYieldBaselineKgHa: 1820,
    predictedYieldKgHa: 1760,
    yieldAnomalyPct: -3.3,
    riskLevel: 'low',
    rainfallObservedMm: 940,
    rainfallNormalMm: 980,
    rainfallAnomalyPct: -4.1,
    tempAnomalyMaxC: +0.4,
    soilMoisturePct: 72,
    ndviAnomalyPct: -1.2,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 4,
    activeWarningsCount: 0,
    warningStatus: 'none',
    dataCompleteness: 99,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'soil_moisture_pct',
        label: 'High Soil Moisture (72%)',
        impact: +6.5,
        valueDisplay: '72%',
        direction: 'decreases_risk',
        explanation: 'Western Ghats orographic rains provided ample moisture.'
      }
    ]
  },
  {
    id: 'sangli',
    name: 'Sangli',
    nameMr: 'सांगली',
    nameHi: 'सांगली',
    region: 'Western Maharashtra',
    lat: 16.8524,
    lng: 74.5815,
    crop: 'Soybean',
    soybeanAcreageHa: 140000,
    historicalYieldBaselineKgHa: 1650,
    predictedYieldKgHa: 1540,
    yieldAnomalyPct: -6.7,
    riskLevel: 'moderate',
    rainfallObservedMm: 460,
    rainfallNormalMm: 520,
    rainfallAnomalyPct: -11.5,
    tempAnomalyMaxC: +1.1,
    soilMoisturePct: 58,
    ndviAnomalyPct: -4.5,
    oniIndex: 1.4,
    ensoPhase: 'El Niño (Strong)',
    consecutiveDryDays: 9,
    activeWarningsCount: 0,
    warningStatus: 'none',
    dataCompleteness: 98,
    lastUpdated: '2026-10-09T06:00:00Z',
    shapExplanations: [
      {
        feature: 'irrigation_access',
        label: 'Krishna River Irrigation Access',
        impact: +5.1,
        valueDisplay: '62% Irrigated',
        direction: 'decreases_risk',
        explanation: 'Canal and lift irrigation minimized impacts of monsoon dry spell.'
      }
    ]
  }
];

export const HISTORICAL_ENSO_SERIES = [
  { year: 2014, ensoPhase: 'Neutral to Warm', avgOni: 0.2, rainfallAnomalyPct: -12.4, yieldKgHa: 1120, yieldAnomalyPct: -14.5 },
  { year: 2015, ensoPhase: 'El Niño (Very Strong)', avgOni: 2.1, rainfallAnomalyPct: -27.8, yieldKgHa: 890, yieldAnomalyPct: -32.1 },
  { year: 2016, ensoPhase: 'La Niña (Weak)', avgOni: -0.4, rainfallAnomalyPct: +14.2, yieldKgHa: 1480, yieldAnomalyPct: +12.9 },
  { year: 2017, ensoPhase: 'La Niña (Weak)', avgOni: -0.6, rainfallAnomalyPct: +2.1, yieldKgHa: 1390, yieldAnomalyPct: +6.1 },
  { year: 2018, ensoPhase: 'El Niño Modoki', avgOni: 0.9, rainfallAnomalyPct: -18.5, yieldKgHa: 1060, yieldAnomalyPct: -19.1 },
  { year: 2019, ensoPhase: 'Neutral', avgOni: 0.3, rainfallAnomalyPct: +32.4, yieldKgHa: 1310, yieldAnomalyPct: +0.0 },
  { year: 2020, ensoPhase: 'La Niña (Moderate)', avgOni: -1.1, rainfallAnomalyPct: +18.2, yieldKgHa: 1460, yieldAnomalyPct: +11.4 },
  { year: 2021, ensoPhase: 'La Niña (Moderate)', avgOni: -0.9, rainfallAnomalyPct: +15.6, yieldKgHa: 1430, yieldAnomalyPct: +9.1 },
  { year: 2022, ensoPhase: 'La Niña (Triple Dip)', avgOni: -1.0, rainfallAnomalyPct: +23.8, yieldKgHa: 1490, yieldAnomalyPct: +13.7 },
  { year: 2023, ensoPhase: 'El Niño (Strong)', avgOni: 1.8, rainfallAnomalyPct: -21.4, yieldKgHa: 1020, yieldAnomalyPct: -22.1 },
  { year: 2024, ensoPhase: 'Neutral to La Niña', avgOni: -0.3, rainfallAnomalyPct: +8.5, yieldKgHa: 1380, yieldAnomalyPct: +5.3 },
  { year: 2025, ensoPhase: 'Neutral', avgOni: 0.1, rainfallAnomalyPct: +1.2, yieldKgHa: 1340, yieldAnomalyPct: +2.3 },
  { year: 2026, ensoPhase: 'El Niño (Active Stage)', avgOni: 1.4, rainfallAnomalyPct: -22.8, yieldKgHa: 1045, yieldAnomalyPct: -20.8 }
];

export const TALUKAS_BY_DISTRICT: Record<string, string[]> = {
  latur: ['Latur', 'Ausa', 'Ahmedpur', 'Nilanga', 'Udgir', 'Chakur', 'Renapur', 'Deoni', 'Shirur Anantpal', 'Jalkot'],
  nanded: ['Nanded', 'Ardhapur', 'Mudkhed', 'Bhokar', 'Loha', 'Kandhar', 'Kinwat', 'Himayatnagar', 'Hadgaon', 'Mukhed', 'Degloor', 'Biloli', 'Dharmabad', 'Naigaon', 'Umri', 'Mahoor'],
  amravati: ['Amravati', 'Bhatkuli', 'Nandgaon Khandeshwar', 'Dharni', 'Chikhaldara', 'Achalpur', 'Chandurbazar', 'Morshi', 'Warud', 'Daryapur', 'Anjangaon Surji', 'Chandur Railway', 'Dhamangaon Railway', 'Tiosa'],
  yavatmal: ['Yavatmal', 'Arni', 'Babhulgaon', 'Kalamb', 'Darwha', 'Digras', 'Ner', 'Pusad', 'Umarkhed', 'Mahagaon', 'Ghatanji', 'Kelapur (Pandharkawada)', 'Ralegaon', 'Wani', 'Maregaon', 'Zari Jamani'],
  akola: ['Akola', 'Akot', 'Telhara', 'Balapur', 'Patur', 'Murtizapur', 'Barshitakli'],
  buldhana: ['Buldhana', 'Chikhli', 'Deulgaon Raja', 'Jalgaon Jamod', 'Sangrampur', 'Malkapur', 'Motala', 'Nandura', 'Khamgaon', 'Shegaon', 'Mehkar', 'Sindkhed Raja', 'Lonar'],
  washim: ['Washim', 'Malegaon', 'Risod', 'Mangrulpir', 'Karanja', 'Manora'],
  wardha: ['Wardha', 'Deoli', 'Seloo', 'Arvi', 'Ashti', 'Karanja', 'Hinganghat', 'Samudrapur'],
  jalna: ['Jalna', 'Bhokardan', 'Jafrabad', 'Badnapur', 'Ambad', 'Ghansawangi', 'Partur', 'Mantha'],
  beed: ['Beed', 'Ashti', 'Patoda', 'Shirur Kasar', 'Georai', 'Majalgaon', 'Wadwani', 'Kaij', 'Dharur', 'Parli Vaijnath', 'Ambejogai'],
  kolhapur: ['Karvir', 'Panhala', 'Shahuwadi', 'Kagal', 'Hatkanangle', 'Shirol', 'Radhanagari', 'Gaganbawda', 'Bhudargad', 'Gadhinglaj', 'Chandgad', 'Ajara'],
  sangli: ['Miraj', 'Kavathe Mahankal', 'Tasgaon', 'Jat', 'Walwa (Islampur)', 'Shirala', 'Kadegaon', 'Khanapur (Vita)', 'Atpadi', 'Palus']
};

export const INITIAL_WARNINGS: Warning[] = [
  {
    id: 'WARN-2026-MH-001',
    title: 'Severe Moisture Stress & Pod Abortion Risk in Marathwada',
    description: 'Persistent 19-to-24 day dry spell combined with +2.5°C maximum temperature anomalies has triggered critical moisture stress during soybean pod formation stage across Latur, Nanded, and Beed districts.',
    affectedDistricts: ['Latur', 'Nanded', 'Beed'],
    crop: 'Soybean',
    season: 'Kharif 2026',
    riskLevel: 'critical',
    status: 'issued',
    source: 'model_generated',
    creatorName: 'Dr. Suresh Patil (State Agrometeorologist)',
    assignedOfficerName: 'R. K. Shinde (District Agricultural Officer, Latur)',
    supportingEvidence: 'XGBoost model predicts -22.6% to -27.3% yield anomaly. IMD station rainfall shows 32% cumulative deficit. MODIS NDVI anomalies indicate vegetative drying.',
    recommendedActions: [
      'Apply protective micro-irrigation or sprinkler spray during morning/evening hours.',
      'Foliar spray of 2% Urea or 1% Potassium Nitrate (13:0:45) to mitigate drought shock.',
      'Deploy mulch / crop residue in furrows to reduce soil evaporation.',
      'Avoid high chemical fertilizer doses until soil moisture recovers.'
    ],
    createdAt: '2026-10-06T09:30:00Z',
    updatedAt: '2026-10-07T14:20:00Z',
    auditTrail: [
      { timestamp: '2026-10-06T09:30:00Z', action: 'Created from ML Threshold Breach', performedBy: 'System Auto-Monitor' },
      { timestamp: '2026-10-06T11:45:00Z', action: 'Reviewed & Elevated to Critical', performedBy: 'Dr. Suresh Patil' },
      { timestamp: '2026-10-07T14:20:00Z', action: 'Approved and Issued to Extension Network', performedBy: 'Directorate of Agriculture, Pune' }
    ]
  },
  {
    id: 'WARN-2026-MH-002',
    title: 'Flowering Stage Heat Anomaly Watch in Central Vidarbha',
    description: 'Elevated daytime temperatures (+1.9°C) and 16-day rainfall hiatus threatening soybean flowering and early pod set in Yavatmal and Buldhana.',
    affectedDistricts: ['Yavatmal', 'Buldhana'],
    crop: 'Soybean',
    season: 'Kharif 2026',
    riskLevel: 'high',
    status: 'under_review',
    source: 'officer_created',
    creatorName: 'A. M. Deshmukh (Sub-Divisional Ag Officer, Pusad)',
    assignedOfficerName: 'V. T. Gaikwad (Ag Officer, Darwha)',
    supportingEvidence: 'Field scout reports indicate 15% flower drop in rain-fed farms. Soil moisture dropped to 36%.',
    recommendedActions: [
      'Schedule protective irrigation where borewell or farm pond water is accessible.',
      'Recommend anti-transpirant spray (PMA or Kaolin 5%) if dry spell persists another 5 days.'
    ],
    createdAt: '2026-10-08T11:15:00Z',
    updatedAt: '2026-10-08T16:00:00Z',
    auditTrail: [
      { timestamp: '2026-10-08T11:15:00Z', action: 'Drafted by Sub-Divisional Officer', performedBy: 'A. M. Deshmukh' },
      { timestamp: '2026-10-08T16:00:00Z', action: 'Submitted for Technical Committee Review', performedBy: 'A. M. Deshmukh' }
    ]
  },
  {
    id: 'WARN-2026-MH-003',
    title: 'Localized Water Stress Advisory for Jalna & Parbhani',
    description: 'Below-average precipitation over Jalna district with moderate soil moisture depletion.',
    affectedDistricts: ['Jalna'],
    crop: 'Soybean',
    season: 'Kharif 2026',
    riskLevel: 'high',
    status: 'new',
    source: 'model_generated',
    creatorName: 'Automated ML Risk Pipeline v2.1',
    supportingEvidence: 'Model anomaly: -21.7% yield drop predicted. 20 consecutive dry days.',
    recommendedActions: [
      'Conduct ground inspection across Ambad and Partur talukas.',
      'Verify water table levels in farm ponds.'
    ],
    createdAt: '2026-10-09T04:10:00Z',
    updatedAt: '2026-10-09T04:10:00Z',
    auditTrail: [
      { timestamp: '2026-10-09T04:10:00Z', action: 'Model Generated from Station Threshold Trigger', performedBy: 'Automated ML Pipeline' }
    ]
  }
];

export const INITIAL_ADVISORIES: Advisory[] = [
  {
    id: 'ADV-2026-081',
    warningId: 'WARN-2026-MH-001',
    title: 'Urgent Advisory: Protective Irrigation and Foliar Nutrition for Soybean',
    titleMr: 'तातडीचा सल्ला: सोयाबीनसाठी संरक्षित सिंचन आणि विद्राव्य खतांची फवारणी',
    titleHi: 'आवश्यक सलाह: सोयाबीन के लिए सुरक्षात्मक सिंचाई और फोलियर पोषण',
    message: 'Due to prolonged monsoon dry spell in Latur, Nanded, and Beed, soybean crops in flowering/pod stage are experiencing moisture stress. Farmers with irrigation are advised to give light sprinkler irrigation. For rain-fed fields, spray 2% Urea or Potassium Nitrate (13:0:45) at 100g per 10L water.',
    messageMr: 'लातूर, नांदेड आणि बीड जिल्ह्यात पावसाचा मोठा खंड पडल्याने फूल आणि शेंगा भरण्याच्या अवस्थेतील सोयाबीन पिकावर पाण्याचा ताण पडत आहे. संरक्षित सिंचनाची सोय असणाऱ्या शेतकऱ्यांनी तुषार सिंचनाद्वारे हलके पाणी द्यावे. कोरडवाहू शेतात १३:०:४५ (पोटॅशियम नायट्रेट) १०० ग्रॅम प्रति १० लिटर पाण्यात मिसळून फवारणी करावी.',
    messageHi: 'लातूर, नांदेड़ और बीड में बारिश के लंबे अंतराल के कारण फूल और फली अवस्था में सोयाबीन पर पानी का तनाव है। जिन किसानों के पास सिंचाई सुविधा है, वे स्प्रिंकलर से हल्का पानी दें। असिंचित खेतों में पोटेशियम नाइट्रेट (13:0:45) 100 ग्राम प्रति 10 लीटर पानी में मिलाकर छिड़काव करें।',
    targetDistricts: ['Latur', 'Nanded', 'Beed'],
    targetCrop: 'Soybean',
    severity: 'critical',
    validFrom: '2026-10-07',
    validUntil: '2026-10-18',
    recommendedActions: [
      'Provide light sprinkler irrigation during morning or evening hours.',
      'Foliar spray of Potassium Nitrate 13:0:45 (100g / 10L water).',
      'Do not apply granular chemical fertilizers in dry soil.'
    ],
    recommendedActionsMr: [
      'सकाळी किंवा संध्याकाळी तुषार सिंचनाने हलके पाणी द्या.',
      'पोटॅशियम नायट्रेट १३:०:४५ (१०० ग्रॅम / १० लिटर पाणी) फवारा.',
      'कोरड्या मातीत रासायनिक खतांचे दाणे टाकू नका.'
    ],
    recommendedActionsHi: [
      'सुबह या शाम के समय स्प्रिंकलर से हल्का पानी दें।',
      'पोटेशियम नाइट्रेट 13:0:45 (100 ग्राम / 10 लीटर पानी) का छिड़काव करें।',
      'सूखी मिट्टी में दानेदार रासायनिक खाद न डालें।'
    ],
    status: 'published',
    publishedBy: 'Dr. Suresh Patil',
    approvedBy: 'Director of Extension, Maharashtra Ag Dept',
    publishedAt: '2026-10-07T15:00:00Z'
  }
];

export const INITIAL_FIELD_TASKS: FieldTask[] = [
  {
    id: 'TASK-MH-101',
    warningId: 'WARN-2026-MH-001',
    title: 'Ground Inspection of Flower Drop in Ausa & Nilanga',
    district: 'Latur',
    taluka: 'Ausa',
    village: 'Belkund',
    assignedTo: 'K. R. Kulkarni (Krishi Sahayak)',
    assignedOfficerPhone: '+91 98220 11442',
    priority: 'high',
    dueDate: '2026-10-12',
    status: 'in_progress',
    taskDescription: 'Inspect 15 random soybean plots across Belkund and Matola villages. Record percentage flower drop, soil cracking depth, and test weight samples.',
    fieldNotes: 'Visited 6 plots in Belkund. Heavy Vertisol cracking observed up to 8cm depth. Flower shedding estimated around 22% in rain-fed JS-335 plots.',
    createdAt: '2026-10-07T16:00:00Z',
    updatedAt: '2026-10-09T08:30:00Z'
  },
  {
    id: 'TASK-MH-102',
    warningId: 'WARN-2026-MH-001',
    title: 'Verification of Farm Pond Water Reserves in Kandhar',
    district: 'Nanded',
    taluka: 'Kandhar',
    village: 'Ghatne',
    assignedTo: 'M. V. Jadhav (Field Assistant)',
    assignedOfficerPhone: '+91 94213 88123',
    priority: 'medium',
    dueDate: '2026-10-14',
    status: 'assigned',
    taskDescription: 'Assess water storage levels across 30 farm ponds built under Jalyukta Shivar / Magel Tyala Shet Tale scheme for emergency protective irrigation.',
    createdAt: '2026-10-08T09:00:00Z',
    updatedAt: '2026-10-08T09:00:00Z'
  },
  {
    id: 'TASK-MH-103',
    warningId: 'WARN-2026-MH-002',
    title: 'Pusad Micro-Irrigation Adoption Survey',
    district: 'Yavatmal',
    taluka: 'Pusad',
    assignedTo: 'S. N. Rathod',
    priority: 'low',
    dueDate: '2026-10-16',
    status: 'unassigned',
    taskDescription: 'Identify farmers with functional drip sets requiring emergency power subsidy for protective watering.',
    createdAt: '2026-10-08T14:30:00Z',
    updatedAt: '2026-10-08T14:30:00Z'
  }
];

export const DATA_SOURCES: DataSourceStatus[] = [
  {
    id: 'imd-rainfall',
    name: 'India Meteorological Department (IMD) Daily District Rainfall',
    organization: 'Ministry of Earth Sciences, Govt of India',
    datasetDescription: 'Daily station-level gridded (0.25° x 0.25°) and district-averaged precipitation records.',
    url: 'https://nwdp.nwic.gov.in/dataset/rainfall-daily-imd',
    variables: ['Daily Rainfall (mm)', 'Cumulative Rainfall (mm)', 'Normal Rainfall (mm)', 'Rainfall Departure (%)'],
    geographicCoverage: 'All 36 districts of Maharashtra',
    temporalCoverage: 'Daily updates; historical series 1970–2026',
    lastSuccessfulUpdate: '2026-10-09T05:30:00Z',
    qualityStatus: 'verified',
    limitations: 'Interpolation density lower in tribal belt districts (Gadchiroli, Nandurbar); latency 12-24 hours for final validation.'
  },
  {
    id: 'noaa-oni',
    name: 'NOAA CPC Oceanic Niño Index (ONI v6)',
    organization: 'National Oceanic and Atmospheric Administration (NOAA), USA',
    datasetDescription: '3-month running mean of ERSST.v5 sea surface temperature anomalies in the Niño 3.4 region (5N-5S, 120W-170W).',
    url: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/oni/v6/',
    variables: ['ONI Anomaly (°C)', 'ENSO Phase Classification (El Niño / Neutral / La Niña)'],
    geographicCoverage: 'Equatorial Pacific Ocean (Niño 3.4)',
    temporalCoverage: 'Monthly series 1950–Present',
    lastSuccessfulUpdate: '2026-10-05T12:00:00Z',
    qualityStatus: 'verified',
    limitations: 'Monthly frequency; operational prediction requires lag-adjusted indexing for monsoon seasons.'
  },
  {
    id: 'des-apy',
    name: 'DES Directorate of Economics and Statistics (DES APY)',
    organization: 'Ministry of Agriculture and Farmers Welfare, Govt of India',
    datasetDescription: 'Official district-wise Area, Production, and Yield (APY) agricultural statistics for Kharif crops.',
    url: 'https://data.desagri.gov.in/website/crops-apy-report-web',
    variables: ['Soybean Area (Hectares)', 'Production (Tonnes)', 'Yield (Kg/Hectare)'],
    geographicCoverage: 'Maharashtra district-level administrative boundaries',
    temporalCoverage: 'Annual 1997–2025; Kharif 2026 Preliminary Acreage',
    lastSuccessfulUpdate: '2026-09-28T18:00:00Z',
    qualityStatus: 'verified',
    limitations: 'Final crop-cutting experiment yield data published 6 months post-harvest; preliminary estimates used during active season.'
  },
  {
    id: 'nasa-power',
    name: 'NASA POWER Agroclimatology API',
    organization: 'NASA Langley Research Center',
    datasetDescription: 'Daily solar radiation, maximum temperature, 2m relative humidity, and vapor pressure deficit.',
    url: 'https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/',
    variables: ['T2M_MAX (°C)', 'T2M_MIN (°C)', 'ALLSKY_SFC_SW_DWN (MJ/m^2)', 'VPD (kPa)'],
    geographicCoverage: 'Global 0.5° x 0.5° latitude/longitude grid',
    temporalCoverage: 'Daily observations 1981–2026',
    lastSuccessfulUpdate: '2026-10-09T02:15:00Z',
    qualityStatus: 'operational',
    limitations: 'Satellite-derived with 2-day reanalysis lag; near-real-time estimates calibrated against IMD ground stations.'
  },
  {
    id: 'modis-ndvi',
    name: 'MODIS MOD13Q1 Vegetation Indices (NDVI / EVI)',
    organization: 'NASA LP DAAC / Google Earth Engine',
    datasetDescription: '16-day composite 250m Normalized Difference Vegetation Index for crop canopy vigor monitoring.',
    url: 'https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MOD13Q1',
    variables: ['NDVI (250m)', 'NDVI Anomaly vs 10-Yr Baseline'],
    geographicCoverage: 'Maharashtra Agricultural Land Masks',
    temporalCoverage: '16-day composites 2000–2026',
    lastSuccessfulUpdate: '2026-10-02T10:00:00Z',
    qualityStatus: 'operational',
    limitations: 'Cloud contamination during peak July-August monsoon days masked via QA flags.'
  }
];

export const MODEL_METADATA: ModelMetadata = {
  modelName: 'ElNiño-Soybean-Risk-Predictor-XGBoost',
  modelVersion: 'v2.1.4-operational',
  championAlgorithm: 'Gradient Boosted Trees (XGBoost Regressor + Calibrated Classifier)',
  benchmarkAlgorithms: [
    { name: 'Historical 10-Yr Mean Baseline', mae: 218.4, rmse: 284.1, r2: 0.05 },
    { name: 'Multivariate OLS Regression', mae: 172.5, rmse: 224.3, r2: 0.41 },
    { name: 'Random Forest Regressor (100 Trees)', mae: 114.2, rmse: 154.8, r2: 0.72 },
    { name: 'XGBoost Regressor (Champion)', mae: 89.6, rmse: 122.4, r2: 0.81 }
  ],
  trainingPeriod: '2000–2022 (Temporal Train Split)',
  validationSplit: '2023–2025 Out-of-Time Test Split (Evaluated on 2023 Strong El Niño year)',
  featuresUsed: [
    'rainfall_cumulative_anomaly_pct',
    'oni_3month_index',
    'consecutive_dry_days_flowering',
    'soil_moisture_rootzone_index',
    'temp_max_anomaly_c',
    'irrigation_access_ratio',
    'ndvi_anomaly_16day',
    'district_soil_clay_pct',
    'sowing_date_dekad'
  ],
  targetVariable: 'Soybean Yield Anomaly (%) relative to 10-Year District Median Yield',
  evaluationMetrics: {
    mae: 89.6,
    rmse: 122.4,
    r2: 0.81,
    accuracyClassification: 87.4
  },
  shapAvailable: true,
  status: 'active',
  lastTrained: '2026-08-15T00:00:00Z'
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUDIT-891',
    timestamp: '2026-10-09T04:10:00Z',
    action: 'Automated Risk Evaluation',
    performedBy: 'ML Engine v2.1',
    userRole: 'admin',
    entityType: 'warning',
    entityId: 'WARN-2026-MH-003',
    details: 'Triggered new warning for Jalna due to -21.7% predicted yield anomaly.'
  },
  {
    id: 'AUDIT-890',
    timestamp: '2026-10-08T16:00:00Z',
    action: 'Warning Status Changed to Under Review',
    performedBy: 'A. M. Deshmukh',
    userRole: 'officer',
    entityType: 'warning',
    entityId: 'WARN-2026-MH-002',
    details: 'Submitted Vidarbha flower drop warning to technical evaluation committee.'
  },
  {
    id: 'AUDIT-889',
    timestamp: '2026-10-07T15:00:00Z',
    action: 'Published Farmer Advisory',
    performedBy: 'Dr. Suresh Patil',
    userRole: 'officer',
    entityType: 'advisory',
    entityId: 'ADV-2026-081',
    details: 'Published Marathi, Hindi, and English protective irrigation advisory for Latur, Nanded, and Beed.'
  },
  {
    id: 'AUDIT-888',
    timestamp: '2026-10-07T14:20:00Z',
    action: 'Warning Approved & Issued',
    performedBy: 'Directorate of Agriculture',
    userRole: 'officer',
    entityType: 'warning',
    entityId: 'WARN-2026-MH-001',
    details: 'Elevated Marathwada warning to CRITICAL and issued to district extension heads.'
  }
];
