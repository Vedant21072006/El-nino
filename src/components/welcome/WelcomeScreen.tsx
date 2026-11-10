import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import { Sprout, ShieldAlert, ArrowRight, Globe2 } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { setRole, setAuthIntent, language, setLanguage } = useApp();

  const handleChooseRole = (targetRole: 'farmer' | 'officer') => {
    setAuthIntent(targetRole);
    setRole('auth');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#f4f7f2] via-[#eef4ea] to-[#e4ede0]">
      {/* Subtle decorative farmland field lines illustration */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#1e3a1f_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      {/* Decorative organic landscape silhouettes */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 opacity-20 bg-gradient-to-t from-emerald-800 via-emerald-700 to-transparent"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 75% 70%, 50% 30%, 25% 65%, 0% 45%)'
        }}
      />

      {/* Top Bar with Language Selector */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm border border-emerald-800/40">
            🌱
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-emerald-950 font-serif block leading-none">
              EL NIÑO
            </span>
            <span className="text-[10px] text-emerald-800 font-semibold tracking-wide">
              {language === 'mr' ? 'हवामान जोखीम व पूर्वसूचना प्रणाली' : 'Agricultural Risk & Early Warning'}
            </span>
          </div>
        </div>

        {/* Language selector: Marathi, Hindi, English */}
        <div className="inline-flex items-center bg-white/90 backdrop-blur-xs p-1 rounded-2xl border border-emerald-900/15 shadow-xs">
          <Globe2 className="w-3.5 h-3.5 text-emerald-800 ml-1.5 mr-0.5 shrink-0" />
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              language === 'mr'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-950'
            }`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              language === 'hi'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-950'
            }`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-950'
            }`}
          >
            English
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-xl mx-auto w-full px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        {/* Brand & Tagline */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{t('tagline', language)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight leading-tight">
            {language === 'mr'
              ? 'शाश्वत शेतीसाठी हवामान मार्गदर्शन.'
              : language === 'hi'
              ? 'बेहतर खेती के लिए सटीक मौसम सलाह।'
              : 'Climate insights for smarter farming.'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            {language === 'mr'
              ? 'हवामानाचा धोका ओळखा, कृषी अधिकाऱ्यांच्या सूचना मिळवा आणि पिकाचे नुकसान टाळण्यासाठी योग्य मार्गदर्शन घ्या.'
              : language === 'hi'
              ? 'जलवायु जोखिम को समझें, समय पर सरकारी चेतावनी प्राप्त करें और खेत के लिए व्यावहारिक उपाय अपनाएं।'
              : 'Understand climate risks, receive agricultural advisories, and get practical guidance for your farm.'}
          </p>
        </div>

        {/* Two Large Choice Options */}
        <div className="space-y-4">
          {/* Card 1: Farmer */}
          <div className="group relative bg-white/95 backdrop-blur-xs rounded-3xl p-5 sm:p-6 border-2 border-emerald-600 shadow-sm hover:shadow-lg hover:border-emerald-700 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🌾
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
                  {language === 'mr' ? 'शेतकरी बंधू-भगिनींसाठी' : language === 'hi' ? 'किसान भाइयों के लिए' : 'For Farmers'}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {language === 'mr' ? 'मी शेतकरी आहे' : language === 'hi' ? 'मैं एक किसान हूँ' : "I'm a Farmer"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {language === 'mr'
                    ? 'पिकाचा धोका तपासा, बोलून कृषी एआय कडून उत्तरे मिळवा आणि स्थानिक सरकारी सल्ले पहा.'
                    : language === 'hi'
                    ? 'फसल जोखिम जांचें, एआई से प्रश्न पूछें और स्थानीय कृषि सलाह प्राप्त करें।'
                    : 'Check crop risks, ask AI, and receive local advisories.'}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleChooseRole('farmer')}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer group-hover:bg-emerald-900"
                  >
                    <span>{t('continueAsFarmer', language)}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Officer */}
          <div className="group relative bg-white/90 backdrop-blur-xs rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-2xl shrink-0">
                🏛️
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mb-1">
                  {language === 'mr' ? 'कृषी विभाग व अधिकारी' : language === 'hi' ? 'कृषि विभाग एवं अधिकारी' : 'For Agriculture Department'}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {language === 'mr' ? 'मी कृषी अधिकारी आहे' : language === 'hi' ? 'मैं कृषि अधिकारी हूँ' : "I'm an Officer"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {language === 'mr'
                    ? 'जिल्हास्तरीय हवामान धोक्याचे निरीक्षण करा आणि शेतकऱ्यांना तातडीच्या सूचना जारी करा.'
                    : language === 'hi'
                    ? 'जिला स्तरीय जलवायु तनाव की निगरानी करें और किसानों को चेतावनियां जारी करें।'
                    : 'Monitor district risks and publish farmer advisories.'}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleChooseRole('officer')}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                  >
                    <span>{t('continueAsOfficer', language)}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-600 font-medium">
            {language === 'mr'
              ? '🇮🇳 महाराष्ट्र कृषी आयुक्तालय व हवामान खात्याच्या (IMD) मार्गदर्शक तत्त्वांवर आधारित'
              : '🇮🇳 Aligned with Directorate of Agriculture Maharashtra & IMD weather signals'}
          </p>
        </div>
      </main>

      {/* Simple Clean Footer */}
      <footer className="relative z-10 py-3 text-center text-xs text-slate-600 border-t border-emerald-900/10 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px]">
          <span>EL NIÑO · Global Climate Signals. Local Agricultural Action.</span>
          <span>Toll-Free Kisan Support: 1800-180-1551</span>
        </div>
      </footer>
    </div>
  );
};
