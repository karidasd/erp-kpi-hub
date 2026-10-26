import React, { useState } from 'react';
import { 
  Calculator, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CalculatorsTab: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'pvm' | 'margin' | 'dso' | 'safetystock' | 'churn'>('pvm');

  // --- State for PVM Calculator ---
  const [pvmP0A, setPvmP0A] = useState<number>(40);
  const [pvmQ0A, setPvmQ0A] = useState<number>(100);
  const [pvmP1A, setPvmP1A] = useState<number>(42);
  const [pvmQ1A, setPvmQ1A] = useState<number>(80);

  const [pvmP0B, setPvmP0B] = useState<number>(5);
  const [pvmQ0B, setPvmQ0B] = useState<number>(100);
  const [pvmP1B, setPvmP1B] = useState<number>(5);
  const [pvmQ1B, setPvmQ1B] = useState<number>(160);

  // PVM Math
  const rev0 = (pvmP0A * pvmQ0A) + (pvmP0B * pvmQ0B);
  const rev1 = (pvmP1A * pvmQ1A) + (pvmP1B * pvmQ1B);
  const totalRevDiff = rev1 - rev0;

  const totalQ0 = pvmQ0A + pvmQ0B;
  const totalQ1 = pvmQ1A + pvmQ1B;
  const avgP0 = totalQ0 > 0 ? rev0 / totalQ0 : 0;

  const priceEffect = ((pvmP1A - pvmP0A) * pvmQ1A) + ((pvmP1B - pvmP0B) * pvmQ1B);
  const volumeEffect = (totalQ1 - totalQ0) * avgP0;
  const mixEffect = ((pvmP0A * pvmQ1A) + (pvmP0B * pvmQ1B)) - (totalQ1 * avgP0);

  // --- State for Margin / Markup Calculator ---
  const [supplierPrice, setSupplierPrice] = useState<number>(20);
  const [landedAddonsPct, setLandedAddonsPct] = useState<number>(25); // freight + tariff %
  const [markupMultiplier, setMarkupMultiplier] = useState<number>(1.80);
  const [discountPct, setDiscountPct] = useState<number>(10);

  const landedCost = supplierPrice * (1 + landedAddonsPct / 100);
  const wholesalePrice = landedCost * markupMultiplier;
  const markupPct = (markupMultiplier - 1) * 100;
  const grossMarginPct = wholesalePrice > 0 ? ((wholesalePrice - landedCost) / wholesalePrice) * 100 : 0;

  // After discount
  const discountedPrice = wholesalePrice * (1 - discountPct / 100);
  const discountedMarginPct = discountedPrice > 0 ? ((discountedPrice - landedCost) / discountedPrice) * 100 : 0;
  const m = grossMarginPct / 100;
  const d = discountPct / 100;
  const reqVolumeIncreasePct = (m - d) > 0 ? (d / (m - d)) * 100 : 0;

  // --- State for DSO & CCC Calculator ---
  const [quarterCreditSalesNet, setQuarterCreditSalesNet] = useState<number>(450000);
  const [openReceivablesVat, setOpenReceivablesVat] = useState<number>(186000);
  const [postDatedCheques, setPostDatedCheques] = useState<number>(90000);
  const [daysInPeriod] = useState<number>(92);
  const [dioDays, setDioDays] = useState<number>(182);
  const [dpoDays, setDpoDays] = useState<number>(60);

  const creditSalesWithVat = quarterCreditSalesNet * 1.24;
  const dsoStandard = creditSalesWithVat > 0 ? (openReceivablesVat / creditSalesWithVat) * daysInPeriod : 0;
  const dsoEconomic = creditSalesWithVat > 0 ? ((openReceivablesVat + postDatedCheques) / creditSalesWithVat) * daysInPeriod : 0;
  const cccEconomic = dioDays + dsoEconomic - dpoDays;

  // --- State for Safety Stock & ROP Calculator ---
  const [weeklyDemandAvg, setWeeklyDemandAvg] = useState<number>(12);
  const [weeklyDemandStd, setWeeklyDemandStd] = useState<number>(5);
  const [leadTimeWeeks, setLeadTimeWeeks] = useState<number>(8);
  const [serviceLevelZ, setServiceLevelZ] = useState<number>(1.65); // 95% = 1.65, 99% = 2.33

  const safetyStock = Math.round(serviceLevelZ * weeklyDemandStd * Math.sqrt(leadTimeWeeks));
  const reorderPoint = Math.round(weeklyDemandAvg * leadTimeWeeks + safetyStock);

  // --- State for Silent Churn Evaluator ---
  const [churnDaysSinceLast, setChurnDaysSinceLast] = useState<number>(75);
  const [churnAvgCycle, setChurnAvgCycle] = useState<number>(40);
  const churnRatio = churnAvgCycle > 0 ? churnDaysSinceLast / churnAvgCycle : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-rose-500" />
          <span>Διαδραστικοί Προσομοιωτές & Υπολογιστές KPIs</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Εκτελέστε πραγματικούς υπολογισμούς με βάση τους μαθηματικούς τύπους και τις λογιστικές αρχές του οδηγού.
        </p>
      </div>

      {/* Nav Pills for Calculators */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setActiveCalc('pvm')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCalc === 'pvm'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          1. PVM (Τιμή-Όγκος-Μείγμα)
        </button>
        <button
          onClick={() => setActiveCalc('margin')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCalc === 'margin'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          2. Landed Cost & Markup ↔ Margin
        </button>
        <button
          onClick={() => setActiveCalc('dso')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCalc === 'dso'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          3. DSO & Κύκλος Ρευστότητας (CCC)
        </button>
        <button
          onClick={() => setActiveCalc('safetystock')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCalc === 'safetystock'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          4. Απόθεμα Ασφαλείας & ROP
        </button>
        <button
          onClick={() => setActiveCalc('churn')}
          className={`px-4 py-2 rounded-xl transition ${
            activeCalc === 'churn'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          5. Alert Σιωπηλής Αποχώρησης
        </button>
      </div>

      {/* --- 1. PVM CALCULATOR --- */}
      {activeCalc === 'pvm' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-white">
                Ανάλυση Τιμής-Όγκου-Μείγματος (Price-Volume-Mix Waterfall)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Εξηγήστε γιατί μεταβλήθηκαν τα έσοδα συγκρίνοντας δύο περιόδους και προστατευτείτε από το παράδοξο του Simpson.
              </p>
            </div>
            <button
              onClick={() => {
                setPvmP0A(40); setPvmQ0A(100); setPvmP1A(42); setPvmQ1A(80);
                setPvmP0B(5); setPvmQ0B(100); setPvmP1B(5); setPvmQ1B(160);
              }}
              className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Επαναφορά Παραδείγματος Οδηγού</span>
            </button>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Product A (High ticket: e.g. Γάντια) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-rose-400 uppercase text-[11px] tracking-wider block">
                Προϊόν 1: Είδος Υψηλής Αξίας (π.χ. Γάντια Πυγμαχίας)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Τιμή Περιόδου 0 (P0)</label>
                  <input
                    type="number"
                    value={pvmP0A}
                    onChange={(e) => setPvmP0A(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Ποσότητα Περιόδου 0 (Q0)</label>
                  <input
                    type="number"
                    value={pvmQ0A}
                    onChange={(e) => setPvmQ0A(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Τιμή Περιόδου 1 (P1)</label>
                  <input
                    type="number"
                    value={pvmP1A}
                    onChange={(e) => setPvmP1A(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Ποσότητα Περιόδου 1 (Q1)</label>
                  <input
                    type="number"
                    value={pvmQ1A}
                    onChange={(e) => setPvmQ1A(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Product B (Low ticket: e.g. Bandages) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-amber-400 uppercase text-[11px] tracking-wider block">
                Προϊόν 2: Είδος Χαμηλής Αξίας (π.χ. Bandages / Ζώνες)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Τιμή Περιόδου 0 (P0)</label>
                  <input
                    type="number"
                    value={pvmP0B}
                    onChange={(e) => setPvmP0B(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Ποσότητα Περιόδου 0 (Q0)</label>
                  <input
                    type="number"
                    value={pvmQ0B}
                    onChange={(e) => setPvmQ0B(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Τιμή Περιόδου 1 (P1)</label>
                  <input
                    type="number"
                    value={pvmP1B}
                    onChange={(e) => setPvmP1B(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Ποσότητα Περιόδου 1 (Q1)</label>
                  <input
                    type="number"
                    value={pvmQ1B}
                    onChange={(e) => setPvmQ1B(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Συνολικά Έσοδα</span>
              <div className="text-base font-bold text-white mt-1">
                {rev0.toLocaleString('el-GR')} € → {rev1.toLocaleString('el-GR')} €
              </div>
              <div className={`text-xs font-mono font-bold mt-1 ${totalRevDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {totalRevDiff >= 0 ? `+${totalRevDiff.toLocaleString('el-GR')} €` : `${totalRevDiff.toLocaleString('el-GR')} €`}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">1. Επίδραση Τιμής (Price)</span>
              <div className={`text-lg font-bold font-mono mt-1 ${priceEffect >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {priceEffect >= 0 ? `+${priceEffect.toFixed(0)} €` : `${priceEffect.toFixed(0)} €`}
              </div>
              <span className="text-[10px] text-slate-500">Πουλήσαμε ακριβότερα/φθηνότερα</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">2. Επίδραση Όγκου (Volume)</span>
              <div className={`text-lg font-bold font-mono mt-1 ${volumeEffect >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {volumeEffect >= 0 ? `+${volumeEffect.toFixed(0)} €` : `${volumeEffect.toFixed(0)} €`}
              </div>
              <span className="text-[10px] text-slate-500">Διαφορά συνολικών τεμαχίων ({totalQ0} → {totalQ1})</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">3. Επίδραση Μείγματος (Mix)</span>
              <div className={`text-lg font-bold font-mono mt-1 ${mixEffect >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {mixEffect >= 0 ? `+${mixEffect.toFixed(0)} €` : `${mixEffect.toFixed(0)} €`}
              </div>
              <span className="text-[10px] text-slate-500">Αλλαγή σύνθεσης ακριβών/φθηνών</span>
            </div>
          </div>

          {/* Mathematical Proof Box */}
          <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-800/40 text-xs text-violet-200 space-y-1">
            <span className="font-bold flex items-center space-x-1 text-violet-300">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Μαθηματικός Έλεγχος Συμφωνίας:</span>
            </span>
            <p className="font-mono text-[11px]">
              Τιμή ({priceEffect.toFixed(0)} €) + Όγκος ({volumeEffect.toFixed(0)} €) + Μείγμα ({mixEffect.toFixed(0)} €) = <strong>{totalRevDiff.toFixed(0)} €</strong> (Μεταβολή Εσόδων)
            </p>
          </div>
        </div>
      )}

      {/* --- 2. MARGIN & LANDED COST CALCULATOR --- */}
      {activeCalc === 'margin' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">
              Υπολογιστής Landed Cost (ΕΛΠ ν. 4308/2014) & Markup ↔ Gross Margin
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Υπολογίστε το πραγματικό κόστος κτήσης με ναύλους/δασμούς και δείτε πώς μια έκπτωση 10% απαιτεί +29% όγκο πωλήσεων.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Parameters */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                Παράμετροι Αγοράς & Τιμολόγησης
              </span>

              <div>
                <label className="text-slate-400 block mb-1">Τιμή Τιμολογίου Προμηθευτή (CIF σε €)</label>
                <input
                  type="number"
                  value={supplierPrice}
                  onChange={(e) => setSupplierPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Έξοδα Κτήσης / Μεταφορικά / Δασμοί (%)</label>
                <input
                  type="number"
                  value={landedAddonsPct}
                  onChange={(e) => setLandedAddonsPct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  ΕΛΠ: Χωρίς αυτά, το μικτό κέρδος είναι πλασματικά υπερεκτιμημένο.
                </span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Πολλαπλασιαστής Τιμολόγησης (π.χ. x1.80)</label>
                <input
                  type="number"
                  step="0.05"
                  value={markupMultiplier}
                  onChange={(e) => setMarkupMultiplier(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Ισοδυναμεί με Markup: +{markupPct.toFixed(1)}% επί του κόστους
                </span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Προτεινόμενη Έκπτωση σε Πελάτη (%)</label>
                <input
                  type="number"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Calculations Output */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider block">
                  Οικονομικά Αποτελέσματα
                </span>

                <div className="flex justify-between py-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Πραγματικό Landed Cost:</span>
                  <span className="font-mono font-bold text-white">{landedCost.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Αρχική Τιμή Καταλόγου Χονδρικής:</span>
                  <span className="font-mono font-bold text-white">{wholesalePrice.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Αρχικό Ποσοστό Gross Margin:</span>
                  <span className="font-mono font-bold text-amber-400">{grossMarginPct.toFixed(1)}%</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Τιμή μετά την Έκπτωση ({discountPct}%):</span>
                  <span className="font-mono font-bold text-rose-400">{discountedPrice.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between py-2 text-xs">
                  <span className="text-slate-400">Νέο Margin μετά την Έκπτωση:</span>
                  <span className="font-mono font-bold text-rose-400">{discountedMarginPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* Trap Alert */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs space-y-2">
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Απαιτούμενη Αύξηση Όγκου Πωλήσεων d ÷ (m − d):</span>
                </div>
                <div className="text-xl font-mono font-extrabold text-white">
                  +{reqVolumeIncreasePct.toFixed(1)}%
                </div>
                <p className="text-[11px] text-rose-200/90 leading-relaxed">
                  Δίνοντας έκπτωση {discountPct}%, πρέπει να πουλήσετε <strong>+{reqVolumeIncreasePct.toFixed(1)}% περισσότερα τεμάχια</strong> μόνο και μόνο για να διατηρήσετε το ίδιο συνολικό ποσό κέρδους!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. DSO & CCC CALCULATOR --- */}
      {activeCalc === 'dso' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">
              Υπολογιστής DSO (Μέρες Είσπραξης) & Κύκλου Ρευστότητας (CCC)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Διόρθωση υπολογισμού με ΦΠΑ 24% και μέτρηση της επίδρασης των μεταχρονολογημένων επιταγών στο κεφάλαιο κίνησης.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                Στοιχεία Πελάτων & Ταμείου
              </span>

              <div>
                <label className="text-slate-400 block mb-1">Καθαρές Πωλήσεις Τριμήνου (χωρίς ΦΠΑ)</label>
                <input
                  type="number"
                  value={quarterCreditSalesNet}
                  onChange={(e) => setQuarterCreditSalesNet(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Ανοιχτό Υπόλοιπο Πελατών (με ΦΠΑ)</label>
                <input
                  type="number"
                  value={openReceivablesVat}
                  onChange={(e) => setOpenReceivablesVat(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Μεταχρονολογημένες Επιταγές Χαρτοφυλακίου (€)</label>
                <input
                  type="number"
                  value={postDatedCheques}
                  onChange={(e) => setPostDatedCheques(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">Ημέρες Αποθέματος (DIO)</label>
                  <input
                    type="number"
                    value={dioDays}
                    onChange={(e) => setDioDays(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Ημέρες Προμηθευτών (DPO)</label>
                  <input
                    type="number"
                    value={dpoDays}
                    onChange={(e) => setDpoDays(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-indigo-400 uppercase text-[11px] tracking-wider block">
                  Ανάλυση Ημερών Ταμείου
                </span>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-300 font-medium block">Τυπικό Λογιστικό DSO:</span>
                    <span className="text-[10px] text-slate-500">Βάσει λογιστικού υπολοίπου πελατών</span>
                  </div>
                  <span className="text-lg font-mono font-bold text-white">{dsoStandard.toFixed(1)} ημ.</span>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 flex justify-between items-center">
                  <div>
                    <span className="text-indigo-200 font-bold block">Πραγματικό Οικονομικό DSO:</span>
                    <span className="text-[10px] text-indigo-300">Συνυπολογισμός εισπρακτέων επιταγών</span>
                  </div>
                  <span className="text-xl font-mono font-extrabold text-indigo-400">{dsoEconomic.toFixed(1)} ημ.</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-300 font-medium block">Κύκλος Μετατροπής Μετρητών (CCC):</span>
                    <span className="text-[10px] text-slate-500">DIO ({dioDays}) + DSO ({dsoEconomic.toFixed(0)}) − DPO ({dpoDays})</span>
                  </div>
                  <span className="text-lg font-mono font-bold text-emerald-400">{cccEconomic.toFixed(1)} ημ.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200 leading-relaxed">
                💡 <strong>Σημείωση ΕΛΠ:</strong> Στην ελληνική αγορά οι επιταγές μηδενίζουν λογιστικά την καρτέλα πελάτη, αλλά τα χρήματα δεν έχουν εισρεύσει στον τραπεζικό λογαριασμό. Η διαφορά μεταξύ 31 και 46 ημερών είναι το δεσμευμένο κεφάλαιο της επιχείρησης!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. SAFETY STOCK & ROP CALCULATOR --- */}
      {activeCalc === 'safetystock' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">
              Υπολογιστής Αποθέματος Ασφαλείας & Σημείου Αναπαραγγελίας (ROP)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Επιστημονικός υπολογισμός βάσει διακύμανσης ζήτησης και χρόνου παράδοσης προμηθευτή (Lead Time).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="font-bold text-teal-400 uppercase text-[11px] tracking-wider block">
                Στοιχεία Ζήτησης & Εισαγωγής
              </span>

              <div>
                <label className="text-slate-400 block mb-1">Μέση Εβδομαδιαία Ζήτηση (τεμάχια)</label>
                <input
                  type="number"
                  value={weeklyDemandAvg}
                  onChange={(e) => setWeeklyDemandAvg(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Τυπική Απόκλιση Ζήτησης σ_d (διακύμανση)</label>
                <input
                  type="number"
                  value={weeklyDemandStd}
                  onChange={(e) => setWeeklyDemandStd(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Lead Time Παράδοσης Προμηθευτή L (σε εβδομάδες)</label>
                <input
                  type="number"
                  value={leadTimeWeeks}
                  onChange={(e) => setLeadTimeWeeks(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  π.χ. 8 εβδομάδες για εισαγωγή κιμονό/γαντιών από Πακιστάν.
                </span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Επίπεδο Εξυπηρέτησης (Cycle Service Level)</label>
                <select
                  value={serviceLevelZ}
                  onChange={(e) => setServiceLevelZ(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                >
                  <option value={1.28}>90% (z = 1.28)</option>
                  <option value={1.65}>95% (z = 1.65) - Προτεινόμενο B2B</option>
                  <option value={2.05}>98% (z = 2.05)</option>
                  <option value={2.33}>99% (z = 2.33)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  Αποτελέσματα Σχεδιασμού Αποθέματος
                </span>

                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40">
                  <span className="text-teal-300 text-xs block font-medium">Απόθεμα Ασφαλείας (Safety Stock):</span>
                  <div className="text-2xl font-mono font-extrabold text-teal-400 mt-1">
                    {safetyStock} <span className="text-sm font-normal text-teal-300">τεμάχια</span>
                  </div>
                  <span className="text-[10px] text-teal-400/80 font-mono">Τύπος: z × σ_d × √L</span>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40">
                  <span className="text-rose-300 text-xs block font-medium">Σημείο Αναπαραγγελίας (Reorder Point - ROP):</span>
                  <div className="text-2xl font-mono font-extrabold text-rose-400 mt-1">
                    {reorderPoint} <span className="text-sm font-normal text-rose-300">τεμάχια</span>
                  </div>
                  <span className="text-[10px] text-rose-400/80 font-mono">Τύπος: (d × L) + Safety Stock ({weeklyDemandAvg * leadTimeWeeks} + {safetyStock})</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                📦 <strong>Κανόνας Αποθήκης:</strong> Μόλις το φυσικό απόθεμα συν τις αναμενόμενες παραλαβές πέσει στα <strong>{reorderPoint} τεμάχια</strong>, εκδίδεται άμεσα νέα παραγγελία στον προμηθευτή.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 5. SILENT CHURN EVALUATOR --- */}
      {activeCalc === 'churn' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">
              Ανιχνευτής Σιωπηλής Αποχώρησης Πελάτη (Inactivity Alert)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Στη χονδρική κανείς δεν στέλνει email ακύρωσης συνεργασίας. Υπολογίστε αν ο πελάτης είναι σε κίνδυνο.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                Ιστορικό Πελάτη
              </span>

              <div>
                <label className="text-slate-400 block mb-1">Ημέρες από την Τελευταία Παραγγελία</label>
                <input
                  type="number"
                  value={churnDaysSinceLast}
                  onChange={(e) => setChurnDaysSinceLast(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Συνήθης Μέσος Κύκλος Παραγγελιών Πελάτη (σε ημέρες)</label>
                <input
                  type="number"
                  value={churnAvgCycle}
                  onChange={(e) => setChurnAvgCycle(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Υπολογίζεται από το ιστορικό: (Ημ. τελευταίας − Ημ. πρώτης) ÷ (Πλήθος − 1).
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block">
                  Δείκτης Ανενεργότητας
                </span>

                <div className="text-3xl font-mono font-extrabold text-white">
                  {churnRatio.toFixed(2)}x
                </div>

                <div>
                  {churnRatio <= 1.0 && (
                    <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                      ✅ Φυσιολογική Συμπεριφορά: Ο πελάτης βρίσκεται εντός του συνήθους κύκλου αγορών του.
                    </div>
                  )}
                  {churnRatio > 1.0 && churnRatio <= 1.5 && (
                    <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-medium">
                      ⚠️ Ελαφρά Καθυστέρηση: Παρακολούθηση στην επόμενη εβδομάδα.
                    </div>
                  )}
                  {churnRatio > 1.5 && churnRatio <= 3.0 && (
                    <div className="p-3 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                      🚨 Σε Κίνδυνο Αποχώρησης (&gt; 1,5x): Άμεση τηλεφωνική επικοινωνία από τον υπεύθυνο πωλητή!
                    </div>
                  )}
                  {churnRatio > 3.0 && (
                    <div className="p-3 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                      ⛔ Πιθανώς Χαμένος Πελάτης (&gt; 3,0x): Απαιτείται ειδική προσφορά επανενεργοποίησης ή προσωπική επίσκεψη.
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mt-4">
                * Εξαιρούνται οι καλοκαιρινοί μήνες Ιούλιος/Αύγουστος αν η σχολή διακόπτει τη λειτουργία της.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
