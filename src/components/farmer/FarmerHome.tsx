import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Sprout, 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles, 
  AlertTriangle, 
  PhoneCall, 
  ChevronRight,
  CheckCircle2,
  Calendar,
  Building2,
  HelpCircle,
  Bell,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';

export const FarmerHome: React.FC = () => {
  const { 
    farm, 
    latestAssessment, 
    setFarmerTab, 
    setSelectedAssessmentId, 
    language,
    showNotification 
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [askInput, setAskInput] = useState('');
  
  // Interactive Checklist states for today's tasks
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  // Fetch warnings and announcements for this farmer's district
  const allWarnings = api.getWarnings();
  const districtWarnings = allWarnings.filter(
    (w) => w.affectedDistricts.some((d) => d.toLowerCase() === farm.district.toLowerCase()) || w.affectedDistricts.length === 0
  );
  const activeWarning = districtWarnings.find((w) => w.status === 'issued' || w.status === 'under_review') || districtWarnings[0];

  const announcements = api.getAnnouncements();
  const latestAnnouncement = announcements[0];

  const assignedOfficer = api.getOfficerForDistrict(farm.district);

  // Audio advisory playback in farmer's preferred language
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = language === 'mr'
        ? `नमस्कार शेतकरी मित्र. तुमच्या ${farm.district} शेतात पावसाचा खंड पडल्यामुळे पिकाला पाण्याचा ताण बसत आहे. आज सकाळी तुषार सिंचनाने हलके पाणी द्या किंवा १३:०:४५ पोटॅशियम नायट्रेट १०० ग्रॅम प्रति १० लिटर पाण्यात मिसळून फवारा. कोरड्या जमिनीत रासायनिक खत टाकू नका.`
        : language === 'hi'
        ? `नमस्ते किसान भाई. आपके ${farm.district} खेत में बारिश के अंतराल के कारण फसल पर पानी का तनाव है। सुबह हल्का पानी दें या 13:0:45 पोटेशियम नाइट्रेट का छिड़काव करें।`
        : `Namaste. In your ${farm.district} field, prolonged dry spell is causing moisture stress on your soybean crop. Apply light morning sprinkler irrigation or spray 1% Potassium Nitrate 13:0:45. Avoid granular fertilizer in dry soil.`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      showNotification('Audio speech is not supported on this device.');
    }
  };

  const handleAskSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (askInput.trim()) {
      // Save query or navigate to Ask AI view
      setFarmerTab('ask_ai');
    } else {
      setFarmerTab('ask_ai');
    }
  };

  const toggleCheck = (index: number) => {
    setCheckedActions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto space-y-4">
      
      {/* Farmer Greeting Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            🌾
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
              {t('welcomeFarmer', language)}, {farm.farmerName?.split(' ')[0] || 'शेतकरी मित्र'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {farm.village}, {farm.district.toUpperCase()} · {farm.farmArea} {farm.farmAreaUnit}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFarmerTab('profile')}
          className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
        >
          {language === 'mr' ? 'बदला' : 'Edit'}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. LATEST ACTIVE WARNING (OR "NO ACTIVE WARNINGS")
         ───────────────────────────────────────────────────────────── */}
      {activeWarning ? (
        <section 
          aria-label="Active Climate Warning"
          className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-4 sm:p-5 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-black tracking-wider bg-black/25 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
              <span>{language === 'mr' ? '⚠️ कृषी हवामान इशारा' : '⚠️ Active Climate Warning'}</span>
            </span>
            <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-md">
              {activeWarning.affectedDistricts.join(', ')}
            </span>
          </div>

          <div>
            <h2 className="text-base font-extrabold leading-snug">
              {language === 'mr' && activeWarning.titleMr ? activeWarning.titleMr : activeWarning.title}
            </h2>
            <p className="text-xs text-amber-100 font-medium mt-1 leading-relaxed line-clamp-2">
              {language === 'mr' && activeWarning.descriptionMr ? activeWarning.descriptionMr : activeWarning.description}
            </p>
          </div>

          {/* Voice listen button & View All */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`flex-1 py-2.5 px-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isPlayingAudio
                  ? 'bg-rose-700 text-white animate-pulse'
                  : 'bg-white text-slate-900 hover:bg-amber-50'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-white" />
                  <span>{language === 'mr' ? 'आवाज थांबवा' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-800" />
                  <span>{language === 'mr' ? 'इशारा बोलून ऐका 🔊' : 'Listen Out Loud 🔊'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFarmerTab('advisories')}
              className="py-2.5 px-3 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{language === 'mr' ? 'सर्व सल्ले' : 'Details'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      ) : (
        /* Peaceful State: No active warnings */
        <section 
          aria-label="No Active Climate Warnings"
          className="bg-emerald-50 rounded-3xl p-4 border border-emerald-200 text-emerald-950 flex items-center gap-3 shadow-2xs"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-200 text-emerald-800 flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
          <div className="flex-1">
            <h2 className="text-xs font-extrabold text-emerald-950">
              {language === 'mr' ? 'सध्या कोणताही इशारा नाही' : 'No Active Warnings Today'}
            </h2>
            <p className="text-[11px] text-emerald-800/90 mt-0.5">
              {language === 'mr'
                ? `${farm.district} जिल्ह्यात हवामानाची स्थिती सामान्य आहे.`
                : `Monsoon and moisture conditions in ${farm.district} are in the normal range.`}
            </p>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. ASK AI (PROMINENT INPUT BOX + MIC BUTTON)
         ───────────────────────────────────────────────────────────── */}
      <section 
        aria-label="Ask AI Assistant"
        className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{language === 'mr' ? 'कृषी एआय ला प्रश्न विचारा' : 'Ask EL NIÑO AI Assistant'}</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
            {language === 'mr' ? 'मराठी / हिंदी / इंग्रजी' : 'Voice & Text'}
          </span>
        </div>

        <form onSubmit={handleAskSubmit} className="relative flex items-center">
          <input
            type="text"
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            placeholder={
              language === 'mr'
                ? 'उदा. पावसाचा खंड पडला तर काय करावे? किंवा खत कधी टाकावे?'
                : language === 'hi'
                ? 'उदा. बारिश न होने पर क्या करें? या खाद कब दें?'
                : 'e.g. What if there is a 2-week rain break?'
            }
            className="w-full pl-3.5 pr-20 py-3 rounded-2xl border border-slate-300 text-xs font-medium focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-800 placeholder:text-slate-400"
          />

          <div className="absolute right-1.5 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFarmerTab('ask_ai')}
              className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition-all cursor-pointer shadow-xs"
              title="Speak question"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button
              type="submit"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all cursor-pointer text-xs font-bold"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Quick Question Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setFarmerTab('ask_ai')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-900 border border-slate-200 shrink-0 font-medium cursor-pointer"
          >
            {language === 'mr' ? '💧 पाण्याचा ताण कसा कमी करावा?' : '💧 How to reduce water stress?'}
          </button>
          <button
            type="button"
            onClick={() => setFarmerTab('ask_ai')}
            className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-900 border border-slate-200 shrink-0 font-medium cursor-pointer"
          >
            {language === 'mr' ? '🧪 १३:०:४५ ची फवारणी कधी करावी?' : '🧪 When to spray 13:0:45?'}
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MY CROP STATUS & RISK (CROP, GROWTH STAGE, ASSESSMENT LINK)
         ───────────────────────────────────────────────────────────── */}
      <section 
        aria-label="My Crop Status and Risk"
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-800" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              {language === 'mr' ? 'माझ्या पिकाची सद्य स्थिती व धोका' : 'My Crop Status & Risk'}
            </h2>
          </div>
          <RiskBadge level={latestAssessment?.riskLevel || 'high'} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="text-[10px] text-slate-600 block">{language === 'mr' ? 'पिक व जात' : 'Crop & Variety'}</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">
              {farm.crop} ({farm.cropVariety || 'JS-335'})
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="text-[10px] text-slate-600 block">{language === 'mr' ? 'वाढीची अवस्था' : 'Growth Stage'}</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">
              {farm.cropStage === 'pod_formation' ? (language === 'mr' ? 'शेंगा भरणे' : 'Pod Formation') : farm.cropStage}
            </span>
          </div>
        </div>

        {/* Expected Yield & Impact */}
        <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-900 uppercase">
              {language === 'mr' ? 'अपेक्षित उत्पादन अंदाज' : 'Projected Yield Impact'}
            </span>
            <p className="text-sm font-black text-amber-950 font-mono mt-0.5">
              {language === 'mr' ? 'उत्पादनात २२% घट शक्य' : '22% Yield Deficit Expected'}
            </p>
            <p className="text-[11px] text-amber-900">
              {language === 'mr' ? 'अपेक्षित: ७ ते ८ पोती/एकर (नेहमी: १० पोती)' : 'Expected: 1,045 kg/ha (Baseline: 1,350 kg/ha)'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (latestAssessment) setSelectedAssessmentId(latestAssessment.id);
              setFarmerTab('assessment_detail');
            }}
            className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>{language === 'mr' ? 'तपशील' : 'Details'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. RECOMMENDED ACTIONS (SHORT CHECKLIST: "WHAT SHOULD I DO?")
         ───────────────────────────────────────────────────────────── */}
      <section 
        aria-label="Recommended Actions Checklist"
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
              {language === 'mr' ? 'मी आज काय करावे? (कृती सूची)' : 'Recommended Actions: What Should I Do?'}
            </h2>
            <p className="text-[11px] text-slate-500">
              {language === 'mr' ? 'पूर्ण झालेल्या कामांवर खूण (टिक) करा' : 'Check off tasks as you complete them in the field'}
            </p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
        </div>

        <div className="space-y-2 text-xs">
          {[
            {
              id: 0,
              textMr: 'सकाळी ६ ते ९ दरम्यान तुषार सिंचनाने हलके पाणी द्या (पाण्याची सोय असल्यास).',
              textEn: 'Apply light sprinkler watering early morning (6–9 AM).'
            },
            {
              id: 1,
              textMr: '१३:०:४५ (पोटॅशियम नायट्रेट) १०० ग्रॅम प्रति १० लिटर पाण्यात मिसळून फवारा.',
              textEn: 'Spray 1% Potassium Nitrate (13:0:45) at 100g / 10L water for drought tolerance.'
            },
            {
              id: 2,
              textMr: '❌ कोरड्या जमिनीत दाणेदार रासायनिक खत (युरिया/डीएपी) टाकू नका.',
              textEn: '❌ Do not put granular fertilizer in dry soil (avoids root burning).'
            },
            {
              id: 3,
              textMr: 'ओलावा टिकवण्यासाठी पिकाच्या ओळींमध्ये तण किंवा काढणी अवशेषांचे आच्छादन (मल्चिंग) करा.',
              textEn: 'Apply straw/organic residue mulch between rows to conserve moisture.'
            }
          ].map((item) => {
            const isChecked = checkedActions[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-800 mt-0.5 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                )}
                <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-500 font-medium' : 'font-medium'}`}>
                  {language === 'mr' ? item.textMr : item.textEn}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CONTACT MY OFFICER (ASSIGNED DISTRICT OFFICER, CALL/DETAILS)
         ───────────────────────────────────────────────────────────── */}
      <section 
        aria-label="Assigned Agriculture Officer Contact"
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
              {language === 'mr' ? 'आपले कृषी अधिकारी' : 'Your Agriculture Officer'}
            </span>
            <h2 className="text-sm font-extrabold text-slate-900">
              {assignedOfficer.name}
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {assignedOfficer.designation} · {assignedOfficer.district}
            </p>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shrink-0">
            🏛️
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl space-y-1 text-xs text-slate-600">
          <p className="text-[11px]">
            <strong>{language === 'mr' ? 'कार्यालय वेळ:' : 'Office Hours:'}</strong> {assignedOfficer.officeHours}
          </p>
          <p className="text-[11px]">
            <strong>{language === 'mr' ? 'पत्ता:' : 'Address:'}</strong> {assignedOfficer.officeAddress}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <a
            href={`tel:${assignedOfficer.phone.replace(/\s+/g, '')}`}
            className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अधिकाऱ्यांना कॉल करा' : 'Call Officer'}</span>
          </a>

          <button
            type="button"
            onClick={() => setFarmerTab('officer_contact')}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            {language === 'mr' ? 'संपूर्ण पत्ता' : 'Full Details'}
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. ANNOUNCEMENTS (TRAINING PROGRAMMES, CAMPS, SCHEME UPDATES)
         ───────────────────────────────────────────────────────────── */}
      <section 
        aria-label="Agricultural Announcements and Camps"
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-emerald-800" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
              {language === 'mr' ? 'सरकारी कृषी घोषणा व शिबिरे' : 'Official Announcements & Schemes'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setFarmerTab('advisories')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>{language === 'mr' ? 'सर्व पहा' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {latestAnnouncement && (
          <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black tracking-wider bg-blue-200/70 text-blue-900 px-2 py-0.5 rounded-md">
                {latestAnnouncement.eventType === 'camp' ? (language === 'mr' ? 'शिबिर' : 'Camp') : (language === 'mr' ? 'योजना' : 'Scheme')}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {latestAnnouncement.eventDate}
              </span>
            </div>

            <h3 className="font-extrabold text-slate-900 text-xs leading-snug">
              {language === 'mr' && latestAnnouncement.titleMr ? latestAnnouncement.titleMr : latestAnnouncement.title}
            </h3>

            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
              {language === 'mr' && latestAnnouncement.detailsMr ? latestAnnouncement.detailsMr : latestAnnouncement.details}
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-blue-200/60">
              <span>{latestAnnouncement.venue}</span>
              <span className="text-emerald-900 font-bold">{latestAnnouncement.publishedBy}</span>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
