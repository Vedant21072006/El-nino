import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Advisory } from '../../types';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { FileText, Send, Eye, CheckCircle2, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';

export const AdvisoryPublisher: React.FC = () => {
  const { user, showNotification } = useApp();
  const [advisories, setAdvisories] = useState<Advisory[]>(() => api.getAdvisories());

  // Form states
  const [titleEn, setTitleEn] = useState('');
  const [titleMr, setTitleMr] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [msgEn, setMsgEn] = useState('');
  const [msgMr, setMsgMr] = useState('');
  const [msgHi, setMsgHi] = useState('');
  const [targetDistrict, setTargetDistrict] = useState('Latur');
  const [severity, setSeverity] = useState<'critical' | 'alert' | 'advisory'>('alert');
  const [validUntil, setValidUntil] = useState('2026-10-25');
  const [activePreviewTab, setActivePreviewTab] = useState<'en' | 'mr' | 'hi'>('mr');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn || !msgEn) {
      showNotification('Please fill in title and advisory message.');
      return;
    }

    const newAdvisory: Advisory = {
      id: `ADV-2026-${Date.now().toString().slice(-3)}`,
      title: titleEn,
      titleMr: titleMr || titleEn,
      titleHi: titleHi || titleEn,
      message: msgEn,
      messageMr: msgMr || msgEn,
      messageHi: msgHi || msgEn,
      targetDistricts: [targetDistrict],
      targetCrop: 'Soybean',
      severity,
      validFrom: new Date().toISOString().slice(0, 10),
      validUntil,
      recommendedActions: [
        'Apply light micro-irrigation during morning hours.',
        'Foliar spray of 1% Potassium Nitrate (13:0:45) at 100g / 10L water.'
      ],
      recommendedActionsMr: [
        'सकाळी तुषार सिंचनाने हलके संरक्षित पाणी द्या.',
        '१३:०:४५ (पोटॅशियम नायट्रेट) १०० ग्रॅम प्रति १० लिटर पाणी फवारा.'
      ],
      recommendedActionsHi: [
        'सुबह के समय स्प्रिंकलर से हल्का पानी दें।',
        'पोटेशियम नाइट्रेट (13:0:45) 100 ग्राम प्रति 10 लीटर पानी में मिलाकर स्प्रे करें।'
      ],
      status: 'published',
      publishedBy: user?.name || 'Dr. Suresh Patil',
      approvedBy: 'Directorate of Agriculture, Pune',
      publishedAt: new Date().toISOString()
    };

    api.saveAdvisory(newAdvisory);
    setAdvisories(api.getAdvisories());
    showNotification(`Farmer advisory ${newAdvisory.id} published to mobile network.`);

    // Reset form
    setTitleEn('');
    setTitleMr('');
    setTitleHi('');
    setMsgEn('');
    setMsgMr('');
    setMsgHi('');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Farmer Advisory Publisher
        </h1>
        <p className="text-xs text-slate-500">
          Broadcast reviewed agronomic advisories across Marathwada & Vidarbha districts in Marathi, Hindi, and English.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Authoring Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">
            Author New Farmer Advisory
          </h2>

          <form onSubmit={handlePublish} className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target District</label>
                <select
                  value={targetDistrict}
                  onChange={(e) => setTargetDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Severity Level</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none"
                >
                  <option value="critical">Critical Emergency</option>
                  <option value="alert">Alert Watch</option>
                  <option value="advisory">Standard Advisory</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Multilingual Tabs */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">
                Multilingual Content Drafts:
              </span>

              {/* Marathi */}
              <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200/80 space-y-2">
                <span className="text-[11px] font-bold text-emerald-900">मराठी (Marathi - Primary Farmer Language)</span>
                <input
                  type="text"
                  placeholder="सल्ला शीर्षक (उदा. सोयाबीन पिकासाठी तातडीचा संरक्षित सिंचन सल्ला)"
                  value={titleMr}
                  onChange={(e) => setTitleMr(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="सविस्तर संदेश व उपाययोजना..."
                  value={msgMr}
                  onChange={(e) => setMsgMr(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              {/* Hindi */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-800">हिंदी (Hindi)</span>
                <input
                  type="text"
                  placeholder="सलाह शीर्षक (उदा. सोयाबीन के लिए सुरक्षात्मक सिंचाई सलाह)"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="संदेश एवं उपाय..."
                  value={msgHi}
                  onChange={(e) => setMsgHi(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              {/* English */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-800">English (Official Record) *</span>
                <input
                  type="text"
                  required
                  placeholder="Advisory Title (e.g. Critical Moisture Stress & Foliar Spray Guidance)"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Detailed guidance and agronomic prescription..."
                  value={msgEn}
                  onChange={(e) => setMsgEn(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Authorize & Publish Advisory to Farmers</span>
            </button>
          </form>
        </div>

        {/* Live Mobile Screen Preview (Section 7.10 requirement) */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-4 border-slate-800 shadow-2xl flex flex-col justify-between max-w-sm mx-auto w-full">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-bold">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Farmer Mobile View Preview</span>
              </div>
              <div className="flex gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('mr')}
                  className={`px-1.5 py-0.5 rounded ${activePreviewTab === 'mr' ? 'bg-emerald-700 text-white' : 'text-slate-400'}`}
                >
                  MR
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('hi')}
                  className={`px-1.5 py-0.5 rounded ${activePreviewTab === 'hi' ? 'bg-emerald-700 text-white' : 'text-slate-400'}`}
                >
                  HI
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('en')}
                  className={`px-1.5 py-0.5 rounded ${activePreviewTab === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-400'}`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Simulated Phone Notification Card */}
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-400">
                  Agri Advisory · {targetDistrict}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-900 text-rose-200 uppercase">
                  {severity}
                </span>
              </div>

              <h4 className="font-bold text-white text-sm">
                {activePreviewTab === 'mr'
                  ? titleMr || 'सोयाबीन पिकासाठी तातडीचा संरक्षित सिंचन सल्ला'
                  : activePreviewTab === 'hi'
                  ? titleHi || 'सोयाबीन के लिए सुरक्षात्मक सिंचाई सलाह'
                  : titleEn || 'Critical Moisture Stress Advisory'}
              </h4>

              <p className="text-slate-300 leading-relaxed text-[11px]">
                {activePreviewTab === 'mr'
                  ? msgMr || 'लातूर, नांदेड परिसरात पावसाचा खंड पडल्याने फुलोरा अवस्थेत पाणी देणे गरजेचे आहे.'
                  : activePreviewTab === 'hi'
                  ? msgHi || 'बारिश के लंबे अंतराल के कारण सोयाबीन में सुरक्षात्मक सिंचाई करें।'
                  : msgEn || 'Due to prolonged dry spell, protective irrigation is advised for flowering soybean plots.'}
              </p>

              <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
                <span>Valid until: {validUntil}</span>
                <span className="text-emerald-400 font-medium">Govt of Maharashtra</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-500 pt-4">
            Advisories broadcast to registered farmer dashboards and extension network.
          </p>
        </div>
      </div>
    </div>
  );
};
