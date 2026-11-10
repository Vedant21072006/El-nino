import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, LogOut, ArrowLeft, Home, SwitchCamera } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, user, language, setLanguage, logout } = useApp();

  return (
    <header className="bg-emerald-900 text-white sticky top-0 z-40 shadow-xs">
      <div className="max-w-md lg:max-w-7xl mx-auto px-3.5 h-14 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setRole('welcome')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Return to Welcome Screen"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
            <Sprout className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="font-black text-sm sm:text-base tracking-wide text-white font-serif">
              EL NIÑO
            </span>
            <span className="hidden sm:inline text-xs text-emerald-300 ml-2 font-medium">
              {role === 'farmer' ? '🌾 शेतकरी ॲप' : role === 'officer' ? '🏛️ कृषी अधिकारी पोर्टल' : 'कृषी पूर्वसूचना'}
            </span>
          </div>
        </div>

        {/* Language switch & actions */}
        <div className="flex items-center gap-2">
          {/* Simple Clean Language Buttons */}
          <div className="flex items-center bg-emerald-950/70 rounded-xl p-0.5 border border-emerald-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                language === 'mr' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-emerald-300 hover:text-white'
              }`}
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                language === 'hi' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-emerald-300 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                language === 'en' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-emerald-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Role switcher icon button for fast testing */}
          {role !== 'welcome' && (
            <button
              type="button"
              onClick={() => setRole('welcome')}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              title="Switch Experience / Roles"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          {user && (
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-900/60 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
