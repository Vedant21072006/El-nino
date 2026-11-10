import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { OfficerContact } from '../../types';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Building2, 
  PhoneCall, 
  HelpCircle,
  Search
} from 'lucide-react';

export const OfficerContactView: React.FC = () => {
  const { farm, language, setFarmerTab } = useApp();
  const contacts = api.getOfficerContacts();
  const [searchDistrict, setSearchDistrict] = useState(farm.district || 'Latur');

  // Find assigned officer for this farmer's district
  const assignedOfficer = api.getOfficerForDistrict(farm.district);

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
            {language === 'mr' ? 'कृषी अधिकारी संपर्क' : language === 'hi' ? 'कृषि अधिकारी संपर्क' : 'Contact Agriculture Officers'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'mr' ? 'जिल्हा कृषी अधिकारी व किसान हेल्पलाइन' : 'Verified District Officers & Support Directory'}
          </p>
        </div>
      </div>

      {/* 1. Assigned District Officer Card (Primary Highlight) */}
      <div className="bg-white rounded-3xl p-5 border-2 border-emerald-600 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
              {language === 'mr' ? 'आपल्या तालुक्यासाठी नियुक्त अधिकारी' : 'Your Assigned District Officer'}
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              {assignedOfficer.name}
            </h2>
            <p className="text-xs text-emerald-900 font-semibold mt-0.5">
              {assignedOfficer.designation}
            </p>
            <p className="text-[11px] text-slate-500">
              {assignedOfficer.department}
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shrink-0">
            🏛️
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>{assignedOfficer.officeAddress}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{assignedOfficer.officeHours}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-mono font-bold text-slate-900">{assignedOfficer.phone}</span>
          </div>

          {assignedOfficer.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-[11px]">{assignedOfficer.email}</span>
            </div>
          )}
        </div>

        <div className="pt-2 flex gap-2">
          <a
            href={`tel:${assignedOfficer.phone.replace(/\s+/g, '')}`}
            className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'mr' ? 'अधिकाऱ्यांना फोन करा' : 'Call Officer Now'}</span>
          </a>
        </div>
      </div>

      {/* 2. Toll-Free Kisan Call Center 24/7 Helpline */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-4 shadow-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-xs">
          <span className="text-lg">📞</span>
          <span>{language === 'mr' ? 'राष्ट्रीय किसान कॉल सेंटर (२४ तास मोफत)' : 'National Kisan Call Center (24/7 Toll-Free)'}</span>
        </div>
        <p className="text-xs text-amber-50">
          {language === 'mr'
            ? 'कोणत्याही कृषी समस्येसाठी तज्ज्ञांशी थेट मराठीत बोला.'
            : 'Speak directly with agronomists in your language anytime.'}
        </p>
        <div className="pt-1">
          <a
            href="tel:18001801551"
            className="block text-center py-2.5 bg-white text-amber-900 rounded-xl font-mono font-black text-sm tracking-wider shadow-sm hover:bg-amber-50"
          >
            1800-180-1551
          </a>
        </div>
      </div>

      {/* 3. Other District Officers Directory */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="font-extrabold text-slate-900">
            {language === 'mr' ? 'इतर जिल्ह्यांचे कृषी अधिकारी' : 'Other Maharashtra District Offices'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Government Verified</span>
        </div>

        <div className="space-y-2.5">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-2xl border border-slate-200/90 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{c.name}</h3>
                  <p className="text-[11px] text-slate-600">{c.designation} · {c.district}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.officeHours}</p>
                </div>
                <a
                  href={`tel:${c.phone.replace(/\s+/g, '')}`}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 rounded-xl font-bold text-[11px] flex items-center gap-1 shrink-0 ml-2"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
