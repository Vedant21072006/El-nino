import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { simulateClimateScenario } from '../../ml/modelPipeline';
import { ScenarioResult } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { Sliders, Sparkles, Save, RotateCcw, Building2, CloudRain, Thermometer } from 'lucide-react';

export const OfficerScenarioSimulator: React.FC = () => {
  const { showNotification } = useApp();

  const [selectedDistrictId, setSelectedDistrictId] = useState('latur');
  const [simRainfall, setSimRainfall] = useState(-25);
  const [simTemp, setSimTemp] = useState(2.0);
  const [simDryDays, setSimDryDays] = useState(18);
  const [hasIrrigation, setHasIrrigation] = useState(false);
  const [scenarioName, setScenarioName] = useState('Extended Monsoon Break Simulation');
  const [savedScenarios, setSavedScenarios] = useState<ScenarioResult[]>([]);

  const [currentResult, setCurrentResult] = useState<ScenarioResult>(() =>
    simulateClimateScenario('latur', -25, 2.0, 18, false)
  );

  const handleRecalculate = () => {
    const res = simulateClimateScenario(selectedDistrictId, simRainfall, simTemp, simDryDays, hasIrrigation);
    setCurrentResult(res);
    showNotification(`Simulated model output updated for ${selectedDistrictId.toUpperCase()}`);
  };

  const handleSaveScenario = () => {
    setSavedScenarios((prev) => [currentResult, ...prev]);
    showNotification(`Saved scenario "${scenarioName}" to operational cache.`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Advanced Climate Scenario Simulation Lab
        </h1>
        <p className="text-xs text-slate-500">
          Run hypothesis simulations across Maharashtra districts using the calibrated XGBoost prediction service
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Scenario Parameters
            </h3>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              Interactive Model Sandbox
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target District</label>
              <select
                value={selectedDistrictId}
                onChange={(e) => {
                  setSelectedDistrictId(e.target.value);
                  const res = simulateClimateScenario(e.target.value, simRainfall, simTemp, simDryDays, hasIrrigation);
                  setCurrentResult(res);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none"
              >
                {MAHARASHTRA_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Rainfall */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Rainfall Anomaly (%):</span>
                <span className="font-mono text-emerald-800 font-bold">
                  {simRainfall > 0 ? `+${simRainfall}%` : `${simRainfall}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="30"
                step="5"
                value={simRainfall}
                onChange={(e) => setSimRainfall(parseInt(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Maximum Temp Anomaly:</span>
                <span className="font-mono text-orange-800 font-bold">+{simTemp}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="0.5"
                value={simTemp}
                onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Dry Days */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Consecutive Dry Days:</span>
                <span className="font-mono text-slate-900 font-bold">{simDryDays} Days</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={simDryDays}
                onChange={(e) => setSimDryDays(parseInt(e.target.value))}
                className="w-full accent-slate-700 cursor-pointer"
              />
            </div>

            {/* Irrigation */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="font-semibold text-slate-700">Protective Irrigation Deployment:</span>
              <input
                type="checkbox"
                checked={hasIrrigation}
                onChange={(e) => setHasIrrigation(e.target.checked)}
                className="w-4 h-4 accent-emerald-700 cursor-pointer"
              />
            </div>

            <button
              onClick={handleRecalculate}
              className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Run XGBoost Simulation</span>
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                Simulation Output · {currentResult.district}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Comparative Impact vs Seasonal Baseline
              </h3>
            </div>
            <RiskBadge level={currentResult.simulated.riskLevel} size="md" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400">Baseline Yield</span>
              <div className="text-base font-bold font-mono text-slate-800 mt-0.5">
                {currentResult.baseline.predictedYieldKgHa} kg/ha
              </div>
              <span className="text-[10px] text-slate-500">{currentResult.baseline.yieldAnomalyPct}%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400">Simulated Yield</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                {currentResult.simulated.predictedYieldKgHa} kg/ha
              </div>
              <span className="text-[10px] font-bold text-rose-700">{currentResult.simulated.yieldAnomalyPct}%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400">Yield Delta</span>
              <div className={`text-base font-bold font-mono mt-0.5 ${currentResult.yieldDifferenceKgHa >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {currentResult.yieldDifferenceKgHa > 0 ? `+${currentResult.yieldDifferenceKgHa}` : currentResult.yieldDifferenceKgHa} kg/ha
              </div>
              <span className="text-[10px] font-bold">
                {currentResult.percentageChange > 0 ? `+${currentResult.percentageChange}%` : `${currentResult.percentageChange}%`}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400">Soil Moisture Modeled</span>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                {currentResult.simulated.soilMoisturePct.toFixed(0)}%
              </div>
              <span className="text-[10px] text-slate-500">Root-zone water</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-1">
            <span className="font-bold text-slate-900 block">Analytical Findings:</span>
            <p>{currentResult.explanation}</p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              placeholder="Scenario name for operational filing..."
              className="flex-1 text-xs p-2 rounded-xl border border-slate-300 focus:outline-none"
            />
            <button
              onClick={handleSaveScenario}
              className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Scenario</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
