import React from 'react';
import { 
  Settings2, 
  HelpCircle, 
  Calendar, 
  Layers
} from 'lucide-react';

export const ErpGuideTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <Settings2 className="w-6 h-6 text-rose-500" />
          <span>Οδηγός Υλοποίησης ERP & Οδηγίες Δημοσίευσης στο GitHub</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Στρατηγικό πλάνο 12 εβδομάδων, ερωτήσεις προς την εταιρεία Exelixis και βήματα ανάρτησης στο προσωπικό σας GitHub.
        </p>
      </div>

      {/* 4 Levels of Automation */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
          <Layers className="w-5 h-5 text-rose-400" />
          <span>Τέσσερα Επίπεδα Αυτοματοποίησης (Από το ERP στον Δείκτη)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Level 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">Επίπεδο 1</span>
            <h3 className="font-bold text-white text-sm">Αναφορές ERP</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Έτοιμες εκτυπώσεις του Exelixis. Μηδενικό στήσιμο και αξιόπιστοι αριθμοί, αλλά περιορίζεται μόνο σε ό,τι έχει προβλέψει ο κατασκευαστής (καμία ανάλυση πελατών στον χρόνο).
            </p>
          </div>

          {/* Level 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Επίπεδο 2</span>
            <h3 className="font-bold text-white text-sm">Export + Excel</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Εξαγωγή σε xlsx/csv → Power Query για καθαρισμό → Data Model → Pivots. Ευελιξία με ανανέωση με ένα κουμπί, αλλά απαιτεί χειροκίνητο export σε κάθε κύκλο.
            </p>
          </div>

          {/* Level 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">Επίπεδο 3</span>
            <h3 className="font-bold text-white text-sm">Power BI Direct</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Σύνδεση απευθείας στη βάση του ERP (read-only SQL/ODBC). Μοντέλο αστέρα και μέτρα DAX. Αυτόματη νυχτερινή ανανέωση και διαδραστικά dashboards.
            </p>
          </div>

          {/* Level 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Επίπεδο 4</span>
            <h3 className="font-bold text-white text-sm">AI Analytics</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Ερωτήσεις σε φυσική γλώσσα, αυτόματες εβδομαδιαίες λίστες ενεργειών (π.χ. σιωπηλή αποχώρηση) και ανάλυση αποκλίσεων. Από τον αριθμό στην άμεση εμπορική πράξη.
            </p>
          </div>
        </div>
      </div>

      {/* 12-Week Implementation Roadmap */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <span>Προτεινόμενο Πλάνο Υλοποίησης 12 Εβδομάδων</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Φάση</th>
                <th className="py-2.5 px-2">Εβδομάδες</th>
                <th className="py-2.5 px-3">Κύριο Παραδοτέο</th>
                <th className="py-2.5 px-3 rounded-r-lg">Δείκτες που Καλύπτονται</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-semibold text-white">1. Δεδομένα & Θεμέλια</td>
                <td className="py-3 px-2 font-mono text-rose-400 font-bold">1–2</td>
                <td className="py-3 px-3">Τα 5 exports από το ERP, έλεγχος ποιότητας, γραπτό λεξικό ορισμών (data dictionary).</td>
                <td className="py-3 px-3 font-mono text-slate-400">— (Προετοιμασία)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-semibold text-white">2. Βασικός Πίνακας</td>
                <td className="py-3 px-2 font-mono text-amber-400 font-bold">3–4</td>
                <td className="py-3 px-3">Excel με Power Query: μηνιαίο dashboard των 7 βασικών δεικτών.</td>
                <td className="py-3 px-3 font-mono text-amber-300">YoY, Margin, PVM, Retention, Συγκέντρωση, DSO, GMROI</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-semibold text-white">3. Πελάτες & Ταμείο</td>
                <td className="py-3 px-2 font-mono text-sky-400 font-bold">5–8</td>
                <td className="py-3 px-3">Εβδομαδιαία λίστα σιωπηλής αποχώρησης, RFM segmentation, ενηλικίωση, κερδοφορία ανά πελάτη.</td>
                <td className="py-3 px-3 font-mono text-sky-300">Silent Churn, RFM, Aging, ECL, Cost-to-serve</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-semibold text-white">4. Απόθεμα & Αυτοματισμός</td>
                <td className="py-3 px-2 font-mono text-emerald-400 font-bold">9–12</td>
                <td className="py-3 px-3">Power BI με αυτόματη ανανέωση, ανάλυση ABC/XYZ και σημεία αναπαραγγελίας (ROP) εισαγόμενων ειδών.</td>
                <td className="py-3 px-3 font-mono text-emerald-300">Ταχύτητα, DIO, Sell-through, Απόθεμα ασφαλείας</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Questionnaire: 6 Questions to Exelixis */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Οι 6 Τεχνικές Ερωτήσεις προς την εταιρεία του ERP (Exelixis)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Καταγεγραμμένες ερωτήσεις για τη διερεύνηση δυνατοτήτων διασύνδεσης και εξαγωγής δεδομένων.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-mono">Ερώτηση 1:</strong>
            <p className="text-slate-200 font-medium">Υπάρχει BI module ή έτοιμη σύνδεση με Power BI;</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-mono">Ερώτηση 2:</strong>
            <p className="text-slate-200 font-medium">Μπορούμε να έχουμε read-only πρόσβαση στη βάση δεδομένων (SQL/ODBC);</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-mono">Ερώτηση 3:</strong>
            <p className="text-slate-200 font-medium">Μπορεί να γίνει export γραμμών τιμολογίων με κόστος ανά γραμμή (landed cost), αρχική τιμή καταλόγου και έκπτωση, ιδανικά προγραμματισμένο;</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-mono">Ερώτηση 4:</strong>
            <p className="text-slate-200 font-medium">Υπάρχει αναφορά ενηλικίωσης απαιτήσεων με βάση την ημερομηνία λήξης (όχι έκδοσης);</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-mono">Ερώτηση 5:</strong>
            <p className="text-slate-200 font-medium">Κρατά το σύστημα ιστορικό αξίας αποθέματος ανά μήνα, ή μόνο την τρέχουσα στιγμιαία εικόνα;</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-rose-400 block font-mono">Ερώτηση 6:</strong>
            <p className="text-slate-200 font-medium">Υποστηρίζει παραστατικά προσφοράς και παραγγελίας πελάτη με μετασχηματισμό σε τιμολόγιο;</p>
          </div>
        </div>
      </div>

      {/* GitHub Deployment Guide Box */}
      <div className="bg-slate-900/90 border border-rose-900/40 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <h2 className="text-base font-bold text-white tracking-tight">
              Οδηγίες Δημοσίευσης στο Προσωπικό σας GitHub Repository
            </h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-semibold border border-rose-500/30">
            Open Source Ready
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Ο κώδικας του project βρίσκεται τοπικά στον φάκελο <code>PROGRAMS_ANTIGRAVITY\erp-kpi-hub</code>. 
          Για να το ανεβάσετε στο δικό σας προφίλ στο GitHub και να το μοιραστείτε με τη διοίκηση ή συνεργάτες:
        </p>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] block">1. Δημιουργήστε ένα νέο Repository στο GitHub (π.χ. με όνομα <code>erp-kpi-hub</code>) και εκτελέστε:</span>
            <div className="text-rose-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 select-all overflow-x-auto">
              git remote add origin https://github.com/ΤΟ_USERNAME_ΣΑΣ/erp-kpi-hub.git<br />
              git branch -M main<br />
              git push -u origin main
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] block">2. Για δωρεάν Live Web Hosting (GitHub Pages):</span>
            <p className="text-slate-300 font-sans text-xs">
              Πηγαίνετε στο αποθετήριο στο GitHub $\rightarrow$ <strong>Settings</strong> $\rightarrow$ <strong>Pages</strong> $\rightarrow$ Build and deployment: επιλέξτε <strong>GitHub Actions</strong>. Η εφαρμογή θα δημοσιευτεί αυτόματα και θα έχει δημόσιο σύνδεσμο!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
