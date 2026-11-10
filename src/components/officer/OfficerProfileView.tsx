import React from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Building2, ShieldCheck, Phone, Mail, MapPin, Clock, LogOut, CheckCircle2 } from 'lucide-react';

export const OfficerProfileView: React.FC = () => {
  const { user, logout, showNotification, setOfficerTab } = useApp();

  const assignedOfficer = user || {
    name: 'Dr. Suresh Patil',
    designation: 'Sub-Divisional Agriculture Officer (SDAO)',
    district: 'Latur',
    department: 'Directorate of Agriculture, Maharashtra',
    phone: '+91 94220 88991',
    email: 'sdao.latur@agri.maharashtra.gov.in',
    assignedDistricts: ['Latur', 'Nanded', 'Beed']
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Officer Profile & Credentials
        </h1>
        <p className="text-xs text-slate-500">
          Authorized personnel details registered with Directorate of Agriculture, Maharashtra.
        </p>
      </div>

      {/* Primary Officer Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">{assignedOfficer.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-900 mt-0.5">{assignedOfficer.designation}</p>
              <p className="text-[11px] text-slate-500">{assignedOfficer.department}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Primary District</span>
            <span className="font-bold text-slate-900">{assignedOfficer.district || 'Latur'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Monitored Jurisdiction</span>
            <span className="font-bold text-slate-900">{assignedOfficer.assignedDistricts?.join(', ') || 'Latur, Nanded, Beed'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Official Phone</span>
            <span className="font-bold font-mono text-slate-900">{assignedOfficer.phone}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Govt Email</span>
            <span className="font-bold text-slate-900">{assignedOfficer.email || 'officer@agri.maharashtra.gov.in'}</span>
          </div>
        </div>

        {/* Administrative Roles & Responsibilities */}
        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/70 space-y-1.5 text-xs">
          <span className="font-bold text-emerald-950 block">Operational Responsibilities:</span>
          <ul className="text-slate-700 space-y-1 text-[11px]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Surveillance of El Niño monsoon precipitation anomalies and heat stress.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Publishing binding crop advisories directly to farmer mobile devices.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Organizing district training camps and micro-irrigation demonstrations.</span>
            </li>
          </ul>
        </div>

        {/* Logout Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={logout}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Officer Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
