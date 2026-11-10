import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Map, BarChart3, AlertTriangle, UserCheck } from 'lucide-react';

export const OfficerNavigation: React.FC = () => {
  const { officerTab, setOfficerTab, user } = useApp();

  const navItems = [
    { id: 'overview', number: '1', label: 'District Overview', icon: LayoutDashboard, desc: 'Key KPIs & priority districts' },
    { id: 'map', number: '2', label: 'District Risk Map', icon: Map, desc: 'Visual risk map & indicators' },
    { id: 'analysis', number: '3', label: 'Risk Analysis', icon: BarChart3, desc: 'District deep-dive & factors' },
    { id: 'warnings', number: '4', label: 'Warnings & Advisories', icon: AlertTriangle, desc: 'Issue warnings & farmer actions' },
    { id: 'profile', number: '5', label: 'Officer Profile', icon: UserCheck, desc: 'Credentials & jurisdiction' },
  ];

  return (
    <aside 
      aria-label="Officer portal navigation"
      className="w-full lg:w-72 bg-slate-900 text-slate-300 p-4 shrink-0 flex flex-col justify-between border-r border-slate-800"
    >
      <div className="space-y-4">
        {/* Officer Header Card */}
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60">
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            Command Center
          </span>
          <span className="font-extrabold text-white text-sm block">
            {user?.name || 'Dr. Suresh Patil'}
          </span>
          <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
            {user?.designation || 'District Agriculture Officer'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = officerTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOfficerTab(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white font-bold shadow-sm'
                    : 'bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isActive ? 'bg-white text-emerald-950' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {item.number}
                </div>
                <div>
                  <span className="text-sm font-bold block">{item.label}</span>
                  <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {item.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">Live Feeds: IMD, NOAA CPC, GoI DES</p>
        <p>Operational Status: Kharif 2026</p>
      </div>
    </aside>
  );
};
