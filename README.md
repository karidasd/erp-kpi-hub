# 🥋 Olympus Sport Hellas — ERP Sales KPI & Analytics Hub

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Standards](https://img.shields.io/badge/ΕΛΠ_ν._4308/2014-myDATA_Compliant-rose.svg)](#)

Διαδραστική διαδικτυακή εφαρμογή επιχειρηματικής ευφυΐας (Commercial Intelligence & Sales Analytics) για εμπορικές επιχειρήσεις **B2B** (χονδρική πώληση σε σχολές πολεμικών τεχνών, dojo, resellers, ομοσπονδίες) και **B2C** (λιανική καταστημάτων & e-shop).

Βασισμένη στον εσωτερικό οδηγό **29 Δεικτών Απόδοσης (KPIs)**, συνδέει τη θεωρητική και λογιστική βάση (Ελληνικά Λογιστικά Πρότυπα, landed cost, ΦΠΑ 24%, δεδουλευμένη έναντι ταμειακής βάσης) με την πρακτική εφαρμογή μέσω **ERP (Exelixis)**, **Power BI** και **Excel**.

---

## 🌟 Κύριες Δυνατότητες της Εφαρμογής

### 1. 📊 Executive Dashboard (7 Βασικοί Δείκτες Εκκίνησης)
* **Αύξηση Πωλήσεων YoY (#01):** Απομόνωση εποχικότητας (σχολική χρονιά Σεπτεμβρίου/Ιανουαρίου).
* **Ποσοστό Μικτού Κέρδους (#04):** Αυστηρός υπολογισμός σε Landed Cost (τιμή αγοράς + ναύλοι + δασμοί) και διάκριση από το Markup.
* **Customer Retention Rate (#08):** Παρακολούθηση CRR και NRR (Net Revenue Retention σε αξία).
* **Συγκέντρωση Πελατών (#13):** Μερίδιο Top-10 πελατών, καμπύλη Pareto 80/20 και δείκτης Herfindahl-Hirschman (HHI).
* **Μέση Διάρκεια Είσπραξης - DSO (#15):** Διόρθωση υπολογισμού με ΦΠΑ 24% και μέτρηση της επίδρασης των μεταχρονολογημένων επιταγών στο κεφάλαιο κίνησης.
* **GMROI (#20):** Μικτό κέρδος ανά € δεσμευμένου αποθέματος (συνδυασμός margin και κυκλοφοριακής ταχύτητας).
* **PVM Decomposition (#03):** Καταρράκτης αποδόμησης της μεταβολής τζίρου σε Τιμή, Όγκο και Μείγμα (αποφυγή παράδοξου Simpson).

### 2. 📚 Πλήρης Κατάλογος 29 KPIs (Knowledge Explorer)
* Διαδραστική αναζήτηση και φιλτράρισμα ανά κατηγορία: **Έσοδα**, **Κερδοφορία**, **Πελάτες**, **Ταμείο**, **Απόθεμα**, **Pipeline**, **B2C**.
* Αναλυτική καρτέλα για κάθε δείκτη:
  * *Τι μετράει & επιχειρηματική ερώτηση*
  * *Μαθηματικός τύπος*
  * *Λογιστική βάση (ΕΛΠ / ομάδες λογαριασμών / myDATA)*
  * *Βήματα υλοποίησης σε ERP, Power BI & Excel*
  * *Πραγματικό αριθμητικό παράδειγμα*
  * *Συνηθέστερη μεθοδολογική παγίδα*

### 3. 🧮 Live Προσομοιωτές & Υπολογιστές (Simulators)
1. **PVM (Price-Volume-Mix) Analyzer:** Υπολογίζει άμεσα τις 3 επιδράσεις στη διαφορά εσόδων με μαθηματικό έλεγχο συμφωνίας.
2. **Markup ↔ Gross Margin & Landed Cost:** Υπολογίζει το απαραίτητο Landed cost και την απαιτούμενη αύξηση όγκου πωλήσεων $\frac{d}{m - d}$ όταν δίνεται έκπτωση.
3. **DSO & Cash Conversion Cycle (CCC):** Υπολογισμός πραγματικού οικονομικού DSO με επιταγές χαρτοφυλακίου και ημερών χρηματοδότησης κεφαλαίου κίνησης.
4. **Safety Stock & Reorder Point (ROP):** Επιστημονικός υπολογισμός αποθέματος ασφαλείας $z \times \sigma_d \times \sqrt{L}$ και σημείου αναπαραγγελίας για εισαγωγές με μακρύ lead time (π.χ. Πακιστάν).
5. **Silent Churn Inactivity Alert:** Εντοπισμός πελατών σε κίνδυνο βάσει του προσωπικού τους ιστορικού κύκλου παραγγελιών.

### 4. 🗄️ Star Schema & Έλεγχος Ποιότητας Δεδομένων
* Προδιαγραφές για **3 Fact Tables** (Τιμολόγια, Απαιτήσεις, Αποθέματα) και **2 Dimension Tables** (Πελάτες, Είδη).
* **Interactive Data Health Check:** 5 κρίσιμοι έλεγχοι (Landed Cost, διπλοί κωδικοί, ΑΦΜ, myDATA συμφωνία) πριν από την επεξεργασία.
* **Excel / CSV Importer:** Δυνατότητα εισαγωγής αρχείου τιμολογίων με 100% τοπική επεξεργασία στον browser (χωρίς αποστολή σε server).

### 5. 🛠️ Exelixis ERP Integration & Πλάνο 12 Εβδομάδων
* 4 επίπεδα αυτοματοποίησης: ERP Reports $\rightarrow$ Excel Power Query $\rightarrow$ Power BI Direct $\rightarrow$ AI Analytics.
* 6 εξειδικευμένες ερωτήσεις προς την εταιρεία λογισμικού του ERP.
* Βήμα προς βήμα οδικός χάρτης 12 εβδομάδων.

---

## 💻 Τοπική Εκτέλεση (Quick Start)

### Προαπαιτούμενα
* Node.js (έκδοση 18 ή νεότερη)
* npm ή yarn

### Εγκατάσταση και Εκκίνηση

```bash
# 1. Μετάβαση στον φάκελο του project
cd erp-kpi-hub

# 2. Εγκατάσταση των πακέτων
npm install

# 3. Εκκίνηση τοπικού dev server
npm run dev
```

Ανοίξτε τον browser στη διεύθυνση `http://localhost:5173`.

---

## 🚀 Δημοσίευση στο GitHub & GitHub Pages

### 1. Αρχικοποίηση & Push στο GitHub

```bash
git init
git add .
git commit -m "feat: initial commit of Olympus Sport ERP KPI Hub"

# Συνδέστε το με το δικό σας αποθετήριο στο GitHub:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/erp-kpi-hub.git
git branch -M main
git push -u origin main
```

### 2. Αυτόματο Hosting (GitHub Pages)

Το αποθετήριο περιλαμβάνει ήδη έτοιμο GitHub Actions workflow στο αρχείο `.github/workflows/deploy.yml`.

1. Μεταβείτε στο αποθετήριο στο GitHub.
2. Επιλέξτε **Settings** $\rightarrow$ **Pages**.
3. Στο πεδίο **Build and deployment** / **Source**, επιλέξτε **GitHub Actions**.
4. Η εφαρμογή θα χτιστεί και θα δημοσιευτεί αυτόματα στο:
   `https://<YOUR_GITHUB_USERNAME>.github.io/erp-kpi-hub/`

---

## 📦 Τεχνολογικό Stack

* **Framework:** React 19 + TypeScript
* **Bundler & Tooling:** Vite 8
* **Styling:** Tailwind CSS
* **Data Visualization & Charts:** Recharts
* **Icons:** Lucide React
* **Excel / Spreadsheet Processing:** SheetJS (xlsx)

---

## 📄 Άδεια Χρήσης

Το έργο διατίθεται υπό την άδεια [MIT License](LICENSE).
