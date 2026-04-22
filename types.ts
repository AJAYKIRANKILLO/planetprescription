
export enum RiskLevel {
  HIGH = 'High Risk',
  MEDIUM = 'Medium Risk',
  LOW = 'Low Risk',
  UNKNOWN = 'Unknown'
}

export interface MedicineAnalysis {
  name: string;
  composition: string; // Used for "Type" in Batch Mode
  expiryDate: string;
  riskLevel: RiskLevel;
  riskReason: string; // Used for "Reason" in Batch Mode
  disposalRecommendation: string; // Used for "DisposalMethod" in Batch Mode
  userEcoTip?: string;
  adminIndustrialMethod?: string;
  // Optional ID for batch tracking
  id?: string;
}

export interface PickupRequest {
  id: string;
  medicine: MedicineAnalysis;
  address: string;
  date: string;
  status: 'Pending' | 'Scheduled' | 'Collected';
}

export type ViewState = 'HOME' | 'SCAN' | 'DASHBOARD' | 'MAP';
