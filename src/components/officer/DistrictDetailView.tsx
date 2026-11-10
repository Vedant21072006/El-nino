import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Building2, 
  CloudRain, 
  Thermometer, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

export const DistrictDetailView: React.FC = () => {
  const { selectedDistrictId, setSelectedDistrictId, setOfficerTab, showNotification } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('Soybean');

  const district = MAHARASHTRA_DISTRICTS.find(
    (d) => d.id.toLowerCase() === (selectedDistrictId || 'latur').toLowerCase()
  ) || MAHARASHTRA_DISTRICTS[0];

  const handleCreateWarning = () => {
    setOfficerTab('warnings');
    showNotification(`Opened Warning & Advisory tool for ${district.name}`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {district.name} ({district.nameMr})
            </h1>
            <RiskBadge level={district.riskLevel} size="md" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {district.region} Region · Comprehensive Climate Risk & Yield Impact Analysis
          </p>
        </div>

        {/* District and Crop Switchers */}
        <div className="flex items-center gap-2">
          {/* Crop Selector */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
          >
            <option value="Soybean">Crop: Soybean</option>
            <option value="Cotton" disabled>Crop: Cotton (Next Season)</option>
            <option value="Tur" disabled>Crop: Tur (Next Season)</option>
          </select>

          {/* District Selector */}
          <select
            value={district.id}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
          >
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Current Risk Category & Predicted Yield Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Risk Category Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Current Risk Category
          </span>
          <div className="flex items-center gap-2 pt-1">
            <RiskBadge level={district.riskLevel} size="lg" />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Status: {district.warningStatus.toUpperCase()} alert active for monitored acreage.
          </p>
        </div>

        {/* Predicted Yield Impact */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Predicted {selectedCrop} Yield Impact
          </span>
          <div className="text-2xl font-black font-mono text-slate-900 pt-1">
            {district.predictedYieldKgHa} kg/ha
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-rose-700">{district.yieldAnomalyPct}% drop</span>
            <span className="text-slate-400">vs {district.historicalYieldBaselineKgHa} kg/ha normal</span>
          </div>
        </div>

        {/* Acreage Monitored */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            District Acreage Monitored
          </span>
          <div className="text-2xl font-black font-mono text-slate-900 pt-1">
            {(district.soybeanAcreageHa / 1000).toFixed(0)}k Hectares
          </div>
          <span className="text-xs text-emerald-800 font-medium">
            Kharif 2026 Area (DES APY Record)
          </span>
        </div>
      </div>

      {/* 2. Rainfall & Weather Indicators (vs Historical Normal) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">
          Climate & Soil Condition Indicators
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Rainfall vs Normal */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-bold text-slate-700">Rainfall vs Normal</span>
              <CloudRain className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-black font-mono text-rose-700">
              {district.rainfallAnomalyPct}% deficit
            </div>
            <p className="text-[11px] text-slate-500">
              {district.rainfallObservedMm} mm received / {district.rainfallNormalMm} mm normal
            </p>
          </div>

          {/* Temperature Anomaly */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-bold text-slate-700">Temperature Anomaly</span>
              <Thermometer className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-xl font-black font-mono text-orange-700">
              +{district.tempAnomalyMaxC}°C above average
            </div>
            <p className="text-[11px] text-slate-500">
              Afternoon heat stress accelerates flower shedding
            </p>
          </div>

          {/* Soil Moisture */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-bold text-slate-700">Soil Moisture Level</span>
              <Droplet className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-black font-mono text-slate-900">
              {district.soilMoisturePct}% (Low Retention)
            </div>
            <p className="text-[11px] text-slate-500">
              {district.consecutiveDryDays} consecutive rainless days
            </p>
          </div>
        </div>
      </div>

      {/* 3. Top Factors Contributing to Elevated Risk */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          Top Factors Contributing to Risk Prediction
        </h3>

        <div className="space-y-2.5">
          {district.shapExplanations.map((factor, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-start gap-3"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  factor.direction === 'increases_risk' ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{factor.label}</span>
                  <span className="font-mono text-rose-700 font-bold">{factor.impact}% impact</span>
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {factor.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recommended Actions for Agricultural Officers */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">
            Recommended Officer Actions
          </h3>
          <span className="text-xs font-bold text-emerald-800">Operational Checklist</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-950 block">
              1. Ground Field Verification
            </span>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Deploy taluka extension workers to verify flower shedding and ground soil cracking in rain-fed tracts.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-950 block">
              2. Broadcast Protective Advisory
            </span>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Issue farmer advisory advising morning sprinkler irrigation and 1% Potassium Nitrate (13:0:45) foliar spray.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-950 block">
              3. Farm Pond Water Mobilization
            </span>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Review water reserves in community farm ponds (Shet Tale) for emergency protective watering.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleCreateWarning}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Warning or Publish Advisory for {district.name} ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
