/**
 * Olympus Sport Hellas - Standalone KPI Calculation Engine (Core SDK)
 * 
 * Pure, framework-agnostic mathematical and accounting functions.
 * Compliant with Greek Accounting Standards (ΕΛΠ ν. 4308/2014 & myDATA).
 * Can be imported into any frontend (React, Vue, Angular) or backend (Node.js, Express).
 */

export interface PvmItem {
  code: string;
  p0: number; // Price period 0
  q0: number; // Quantity period 0
  p1: number; // Price period 1
  q1: number; // Quantity period 1
}

export interface PvmResult {
  revenuePeriod0: number;
  revenuePeriod1: number;
  revenueDelta: number;
  priceEffect: number;
  volumeEffect: number;
  mixEffect: number;
  reconciliationCheck: boolean;
}

export interface AgingBucket {
  bucket: string;
  amountWithVat: number;
  historicalLossRatePct: number;
}

export interface ChurnEvaluation {
  inactivityRatio: number;
  status: 'Normal' | 'Monitor' | 'At Risk' | 'Lost';
  actionGreek: string;
}

/**
 * 01. Revenue Growth YoY (%)
 */
export function calculateRevenueGrowthYoY(currentRevenue: number, previousRevenue: number): number {
  if (previousRevenue === 0) return 0;
  return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
}

/**
 * 03. Price-Volume-Mix (PVM) Waterfall Decomposition
 */
export function calculatePVM(items: PvmItem[]): PvmResult {
  let rev0 = 0;
  let rev1 = 0;
  let totalQ0 = 0;
  let totalQ1 = 0;
  let priceEffect = 0;
  let baseP0TimesQ1 = 0;

  for (const item of items) {
    rev0 += item.p0 * item.q0;
    rev1 += item.p1 * item.q1;
    totalQ0 += item.q0;
    totalQ1 += item.q1;
    priceEffect += (item.p1 - item.p0) * item.q1;
    baseP0TimesQ1 += item.p0 * item.q1;
  }

  const avgP0 = totalQ0 > 0 ? rev0 / totalQ0 : 0;
  const volumeEffect = (totalQ1 - totalQ0) * avgP0;
  const mixEffect = baseP0TimesQ1 - (totalQ1 * avgP0);
  const revenueDelta = rev1 - rev0;

  // Numerical check within 0.01 precision
  const sumEffects = priceEffect + volumeEffect + mixEffect;
  const reconciliationCheck = Math.abs(sumEffects - revenueDelta) < 0.05;

  return {
    revenuePeriod0: rev0,
    revenuePeriod1: rev1,
    revenueDelta,
    priceEffect,
    volumeEffect,
    mixEffect,
    reconciliationCheck,
  };
}

/**
 * 04. Landed Cost Calculation (ΕΛΠ ν. 4308/2014)
 */
export function calculateLandedCost(supplierPrice: number, freightAndTariffsPct: number): number {
  return supplierPrice * (1 + freightAndTariffsPct / 100);
}

/**
 * 04. Gross Margin % (from selling price and landed cost)
 */
export function calculateGrossMargin(netSellingPrice: number, landedCost: number): number {
  if (netSellingPrice <= 0) return 0;
  return ((netSellingPrice - landedCost) / netSellingPrice) * 100;
}

/**
 * 04. Markup % from Gross Margin %
 */
export function calculateMarkupFromMargin(grossMarginPct: number): number {
  const m = grossMarginPct / 100;
  if (m >= 1) return 0;
  return (m / (1 - m)) * 100;
}

/**
 * 04. Gross Margin % from Markup Multiplier (e.g. x1.80)
 */
export function calculateMarginFromMarkup(markupMultiplier: number): number {
  const k = markupMultiplier - 1;
  return (k / (1 + k)) * 100;
}

/**
 * 05. Required Volume Increase for Discount: d / (m - d)
 */
export function calculateVolumeRequiredForDiscount(grossMarginPct: number, discountPct: number): number {
  const m = grossMarginPct / 100;
  const d = discountPct / 100;
  if (m - d <= 0) return 0;
  return (d / (m - d)) * 100;
}

/**
 * 06. Customer Profitability (Cost-to-Serve)
 */
export function calculateCustomerContribution(
  grossProfit: number,
  turnoverDiscount: number,
  absorbedFreight: number,
  averageReceivableBalance: number,
  annualInterestRatePct: number
): { contribution: number; financingCost: number } {
  const financingCost = averageReceivableBalance * (annualInterestRatePct / 100);
  const contribution = grossProfit - turnoverDiscount - absorbedFreight - financingCost;
  return { contribution, financingCost };
}

/**
 * 08. Customer Retention Rate (CRR) & Net Revenue Retention (NRR)
 */
export function calculateCRR(startCustomers: number, endCustomers: number, newCustomers: number): number {
  if (startCustomers <= 0) return 0;
  return ((endCustomers - newCustomers) / startCustomers) * 100;
}

export function calculateNRR(revenueFromRetainedCurrentYear: number, revenueFromSamePreviousYear: number): number {
  if (revenueFromSamePreviousYear <= 0) return 0;
  return (revenueFromRetainedCurrentYear / revenueFromSamePreviousYear) * 100;
}

/**
 * 09. Silent Churn Inactivity Evaluator
 */
export function evaluateSilentChurn(daysSinceLastOrder: number, avgOrderCycleDays: number): ChurnEvaluation {
  if (avgOrderCycleDays <= 0) {
    return { inactivityRatio: 0, status: 'Normal', actionGreek: 'Ανεπαρκές ιστορικό παραγγελιών' };
  }

  const ratio = daysSinceLastOrder / avgOrderCycleDays;

  if (ratio <= 1.0) {
    return { inactivityRatio: ratio, status: 'Normal', actionGreek: 'Φυσιολογική συμπεριφορά' };
  } else if (ratio <= 1.5) {
    return { inactivityRatio: ratio, status: 'Monitor', actionGreek: 'Παρακολούθηση στην επόμενη εβδομάδα' };
  } else if (ratio <= 3.0) {
    return { inactivityRatio: ratio, status: 'At Risk', actionGreek: 'Σε κίνδυνο: Άμεση τηλεφωνική επικοινωνία από πωλητή' };
  } else {
    return { inactivityRatio: ratio, status: 'Lost', actionGreek: 'Πιθανώς χαμένος: Ειδική προσφορά επανενεργοποίησης' };
  }
}

/**
 * 15. Days Sales Outstanding (DSO) with VAT 24% & Cheques
 */
export function calculateDSO(
  openReceivablesWithVat: number,
  quarterCreditSalesNet: number,
  daysInPeriod: number = 92,
  postDatedCheques: number = 0
): { standardDsoDays: number; economicDsoDays: number } {
  const creditSalesWithVat = quarterCreditSalesNet * 1.24;
  if (creditSalesWithVat <= 0) return { standardDsoDays: 0, economicDsoDays: 0 };

  const standardDsoDays = (openReceivablesWithVat / creditSalesWithVat) * daysInPeriod;
  const economicDsoDays = ((openReceivablesWithVat + postDatedCheques) / creditSalesWithVat) * daysInPeriod;

  return { standardDsoDays, economicDsoDays };
}

/**
 * 15 & 19. Cash Conversion Cycle (CCC = DIO + DSO - DPO)
 */
export function calculateCashConversionCycle(dioDays: number, dsoDays: number, dpoDays: number): number {
  return dioDays + dsoDays - dpoDays;
}

/**
 * 17. Expected Credit Loss (ECL) from Aging Buckets
 */
export function calculateExpectedCreditLoss(buckets: AgingBucket[]): { totalReceivables: number; totalECL: number; eclRatePct: number } {
  let totalReceivables = 0;
  let totalECL = 0;

  for (const b of buckets) {
    totalReceivables += b.amountWithVat;
    totalECL += b.amountWithVat * (b.historicalLossRatePct / 100);
  }

  const eclRatePct = totalReceivables > 0 ? (totalECL / totalReceivables) * 100 : 0;
  return { totalReceivables, totalECL, eclRatePct };
}

/**
 * 18 & 19. Inventory Turnover & DIO
 */
export function calculateInventoryTurnover(annualCogs: number, averageStockCost: number): { turnover: number; dioDays: number } {
  if (averageStockCost <= 0) return { turnover: 0, dioDays: 0 };
  const turnover = annualCogs / averageStockCost;
  const dioDays = turnover > 0 ? 365 / turnover : 0;
  return { turnover, dioDays };
}

/**
 * 20. GMROI (Gross Margin Return on Investment)
 */
export function calculateGMROI(grossMarginPct: number, inventoryTurnover: number): number {
  const m = grossMarginPct / 100;
  if (m >= 1) return 0;
  return (m / (1 - m)) * inventoryTurnover;
}

/**
 * 22. Safety Stock & Reorder Point (ROP)
 */
export function calculateSafetyStockAndROP(
  weeklyDemandAvg: number,
  weeklyDemandStd: number,
  leadTimeWeeks: number,
  serviceLevelZ: number = 1.65 // 95% default
): { safetyStock: number; reorderPoint: number } {
  const safetyStock = Math.round(serviceLevelZ * weeklyDemandStd * Math.sqrt(leadTimeWeeks));
  const reorderPoint = Math.round(weeklyDemandAvg * leadTimeWeeks + safetyStock);
  return { safetyStock, reorderPoint };
}

/**
 * 29. ROAS & Break-Even ROAS
 */
export function calculateROAS(netAttributedRevenue: number, adSpend: number, grossMarginPct: number): { roas: number; breakEvenRoas: number } {
  if (adSpend <= 0) return { roas: 0, breakEvenRoas: 0 };
  const roas = netAttributedRevenue / adSpend;
  const m = grossMarginPct / 100;
  const breakEvenRoas = m > 0 ? 1 / m : 0;
  return { roas, breakEvenRoas };
}
