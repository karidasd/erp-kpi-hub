import React from 'react';
import { 
  X, 
  Printer
} from 'lucide-react';
import { 
  MOCK_EXECUTIVE_SUMMARY, 
  MOCK_SILENT_CHURN_ALERTS 
} from '../data/mockData';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const summary = MOCK_EXECUTIVE_SUMMARY;
  const currentDate = new Date().toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 print:m-0 print:border-none print:shadow-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header - Hidden on Print */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
              Εκτελεστική Αναφορά Διοίκησης
            </span>
            <span className="text-xs text-slate-400">Έτοιμο για Εκτύπωση & Αποθήκευση ως PDF</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Εκτύπωση / Αποθήκευση σε PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-200 print:text-slate-900 print:p-6 print:space-y-4">
          {/* Document Letterhead */}
          <div className="border-b-2 border-rose-600 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white print:text-black">
                OLYMPUS SPORT HELLAS
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 font-medium">
                ΕΜΠΟΡΙΑ ΑΘΛΗΤΙΚΟΥ ΕΞΟΠΛΙΣΜΟΥ & ΠΟΛΕΜΙΚΩΝ ΤΕΧΝΩΝ B2B / B2C
              </p>
              <p className="text-[11px] text-slate-400 print:text-slate-500 mt-1">
                Εσωτερικό Σημείωμα Διοίκησης · Βασισμένο στα ΕΛΠ (ν. 4308/2014) & myDATA
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="font-bold text-rose-400 print:text-rose-600 block uppercase">
                ΕΜΠΙΣΤΕΥΤΙΚΟ
              </span>
              <span className="text-slate-400 print:text-slate-600">Ημερομηνία: {currentDate}</span>
              <span className="text-slate-400 print:text-slate-600 block">Περίοδος: Ετήσια 2026</span>
            </div>
          </div>

          {/* Executive Overview Box */}
          <div className="p-4 rounded-xl bg-slate-800/60 print:bg-slate-100 border border-slate-700 print:border-slate-300">
            <h2 className="text-sm font-bold text-white print:text-black mb-1">
              Σύνοψη Εμπορικής Υγείας
            </h2>
            <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
              Οι πωλήσεις παρουσιάζουν αύξηση <strong>+{summary.revenueYoY.growthRate}% YoY</strong> (528.000 € έναντι 480.000 €). 
              Το μικτό περιθώριο διατηρείται υγιές στο <strong>{summary.grossMargin.rate}%</strong> σε βάση Landed Cost (markup +{summary.grossMargin.markup}%). 
              Το ποσοστό διατήρησης πελατών B2B ανέρχεται σε <strong>{summary.customers.retentionRate}%</strong> με NRR {summary.customers.nrrRate}%. 
              Κύριο σημείο προσοχής αποτελεί το οικονομικό DSO (46 ημέρες λόγω μεταχρονολογημένων επιταγών) και 5 πελάτες σε κίνδυνο σιωπηλής αποχώρησης.
            </p>
          </div>

          {/* 7 Core KPIs Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 print:text-rose-700 mb-3">
              1. Πίνακας 7 Βασικών Δεικτών (Executive Core KPIs)
            </h3>
            <table className="w-full text-xs text-left border-collapse border border-slate-700 print:border-slate-300">
              <thead>
                <tr className="bg-slate-800 print:bg-slate-200 text-slate-300 print:text-black font-semibold">
                  <th className="p-2 border border-slate-700 print:border-slate-300">#</th>
                  <th className="p-2 border border-slate-700 print:border-slate-300">Δείκτης</th>
                  <th className="p-2 border border-slate-700 print:border-slate-300">Κατηγορία</th>
                  <th className="p-2 border border-slate-700 print:border-slate-300">Τρέχουσα Τιμή</th>
                  <th className="p-2 border border-slate-700 print:border-slate-300">Στόχος / Αναφορά</th>
                  <th className="p-2 border border-slate-700 print:border-slate-300">Αξιολόγηση</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                <tr>
                  <td className="p-2 font-mono">01</td>
                  <td className="p-2 font-medium">Αύξηση Πωλήσεων YoY</td>
                  <td className="p-2">Έσοδα</td>
                  <td className="p-2 font-bold text-emerald-400 print:text-emerald-700">+{summary.revenueYoY.growthRate}%</td>
                  <td className="p-2">550.000 €</td>
                  <td className="p-2">Εντός τροχιάς (96% επίτευξη)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">04</td>
                  <td className="p-2 font-medium">Ποσοστό Μικτού Κέρδους</td>
                  <td className="p-2">Κερδοφορία</td>
                  <td className="p-2 font-bold text-emerald-400 print:text-emerald-700">{summary.grossMargin.rate}%</td>
                  <td className="p-2">Landed Cost (&gt; 42%)</td>
                  <td className="p-2">Ισχυρή κερδοφορία</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">03</td>
                  <td className="p-2 font-medium">PVM Mix Effect</td>
                  <td className="p-2">Έσοδα</td>
                  <td className="p-2 font-bold text-rose-400 print:text-rose-700">−1.400 €</td>
                  <td className="p-2">Ουδέτερο (0 €)</td>
                  <td className="p-2">Στροφή πωλήσεων σε φθηνότερα είδη</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">08</td>
                  <td className="p-2 font-medium">Retention Πελατών (CRR)</td>
                  <td className="p-2">Πελάτες</td>
                  <td className="p-2 font-bold text-emerald-400 print:text-emerald-700">{summary.customers.retentionRate}%</td>
                  <td className="p-2">&gt; 85%</td>
                  <td className="p-2">Υψηλή πιστότητα dojo / σχολών</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">13</td>
                  <td className="p-2 font-medium">Συγκέντρωση Top-10</td>
                  <td className="p-2">Πελάτες</td>
                  <td className="p-2 font-bold text-sky-400 print:text-sky-700">{summary.customers.top10Share}%</td>
                  <td className="p-2">&lt; 50%</td>
                  <td className="p-2">Ισορροπημένο ρίσκο (HHI: 420)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">15</td>
                  <td className="p-2 font-medium">Μέση Διάρκεια Είσπραξης (DSO)</td>
                  <td className="p-2">Ταμείο</td>
                  <td className="p-2 font-bold text-amber-400 print:text-amber-700">{summary.cashAndCredit.dsoDays} ημ. (46 με επιταγές)</td>
                  <td className="p-2">&lt; 40 ημ.</td>
                  <td className="p-2">Απαιτείται επιτήρηση επιταγών</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">20</td>
                  <td className="p-2 font-medium">GMROI Αποθέματος</td>
                  <td className="p-2">Απόθεμα</td>
                  <td className="p-2 font-bold text-emerald-400 print:text-emerald-700">{summary.inventory.gmroi.toFixed(2)} €</td>
                  <td className="p-2">&gt; 1,50 €</td>
                  <td className="p-2">Εξαιρετική απόδοση κεφαλαίου</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Receivables & Inventory Brief */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-700 print:border-slate-300">
              <h4 className="text-xs font-bold text-indigo-400 print:text-indigo-700 uppercase mb-2">
                2. Ταμείο & Ενηλικίωση Απαιτήσεων
              </h4>
              <p className="text-[11px] text-slate-300 print:text-slate-700">
                • Συνολικό ανοιχτό υπόλοιπο (με ΦΠΑ): <strong>186.000 €</strong><br />
                • Επιταγές εισπρακτέες στο χαρτοφυλάκιο: <strong>90.000 €</strong><br />
                • Καθυστερήσεις 90+ ημερών: <strong>11.000 €</strong> (6% υπολοίπου)<br />
                • Πρόβλεψη αναμενόμενης ζημίας (ECL): <strong>6.450 €</strong> (3,5%)
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-700 print:border-slate-300">
              <h4 className="text-xs font-bold text-teal-400 print:text-teal-700 uppercase mb-2">
                3. Απόθεμα & Κύκλος Ρευστότητας (CCC)
              </h4>
              <p className="text-[11px] text-slate-300 print:text-slate-700">
                • Αξία αποθέματος σε Landed Cost: <strong>450.000 €</strong><br />
                • Κυκλοφοριακή ταχύτητα: <strong>2,0 φορές/έτος</strong> (DIO 182 ημέρες)<br />
                • Κύκλος μετατροπής μετρητών (CCC): <strong>153,5 ημέρες</strong><br />
                • Κορυφαία κατηγορία: <strong>Κιμονό</strong> (GMROI 2,55 €, Sell-through 84%)
              </p>
            </div>
          </div>

          {/* Action List: Silent Churn Alerts */}
          <div>
            <h4 className="text-xs font-bold text-rose-400 print:text-rose-700 uppercase mb-2">
              4. Επείγουσα Εμπορική Δράση: Πελάτες σε Κίνδυνο Σιωπηλής Αποχώρησης
            </h4>
            <div className="space-y-1.5 text-xs">
              {MOCK_SILENT_CHURN_ALERTS.slice(0, 3).map((alert) => (
                <div 
                  key={alert.customerCode}
                  className="flex justify-between p-2 rounded bg-slate-800/40 print:bg-slate-100 border border-slate-700 print:border-slate-300 text-[11px]"
                >
                  <span className="font-semibold text-white print:text-black">
                    {alert.name} ({alert.customerCode})
                  </span>
                  <span>
                    Ανενεργός: <strong>{alert.lastOrderDaysAgo} ημέρες</strong> (Συνήθης κύκλος: {alert.avgCycleDays} ημ. - Δείκτης {alert.inactivityIndex}x)
                  </span>
                  <span className="font-bold text-rose-400 print:text-rose-700">
                    Ετήσιος Τζίρος σε Κίνδυνο: {alert.annualSales.toLocaleString('el-GR')} €
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="pt-6 border-t border-slate-700 print:border-slate-300 flex justify-between text-xs text-slate-400 print:text-slate-600">
            <div>
              <span>Σύνταξη Έκθεσης:</span><br />
              <strong className="text-white print:text-black">Ομάδα Εμπορικής Ανάλυσης</strong>
            </div>
            <div className="text-right">
              <span>Έγκριση Διοίκησης:</span><br />
              <strong className="text-white print:text-black">Γενική Διεύθυνση Πωλήσεων</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
