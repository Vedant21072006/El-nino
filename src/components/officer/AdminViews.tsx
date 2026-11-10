import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DATA_SOURCES, MODEL_METADATA, INITIAL_AUDIT_LOGS } from '../../data/maharashtraData';
import { api } from '../../services/api';
import { Database, Cpu, ShieldCheck, ExternalLink, CheckCircle2, Clock, Info } from 'lucide-react';

export const DataRegistryView: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Climate & Agricultural Data Source Registry
        </h1>
        <p className="text-xs text-slate-500">
          Provenance, coverage, update latency, and quality boundaries of ingested datasets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DATA_SOURCES.map((source) => (
          <div
            key={source.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  {source.id.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                  {source.name}
                </h3>
                <p className="text-[11px] text-slate-500">{source.organization}</p>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{source.qualityStatus}</span>
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {source.datasetDescription}
            </p>

            <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
              <div><strong>Variables:</strong> {source.variables.join(', ')}</div>
              <div><strong>Coverage:</strong> {source.geographicCoverage}</div>
              <div><strong>Temporal:</strong> {source.temporalCoverage}</div>
              <div><strong>Last Sync:</strong> {new Date(source.lastSuccessfulUpdate).toLocaleString()}</div>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              <strong>Known Limitations:</strong> {source.limitations}
            </div>

            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-800 font-bold hover:underline flex items-center gap-1 text-[11px] pt-1"
            >
              <span>Official Repository / API Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ModelGovernanceView: React.FC = () => {
  const m = MODEL_METADATA;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Machine Learning Model Governance & Validation
        </h1>
        <p className="text-xs text-slate-500">
          Architecture, out-of-time evaluation metrics, baseline benchmark comparison, and SHAP explainer status
        </p>
      </div>

      {/* Model Spec Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Active Production Artifact
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">
              {m.modelName} ({m.modelVersion})
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Algorithm: {m.championAlgorithm}
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 font-mono">Last Trained</span>
            <div className="font-bold text-slate-900">
              {new Date(m.lastTrained).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* 4 Core Evaluation KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium">Mean Absolute Error</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {m.evaluationMetrics.mae} kg/ha
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">Low Residual Error</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium">Root Mean Squared Error</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {m.evaluationMetrics.rmse} kg/ha
            </div>
            <span className="text-[10px] text-slate-500">RMSE on 2023-2025 Test Split</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium">R² Determination Score</span>
            <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">
              {m.evaluationMetrics.r2}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">Explains 81% Variance</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium">Classification Accuracy</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {m.evaluationMetrics.accuracyClassification}%
            </div>
            <span className="text-[10px] text-slate-500">Risk Tier Categorization</span>
          </div>
        </div>

        {/* Benchmark Comparisons Table */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-2">
            Baseline Model Comparison (Temporal Hold-Out Validation)
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Candidate Model Architecture</th>
                  <th className="py-2.5 px-3">MAE (kg/ha)</th>
                  <th className="py-2.5 px-3">RMSE (kg/ha)</th>
                  <th className="py-2.5 px-3">R² Score</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {m.benchmarkAlgorithms.map((algo: any, i: number) => (
                  <tr key={i} className={algo.name.includes('Champion') ? 'bg-emerald-50/40 font-bold' : ''}>
                    <td className="py-2.5 px-4">{algo.name}</td>
                    <td className="py-2.5 px-3 font-mono">{algo.mae}</td>
                    <td className="py-2.5 px-3 font-mono">{algo.rmse}</td>
                    <td className="py-2.5 px-3 font-mono">{algo.r2}</td>
                    <td className="py-2.5 px-3">
                      {algo.name.includes('Champion') ? (
                        <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded font-bold uppercase">
                          Selected Champion
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 uppercase">Baseline</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Input Space */}
        <div className="pt-2 space-y-1.5 text-xs text-slate-600">
          <span className="font-bold text-slate-800 block">Input Feature Schema:</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {m.featuresUsed.map((feat: string, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 text-slate-700">
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuditTrailView: React.FC = () => {
  const logs = api.getAuditLogs();

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Centralized Operational Audit Trail
        </h1>
        <p className="text-xs text-slate-500">
          Immutable logging of officer warning transitions, advisory publications, and system events
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-3">Action Performed</th>
                <th className="py-3 px-3">Authorized User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Entity Type</th>
                <th className="py-3 px-4">Operational Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">
                    {log.performedBy}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 capitalize">
                    {log.entityType.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
