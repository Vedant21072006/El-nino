import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Building2, 
  AlertTriangle, 
  ShieldAlert, 
  CloudRain, 
  ArrowRight, 
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const OfficerOverview: React.FC = () => {
  const { setOfficerTab, setSelectedDistrictId } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('Soybean');

  const warnings = api.getWarnings();
  const districts = MAHARASHTRA_DISTRICTS;

  // 1. Total districts monitored
  const totalMonitored = districts.length;

  // 2. High-risk districts (high + critical)
  const highRiskDistricts = districts.filter(d => d.riskLevel === 'high' || d.riskLevel === 'critical');
  const highRiskCount = highRiskDistricts.length;

  // 3. Active warnings
  const activeWarningsCount = warnings.filter(w => w.status === 'issued' || w.status === 'under_review').length;

  // 4. Average rainfall deviation
  const avgRainfallDev = (
    districts.reduce((sum, d) => sum + d.rainfallAnomalyPct, 0) / districts.length
  ).toFixed(1);

  // Small chart data: Rainfall vs Normal for key districts
  const chartData = districts.slice(0, 8).map(d => ({
    name: d.name,
    Observed: d.rainfallObservedMm,
    Normal: d.rainfallNormalMm,
  }));

  // Top 4 highest risk districts sorted by highest yield anomaly / risk
  const topRiskDistricts = [...districts]
    .sort((a, b) => a.yieldAnomalyPct - b.yieldAnomalyPct)
    .slice(0, 4);

  const handleInspectDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setOfficerTab('analysis');
  };

  const handleViewAllWarnings = () => {
    setOfficerTab('warnings');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Top Header with Crop Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            District Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quickly understand where climate stress and crop loss attention is needed today.
          </p>
        </div>

        {/* Crop Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600">Crop Monitored:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs font-bold text-emerald-900 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="Soybean">Soybean (Active Season)</option>
            <option value="Cotton" disabled>Cotton (Awaiting Model Validation)</option>
            <option value="Tur / Pigeon Pea" disabled>Tur / Red Gram (Awaiting Data)</option>
            <option value="Maize" disabled>Maize (Next Season)</option>
          </select>
        </div>
      </div>

      {/* 4 Core Officer Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1: Total Districts Monitored */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold text-slate-600">Districts Monitored</span>
            <Building2 className="w-4 h-4 text-emerald-800" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">{totalMonitored}</div>
          <span className="text-[11px] text-slate-500">Vidarbha & Marathwada</span>
        </div>

        {/* Metric 2: High-Risk Districts */}
        <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-rose-900">High-Risk Districts</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-700">{highRiskCount}</div>
          <span className="text-[11px] text-rose-800 font-semibold">Immediate attention needed</span>
        </div>

        {/* Metric 3: Active Warnings */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-amber-900">Active Warnings</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-800">{activeWarningsCount}</div>
          <button
            onClick={handleViewAllWarnings}
            className="text-[11px] text-amber-900 font-bold hover:underline block"
          >
            Review active alerts ➔
          </button>
        </div>

        {/* Metric 4: Average Rainfall Deviation */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold text-slate-600">Avg Rain Deficit</span>
            <CloudRain className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-600">{avgRainfallDev}%</div>
          <span className="text-[11px] text-slate-500">Below 30-year IMD normal</span>
        </div>
      </div>

      {/* Main Split: Small Chart (Rain vs Normal) + 3-5 Highest Risk Districts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Small Chart: Rainfall vs Normal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Rainfall vs. Normal (mm)
              </h3>
              <p className="text-xs text-slate-500">
                Monsoon precipitation received compared to 30-year district average
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">IMD Gridded Data</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="mm" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs space-y-0.5 shadow-md">
                          <p className="font-bold">{d.name}</p>
                          <p className="text-blue-300">Observed: {d.Observed} mm</p>
                          <p className="text-slate-300">Normal: {d.Normal} mm</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                <Bar dataKey="Observed" name="Observed Rain" fill="#2563eb" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Normal" name="30-Yr Normal" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List of 3–5 Highest Risk Districts (Section 1 requirement) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Highest-Risk Districts
              </h3>
              <p className="text-xs text-slate-500">
                Districts facing severe rainfall deficit and yield drop
              </p>
            </div>
            <button
              onClick={() => setOfficerTab('map')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>View Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {topRiskDistricts.map((d) => (
              <div
                key={d.id}
                onClick={() => handleInspectDistrict(d.id)}
                className="p-3 rounded-2xl border border-slate-200/90 hover:border-emerald-600 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{d.name}</span>
                    <span className="text-[11px] text-slate-400">({d.region})</span>
                    <RiskBadge level={d.riskLevel} size="sm" />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Rainfall Deficit: <strong className="text-rose-700">{d.rainfallAnomalyPct}%</strong> · 
                    Expected Yield: <strong className="text-slate-900">{d.predictedYieldKgHa} kg/ha</strong> ({d.yieldAnomalyPct}%)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Primary reason: {d.shapExplanations[0]?.label || 'Severe moisture deficit during reproductive stage'}
                  </p>
                </div>

                <div className="text-emerald-800 font-bold text-xs flex items-center gap-1 shrink-0 ml-2">
                  <span>Inspect</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Navigation Footer */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-slate-600">
          Want to issue emergency advisories or inspect district boundaries?
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setOfficerTab('map')}
            className="px-3.5 py-2 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Open District Map ➔
          </button>
          <button
            onClick={() => setOfficerTab('warnings')}
            className="px-3.5 py-2 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-colors"
          >
            Manage Warnings & Advisories ➔
          </button>
        </div>
      </div>
    </div>
  );
};
