export const MOCK_EXECUTIVE_SUMMARY = {
  revenueYoY: {
    currentYear: 528000,
    previousYear: 480000,
    growthRate: 10.0,
    target: 550000,
    targetAchievement: 96.0,
  },
  grossMargin: {
    rate: 44.4,
    revenue: 528000,
    cogs: 293568,
    grossProfit: 234432,
    markup: 79.8,
  },
  customers: {
    totalActive: 335,
    previousYearActive: 320,
    retentionRate: 90.6,
    nrrRate: 104.2,
    top10Share: 40.0,
    hhiIndex: 420,
  },
  cashAndCredit: {
    dsoDays: 31,
    dsoWithCheques: 46,
    openReceivablesWithVat: 186000,
    postDatedCheques: 90000,
    expectedCreditLoss: 6450,
  },
  inventory: {
    stockValue: 450000,
    annualCogs: 900000,
    turnover: 2.0,
    dioDays: 182.5,
    gmroi: 1.60,
    cashConversionCycle: 153.5,
  }
};

export const MOCK_MONTHLY_SALES = [
  { month: 'Ιαν', year2025: 42000, year2026: 46200, target: 45000 },
  { month: 'Φεβ', year2025: 38000, year2026: 41800, target: 42000 },
  { month: 'Μαρ', year2025: 44000, year2026: 47500, target: 46000 },
  { month: 'Απρ', year2025: 39000, year2026: 43000, target: 44000 },
  { month: 'Μαϊ', year2025: 36000, year2026: 40200, target: 41000 },
  { month: 'Ιουν', year2025: 31000, year2026: 34500, target: 35000 },
  { month: 'Ιουλ', year2025: 24000, year2026: 26000, target: 28000 },
  { month: 'Αυγ', year2025: 18000, year2026: 20500, target: 22000 },
  { month: 'Σεπ', year2025: 58000, year2026: 65000, target: 62000 },
  { month: 'Οκτ', year2025: 48000, year2026: 52800, target: 51000 },
  { month: 'Νοε', year2025: 51000, year2026: 54500, target: 55000 },
  { month: 'Δεκ', year2025: 51000, year2026: 56000, target: 59000 },
];

export const MOCK_CUSTOMER_CONCENTRATION = [
  { name: 'Reseller Αθηνών (Martial Mart)', share: 18.0, cumulativeShare: 18.0, sales: 95040 },
  { name: 'Fight Club Academy Hellas', share: 5.5, cumulativeShare: 23.5, sales: 29040 },
  { name: 'Πανελλήνια Ένωση TaeKwonDo', share: 4.2, cumulativeShare: 27.7, sales: 22176 },
  { name: 'Dojo Center Θεσσαλονίκης', share: 3.8, cumulativeShare: 31.5, sales: 20064 },
  { name: 'Combat Gear Patras', share: 2.5, cumulativeShare: 34.0, sales: 13200 },
  { name: 'Spartan Boxing Club', share: 2.0, cumulativeShare: 36.0, sales: 10560 },
  { name: 'Judo Union Βορείου Ελλάδος', share: 1.8, cumulativeShare: 37.8, sales: 9504 },
  { name: 'Krav Maga Hellas Network', share: 1.6, cumulativeShare: 39.4, sales: 8448 },
  { name: 'BJJ Champions League', share: 1.4, cumulativeShare: 40.8, sales: 7392 },
  { name: 'Karate Do Kyokushin', share: 1.2, cumulativeShare: 42.0, sales: 6336 },
  { name: 'Λοιποί 325 Πελάτες (Long Tail)', share: 58.0, cumulativeShare: 100.0, sales: 306240 },
];

export const MOCK_RECEIVABLES_AGING = [
  { bucket: 'Εμπρόθεσμα', amount: 120000, percentage: 64.5, lossRate: 0.5, expectedLoss: 600 },
  { bucket: '1 - 30 ημέρες', amount: 40000, percentage: 21.5, lossRate: 2.0, expectedLoss: 800 },
  { bucket: '31 - 60 ημέρες', amount: 15000, percentage: 8.1, lossRate: 8.0, expectedLoss: 1200 },
  { bucket: '61 - 90 ημέρες', amount: 8000, percentage: 4.3, lossRate: 15.0, expectedLoss: 1200 },
  { bucket: '90+ ημέρες', amount: 3000, percentage: 1.6, lossRate: 88.0, expectedLoss: 2640 },
];

export const MOCK_INVENTORY_CATEGORIES = [
  { category: 'Κιμονό (Judo/Karate/BJJ)', stockValue: 160000, cogs: 480000, turnover: 3.0, marginPct: 46.0, gmroi: 2.55, sellThrough90: 84 },
  { category: 'Γάντια Πυγμαχίας / MMA', stockValue: 120000, cogs: 240000, turnover: 2.0, marginPct: 44.4, gmroi: 1.60, sellThrough90: 68 },
  { category: 'Προστατευτικά (Shin/Head)', stockValue: 90000, cogs: 90000, turnover: 1.0, marginPct: 48.0, gmroi: 0.92, sellThrough90: 45 },
  { category: 'Σάκοι & Στόχοι Προπόνησης', stockValue: 50000, cogs: 60000, turnover: 1.2, marginPct: 38.0, gmroi: 0.74, sellThrough90: 38 },
  { category: 'Ζώνες & Αξεσουάρ / Bandages', stockValue: 30000, cogs: 30000, turnover: 1.0, marginPct: 55.0, gmroi: 1.22, sellThrough90: 72 },
];

export const MOCK_SILENT_CHURN_ALERTS = [
  {
    customerCode: 'CUST-042',
    name: 'Ακαδημία Kickboxing Αμαρουσίου',
    lastOrderDaysAgo: 84,
    avgCycleDays: 35,
    inactivityIndex: 2.4,
    status: 'Κίνδυνος Αποχώρησης',
    annualSales: 8400,
    phone: '210-612XXXX',
    preferredBrand: 'Olympus',
  },
  {
    customerCode: 'CUST-108',
    name: 'Dojo Zen Καλαμαριάς',
    lastOrderDaysAgo: 110,
    avgCycleDays: 42,
    inactivityIndex: 2.6,
    status: 'Κίνδυνος Αποχώρησης',
    annualSales: 6200,
    phone: '231-045XXXX',
    preferredBrand: 'Hayashi',
  },
  {
    customerCode: 'CUST-019',
    name: 'MMA Pro Arena Λάρισας',
    lastOrderDaysAgo: 145,
    avgCycleDays: 45,
    inactivityIndex: 3.2,
    status: 'Πιθανώς Χαμένος',
    annualSales: 12800,
    phone: '241-028XXXX',
    preferredBrand: 'TopTen',
  },
  {
    customerCode: 'CUST-215',
    name: 'TaeKwonDo Αίας Ηρακλείου',
    lastOrderDaysAgo: 62,
    avgCycleDays: 30,
    inactivityIndex: 2.1,
    status: 'Κίνδυνος Αποχώρησης',
    annualSales: 4900,
    phone: '281-032XXXX',
    preferredBrand: 'Olympus',
  },
  {
    customerCode: 'CUST-088',
    name: 'BJJ Warriors Πειραιά',
    lastOrderDaysAgo: 190,
    avgCycleDays: 50,
    inactivityIndex: 3.8,
    status: 'Πιθανώς Χαμένος',
    annualSales: 9400,
    phone: '210-418XXXX',
    preferredBrand: 'Olympus',
  },
];
