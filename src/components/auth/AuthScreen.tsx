import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import { api } from '../../services/api';
import { User, Language } from '../../types';
import { 
  ArrowLeft, 
  Phone, 
  User as UserIcon, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Sprout, 
  Building2,
  Lock
} from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { 
    role, 
    setRole, 
    authIntent, 
    setAuthIntent, 
    setUser, 
    language, 
    setLanguage, 
    showNotification 
  } = useApp();

  // Mode: farmer or officer
  const [activeRole, setActiveRole] = useState<'farmer' | 'officer'>(authIntent || 'farmer');
  
  // Farmer Auth State
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mobileNumber, setMobileNumber] = useState('9823045123');
  const [farmerName, setFarmerName] = useState('Ramesh Patil');
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  // OTP State
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [cooldown, setCooldown] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isResendActive, setIsResendActive] = useState(false);

  // Officer Selected Profile
  const officerProfiles = [
    {
      id: 'off-latur-01',
      name: 'Dr. Suresh Patil',
      designation: 'Sub-Divisional Agriculture Officer (SDAO)',
      district: 'Latur',
      assignedDistricts: ['Latur', 'Nanded', 'Beed'],
      phone: '9422088991',
      department: 'Directorate of Agriculture, Maharashtra'
    },
    {
      id: 'off-pune-01',
      name: 'Shri. Vikram R. Gaikwad',
      designation: 'District Agricultural Officer (DAO)',
      district: 'Pune',
      assignedDistricts: ['Pune', 'Satara', 'Solapur'],
      phone: '9822144550',
      department: 'Department of Agriculture, Govt. of Maharashtra'
    },
    {
      id: 'off-nanded-01',
      name: 'Smt. Anjali M. Deshmukh',
      designation: 'District Agricultural Officer (DAO)',
      district: 'Nanded',
      assignedDistricts: ['Nanded', 'Parbhani', 'Hingoli'],
      phone: '9423167890',
      department: 'Directorate of Agriculture, Maharashtra'
    }
  ];
  const [selectedOfficer, setSelectedOfficer] = useState(officerProfiles[0]);

  // Handle countdown timer
  useEffect(() => {
    let timer: any;
    if (step === 'otp' && cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (cooldown === 0) {
      setIsResendActive(true);
    }
    return () => clearInterval(timer);
  }, [step, cooldown]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeRole === 'farmer') {
      if (mobileNumber.length !== 10) {
        setOtpError(language === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
        return;
      }
      if (authMode === 'signup' && !farmerName.trim()) {
        setOtpError(language === 'mr' ? 'कृपया आपले नाव टाका.' : 'Please enter your full name.');
        return;
      }
    }
    setOtpError('');
    setCooldown(60);
    setIsResendActive(false);
    setAttemptsLeft(3);
    setStep('otp');
  };

  const handleResendOtp = () => {
    if (!isResendActive) return;
    setCooldown(60);
    setIsResendActive(false);
    setAttemptsLeft(3);
    setOtp('');
    setOtpError('');
    showNotification(language === 'mr' ? 'नवीन ओटीपी पाठवला आहे (चाचणी कोड: 1234)' : 'New test OTP sent: 1234');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234') {
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      if (remaining <= 0) {
        setOtpError(language === 'mr' ? 'खूप चुकीचे प्रयत्न. कृपया पुन्हा प्रयत्न करा.' : 'Maximum attempts exceeded. Please restart.');
        setStep('input');
        return;
      }
      setOtpError(language === 'mr' ? `अवैध ओटीपी. ${remaining} प्रयत्न शिल्लक. (चाचणी कोड: 1234)` : `Invalid OTP. ${remaining} attempts remaining. (Use 1234 for testing)`);
      return;
    }

    // Success flow
    if (activeRole === 'farmer') {
      const userObj: User = {
        id: `farmer-${Date.now().toString().slice(-4)}`,
        name: authMode === 'signup' ? farmerName : (language === 'mr' ? 'रमेश पाटील' : 'Ramesh Patil'),
        role: 'farmer',
        phone: `+91 ${mobileNumber}`,
        language: selectedLang,
        district: 'Latur',
        isApproved: true
      };
      api.setUser(userObj);
      setUser(userObj);
      setLanguage(selectedLang);

      if (authMode === 'signup') {
        showNotification(language === 'mr' ? 'खाते तयार झाले! आता शेताची माहिती भरा.' : 'Account verified! Set up your farm details.');
        setRole('onboarding');
      } else {
        showNotification(language === 'mr' ? 'शेतकरी खात्यात स्वागत आहे!' : 'Welcome back to your farm dashboard!');
        setRole('farmer');
      }
    } else {
      // Officer success flow
      const officerUser: User = {
        id: selectedOfficer.id,
        name: selectedOfficer.name,
        role: 'officer',
        phone: `+91 ${selectedOfficer.phone}`,
        language,
        district: selectedOfficer.district,
        designation: selectedOfficer.designation,
        department: selectedOfficer.department,
        assignedDistricts: selectedOfficer.assignedDistricts,
        isApproved: true
      };
      api.setUser(officerUser);
      setUser(officerUser);
      showNotification(`Signed in as ${selectedOfficer.name} (${selectedOfficer.designation})`);
      setRole('officer');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#f7f9f6] via-[#f1f6ef] to-[#e8f1e5] flex flex-col justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full space-y-5">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRole('welcome')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-950 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'mr' ? 'मागे जा' : 'Back to Home'}</span>
          </button>

          {/* Role Pill Switch */}
          <div className="bg-white/90 p-1 rounded-2xl border border-slate-200 shadow-2xs flex gap-1">
            <button
              type="button"
              onClick={() => { setActiveRole('farmer'); setStep('input'); }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeRole === 'farmer'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌾 {language === 'mr' ? 'शेतकरी' : 'Farmer'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveRole('officer'); setStep('input'); }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeRole === 'officer'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ {language === 'mr' ? 'अधिकारी' : 'Officer'}
            </button>
          </div>
        </div>

        {/* Main Auth Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          
          {/* Header */}
          <div className="text-center space-y-1">
            <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-xl shadow-xs ${
              activeRole === 'farmer' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-800'
            }`}>
              {activeRole === 'farmer' ? '🌾' : '🏛️'}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-1">
              {language === 'mr' ? 'EL NIÑO मध्ये स्वागत आहे' : 'Welcome to EL NIÑO'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {activeRole === 'farmer'
                ? (language === 'mr' ? 'आपले शेत, आपले हवामान मार्गदर्शन.' : 'Your farm, your climate insights.')
                : (language === 'mr' ? 'अधिकृत कृषी अधिकारी प्रवेश प्रणाली' : 'Authorized Agricultural Officer Portal')}
            </p>
          </div>

          {/* FARMER EXPERIENCE AUTH */}
          {activeRole === 'farmer' && (
            <div className="space-y-4">
              {/* Login vs Signup Tabs */}
              {step === 'input' && (
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                      authMode === 'login'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'mr' ? 'लॉगिन करा (Login)' : 'Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                      authMode === 'signup'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'mr' ? 'नवीन नोंदणी (Sign up)' : 'Sign up'}
                  </button>
                </div>
              )}

              {/* Step 1: Input Mobile or Signup details */}
              {step === 'input' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {authMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        {language === 'mr' ? 'शेतकऱ्याचे संपूर्ण नाव *' : 'Full Name *'}
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={farmerName}
                          onChange={(e) => setFarmerName(e.target.value)}
                          placeholder={language === 'mr' ? 'उदा. रमेश ज्ञानोबा पाटील' : 'e.g. Ramesh Patil'}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      {language === 'mr' ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-bold text-slate-500 border-r border-slate-300 pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98230 45123"
                        className="w-full pl-14 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono tracking-wider focus:border-emerald-600 focus:outline-none font-bold text-slate-900"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {language === 'mr' ? '१० अंकी मोबाईल नंबर टाका' : 'Enter your 10-digit phone number'}
                    </p>
                  </div>

                  {authMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        {language === 'mr' ? 'पसंतीची भाषा' : 'Preferred Language'}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setSelectedLang(lang)}
                            className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              selectedLang === lang
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {otpError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  {/* Dev concept notice */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
                    <span className="text-sm">ℹ️</span>
                    <div>
                      <strong>{language === 'mr' ? 'चाचणी प्रणाली (Concept Preview):' : 'Concept Preview:'}</strong>
                      <p className="text-amber-800/90 mt-0.5">
                        {language === 'mr'
                          ? 'या चाचणी आवृत्तीत एसएमएस पाठवला जात नाही. ओटीपी पडताळणीसाठी "1234" वापरा.'
                          : 'SMS is not dispatched during prototype testing. Use OTP: 1234.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-extrabold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    {language === 'mr' ? 'ओटीपी मिळवा (Continue with OTP)' : 'Continue with OTP'}
                  </button>
                </form>
              ) : (
                /* Step 2: OTP Entry */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs text-slate-500">
                      {language === 'mr' ? '+९१' : '+91'} {mobileNumber} {language === 'mr' ? 'वर पाठवलेला ४ अंकी ओटीपी टाका' : 'Enter the 4-digit OTP sent to your phone'}
                    </span>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-mono font-bold">
                      {language === 'mr' ? 'चाचणी ओटीपी: 1234' : 'Test OTP: 1234'}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="text"
                      maxLength={4}
                      autoFocus
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-44 text-center py-2.5 text-2xl font-mono font-extrabold tracking-widest rounded-2xl border-2 border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  {otpError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 text-center font-medium">
                      {otpError}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{language === 'mr' ? 'वेळ शिल्लक:' : 'Valid for:'} {cooldown}s</span>
                    </div>

                    <button
                      type="button"
                      disabled={!isResendActive}
                      onClick={handleResendOtp}
                      className={`font-bold transition-colors cursor-pointer ${
                        isResendActive ? 'text-emerald-800 hover:underline' : 'text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {language === 'mr' ? 'ओटीपी पुन्हा पाठवा' : 'Resend OTP'}
                    </button>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('input')}
                      className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                    >
                      {language === 'mr' ? 'नंबर बदला' : 'Edit Number'}
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                    >
                      {language === 'mr' ? 'ओटीपी तपासा व पुढे जा' : 'Verify & Continue'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* OFFICER EXPERIENCE AUTH */}
          {activeRole === 'officer' && (
            <div className="space-y-4 text-xs">
              {/* Authorized Policy Notice */}
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-blue-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Authorized Personnel Only</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Officer access requires verified administrative credentials with assigned district jurisdictions under the Department of Agriculture, Govt. of Maharashtra.
                </p>
              </div>

              {step === 'input' ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Select Authorized Officer Profile:
                    </label>
                    <div className="space-y-2">
                      {officerProfiles.map((p) => {
                        const isSelected = selectedOfficer.id === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => setSelectedOfficer(p)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-slate-900">{p.name}</span>
                              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                Verified
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5">
                              {p.designation}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              District: <strong>{p.district}</strong> · Mobile: +91 {p.phone}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                    <span>Authentication Method: <strong>2-Factor OTP</strong></span>
                    <span className="font-mono text-emerald-800 font-bold">Test OTP: 1234</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    Authenticate as {selectedOfficer.name} ➔
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-slate-600 block">
                      Enter security verification code sent to +91 {selectedOfficer.phone}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-bold">
                      Use Test OTP: 1234
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="text"
                      maxLength={4}
                      autoFocus
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-44 text-center py-2.5 text-2xl font-mono font-extrabold tracking-widest rounded-2xl border-2 border-slate-900 focus:outline-none"
                    />
                  </div>

                  {otpError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 text-center font-medium">
                      {otpError}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('input')}
                      className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                    >
                      Change Officer
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      Verify & Open Dashboard
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-600">
          {language === 'mr'
            ? 'शेतकरी सहाय्यता हेल्पलाईन: १८००-१८०-१५५१ (टोल-फ्री)'
            : 'Kisan Call Center Toll-Free Support: 1800-180-1551'}
        </p>

      </div>
    </div>
  );
};
