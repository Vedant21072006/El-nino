import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { DistrictRiskData } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { Search, Download, ArrowUpDown, ChevronRight, Filter } from 'lucide-react';

export const DistrictRiskTable: React.FC = () => {
  const { setSelectedDistrictId, setOfficerTab, showNotification } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof DistrictRiskData>('yieldAnomalyPct');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter & Search
  const filtered = MAHARASHTRA_DISTRICTS.filter((d) => {
    if (searchTerm && !d.name.toLowerCase().includes(searchTerm.toLowerCase()) && !d.nameMr.includes(searchTerm)) {
      return false;
    }
    if (regionFilter !== 'all' && d.region !== regionFilter) return false;
    if (riskFilter !== 'all' && d.riskLevel !== riskFilter) return false;
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (field: keyof DistrictRiskData) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'District ID',
      'District Name',
      'Region',
      'Crop',
      'Soybean Acreage (Ha)',
      'Rainfall Anomaly (%)',
      'Temp Anomaly (°C)',
      'Soil Moisture (%)',
      'NDVI Anomaly (%)',
      'Predicted Yield (kg/ha)',
      'Yield Anomaly (%)',
      'Risk Level',
      'Warning Status',
      'Data Completeness (%)'
    ];

    const rows = sorted.map((d) => [
      d.id,
      d.name,
      d.region,
      d.crop,
      d.soybeanAcreageHa,
      d.rainfallAnomalyPct,
      d.tempAnomalyMaxC,
      d.soilMoisturePct,
      d.ndviAnomalyPct,
      d.predictedYieldKgHa,
      d.yieldAnomalyPct,
      d.riskLevel,
      d.warningStatus,
      d.dataCompleteness
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Maharashtra_Soybean_Climate_Risk_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('District risk dataset exported to CSV successfully.');
  };

  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setOfficerTab('district_detail');
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            District Surveillance Table
          </h1>
          <p className="text-xs text-slate-500">
            Validated district agricultural yield forecasts & climate indicator matrix
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Permitted CSV</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search district name (e.g. Latur, Nanded, यवतमाळ)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs py-1.5 px-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Regions</option>
            <option value="Marathwada">Marathwada</option>
            <option value="Vidarbha">Vidarbha</option>
            <option value="Western Maharashtra">Western MH</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>District</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Region</th>
                <th
                  onClick={() => handleSort('rainfallAnomalyPct')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Rainfall Anomaly</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Temp Anomaly</th>
                <th className="py-3 px-3">Soil Moisture</th>
                <th
                  onClick={() => handleSort('predictedYieldKgHa')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Predicted Yield</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('yieldAnomalyPct')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    <span>Yield Anomaly</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Risk Category</th>
                <th className="py-3 px-3">Warning Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {sorted.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => handleSelectDistrict(d.id)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{d.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {d.id.toUpperCase()} · {d.nameMr}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{d.region}</td>
                  <td className="py-3 px-3 font-mono font-bold">
                    <span
                      className={
                        d.rainfallAnomalyPct < -20 ? 'text-rose-600' : 'text-slate-800'
                      }
                    >
                      {d.rainfallAnomalyPct}%
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      {d.rainfallObservedMm}mm
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-orange-700">
                    +{d.tempAnomalyMaxC}°C
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {d.soilMoisturePct}%
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {d.predictedYieldKgHa} kg/ha
                  </td>
                  <td className="py-3 px-3 font-mono font-bold">
                    <span
                      className={
                        d.yieldAnomalyPct < -20
                          ? 'text-rose-700 font-extrabold'
                          : d.yieldAnomalyPct < -10
                          ? 'text-orange-700'
                          : 'text-emerald-700'
                      }
                    >
                      {d.yieldAnomalyPct}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <RiskBadge level={d.riskLevel} size="sm" />
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        d.warningStatus === 'active'
                          ? 'bg-rose-100 text-rose-800'
                          : d.warningStatus === 'watch'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {d.warningStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDistrict(d.id);
                      }}
                      className="text-xs text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-0.5"
                    >
                      <span>Deep Dive</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {sorted.length} monitored district records</span>
          <span className="text-[11px]">Last synchronised: Today 06:00 UTC</span>
        </div>
      </div>
    </div>
  );
};
