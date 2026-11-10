/**
 * Domain types for EL NIÑO Agricultural Risk & Early Warning System
 */

export type UserRole = 'farmer' | 'officer' | 'admin';
export type Language = 'en' | 'mr' | 'hi';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical' | 'unavailable';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email?: string;
  language: Language;
  district?: string;
  designation?: string;
  department?: string;
  assignedDistricts?: string[];
  isApproved?: boolean;
}

export interface FarmProfile {
  id: string;
  farmerId: string;
  farmerName: string;
  state: string;
  district: string;
  taluka?: string;
  village?: string;
  farmArea: number;
  farmAreaUnit: 'acres' | 'hectares' | 'guntha';
  crop: string;
  cropVariety?: string;
  sowingDate: string;
  cropStage: 'vegetative' | 'flowering' | 'pod_formation' | 'grain_filling' | 'maturity';
  waterSource: 'rain-fed' | 'irrigated' | 'partially-irrigated';
  irrigationType?: 'none' | 'drip' | 'sprinkler' | 'flood';
  soilType?: 'black_cotton' | 'medium_black' | 'red_loam' | 'sandy_loam';
  recentObservations?: string;
  updatedAt: string;
}

export interface ClimateIndicators {
  rainfallObservedMm: number;
  rainfallNormalMm: number;
  rainfallAnomalyPct: number;
  tempMaxC: number;
  tempAnomalyMaxC: number;
  soilMoisturePct: number; // 0-100%
  ndviValue: number; // 0-1
  ndviAnomalyPct: number;
  oniIndex: number;
  ensoPhase: 'El Niño (Strong)' | 'El Niño (Moderate)' | 'Neutral' | 'La Niña';
  consecutiveDryDays: number;
  referencePeriod: string;
  lastUpdated: string;
  dataQuality: 'high' | 'moderate' | 'estimated' | 'demo';
}

export interface ShapValue {
  feature: string;
  label: string;
  impact: number;
  valueDisplay: string;
  direction: 'increases_risk' | 'decreases_risk' | 'neutral';
  explanation: string;
}

export interface Assessment {
  id: string;
  farmerId: string;
  farmId: string;
  timestamp: string;
  crop: string;
  district: string;
  taluka?: string;
  village?: string;
  riskLevel: RiskLevel;
  estimatedYieldKgHa: number;
  historicalBaselineKgHa: number;
  yieldAnomalyPct: number;
  uncertaintyRange: [number, number];
  confidencePct: number;
  modelVersion: string;
  modelType: string;
  climateIndicators: ClimateIndicators;
  keyContributingFactors: ShapValue[];
  recommendations: {
    priority: 'urgent' | 'medium' | 'advisory';
    category: 'irrigation' | 'crop_care' | 'monitoring' | 'extension';
    text: string;
    textMr?: string;
    textHi?: string;
  }[];
  dataStatus: 'real_pipeline' | 'demo_data';
  limitations: string;
}

export interface DistrictRiskData {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  region: 'Vidarbha' | 'Marathwada' | 'Western Maharashtra' | 'North Maharashtra';
  lat: number;
  lng: number;
  crop: string;
  soybeanAcreageHa: number;
  historicalYieldBaselineKgHa: number;
  predictedYieldKgHa: number;
  yieldAnomalyPct: number;
  riskLevel: RiskLevel;
  rainfallObservedMm: number;
  rainfallNormalMm: number;
  rainfallAnomalyPct: number;
  tempAnomalyMaxC: number;
  soilMoisturePct: number;
  ndviAnomalyPct: number;
  oniIndex: number;
  ensoPhase: string;
  consecutiveDryDays: number;
  activeWarningsCount: number;
  warningStatus: 'active' | 'watch' | 'none';
  dataCompleteness: number;
  lastUpdated: string;
  shapExplanations: ShapValue[];
}

export type WarningStatus = 'new' | 'under_review' | 'approved' | 'issued' | 'closed' | 'rejected';

export interface Warning {
  id: string;
  title: string;
  titleMr?: string;
  titleHi?: string;
  description: string;
  descriptionMr?: string;
  descriptionHi?: string;
  affectedDistricts: string[];
  crop: string;
  season: string;
  riskLevel: RiskLevel;
  status: WarningStatus;
  source: 'model_generated' | 'officer_created' | 'demo_alert';
  creatorName: string;
  creatorDesignation?: string;
  assignedOfficerName?: string;
  supportingEvidence: string;
  recommendedActions: string[];
  recommendedActionsMr?: string[];
  recommendedActionsHi?: string[];
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
  auditTrail: {
    timestamp: string;
    action: string;
    performedBy: string;
    notes?: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  titleMr?: string;
  titleHi?: string;
  details: string;
  detailsMr?: string;
  detailsHi?: string;
  targetDistricts: string[];
  targetCrop?: string;
  eventType: 'training' | 'camp' | 'scheme' | 'general';
  eventDate?: string;
  venue?: string;
  officialContact?: string;
  publishedBy: string;
  publishedByDesignation?: string;
  createdAt: string;
  validUntil?: string;
  status: 'published' | 'draft' | 'archived';
}

export interface Advisory {
  id: string;
  warningId?: string;
  title: string;
  titleMr: string;
  titleHi: string;
  message: string;
  messageMr: string;
  messageHi: string;
  targetDistricts: string[];
  targetCrop: string;
  severity: 'critical' | 'alert' | 'advisory';
  validFrom: string;
  validUntil: string;
  recommendedActions: string[];
  recommendedActionsMr?: string[];
  recommendedActionsHi?: string[];
  status: 'draft' | 'published' | 'archived';
  publishedBy: string;
  approvedBy: string;
  publishedAt: string;
}

export interface OfficerContact {
  id: string;
  name: string;
  designation: string;
  district: string;
  taluka?: string;
  department: string;
  phone: string;
  email?: string;
  officeAddress: string;
  officeHours: string;
  isVerified: boolean;
  generalSupportNumber: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  mode: 'help' | 'crop_assistant';
  audioAvailable?: boolean;
}

export interface ScenarioResult {
  id: string;
  timestamp: string;
  district: string;
  crop: string;
  baseline: {
    rainfallAnomalyPct: number;
    tempAnomalyC: number;
    soilMoisturePct: number;
    predictedYieldKgHa: number;
    yieldAnomalyPct: number;
    riskLevel: RiskLevel;
  };
  simulated: {
    rainfallAnomalyPct: number;
    tempAnomalyC: number;
    soilMoisturePct: number;
    predictedYieldKgHa: number;
    yieldAnomalyPct: number;
    riskLevel: RiskLevel;
  };
  yieldDifferenceKgHa: number;
  percentageChange: number;
  explanation: string;
  recommendations: string[];
  assumptions: string;
  limitations: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'assigned' | 'unassigned';

export interface FieldTask {
  id: string;
  warningId?: string;
  title: string;
  district: string;
  taluka?: string;
  village?: string;
  assignedTo: string;
  assignedOfficerPhone?: string;
  assignedOfficerRole?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: TaskStatus;
  description?: string;
  taskDescription?: string;
  fieldNotes?: string;
  notes?: string;
  dueDate: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

export interface DataSourceStatus {
  id: string;
  name: string;
  organization: string;
  datasetDescription: string;
  url: string;
  variables: string[];
  geographicCoverage: string;
  temporalCoverage: string;
  lastSuccessfulUpdate: string;
  qualityStatus: 'verified' | 'operational' | 'degraded';
  limitations: string;
  source?: string;
  status?: string;
  lastSync?: string;
  recordCount?: number;
}

export interface ModelMetadata {
  modelName: string;
  modelVersion: string;
  championAlgorithm: string;
  benchmarkAlgorithms: { name: string; mae: number; rmse: number; r2: number }[];
  trainingPeriod: string;
  validationSplit: string;
  featuresUsed: string[];
  targetVariable: string;
  evaluationMetrics: {
    mae: number;
    rmse: number;
    r2: number;
    accuracyClassification: number;
  };
  shapAvailable?: boolean;
  status: string;
  lastTrained: string;
  version?: string;
  algorithm?: string;
  trainingDate?: string;
  accuracyMetric?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  userRole: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}

