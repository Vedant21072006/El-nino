import React, { useState } from 'react';
import { HISTORICAL_ENSO_SERIES } from '../../data/maharashtraData';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { History, Info, AlertTriangle, TrendingDown, ArrowUpRight } from 'lucide-react';

export const HistoricalTrendsView: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<'all' | 'el_nino' | 'la_nina'>('all');

  const displayData = HISTORICAL_ENSO_SERIES.filter((d) => {
    if (selectedEpoch === 'el_nino') return d.ensoPhase.toLowerCase().includes('el niño');
    if (selectedEpoch === 'la_nina') return d.ensoPhase.toLowerCase().includes('la niña');
    return true;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Historical Agrometeorology & ENSO Teleconnection
          </h1>
          <p className="text-xs text-slate-500">
            Analysis of Pacific SST anomalies vs Maharashtra Soybean Productivity (2014–2026)
          </p>
        </div>

        <div className="flex gap-1.5 text-xs">
          <button
            onClick={() => setSelectedEpoch('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              selectedEpoch === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Years (2014–2026)
          </button>
          <button
            onClick={() => setSelectedEpoch('el_nino')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              selectedEpoch === 'el_nino'
                ? 'bg-rose-700 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            El Niño Episodes Only
          </button>
          <button
            onClick={() => setSelectedEpoch('la_nina')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              selectedEpoch === 'la_nina'
                ? 'bg-emerald-800 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            La Niña Episodes Only
          </button>
        </div>
      </div>

      {/* Scientific Distinction: Correlation vs Causation Box (Section 7.6 explicit rule) */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/90 shadow-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <span className="font-bold text-sm block">Scientific Attribution & Epistemological Boundary:</span>
          <p className="leading-relaxed">
            <strong>Correlation is not direct proof of causation.</strong> While Pacific Equatorial SST warming (positive ONI) alters Walker circulation and suppresses Southwest Monsoon convective rainfall over Central India, local soybean yield losses are determined by a combination of soil water-holding capacity (Vertisols vs Entisols), dry spell timing relative to flowering/pod-fill phenology, supplemental irrigation infrastructure, and pest outbreaks. The model treats ENSO as a seasonal risk modulator rather than a sole deterministic driver.
          </p>
        </div>
      </div>

      {/* Dual Axis Chart: Yield Anomaly vs ONI Index */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Comparative Trajectory: Soybean Yield Anomaly vs NOAA ONI Anomaly
            </h3>
            <p className="text-[11px] text-slate-500">
              Government of India DES APY Yields vs NOAA Climate Prediction Center 3-Month Running Mean
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const row = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1 shadow-lg">
                        <p className="font-bold">{row.year} — {row.ensoPhase}</p>
                        <p className="text-emerald-300">Yield: {row.yieldKgHa} kg/ha ({row.yieldAnomalyPct}%)</p>
                        <p className="text-rose-300">ONI SST Index: +{row.avgOni}°C</p>
                        <p className="text-blue-300">Rainfall Departure: {row.rainfallAnomalyPct}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceLine y={0} stroke="#cbd5e1" />
              <Bar dataKey="yieldAnomalyPct" fill="#059669" name="Soybean Yield Anomaly (%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="rainfallAnomalyPct" fill="#2563eb" name="Rainfall Anomaly (%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Epoch Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* 2015 El Nino */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-rose-700">2015 Kharif</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
              Very Strong El Niño (+2.1°C)
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Severe Drought Shock</h4>
          <p className="text-slate-600 leading-relaxed">
            Monsoon rainfall collapsed by -27.8% across Marathwada. Soybean yields fell to 890 kg/ha (-32.1% anomaly). Widespread pod abortion occurred in Latur and Beed.
          </p>
        </div>

        {/* 2020-2022 La Nina */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-emerald-700">2020–2022 Kharif</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              Triple-Dip La Niña (-1.0°C)
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Consistent Bumper Production</h4>
          <p className="text-slate-600 leading-relaxed">
            Precipitation exceeded normal by +18% to +23%. Soybean yields peaked at 1,490 kg/ha (+13.7% anomaly). Localized excess waterlogging was noted during harvest.
          </p>
        </div>

        {/* 2026 Active Episode */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-orange-700">2026 Current</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold">
              Active Stage (+1.4°C)
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Monsoon Break Stress</h4>
          <p className="text-slate-600 leading-relaxed">
            Persistent August dry spells and +2.4°C max temperature elevation. XGBoost predicts -20.8% average yield anomaly in rain-fed tracts without supplemental irrigation.
          </p>
        </div>
      </div>
    </div>
  );
};
