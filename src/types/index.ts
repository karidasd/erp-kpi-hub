export type KpiCategory = 
  | 'Έσοδα' 
  | 'Κερδοφορία' 
  | 'Πελάτες' 
  | 'Ταμείο' 
  | 'Απόθεμα' 
  | 'Pipeline' 
  | 'B2C';

export type AudienceType = 'B2B' | 'B2C' | 'B2B · B2C';

export type ImplementationStatus = 
  | 'Πιθανώς έτοιμο στο ERP'
  | 'Export από ERP + Excel/Power BI'
  | 'Χρειάζεται δεδομένα εκτός ERP';

export interface KPI {
  id: number;
  code: string;
  nameGr: string;
  nameEn: string;
  category: KpiCategory;
  audience: AudienceType;
  isCore: boolean;
  implementationStatus: ImplementationStatus;
  whatItMeasures: string;
  formula: string;
  accountingBase: string;
  implementation: string;
  example: string;
  trap: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: string;
  customerCode: string;
  customerName: string;
  customerType: 'Σχολή' | 'Γυμναστήριο' | 'Reseller' | 'Ομοσπονδία' | 'Λιανική (B2C)';
  itemCode: string;
  itemDescription: string;
  category: 'Κιμονό' | 'Γάντια' | 'Προστατευτικά' | 'Αξεσουάρ / Bandages' | 'Σάκοι / Στόχοι';
  brand: 'Olympus' | 'TopTen' | 'Hayashi';
  quantity: number;
  catalogPrice: number;
  discountPercent: number;
  netRevenue: number;
  unitCost: number;
  totalCost: number;
  grossMargin: number;
  grossMarginPercent: number;
}

export interface ReceivableItem {
  customerCode: string;
  customerName: string;
  customerType: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amountWithVat: number;
  postDatedCheque: number;
  daysOverdue: number;
  agingBucket: 'Εμπρόθεσμα' | '1-30' | '31-60' | '61-90' | '90+';
}

export interface InventoryItem {
  itemCode: string;
  description: string;
  category: string;
  stockQty: number;
  unitCost: number;
  totalStockValue: number;
  annualSalesQty: number;
  annualCogs: number;
  annualRevenue: number;
  inventoryTurnover: number;
  dioDays: number;
  gmroi: number;
  leadTimeWeeks: number;
  weeklyDemandAvg: number;
  weeklyDemandStd: number;
  safetyStock: number;
  reorderPoint: number;
}
