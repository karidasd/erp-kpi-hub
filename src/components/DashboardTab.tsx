import React from 'react';
import { 
  MOCK_EXECUTIVE_SUMMARY, 
  MOCK_MONTHLY_SALES, 
  MOCK_RECEIVABLES_AGING, 
  MOCK_INVENTORY_CATEGORIES,
  MOCK_SILENT_CHURN_ALERTS
} from '../data/mockData';
import { 
  TrendingUp, 
  Percent, 
  Users, 
  PieChart, 
  Clock, 
  Package, 
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid
} from 'recharts';

interface DashboardTabProps {
  onOpenKpiModal: (kpiId: number) => void;
  onNavigateToCalculators: () => void;
  onOpenReport?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ 
  onOpenKpiModal,
  onNavigateToCalculators,
  onOpenReport
}) => {
  const summary = MOCK_EXECUTIVE_SUMMARY;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-900/30 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
            <span>Olympus Sport Hellas · Εμπορικό Μοντέλο</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Εκτελεστικό Ταμπλό Βασικών Δεικτών (7 Core KPIs)
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Συνοπτική παρακολούθηση της εμπορικής υγείας σε B2B χονδρική (σχολές πολεμικών τεχνών, resellers) και B2C λιανική. 
            Όλα τα ποσά υπολογίζονται σε <strong>καθαρή βάση (χωρίς ΦΠΑ)</strong> και <strong>Landed Cost</strong> κατά τα ΕΛΠ.
          </p>
        </div>

        {onOpenReport && (
          <button
            onClick={onOpenReport}
            className="self-start md:self-center shrink-0 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950 transition flex items-center space-x-2"
          >
            <span>Εξαγωγή Αναφοράς Διοίκησης (PDF)</span>
          </button>
        )}
      </div>

      {/* 7 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: YoY Growth */}
        <div 
          onClick={() => onOpenKpiModal(1)}
          className="bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-rose-400">#01 · Έσοδα</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            +{summary.revenueYoY.growthRate}%
          </div>
          <div className="text-xs text-slate-300 mt-1 font-medium">Αύξηση Πωλήσεων YoY</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>2026: <strong>528.000 €</strong></span>
            <span>2025: 480.000 €</span>
          </div>
        </div>

        {/* KPI 4: Gross Margin */}
        <div 
          onClick={() => onOpenKpiModal(4)}
          className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-amber-400">#04 · Κερδοφορία</span>
            <Percent className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {summary.grossMargin.rate}%
          </div>
          <div className="text-xs text-slate-300 mt-1 font-medium">Ποσοστό Μικτού Κέρδους</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Markup: <strong>+{summary.grossMargin.markup}%</strong></span>
            <span>Μικτό: 234.432 €</span>
          </div>
        </div>

        {/* KPI 8: Retention */}
        <div 
          onClick={() => onOpenKpiModal(8)}
          className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-emerald-400">#08 · Πελάτες</span>
            <Users className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {summary.customers.retentionRate}%
          </div>
          <div className="text-xs text-slate-300 mt-1 font-medium">Customer Retention (CRR)</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>NRR: <strong>{summary.customers.nrrRate}%</strong></span>
            <span>Ενεργοί: {summary.customers.totalActive}</span>
          </div>
        </div>

        {/* KPI 13: Concentration */}
        <div 
          onClick={() => onOpenKpiModal(13)}
          className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-sky-400">#13 · Ρίσκο Πελατών</span>
            <PieChart className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {summary.customers.top10Share}%
          </div>
          <div className="text-xs text-slate-300 mt-1 font-medium">Συγκέντρωση Top-10 Πελατών</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>HHI Index: <strong>{summary.customers.hhiIndex}</strong></span>
            <span>Χαμηλό Ρίσκο</span>
          </div>
        </div>

        {/* KPI 15: DSO */}
        <div 
          onClick={() => onOpenKpiModal(15)}
          className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-indigo-400">#15 · Ταμείο</span>
            <Clock className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {summary.cashAndCredit.dsoDays} <span className="text-sm font-normal text-slate-400">ημ.</span>
          </div>
          <div className="text-xs text-slate-300 mt-1 font-medium">Μέση Διάρκεια Είσπραξης (DSO)</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Με Επιταγές: <strong>{summary.cashAndCredit.dsoWithCheques} ημ.</strong></span>
            <span>Υπόλοιπα: 186k €</span>
          </div>
        </div>

        {/* KPI 20: GMROI */}
        <div 
          onClick={() => onOpenKpiModal(20)}
          className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-teal-400">#20 · Απόθεμα</span>
            <Package className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {summary.inventory.gmroi.toFixed(2)} €
          </div>
          <div className="text-xs text-slate-300 mt-1 font-medium">Μικτό Κέρδος ανά € Αποθέματος (GMROI)</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Ταχύτητα: <strong>{summary.inventory.turnover}x</strong></span>
            <span>DIO: {summary.inventory.dioDays} ημ.</span>
          </div>
        </div>

        {/* KPI 3: PVM quick highlight */}
        <div 
          onClick={() => onOpenKpiModal(3)}
          className="bg-slate-900/90 border border-slate-800 hover:border-violet-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-md sm:col-span-2"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-violet-400">#03 · PVM Ανάλυση Τιμής-Όγκου-Μείγματος</span>
            <TrendingUp className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition" />
          </div>
          <div className="flex items-baseline space-x-4">
            <div>
              <span className="text-xs text-slate-400">Επίδραση Τιμής:</span>
              <span className="ml-1 text-sm font-bold text-emerald-400">+160 €</span>
            </div>
            <div>
              <span className="text-xs text-slate-400">Όγκος:</span>
              <span className="ml-1 text-sm font-bold text-emerald-400">+900 €</span>
            </div>
            <div>
              <span className="text-xs text-slate-400">Μείγμα (Mix):</span>
              <span className="ml-1 text-sm font-bold text-rose-400">−1.400 €</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Αποφυγή παράδοξου Simpson: Οι περισσότερες πωλήσεις τεμαχίων δεν σημαίνουν απαραίτητα περισσότερα έσοδα αν το μείγμα στραφεί σε φθηνότερα είδη.
          </p>
        </div>
      </div>

      {/* Chart Section: Monthly Sales YoY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <span>Εποχικότητα & Πωλήσεις ανά Μήνα (2025 vs 2026 vs Στόχος)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Παρατηρήστε τις αιχμές Σεπτεμβρίου (σχολική χρονιά/νέα σεζόν dojo) και τη θερινή κάμψη Αυγούστου.
              </p>
            </div>
          </div>

          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_MONTHLY_SALES} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString('el-GR')} €`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="year2025" name="2025 (Πέρσι)" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="year2026" name="2026 (Φέτος)" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Receivables Aging breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white tracking-tight">Ενηλικίωση Απαιτήσεων</h2>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                Σύνολο: 186.000 €
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-4">
              Κατανομή ανοιχτών υπολοίπων πελατών ανά κάδο καθυστέρησης & αναμενόμενη ζημία επισφαλειών (ECL).
            </p>

            <div className="space-y-3">
              {MOCK_RECEIVABLES_AGING.map((b) => (
                <div key={b.bucket} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{b.bucket}</span>
                    <span className="text-slate-400 font-mono">
                      {b.amount.toLocaleString('el-GR')} € ({b.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        b.bucket === '90+ ημέρες' ? 'bg-rose-500' :
                        b.bucket === '61 - 90 ημέρες' ? 'bg-amber-500' :
                        b.bucket === '31 - 60 ημέρες' ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-[10px] text-slate-500">
                    Αναμενόμενη Ζημία (ECL): {b.expectedLoss.toLocaleString('el-GR')} € ({b.lossRate}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-300">
            <span>Συνολική Πρόβλεψη ECL:</span>
            <strong className="text-rose-400">{summary.cashAndCredit.expectedCreditLoss.toLocaleString('el-GR')} € (3,5%)</strong>
          </div>
        </div>
      </div>

      {/* Inventory Performance & Silent Churn Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory GMROI & Turnover by Category */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Απόδοση Αποθέματος ανά Κατηγορία</h2>
              <p className="text-xs text-slate-400">Σύγκριση Ταχύτητας, Margin και GMROI (Μικτό κέρδος ανά δεσμευμένο €)</p>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Κατηγορία Ειδών</th>
                  <th className="py-2.5 px-2">Αξία Κόστους</th>
                  <th className="py-2.5 px-2">Ταχύτητα</th>
                  <th className="py-2.5 px-2">Margin %</th>
                  <th className="py-2.5 px-2">GMROI</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Sell-Through (90d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {MOCK_INVENTORY_CATEGORIES.map((cat) => (
                  <tr key={cat.category} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-medium text-white">{cat.category}</td>
                    <td className="py-3 px-2 font-mono">{cat.stockValue.toLocaleString('el-GR')} €</td>
                    <td className="py-3 px-2 font-mono text-teal-400">{cat.turnover}x</td>
                    <td className="py-3 px-2 font-mono">{cat.marginPct}%</td>
                    <td className="py-3 px-2 font-mono font-bold text-emerald-400">{cat.gmroi.toFixed(2)} €</td>
                    <td className="py-3 px-3 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${cat.sellThrough90 >= 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {cat.sellThrough90}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Silent Churn Inactivity Alerts */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h2 className="text-base font-bold text-white tracking-tight">
                  Σιωπηλή Αποχώρηση (Inactivity Alerts)
                </h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                Εβδομαδιαία Λίστα Πωλητών
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-4">
              Πελάτες B2B των οποίων οι ημέρες από την τελευταία παραγγελία υπερβαίνουν το 1,5x του ιστορικού τους κύκλου.
            </p>

            <div className="space-y-3">
              {MOCK_SILENT_CHURN_ALERTS.map((alert) => (
                <div 
                  key={alert.customerCode}
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs hover:border-slate-600 transition"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white flex items-center space-x-2">
                      <span>{alert.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({alert.customerCode})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Τελευταία αγορά πριν: <strong className="text-amber-300">{alert.lastOrderDaysAgo} ημέρες</strong> (Συνήθης κύκλος: {alert.avgCycleDays} ημ.)
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      alert.inactivityIndex >= 3.0 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      Δείκτης {alert.inactivityIndex}x ({alert.status})
                    </span>
                    <div className="text-[11px] font-mono text-slate-300">
                      Τζίρος: {alert.annualSales.toLocaleString('el-GR')} €
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">
              Χρειάζεται προσοχή το καλοκαίρι λόγω θερινής διακοπής σχολών.
            </span>
            <button
              onClick={onNavigateToCalculators}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center space-x-1"
            >
              <span>Δοκιμή στον Προσομοιωτή</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
