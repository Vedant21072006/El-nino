import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { User, Shield, Bell, Trash2, LogOut, ArrowLeft, Building2, MapPin, Phone, Edit2 } from 'lucide-react';

export const FarmerProfileView: React.FC = () => {
  const { farm, language, setLanguage, logout, showNotification, setFarmerTab, user } = useApp();

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const assignedOfficer = api.getOfficerForDistrict(farm.district);

  const handleDeleteData = () => {
    localStorage.clear();
    setShowDeleteModal(false);
    logout();
    showNotification(language === 'mr' ? 'माहिती पुसली गेली.' : 'All farm data cleared.');
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
            {language === 'mr' ? 'माझे खाते व शेती तपशील' : 'Farmer Profile & Settings'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'mr' ? 'शेतकरी नोंदणी, भाषा व नियुक्त अधिकारी' : 'Registered farm, language & assigned officer'}
          </p>
        </div>
      </div>

      {/* 1. Farmer Identity Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              🌾
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {farm.farmerName || user?.name || 'Ramesh Patil'}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                {user?.phone || '+91 98230 45123'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
            Verified Farmer
          </span>
        </div>

        {/* Farm details summary */}
        <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 text-xs text-slate-700 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{language === 'mr' ? 'स्थान:' : 'Location:'}</span>
            <span className="font-bold">{farm.village}, {farm.taluka} ({farm.district})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{language === 'mr' ? 'पिक व क्षेत्र:' : 'Crop & Area:'}</span>
            <span className="font-bold">{farm.crop} ({farm.farmArea} {farm.farmAreaUnit})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{language === 'mr' ? 'पाण्याची सोय:' : 'Water Source:'}</span>
            <span className="font-bold capitalize">{farm.waterSource}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{language === 'mr' ? 'पेरणी दिनांक:' : 'Sowing Date:'}</span>
            <span className="font-mono">{farm.sowingDate}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFarmerTab('analyze')}
          className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'शेताची माहिती बदला (Edit Farm)' : 'Edit Farm Profile'}</span>
        </button>
      </div>

      {/* 2. Assigned District Officer Information */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-2 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
          {language === 'mr' ? 'आपल्या तालुक्यासाठी नियुक्त कृषी अधिकारी' : 'Your Assigned Agriculture Officer'}
        </span>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">{assignedOfficer.name}</h3>
            <p className="text-[11px] text-emerald-900 font-semibold">{assignedOfficer.designation}</p>
            <p className="text-[10px] text-slate-500">{assignedOfficer.officeHours}</p>
          </div>
          <button
            type="button"
            onClick={() => setFarmerTab('officer_contact')}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-[11px] cursor-pointer"
          >
            {language === 'mr' ? 'संपर्क पहा' : 'View Contact'}
          </button>
        </div>
      </div>

      {/* 3. Language Selector */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-2">
        <span className="text-xs font-bold text-slate-700 block">
          {language === 'mr' ? 'पसंतीची भाषा निवडा' : 'App Language'}
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`py-2 px-3 rounded-xl border font-bold transition-all cursor-pointer ${
              language === 'mr'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`py-2 px-3 rounded-xl border font-bold transition-all cursor-pointer ${
              language === 'hi'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 rounded-xl border font-bold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* 4. SMS Alerts Toggle */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
        <div>
          <p className="font-bold text-slate-900">
            {language === 'mr' ? 'मोबाईलवर हवामान अलर्ट (SMS)' : 'Weather SMS Alerts'}
          </p>
          <p className="text-[11px] text-slate-500">
            {language === 'mr' ? 'पावसाचा खंड पडल्यास थेट मेसेज मिळवा' : 'Receive automated alerts during prolonged dry spells'}
          </p>
        </div>
        <input
          type="checkbox"
          checked={smsAlerts}
          onChange={(e) => setSmsAlerts(e.target.checked)}
          className="w-5 h-5 accent-emerald-800 cursor-pointer"
        />
      </div>

      {/* Sign Out Button */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={logout}
          className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'mr' ? 'लॉगआउट (Sign Out)' : 'Sign Out'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="w-full py-2 text-rose-700 hover:text-rose-800 font-bold text-xs text-center cursor-pointer"
        >
          {language === 'mr' ? 'माहिती व इतिहास रीसेट करा' : 'Reset My Stored Data'}
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'mr' ? 'सर्व माहिती पुसायची आहे का?' : 'Reset all data?'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'यामुळे तुमच्या शेताची साठवलेली सर्व माहिती आणि अहवाल नष्ट होतील.'
                : 'This will reset your farm profile and stored assessments on this device.'}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-1/2 py-2 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {language === 'mr' ? 'रद्द करा' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleDeleteData}
                className="w-1/2 py-2 text-xs font-bold rounded-xl bg-rose-700 text-white hover:bg-rose-800 cursor-pointer"
              >
                {language === 'mr' ? 'पुसून टाका' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
