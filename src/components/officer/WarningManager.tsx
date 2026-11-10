import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Warning, WarningStatus, RiskLevel, Announcement } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { 
  AlertTriangle, 
  PlusCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  X,
  ChevronRight,
  Bell,
  Smartphone,
  Eye,
  Calendar,
  Building2,
  Volume2
} from 'lucide-react';

export const WarningManager: React.FC = () => {
  const { user, showNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'warnings' | 'announcements'>('warnings');

  // Warnings State
  const [warnings, setWarnings] = useState<Warning[]>(() => api.getWarnings());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedWarning, setSelectedWarning] = useState<Warning | null>(warnings[0] || null);
  const [showCreateWarningModal, setShowCreateWarningModal] = useState(false);

  // Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => api.getAnnouncements());
  const [showCreateAnnouncementModal, setShowCreateAnnouncementModal] = useState(false);

  // New Warning Form
  const [selectedDistrict, setSelectedDistrict] = useState('Latur');
  const [selectedCrop, setSelectedCrop] = useState('Soybean');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('high');
  const [warningTitle, setWarningTitle] = useState('Severe Rainfall Break & Moisture Stress in Soybean');
  const [warningTitleMr, setWarningTitleMr] = useState('सोयाबीन पिकावर पाण्याचा ताण व तातडीचे उपाय');
  const [warningDesc, setWarningDesc] = useState('Prolonged dry hiatus observed. High risk of flower drop and stunted pod development.');
  const [warningDescMr, setWarningDescMr] = useState('पावसाचा १९ दिवसांचा खंड पडल्याने फुलोरा व शेंगांवर ताण आहे. त्वरित संरक्षित सिंचन करा.');
  const [validUntil, setValidUntil] = useState('2026-11-25');
  const [warningActions, setWarningActions] = useState(
    'Apply light sprinkler watering early morning.\nSpray 1% Potassium Nitrate (13:0:45) at 100g / 10L water.\nDo not broadcast granular fertilizer in dry soil.'
  );

  // New Announcement Form
  const [annTitle, setAnnTitle] = useState('District Farmer Workshop on Micro-Irrigation');
  const [annTitleMr, setAnnTitleMr] = useState('ठिबक व तुषार सिंचन तंत्रज्ञान शेतकरी कार्यशाळा');
  const [annDetails, setAnnDetails] = useState('Practical training on water conservation and subsidy application procedures.');
  const [annDetailsMr, setAnnDetailsMr] = useState('पाणी बचतीचे तंत्रज्ञान आणि शासकीय अनुदान अर्जाची माहिती यावर एकदिवसीय शिबिर.');
  const [annDistrict, setAnnDistrict] = useState('Latur');
  const [annEventType, setAnnEventType] = useState<'camp' | 'training' | 'scheme'>('camp');
  const [annEventDate, setAnnEventDate] = useState('2026-11-20');
  const [annVenue, setAnnVenue] = useState('Taluka Krishi Bhavan, Ausa Road');
  const [annContact, setAnnContact] = useState('Kisan Helpline: 1800-180-1551');

  // Preview Toggle inside modals
  const [showMobilePreview, setShowMobilePreview] = useState(true);

  const filteredWarnings = warnings.filter((w) => {
    if (statusFilter !== 'all' && w.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = (warningId: string, nextStatus: WarningStatus) => {
    const warning = warnings.find((w) => w.id === warningId);
    if (!warning) return;

    const updated: Warning = {
      ...warning,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
      auditTrail: [
        ...warning.auditTrail,
        {
          timestamp: new Date().toISOString(),
          action: `Status changed to ${nextStatus.toUpperCase()}`,
          performedBy: user?.name || 'Officer',
        },
      ],
    };

    api.saveWarning(updated);
    setWarnings(api.getWarnings());
    setSelectedWarning(updated);
    showNotification(`Warning status updated to ${nextStatus.toUpperCase()}`);

    if (nextStatus === 'issued') {
      showNotification('✅ Published immediately to farmer mobile app feed!');
    }
  };

  const handleCreateWarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warningTitle.trim()) return;

    const parsedActions = warningActions
      .split('\n')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const newWarn: Warning = {
      id: `WARN-MH-${Date.now().toString().slice(-4)}`,
      title: warningTitle,
      titleMr: warningTitleMr,
      description: warningDesc,
      descriptionMr: warningDescMr,
      affectedDistricts: [selectedDistrict],
      crop: selectedCrop,
      season: 'Kharif 2026',
      riskLevel,
      status: 'issued', // Immediately published or under review
      source: 'officer_created',
      creatorName: user?.name || 'Dr. Suresh Patil',
      creatorDesignation: user?.designation || 'District Agriculture Officer',
      supportingEvidence: `IMD gridded rainfall deficit and 19 consecutive dry days verified in ${selectedDistrict}.`,
      recommendedActions: parsedActions,
      recommendedActionsMr: [
        'सकाळी तुषार सिंचनाने हलके पाणी द्यावे.',
        '१३:०:४५ (पोटॅशियम नायट्रेट) १०० ग्रॅम प्रति १० लिटर पाण्यात फवारावे.',
        'कोरड्या जमिनीत दाणेदार खत टाकू नका.'
      ],
      validUntil,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: 'Published by District Officer',
          performedBy: user?.name || 'Officer',
        },
      ],
    };

    api.saveWarning(newWarn);
    setWarnings(api.getWarnings());
    setSelectedWarning(newWarn);
    setShowCreateWarningModal(false);
    showNotification(`Warning ${newWarn.id} published and synced to farmer app.`);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim()) return;

    const newAnn: Announcement = {
      id: `ANN-${Date.now().toString().slice(-4)}`,
      title: annTitle,
      titleMr: annTitleMr,
      details: annDetails,
      detailsMr: annDetailsMr,
      targetDistricts: [annDistrict],
      targetCrop: 'Soybean',
      eventType: annEventType,
      eventDate: annEventDate,
      venue: annVenue,
      officialContact: annContact,
      publishedBy: user?.name || 'Dr. Suresh Patil',
      publishedByDesignation: user?.designation || 'District Agriculture Officer',
      createdAt: new Date().toISOString(),
      validUntil: annEventDate,
      status: 'published'
    };

    api.saveAnnouncement(newAnn);
    setAnnouncements(api.getAnnouncements());
    setShowCreateAnnouncementModal(false);
    showNotification(`Announcement "${annTitle}" published and synced to farmer app.`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Early Warnings & Farmer Communications
          </h1>
          <p className="text-xs text-slate-500">
            Publish binding advisories and public announcements directly to farmers' mobile applications.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowCreateWarningModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Warning</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCreateAnnouncementModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs w-fit text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('warnings')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'warnings' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>District Warnings ({warnings.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'announcements' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Announcements & Camps ({announcements.length})</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DISTRICT WARNINGS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'warnings' && (
        <div className="space-y-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {['all', 'issued', 'under_review', 'new', 'closed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-emerald-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Warning List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredWarnings.map((w) => {
                const isSelected = selectedWarning?.id === w.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWarning(w)}
                    className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-700 shadow-md ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                          <span className="font-bold text-slate-700">{w.id}</span>
                          <span>·</span>
                          <span className="font-bold text-emerald-800">{w.affectedDistricts.join(', ')}</span>
                          <span>·</span>
                          <span>Valid: {w.validUntil || '2026-11-25'}</span>
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 mt-1">
                          {w.title}
                        </h2>
                        {w.titleMr && (
                          <p className="text-xs text-slate-500 font-medium">{w.titleMr}</p>
                        )}
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {w.description}
                        </p>
                      </div>
                      <RiskBadge level={w.riskLevel} size="sm" />
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">
                        Crop: <strong>{w.crop}</strong> · Creator: {w.creatorName}
                      </span>

                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          w.status === 'issued'
                            ? 'bg-rose-100 text-rose-800'
                            : w.status === 'under_review'
                            ? 'bg-blue-100 text-blue-800'
                            : w.status === 'closed'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {w.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Warning Action Inspector */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
              {selectedWarning ? (
                <div className="space-y-4 text-xs">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      {selectedWarning.id} · {selectedWarning.affectedDistricts.join(', ')}
                    </span>
                    <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {selectedWarning.title}
                    </h2>
                    {selectedWarning.titleMr && (
                      <p className="text-xs text-emerald-900 font-semibold">{selectedWarning.titleMr}</p>
                    )}
                  </div>

                  <div>
                    <span className="font-bold text-slate-700">Farmer-Facing Explanation:</span>
                    <p className="text-slate-700 mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                      {selectedWarning.description}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700">Recommended Farmer Actions:</span>
                    <ul className="mt-1 space-y-1 list-disc pl-4 text-slate-700">
                      {selectedWarning.recommendedActions.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-500">
                    <div><strong>Lifecycle Status:</strong> <span className="uppercase font-bold text-emerald-800">{selectedWarning.status.replace('_', ' ')}</span></div>
                    <div><strong>Issuing Officer:</strong> {selectedWarning.creatorName} ({selectedWarning.creatorDesignation || 'DAO'})</div>
                    <div><strong>Validity:</strong> {selectedWarning.validUntil || '2026-11-25'}</div>
                  </div>

                  {/* Status Lifecycle Controls */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {selectedWarning.status === 'new' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(selectedWarning.id, 'under_review')}
                        className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer"
                      >
                        Submit for Technical Review
                      </button>
                    )}

                    {selectedWarning.status === 'under_review' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(selectedWarning.id, 'issued')}
                        className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Send className="w-4 h-4" />
                        <span>Issue Directly to Farmers</span>
                      </button>
                    )}

                    {selectedWarning.status === 'issued' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(selectedWarning.id, 'closed')}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold cursor-pointer"
                      >
                        Close Warning (Moisture Restored)
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-slate-400">
                  Select a warning to review details and status lifecycle.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: ANNOUNCEMENTS & CAMPS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md">
                    {ann.eventType}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{ann.targetDistricts.join(', ')}</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{ann.title}</h3>
                  {ann.titleMr && <p className="text-xs text-emerald-900 font-semibold">{ann.titleMr}</p>}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ann.details}
                </p>

                <div className="p-3 bg-slate-50 rounded-2xl space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                    <span><strong>Event Date:</strong> {ann.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-800" />
                    <span><strong>Venue:</strong> {ann.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                  <span>Contact: {ann.officialContact}</span>
                  <span className="text-emerald-900 font-bold">{ann.publishedBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: CREATE WARNING (WITH MOBILE PREVIEW)
         ───────────────────────────────────────────────────────────── */}
      {showCreateWarningModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Create & Publish District Warning
                </h3>
                <p className="text-xs text-slate-500">
                  Translates climate distress indicators into actionable, plain-language guidance for farmers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateWarningModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Form Fields */}
              <form onSubmit={handleCreateWarning} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target District *</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                    >
                      {MAHARASHTRA_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Crop *</label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                    >
                      <option value="Soybean">Soybean</option>
                      <option value="Cotton" disabled>Cotton</option>
                      <option value="Tur" disabled>Tur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Risk Severity *</label>
                  <select
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="critical">🔴 Critical Risk (Severe Loss Expected)</option>
                    <option value="high">🟠 High Risk (Immediate Action Required)</option>
                    <option value="moderate">🟡 Moderate Risk (Preventative Advisory)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Warning Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={warningTitle}
                    onChange={(e) => setWarningTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Warning Title (Marathi) *</label>
                  <input
                    type="text"
                    required
                    value={warningTitleMr}
                    onChange={(e) => setWarningTitleMr(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Farmer Explanation (Plain Language) *</label>
                  <textarea
                    rows={2}
                    required
                    value={warningDesc}
                    onChange={(e) => setWarningDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Recommended Actions for Farmers (One per line) *</label>
                  <textarea
                    rows={3}
                    required
                    value={warningActions}
                    onChange={(e) => setWarningActions(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valid Until *</label>
                  <input
                    type="date"
                    required
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateWarningModal(false)}
                    className="w-1/2 py-3 rounded-2xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-2xl bg-emerald-800 text-white font-extrabold hover:bg-emerald-900 shadow-xs cursor-pointer"
                  >
                    Publish to Farmers
                  </button>
                </div>
              </form>

              {/* Right Column: Live Mobile Preview */}
              <div className="bg-slate-100 p-4 rounded-3xl border border-slate-200 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                  <Smartphone className="w-4 h-4 text-emerald-800" />
                  <span>Live Mobile Preview (Farmer View)</span>
                </div>

                {/* Mobile Mock Container */}
                <div className="w-full max-w-[280px] bg-white rounded-3xl p-4 shadow-md border-2 border-slate-300 space-y-3">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-3.5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold uppercase bg-black/25 px-1.5 py-0.5 rounded">
                        ⚠️ {riskLevel.toUpperCase()}
                      </span>
                      <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">
                        {selectedDistrict}
                      </span>
                    </div>

                    <h4 className="font-black text-xs leading-snug">
                      {warningTitleMr || warningTitle}
                    </h4>

                    <p className="text-[10px] text-amber-100 leading-tight">
                      {warningDescMr || warningDesc}
                    </p>

                    <div className="bg-white text-slate-900 py-1.5 rounded-xl text-[10px] font-bold text-center">
                      🔊 Listen Out Loud
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/70 text-[10px] space-y-1">
                    <span className="font-extrabold text-emerald-950 block">करायचे उपाय:</span>
                    <ul className="list-disc pl-3 text-slate-700 space-y-0.5">
                      {warningActions.split('\n').filter(Boolean).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[9px] text-slate-400 text-center font-mono">
                    Valid until: {validUntil} · By {user?.name || 'Dr. Suresh Patil'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: CREATE ANNOUNCEMENT (WITH MOBILE PREVIEW)
         ───────────────────────────────────────────────────────────── */}
      {showCreateAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Publish Public Announcement or Camp
                </h3>
                <p className="text-xs text-slate-500">
                  Inform farmers about workshops, soil testing drives, and government subsidy schemes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateAnnouncementModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target District *</label>
                  <select
                    value={annDistrict}
                    onChange={(e) => setAnnDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type *</label>
                  <select
                    value={annEventType}
                    onChange={(e) => setAnnEventType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="camp">Field Training Camp</option>
                    <option value="scheme">Government Scheme Drive</option>
                    <option value="training">Workshop</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Announcement Title (English) *</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Announcement Title (Marathi) *</label>
                <input
                  type="text"
                  required
                  value={annTitleMr}
                  onChange={(e) => setAnnTitleMr(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Details & Agenda *</label>
                <textarea
                  rows={2}
                  required
                  value={annDetails}
                  onChange={(e) => setAnnDetails(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={annEventDate}
                    onChange={(e) => setAnnEventDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue / Location *</label>
                  <input
                    type="text"
                    required
                    value={annVenue}
                    onChange={(e) => setAnnVenue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Contact Helpline *</label>
                <input
                  type="text"
                  required
                  value={annContact}
                  onChange={(e) => setAnnContact(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateAnnouncementModal(false)}
                  className="w-1/2 py-3 rounded-2xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-2xl bg-blue-700 text-white font-extrabold hover:bg-blue-800 shadow-xs cursor-pointer"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
