import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';
import { 
  History, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  Bell, 
  FileText, 
  ChevronRight,
  Clock
} from 'lucide-react';

export const FarmerHistoryView: React.FC = () => {
  const { assessments, setSelectedAssessmentId, setFarmerTab, language, farm } = useApp();
  const [historyTab, setHistoryTab] = useState<'assessments' | 'warnings' | 'announcements'>('assessments');

  const allWarnings = api.getWarnings();
  const pastWarnings = allWarnings.filter((w) => w.status === 'closed' || w.status === 'issued');
  const pastAnnouncements = api.getAnnouncements();

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">
              {language === 'mr' ? 'इतिहास व मागील नोंदी' : 'History & Past Records'}
            </h1>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'शेताचे जुने अहवाल, मागील इशारे व घोषणा' : 'Past assessments, issued warnings & earlier announcements'}
            </p>
          </div>
        </div>
      </div>

      {/* 3 History Sub-Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
        <button
          type="button"
          onClick={() => setHistoryTab('assessments')}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
            historyTab === 'assessments'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'mr' ? 'शेताचे अहवाल' : 'Assessments'} ({assessments.length})
        </button>
        <button
          type="button"
          onClick={() => setHistoryTab('warnings')}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
            historyTab === 'warnings'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'mr' ? 'मागील इशारे' : 'Past Alerts'} ({pastWarnings.length})
        </button>
        <button
          type="button"
          onClick={() => setHistoryTab('announcements')}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
            historyTab === 'announcements'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'mr' ? 'घोषणा' : 'Notices'} ({pastAnnouncements.length})
        </button>
      </div>

      {/* Tab 1: Past Assessments */}
      {historyTab === 'assessments' && (
        <div className="space-y-3">
          {assessments.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 text-xs text-slate-500">
              {language === 'mr' ? 'कोणतीही मागील नोंद नाही.' : 'No previous assessments logged yet.'}
            </div>
          ) : (
            assessments.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      <span>·</span>
                      <span className="font-bold text-slate-700">{item.crop}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {item.district} ({item.village || farm.village})
                    </h3>
                  </div>
                  <RiskBadge level={item.riskLevel} size="sm" />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'mr' ? 'अपेक्षित उत्पादन' : 'Expected Yield'}
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {item.estimatedYieldKgHa} kg/ha ({item.yieldAnomalyPct}%)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAssessmentId(item.id);
                      setFarmerTab('assessment_detail');
                    }}
                    className="px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>{language === 'mr' ? 'पहा' : 'View'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Past Warnings */}
      {historyTab === 'warnings' && (
        <div className="space-y-3">
          {pastWarnings.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-slate-400">{w.id} · {new Date(w.createdAt).toLocaleDateString()}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {w.status}
                </span>
              </div>
              <h3 className="text-xs font-extrabold text-slate-900">
                {language === 'mr' && w.titleMr ? w.titleMr : w.title}
              </h3>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                {language === 'mr' && w.descriptionMr ? w.descriptionMr : w.description}
              </p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>Districts: {w.affectedDistricts.join(', ')}</span>
                <span>By {w.creatorName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Earlier Announcements */}
      {historyTab === 'announcements' && (
        <div className="space-y-3">
          {pastAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded uppercase">{ann.eventType}</span>
                <span>{ann.eventDate || ann.createdAt.slice(0, 10)}</span>
              </div>
              <h3 className="text-xs font-extrabold text-slate-900">
                {language === 'mr' && ann.titleMr ? ann.titleMr : ann.title}
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {language === 'mr' && ann.detailsMr ? ann.detailsMr : ann.details}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
