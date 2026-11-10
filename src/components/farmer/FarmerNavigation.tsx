import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, MessageSquare, History, User } from 'lucide-react';

export const FarmerNavigation: React.FC = () => {
  const { farmerTab, setFarmerTab, language } = useApp();

  const navItems = [
    { 
      id: 'home', 
      label: language === 'mr' ? 'मुख्य पान' : language === 'hi' ? 'होम' : 'Home', 
      icon: Sprout 
    },
    { 
      id: 'ask_ai', 
      label: language === 'mr' ? 'एआय सल्ला' : language === 'hi' ? 'एआई सलाह' : 'Ask AI', 
      icon: MessageSquare 
    },
    { 
      id: 'history', 
      label: language === 'mr' ? 'इतिहास' : language === 'hi' ? 'इतिहास' : 'History', 
      icon: History 
    },
    { 
      id: 'profile', 
      label: language === 'mr' ? 'माझे खाते' : language === 'hi' ? 'प्रोफाइल' : 'Profile', 
      icon: User 
    },
  ];

  return (
    <nav 
      aria-label="Farmer bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg sm:max-w-md sm:mx-auto"
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = farmerTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFarmerTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-950 font-black'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-emerald-100 text-emerald-900 shadow-2xs' : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
