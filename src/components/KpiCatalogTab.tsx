import React, { useState, useMemo } from 'react';
import { KPIS_DATA } from '../data/kpiData';
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight
} from 'lucide-react';

interface KpiCatalogTabProps {
  onSelectKpi: (kpiId: number) => void;
}

export const KpiCatalogTab: React.FC<KpiCatalogTabProps> = ({ onSelectKpi }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Όλες');
  const [selectedAudience, setSelectedAudience] = useState<string>('Όλα');
  const [onlyCore, setOnlyCore] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('Όλα');

  const categories = ['Όλες', 'Έσοδα', 'Κερδοφορία', 'Πελάτες', 'Ταμείο', 'Απόθεμα', 'Pipeline', 'B2C'];
  const audiences = ['Όλα', 'B2B', 'B2C', 'B2B · B2C'];
  const statuses = [
    'Όλα', 
    'Πιθανώς έτοιμο στο ERP', 
    'Export από ERP + Excel/Power BI', 
    'Χρειάζεται δεδομένα εκτός ERP'
  ];

  const filteredKpis = useMemo(() => {
    return KPIS_DATA.filter((kpi) => {
      const matchesSearch = 
        kpi.nameGr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kpi.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kpi.code.includes(searchQuery) ||
        kpi.whatItMeasures.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'Όλες' || kpi.category === selectedCategory;
      const matchesAudience = selectedAudience === 'Όλα' || kpi.audience.includes(selectedAudience);
      const matchesCore = !onlyCore || kpi.isCore;
      const matchesStatus = selectedStatus === 'Όλα' || kpi.implementationStatus === selectedStatus;

      return matchesSearch && matchesCategory && matchesAudience && matchesCore && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedAudience, onlyCore, selectedStatus]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Κατάλογος των 29 Δεικτών Πωλήσεων (KPIs)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ολοκληρωμένος κατάλογος με μαθηματικούς τύπους, λογιστική βάση (ΕΛΠ/myDATA), οδηγίες υλοποίησης και παγίδες.
          </p>
        </div>

        {/* Core Filter Switch */}
        <button
          onClick={() => setOnlyCore(!onlyCore)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition border ${
            onlyCore 
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950/40' 
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Star className={`w-4 h-4 ${onlyCore ? 'fill-current' : 'text-amber-400'}`} />
          <span>Μόνο οι 7 Βασικοί Δείκτες</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-4 shadow-lg">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Αναζήτηση δείκτη με όνομα, κωδικό, αγγλικό όρο ή κείμενο..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        {/* Filter categories pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold mr-1 shrink-0 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> Κατηγορία:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters row (Audience & Status) */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/60 text-xs">
          {/* Audience Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Κοινό:</span>
            <div className="flex space-x-1">
              {audiences.map((aud) => (
                <button
                  key={aud}
                  onClick={() => setSelectedAudience(aud)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                    selectedAudience === aud
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-slate-400">Υλοποίηση:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-rose-500"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Βρέθηκαν <strong>{filteredKpis.length}</strong> από τους 29 δείκτες</span>
        {onlyCore && <span className="text-amber-400 font-medium">Φιλτράρισμα: Προβολή 7 Βασικών Δεικτών</span>}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKpis.map((kpi) => (
          <div
            key={kpi.id}
            onClick={() => onSelectKpi(kpi.id)}
            className="bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 p-5 rounded-2xl cursor-pointer transition flex flex-col justify-between group shadow-md hover:shadow-xl hover:shadow-rose-950/20"
          >
            <div className="space-y-3">
              {/* Badges row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                    #{kpi.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[11px] font-medium border border-slate-700">
                    {kpi.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[11px] font-medium border border-slate-700">
                    {kpi.audience}
                  </span>
                </div>

                {kpi.isCore && (
                  <span className="flex items-center text-amber-400 text-[11px] font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <Star className="w-3 h-3 fill-current mr-1" /> Βασικός
                  </span>
                )}
              </div>

              {/* Title & EN Title */}
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition tracking-tight">
                  {kpi.nameGr}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {kpi.nameEn}
                </p>
              </div>

              {/* Short description */}
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {kpi.whatItMeasures}
              </p>

              {/* Formula Preview box */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[11px] text-amber-200/90 truncate">
                {kpi.formula.split('\n')[0]}
              </div>
            </div>

            {/* Bottom status & action */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                {kpi.implementationStatus === 'Πιθανώς έτοιμο στο ERP' && (
                  <span className="text-emerald-400 font-medium">● Έτοιμο ERP</span>
                )}
                {kpi.implementationStatus === 'Export από ERP + Excel/Power BI' && (
                  <span className="text-sky-400 font-medium">● Export + Excel/BI</span>
                )}
                {kpi.implementationStatus === 'Χρειάζεται δεδομένα εκτός ERP' && (
                  <span className="text-amber-400 font-medium">● Δεδομένα εκτός ERP</span>
                )}
              </span>

              <span className="text-rose-400 font-semibold group-hover:translate-x-1 transition flex items-center space-x-1">
                <span>Ανάλυση</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
