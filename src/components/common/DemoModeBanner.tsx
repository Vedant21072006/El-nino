import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

export const DemoModeBanner: React.FC = () => {
  const { isDemoMode, setDemoMode, language } = useApp();

  return (
    <aside 
      aria-label="Mode toggle"
      className="w-full py-1 px-3 text-[11px] font-medium border-b bg-emerald-950 text-emerald-200 border-emerald-900 flex items-center justify-between"
    >
      <div className="max-w-md lg:max-w-7xl mx-auto w-full flex items-center justify-between">
        <span className="font-semibold text-emerald-300">
          {isDemoMode ? t('demoModeBanner', language) : t('liveDataBanner', language)}
        </span>

        <button
          onClick={() => setDemoMode(!isDemoMode)}
          className="text-[10px] px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-800 transition-colors cursor-pointer"
        >
          {isDemoMode ? 'Switch to Live Data' : 'Test Mode'}
        </button>
      </div>
    </aside>
  );
};
