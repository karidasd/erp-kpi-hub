import { useState } from 'react';
import { Navbar } from './components/Navbar';
import type { TabType } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { KpiCatalogTab } from './components/KpiCatalogTab';
import { CalculatorsTab } from './components/CalculatorsTab';
import { DataImportTab } from './components/DataImportTab';
import { ErpGuideTab } from './components/ErpGuideTab';
import { KpiModal } from './components/KpiModal';
import { KPIS_DATA } from './data/kpiData';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedKpiId, setSelectedKpiId] = useState<number | null>(null);

  const selectedKpi = selectedKpiId !== null 
    ? KPIS_DATA.find(k => k.id === selectedKpiId) || null 
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab 
            onOpenKpiModal={(id) => setSelectedKpiId(id)}
            onNavigateToCalculators={() => setActiveTab('calculators')}
          />
        )}

        {activeTab === 'catalog' && (
          <KpiCatalogTab 
            onSelectKpi={(id) => setSelectedKpiId(id)} 
          />
        )}

        {activeTab === 'calculators' && (
          <CalculatorsTab />
        )}

        {activeTab === 'schema' && (
          <DataImportTab />
        )}

        {activeTab === 'guide' && (
          <ErpGuideTab />
        )}
      </main>

      {/* Detailed KPI Modal */}
      <KpiModal 
        kpi={selectedKpi} 
        onClose={() => setSelectedKpiId(null)} 
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-400 font-medium">
              Olympus Sport Hellas · B2B & B2C Commercial Intelligence System
            </p>
            <p className="text-[11px] text-slate-500">
              Βασισμένο στον Εσωτερικό Οδηγό 29 Δεικτών Πωλήσεων (ΕΛΠ ν. 4308/2014 & myDATA)
            </p>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Υλοποίηση για GitHub Portfolio</span>
            <span>•</span>
            <span className="text-rose-400 font-medium">Ready for Exelixis ERP Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
