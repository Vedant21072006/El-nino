import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { DistrictRiskData } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { ArrowRight, CloudRain, Droplet, AlertTriangle, Layers } from 'lucide-react';
import L from 'leaflet';

export const DistrictExplorerMap: React.FC = () => {
  const { setSelectedDistrictId, setOfficerTab } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictRiskData>(MAHARASHTRA_DISTRICTS[0]);
  const [selectedCrop, setSelectedCrop] = useState('Soybean');
  const [riskFilter, setRiskFilter] = useState('all');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter((d) => {
    if (riskFilter !== 'all' && d.riskLevel !== riskFilter) return false;
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [19.65, 76.5],
        zoom: 7,
        minZoom: 6,
        maxZoom: 10,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap | IMD Gridded Rainfall',
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }
  }, []);

  // Update map markers when filtered districts change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredDistricts.forEach((d) => {
      const color =
        d.riskLevel === 'critical'
          ? '#dc2626' // Red
          : d.riskLevel === 'high'
          ? '#ea580c' // Orange
          : d.riskLevel === 'moderate'
          ? '#d97706' // Yellow/Amber
          : '#16a34a'; // Green

      const customIcon = L.divIcon({
        className: 'custom-district-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: 800;
            font-family: sans-serif;
            cursor: pointer;
          ">
            ${d.name.slice(0, 2).toUpperCase()}
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([d.lat, d.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedDistrict(d);
      });

      marker.bindTooltip(
        `<strong>${d.name}</strong><br/>Risk: ${d.riskLevel.toUpperCase()}<br/>Rainfall: ${d.rainfallAnomalyPct}%`,
        { direction: 'top', offset: [0, -10] }
      );

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredDistricts]);

  const handleOpenDetailedAnalysis = () => {
    setSelectedDistrictId(selectedDistrict.id);
    setOfficerTab('analysis');
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            District Risk Map
          </h1>
          <p className="text-xs text-slate-500">
            Click any district to view its risk level, rainfall deficit, and key reason for stress.
          </p>
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2">
          {/* Crop Dropdown */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
          >
            <option value="Soybean">Crop: Soybean</option>
            <option value="Cotton" disabled>Crop: Cotton (Next Season)</option>
            <option value="Tur" disabled>Crop: Tur (Next Season)</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">🔴 Critical Risk</option>
            <option value="high">🟠 High Risk</option>
            <option value="moderate">🟡 Moderate Risk</option>
            <option value="low">🟢 Low / Safe</option>
          </select>
        </div>
      </div>

      {/* Map & District Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden h-[480px] relative">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Clean Legend */}
          <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1">
            <span className="font-extrabold text-slate-900 text-[11px] block">
              Risk Categories:
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
              <span>Critical (&lt; -25% Yield)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0" />
              <span>High (-15% to -25%)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span>Moderate (-5% to -15%)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 shrink-0" />
              <span>Safe (&gt; -5%)</span>
            </div>
          </div>
        </div>

        {/* Selected District Inspection Panel */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  {selectedDistrict.region}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedDistrict.name} ({selectedDistrict.nameMr})
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedCrop} Cultivation: {selectedDistrict.soybeanAcreageHa.toLocaleString()} Ha
                </p>
              </div>
              <RiskBadge level={selectedDistrict.riskLevel} size="md" />
            </div>

            {/* Rainfall & Yield Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 font-medium">Rainfall Deficit</span>
                <div className="text-lg font-black font-mono text-rose-700 mt-0.5">
                  {selectedDistrict.rainfallAnomalyPct}%
                </div>
                <span className="text-[10px] text-slate-500">{selectedDistrict.rainfallObservedMm}mm received</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-500 font-medium">Expected Yield</span>
                <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                  {selectedDistrict.predictedYieldKgHa} kg/ha
                </div>
                <span className="text-[10px] text-rose-700 font-bold">{selectedDistrict.yieldAnomalyPct}% drop</span>
              </div>
            </div>

            {/* Main Reason for Elevated Risk (Section 2 Requirement) */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/90 text-xs text-amber-950 space-y-1">
              <span className="font-extrabold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Main Reason for Elevated Risk:</span>
              </span>
              <p className="leading-relaxed">
                {selectedDistrict.shapExplanations[0]?.explanation || 
                  `${selectedDistrict.consecutiveDryDays} consecutive dry break days combined with +${selectedDistrict.tempAnomalyMaxC}°C heat during flowering phase.`}
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Consecutive Dry Days:</span>
                <strong className="text-slate-900">{selectedDistrict.consecutiveDryDays} Days</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Soil Moisture Level:</span>
                <strong className="text-slate-900">{selectedDistrict.soilMoisturePct}% (Low)</strong>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleOpenDetailedAnalysis}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Open Risk Analysis for {selectedDistrict.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
