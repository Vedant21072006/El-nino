import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Warning, Announcement } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Clock, 
  AlertTriangle,
  Building2,
  Bell
} from 'lucide-react';

export const FarmerAdvisoriesView: React.FC = () => {
  const { farm, language, setFarmerTab, showNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'warnings' | 'announcements'>('warnings');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const warnings = api.getWarnings();
  const announcements = api.getAnnouncements();

  // Filter relevant warnings for this farmer's district or general
  const districtWarnings = warnings.filter(
    (w) => w.affectedDistricts.some((d) => d.toLowerCase() === farm.district.toLowerCase()) || w.affectedDistricts.length === 0
  );

  const handleSpeakText = (id: string, text: string) => {
    if (playingId === id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      setPlayingId(id);
      window.speechSynthesis.speak(utterance);
    } else {
      showNotification('Audio speech is not supported on this device.');
    }
  };

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFarmerTab('home')}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-base font-extrabold text-slate-900 leading-tight">
            {language === 'mr' ? 'इशारे आणि सरकारी घोषणा' : language === 'hi' ? 'चेतावनी और सरकारी घोषणाएं' : 'Warnings & Announcements'}
          </h1>
          <p className="text-xs text-slate-500">
            {farm.district.toUpperCase()} {language === 'mr' ? 'जिल्ह्यासाठी अधिकृत माहिती' : 'District Official Updates'}
          </p>
        </div>
      </div>

      {/* Dual Tab Switcher */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab('warnings')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'warnings'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'हवामान इशारे' : 'Warnings'} ({districtWarnings.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'announcements'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'कृषी घोषणा व शिबिरे' : 'Announcements'} ({announcements.length})</span>
        </button>
      </div>

      {/* Tab 1: Warnings */}
      {activeTab === 'warnings' && (
        <div className="space-y-3">
          {districtWarnings.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-2xs space-y-2">
              <span className="text-3xl">🌿</span>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'mr' ? 'कोणताही सक्रिय इशारा नाही' : 'No active warnings for your district'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'mr'
                  ? 'सध्या आपल्या जिल्ह्यात हवामानाची कोणतीही आणीबाणी नाही.'
                  : 'Current monsoon and crop moisture conditions are in the normal range.'}
              </p>
            </div>
          ) : (
            districtWarnings.map((w) => {
              const displayTitle = language === 'mr' && w.titleMr ? w.titleMr : language === 'hi' && w.titleHi ? w.titleHi : w.title;
              const displayDesc = language === 'mr' && w.descriptionMr ? w.descriptionMr : language === 'hi' && w.descriptionHi ? w.descriptionHi : w.description;
              const actionsList = (language === 'mr' && w.recommendedActionsMr ? w.recommendedActionsMr : w.recommendedActions) || [];
              const isPlaying = playingId === w.id;

              return (
                <div
                  key={w.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <RiskBadge level={w.riskLevel} size="sm" />
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          {w.affectedDistricts.join(', ')} · {w.crop}
                        </span>
                      </div>
                      <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {displayTitle}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpeakText(w.id, `${displayTitle}. ${displayDesc}`)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isPlaying ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 hover:bg-emerald-100 text-emerald-950'
                      }`}
                      title="Listen audio"
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    {displayDesc}
                  </p>

                  {/* Recommended Actions */}
                  {actionsList.length > 0 && (
                    <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/70 space-y-2 text-xs">
                      <span className="font-extrabold text-emerald-950 block">
                        {language === 'mr' ? 'शेतकऱ्यांनी काय करावे:' : 'Recommended Steps for Farmers:'}
                      </span>
                      <div className="space-y-1.5">
                        {actionsList.map((act, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{language === 'mr' ? 'मुदत:' : 'Valid until:'} {w.validUntil || '2026-11-20'}</span>
                    </span>
                    <span className="font-semibold text-emerald-900">
                      {w.creatorDesignation ? `${w.creatorName} (${w.creatorDesignation})` : w.creatorName}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          {announcements.map((ann) => {
            const displayTitle = language === 'mr' && ann.titleMr ? ann.titleMr : language === 'hi' && ann.titleHi ? ann.titleHi : ann.title;
            const displayDetails = language === 'mr' && ann.detailsMr ? ann.detailsMr : language === 'hi' && ann.detailsHi ? ann.detailsHi : ann.details;

            return (
              <div
                key={ann.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md">
                    {ann.eventType === 'camp' ? (language === 'mr' ? 'कार्यशाळा व शिबिर' : 'Workshop & Camp') : (language === 'mr' ? 'शासकीय योजना' : 'Govt Scheme')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {ann.targetDistricts.join(', ')}
                  </span>
                </div>

                <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {displayTitle}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {displayDetails}
                </p>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                  {ann.eventDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{language === 'mr' ? 'दिनांक:' : 'Event Date:'} <strong>{ann.eventDate}</strong></span>
                    </div>
                  )}
                  {ann.venue && (
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{language === 'mr' ? 'स्थान:' : 'Venue:'} {ann.venue}</span>
                    </div>
                  )}
                  {ann.officialContact && (
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                      <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{ann.officialContact}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                  <span>{language === 'mr' ? 'प्रसिद्धकर्ते:' : 'Issued by:'} {ann.publishedBy}</span>
                  <span className="text-emerald-800 font-semibold">{ann.publishedByDesignation}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
