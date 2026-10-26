/**
 * Olympus Sport Hellas - Exelixis & Greek ERP Data Adapter
 * 
 * Normalizes raw exports from Exelixis, Softone, or Entersoft ERP into the Star Schema.
 */

export interface RawErpRow {
  [key: string]: any;
}

export interface NormalizedInvoiceLine {
  date: string;
  invoiceNumber: string;
  customerCode: string;
  customerName: string;
  customerType: string;
  itemCode: string;
  itemDescription: string;
  category: string;
  brand: string;
  quantity: number;
  catalogPrice: number;
  discountPct: number;
  netRevenue: number;
  landedCost: number;
  grossMargin: number;
  grossMarginPct: number;
  salesperson: string;
}

export function normalizeExelixisExport(rawRows: RawErpRow[]): {
  normalizedLines: NormalizedInvoiceLine[];
  warnings: string[];
  totalNetRevenue: number;
  totalGrossMargin: number;
} {
  const normalizedLines: NormalizedInvoiceLine[] = [];
  const warnings: string[] = [];
  let totalNetRevenue = 0;
  let totalGrossMargin = 0;
  let missingCostCount = 0;

  for (let idx = 0; idx < rawRows.length; idx++) {
    const row = rawRows[idx];

    // Fuzzy matching column names for Greek ERP exports
    const date = row['Ημερομηνία'] || row['Ημ/νία'] || row['Date'] || new Date().toISOString().split('T')[0];
    const invoiceNumber = String(row['Αρ. Παραστατικού'] || row['Αρ_Παραστατικού'] || row['Παραστατικό'] || row['InvoiceNo'] || `INV-${idx + 1}`);
    const customerCode = String(row['Κωδ. Πελάτη'] || row['Κωδ_Πελάτη'] || row['Κωδικός Πελάτη'] || row['CustomerID'] || 'UNKNOWN');
    const customerName = String(row['Επωνυμία'] || row['Επωνυμία Πελάτη'] || row['Πελάτης'] || row['CustomerName'] || 'Ανώνυμος Πελάτης');
    const customerType = String(row['Τύπος Πελάτη'] || row['Τύπος'] || row['Κατηγορία Πελάτη'] || 'Σχολή');
    const itemCode = String(row['Κωδ. Είδους'] || row['Κωδ_Είδους'] || row['Κωδικός'] || row['ItemCode'] || 'ITEM-00');
    const itemDescription = String(row['Περιγραφή'] || row['Περιγραφή Είδους'] || row['Description'] || 'Προϊόν');
    const category = String(row['Κατηγορία'] || row['Κατηγορία Είδους'] || 'Εξοπλισμός');
    const brand = String(row['Brand'] || row['Μάρκα'] || 'Olympus');

    const quantity = Number(row['Ποσότητα'] || row['Qty'] || 1);
    const catalogPrice = Number(row['Τιμή Καταλόγου'] || row['Τιμή'] || row['Price'] || 0);
    const discountPct = Number(row['Έκπτωση %'] || row['Έκπτωση'] || row['Discount'] || 0);

    // Calculate or parse net revenue (without VAT)
    let netRevenue = Number(row['Καθαρή Αξία'] || row['Καθαρή_Αξία'] || row['NetRevenue'] || 0);
    if (netRevenue === 0 && catalogPrice > 0) {
      netRevenue = quantity * catalogPrice * (1 - discountPct / 100);
    }

    // Landed cost check
    let landedCost = Number(row['Κόστος Γραμμής'] || row['Κόστος_Μονάδας_Landed'] || row['Κόστος'] || row['LandedCost'] || 0);
    if (landedCost === 0) {
      missingCostCount++;
      // Fallback estimate if missing
      landedCost = netRevenue * 0.55; 
    }

    const grossMargin = netRevenue - landedCost;
    const grossMarginPct = netRevenue > 0 ? (grossMargin / netRevenue) * 100 : 0;
    const salesperson = String(row['Πωλητής'] || row['Salesperson'] || 'Γραφείο');

    normalizedLines.push({
      date,
      invoiceNumber,
      customerCode,
      customerName,
      customerType,
      itemCode,
      itemDescription,
      category,
      brand,
      quantity,
      catalogPrice,
      discountPct,
      netRevenue,
      landedCost,
      grossMargin,
      grossMarginPct,
      salesperson,
    });

    totalNetRevenue += netRevenue;
    totalGrossMargin += grossMargin;
  }

  if (missingCostCount > 0) {
    warnings.push(`Εντοπίστηκαν ${missingCostCount} γραμμές χωρίς Landed Cost στο export. Εφαρμόστηκε λειτουργική προσέγγιση κόστους.`);
  }

  return {
    normalizedLines,
    warnings,
    totalNetRevenue,
    totalGrossMargin,
  };
}
