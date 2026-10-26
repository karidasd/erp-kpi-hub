import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  CheckSquare, 
  Square, 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';

export const DataImportTab: React.FC = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [parsedRowCount, setParsedRowCount] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Data Quality Checklist states
  const [checklist, setChecklist] = useState({
    cost: false,
    codes: false,
    customers: false,
    categorization: false,
    balance: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setParsedRowCount(data.length);
      } catch (err: any) {
        setUploadError('Σφάλμα κατά την ανάγνωση του αρχείου Excel/CSV: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        'Ημερομηνία': '2026-10-15',
        'Αρ_Παραστατικού': 'ΤΠΥ-10492',
        'Τύπος': 'Τιμολόγιο',
        'Κωδ_Πελάτη': 'CUST-042',
        'Επωνυμία_Πελάτη': 'Ακαδημία Kickboxing Αμαρουσίου',
        'Τύπος_Πελάτη': 'Σχολή',
        'Κωδ_Είδους': 'GLV-PRO-10',
        'Περιγραφή': 'Γάντια Δερμάτινα Olympus Pro 10oz',
        'Κατηγορία': 'Γάντια',
        'Brand': 'Olympus',
        'Ποσότητα': 10,
        'Τιμή_Καταλόγου': 45.0,
        'Έκπτωση_%': 10,
        'Καθαρή_Αξία': 405.0,
        'Κόστος_Μονάδας_Landed': 25.0,
        'Συνολικό_Κόστος': 250.0,
        'Μικτό_Κέρδος': 155.0
      },
      {
        'Ημερομηνία': '2026-10-16',
        'Αρ_Παραστατικού': 'ΤΠΥ-10493',
        'Τύπος': 'Τιμολόγιο',
        'Κωδ_Πελάτη': 'CUST-108',
        'Επωνυμία_Πελάτη': 'Dojo Zen Θεσσαλονίκης',
        'Τύπος_Πελάτη': 'Σχολή',
        'Κωδ_Είδους': 'KIM-JUDO-170',
        'Περιγραφή': 'Κιμονό Judo Hayashi 550gr Λευκό 170cm',
        'Κατηγορία': 'Κιμονό',
        'Brand': 'Hayashi',
        'Ποσότητα': 15,
        'Τιμή_Καταλόγου': 60.0,
        'Έκπτωση_%': 15,
        'Καθαρή_Αξία': 765.0,
        'Κόστος_Μονάδας_Landed': 32.0,
        'Συνολικό_Κόστος': 480.0,
        'Μικτό_Κέρδος': 285.0
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fact_Invoices');
    XLSX.writeFile(wb, 'Olympus_Sport_Fact_Invoices_Template.xlsx');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <Database className="w-6 h-6 text-rose-500" />
          <span>Αρχιτεκτονική Δεδομένων (Star Schema) & Έλεγχος Ποιότητας</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Η δομή των πινάκων γεγονότων (fact tables) και διαστάσεων (dimension tables) για αξιόπιστη σύνδεση ERP με Power BI & Excel.
        </p>
      </div>

      {/* Star Schema Diagram & Table specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fact Tables */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
              <Table className="w-4 h-4" />
              <span>3 Πίνακες Γεγονότων (Fact Tables)</span>
            </h2>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
              Κρατούν τις Συναλλαγές
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Fact 1 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">1. Γραμμές Τιμολογίων (Fact_Invoices)</span>
                <span className="text-[10px] text-rose-400 font-mono">Έσοδα & Margins</span>
              </div>
              <p className="text-[11px] text-slate-300">
                <strong>Απαραίτητες στήλες:</strong> Ημερομηνία, Αρ. παραστατικού, Κατάστημα, Κωδ. πελάτη, Κωδ. είδους, Ποσότητα, Τιμή καταλόγου, Έκπτωση %, Καθαρή αξία, <strong>Κόστος γραμμής (Landed Cost)</strong>, Πωλητής.
              </p>
            </div>

            {/* Fact 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">2. Ανοιχτά Υπόλοιπα (Fact_Receivables)</span>
                <span className="text-[10px] text-indigo-400 font-mono">DSO & Ενηλικίωση</span>
              </div>
              <p className="text-[11px] text-slate-300">
                <strong>Απαραίτητες στήλες:</strong> Κωδ. πελάτη, Παραστατικό, Ημ. έκδοσης, Ημ. λήξης πιστωτικού ορίου, Υπόλοιπο (με ΦΠΑ), Επιταγές στο χαρτοφυλάκιο.
              </p>
            </div>

            {/* Fact 3 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">3. Απόθεμα & Κινήσεις (Fact_Inventory)</span>
                <span className="text-[10px] text-teal-400 font-mono">Ταχύτητα & DIO</span>
              </div>
              <p className="text-[11px] text-slate-300">
                <strong>Απαραίτητες στήλες:</strong> Κωδ. είδους, Αποθήκη, Ποσότητα, Κόστος μονάδας landed, Ημερομηνία στιγμιότυπου, Ημερομηνίες παραλαβών.
              </p>
            </div>
          </div>
        </div>

        {/* Dimension Tables */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Table className="w-4 h-4" />
              <span>2 Πίνακες Διαστάσεων (Dimension Tables)</span>
            </h2>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
              Χαρακτηριστικά Ομαδοποίησης
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Dim 1 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">1. Πελάτες (Dim_Customers)</span>
                <span className="text-[10px] text-amber-400 font-mono">Τμηματοποίηση</span>
              </div>
              <p className="text-[11px] text-slate-300">
                <strong>Απαραίτητες στήλες:</strong> Κωδικός, Επωνυμία, ΑΦΜ, Χώρα, Τύπος (Σχολή / Γυμναστήριο / Reseller / Ομοσπονδία / Λιανική), Ημ. δημιουργίας, Όροι πίστωσης.
              </p>
            </div>

            {/* Dim 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">2. Είδη / Προϊόντα (Dim_Items)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Ανάλυση Brand & Sport</span>
              </div>
              <p className="text-[11px] text-slate-300">
                <strong>Απαραίτητες στήλες:</strong> Κωδικός, Περιγραφή, Κατηγορία (Κιμονό, Γάντια κ.λπ.), Άθλημα (Judo, Boxing, BJJ κ.λπ.), Brand (Olympus, Hayashi κ.λπ.), Προμηθευτής, Lead Time παράδοσης.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 text-[11px] text-rose-200 leading-relaxed">
              ⚠️ <strong>Κρίσιμη Επισήμανση:</strong> Αν το export του ERP δεν δίνει το «Κόστος γραμμής», όλοι οι δείκτες κερδοφορίας και αποθέματος υπολογίζονται με σύνδεση στο τρέχον κόστος του είδους, που είναι λιγότερο ακριβές για παλαιότερες περιόδους.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Data Health Checklist */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Έλεγχος Ποιότητας Δεδομένων (Data Health Check) πριν από κάθε Ανάλυση</span>
            </h2>
            <p className="text-xs text-slate-400">
              Ελέγξτε τα 5 κρίσιμα σημεία πριν τροφοδοτήσετε το Power BI ή το Excel Dashboard.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          {/* Check 1 */}
          <div 
            onClick={() => toggleCheck('cost')}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            {checklist.cost ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            )}
            <div>
              <strong className="text-white">1. Κόστος Κτήσης (Landed Cost):</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Περιλαμβάνει το κόστος των ειδών στο ERP μεταφορικά, δασμούς εισαγωγής και συναλλαγματικές διαφορές (USD/EUR);
              </p>
            </div>
          </div>

          {/* Check 2 */}
          <div 
            onClick={() => toggleCheck('codes')}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            {checklist.codes ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            )}
            <div>
              <strong className="text-white">2. Κωδικοί Προϊόντων:</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Υπάρχουν κωδικοί που αντιστοιχούν σε διαφορετικά προϊόντα ή ίδια προϊόντα με πολλαπλούς κωδικούς; (Στον κατάλογο 2027-28 βρέθηκαν τέτοιες περιπτώσεις).
              </p>
            </div>
          </div>

          {/* Check 3 */}
          <div 
            onClick={() => toggleCheck('customers')}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            {checklist.customers ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            )}
            <div>
              <strong className="text-white">3. Διπλοεγγραφές Πελατών:</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Υπάρχουν διπλοεγγραφές του ίδιου πελάτη (ίδιο ΑΦΜ με διαφορετικό κωδικό πελάτη);
              </p>
            </div>
          </div>

          {/* Check 4 */}
          <div 
            onClick={() => toggleCheck('categorization')}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            {checklist.categorization ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            )}
            <div>
              <strong className="text-white">4. Πληρότητα Κατηγοριοποίησης:</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Έχουν όλοι οι πελάτες τύπο (σχολή / γυμναστήριο / reseller) και όλα τα είδη κατηγορία και brand;
              </p>
            </div>
          </div>

          {/* Check 5 */}
          <div 
            onClick={() => toggleCheck('balance')}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            {checklist.balance ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            )}
            <div>
              <strong className="text-white">5. Συμφωνία με Γενική Λογιστική (myDATA):</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Το σύνολο του export γραμμών συμφωνεί με το ισοζύγιο των εσόδων της ίδιας περιόδου στη Γενική Λογιστική;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSV / Excel Importer Section */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <span>Εισαγωγή Δικών σας Δεδομένων (Excel / CSV)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Ανεβάστε το δικό σας αρχείο τιμολογίων ή κατεβάστε το επίσημο πρότυπο.
            </p>
          </div>

          <button
            onClick={downloadSampleTemplate}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Λήψη Προτύπου Excel</span>
          </button>
        </div>

        {/* Upload box */}
        <div className="border-2 border-dashed border-slate-700 hover:border-rose-500 rounded-2xl p-8 text-center transition flex flex-col items-center justify-center space-y-3 bg-slate-950/50">
          <Upload className="w-8 h-8 text-slate-400" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-white">
              Σύρετε και αφήστε το αρχείο σας (.xlsx, .xls, .csv) εδώ ή
            </p>
            <label className="inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 text-xs font-semibold border border-slate-700 transition">
              <span>Αναζήτηση στον Υπολογιστή</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-[10px] text-slate-500">
            🔒 Τα δεδομένα επεξεργάζονται 100% τοπικά στον browser σας και δεν αποστέλλονται σε κανέναν server.
          </p>
        </div>

        {/* Upload Status */}
        {uploadedFileName && (
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Αρχείο <strong>{uploadedFileName}</strong> φορτώθηκε επιτυχώς! ({parsedRowCount} γραμμές συναλλαγών)</span>
            </span>
          </div>
        )}

        {uploadError && (
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 flex items-center space-x-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
