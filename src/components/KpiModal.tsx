import React from 'react';
import type { KPI } from '../types';
import { 
  X, 
  HelpCircle, 
  Calculator, 
  BookOpen, 
  FileSpreadsheet, 
  AlertTriangle, 
  CheckCircle2,
  Tag,
  Users
} from 'lucide-react';

interface KpiModalProps {
  kpi: KPI | null;
  onClose: () => void;
}

export const KpiModal: React.FC<KpiModalProps> = ({ kpi, onClose }) => {
  if (!kpi) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Δείκτης #{kpi.code}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-700 text-slate-300 flex items-center space-x-1">
                <Tag className="w-3 h-3 mr-1 text-slate-400" />
                {kpi.category}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-700 text-slate-300 flex items-center space-x-1">
                <Users className="w-3 h-3 mr-1 text-slate-400" />
                {kpi.audience}
              </span>
              {kpi.isCore && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ★ Βασικός Δείκτης
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight pt-1">
              {kpi.nameGr}
            </h2>
            <p className="text-xs font-mono text-slate-400">{kpi.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Status banner */}
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-slate-300">
              <strong className="text-slate-100">Κατάσταση Υλοποίησης:</strong> {kpi.implementationStatus}
            </span>
          </div>

          {/* 1. What it measures */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>Τι Μετράει & Επιχειρηματικός Σκοπός</span>
            </h3>
            <p className="leading-relaxed text-slate-200 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
              {kpi.whatItMeasures}
            </p>
          </div>

          {/* 2. Formula */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
              <Calculator className="w-4 h-4" />
              <span>Μαθηματικός Τύπος</span>
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-200 whitespace-pre-wrap leading-relaxed">
              {kpi.formula}
            </div>
          </div>

          {/* 3. Accounting & Financial Base */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Λογιστική και Οικονομική Βάση (ΕΛΠ / myDATA)</span>
            </h3>
            <p className="leading-relaxed text-slate-300 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
              {kpi.accountingBase}
            </p>
          </div>

          {/* 4. Implementation Steps */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Τρόπος Υλοποίησης (ERP, Excel, Power BI)</span>
            </h3>
            <p className="leading-relaxed text-slate-300 bg-slate-800/40 p-4 rounded-xl border border-slate-700/40">
              {kpi.implementation}
            </p>
          </div>

          {/* 5. Example & 6. Trap grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Αριθμητικό Παράδειγμα</span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {kpi.example}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Παγίδα & Μεθοδολογικό Λάθος</span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {kpi.trap}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition"
          >
            Κλείσιμο
          </button>
        </div>
      </div>
    </div>
  );
};
