import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  CloudRain,
  Thermometer,
  Droplet
} from 'lucide-react';

export const AssessmentDetailView: React.FC = () => {
  const { 
    selectedAssessmentId, 
    assessments, 
    setFarmerTab, 
    language, 
    showNotification 
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const assessment = assessments.find(a => a.id === selectedAssessmentId) || assessments[0];

  if (!assessment) {
    return (
      <div className="p-8 text-center">
        <p className="text-xs text-slate-500">माहिती सापडली नाही.</p>
        <button
          onClick={() => setFarmerTab('home')}
          className="mt-3 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs"
        >
          मुख्यपृष्ठावर जा
        </button>
      </div>
    );
  }

  const handleAudioPlayback = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const speechText = language === 'mr'
        ? `पिकाचा अहवाल: पावसात ३२ टक्के घट झाल्याने शेंगा गळण्याचा धोका आहे. अंदाजित उत्पादन: ७ ते ८ पोती प्रति एकर. उपाय: सकाळी हलके पाणी द्या किंवा १३:०:४५ ची फवारणी करा. कोरड्या जमिनीत खते टाकू नका.`
        : language === 'hi'
        ? `फसल रिपोर्ट: बारिश में कमी से फली झड़ने का खतरा है। अपेक्षित पैदावार: 7 से 8 बोरी प्रति एकड़। सुबह हल्का पानी दें या 13:0:45 स्प्रे करें।`
        : `Assessment Report: Due to 32% rainfall deficit, pod drop risk is elevated. Expected yield: 7 to 8 quintals per acre. Apply morning sprinkler watering or spray 1% Potassium Nitrate.`;

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      showNotification('Audio not supported.');
    }
  };

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setFarmerTab('home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'मागे जा' : 'Back'}</span>
        </button>
        <span className="text-[11px] font-mono text-slate-400">
          {new Date(assessment.timestamp).toLocaleDateString()}
        </span>
      </div>

      {/* Main Yield & Status Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {language === 'mr' ? 'पिकाचा अंदाज' : 'Harvest Estimate'}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-100 text-amber-900">
            {language === 'mr' ? '⚠️ मोठा धोका' : '⚠️ High Risk'}
          </span>
        </div>

        <div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {language === 'mr' ? '७ ते ८ पोती / एकर' : '7–8 Quintals / Acre'}
          </div>
          <p className="text-xs text-rose-700 font-bold mt-0.5">
            {language === 'mr'
              ? 'नेहमीपेक्षा २ ते ३ पोती कमी (पावसाच्या खंडामुळे)'
              : '2–3 bags below normal due to rainfall deficit'}
          </p>
        </div>

        {/* Audio Button */}
        <button
          onClick={handleAudioPlayback}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
            isPlayingAudio
              ? 'bg-rose-700 text-white animate-pulse'
              : 'bg-emerald-800 text-white hover:bg-emerald-900'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>{language === 'mr' ? 'आवाज थांबवा' : 'Stop Audio'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>{language === 'mr' ? 'हा सल्ला मोठ्याने ऐका 🔊' : 'Listen to Advice Out Loud 🔊'}</span>
            </>
          )}
        </button>
      </div>

      {/* DO THIS (काय करावे) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
        <h3 className="text-xs font-extrabold uppercase text-emerald-900 font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{language === 'mr' ? 'आज काय करावे? (Do This)' : 'Recommended Actions'}</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80">
            <p className="font-bold text-emerald-950">
              १. सकाळी तुषार सिंचनाने हलके पाणी द्या
            </p>
            <p className="text-slate-600 mt-0.5 text-[11px]">
              सकाळी ६ ते ९ दरम्यान पाणी दिल्यास शेंगा गळणे थांबते व पाण्याचा अपव्यय होत नाही.
            </p>
          </div>

          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80">
            <p className="font-bold text-emerald-950">
              २. पोटॅशियम नायट्रेट (१३:०:४५) फवारा
            </p>
            <p className="text-slate-600 mt-0.5 text-[11px]">
              १०० ग्रॅम प्रति १० लिटर पाण्यात मिसळून फवारणी करा. पिकाची तग धरण्याची ताकद वाढते.
            </p>
          </div>

          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80">
            <p className="font-bold text-emerald-950">
              ३. सऱ्यांमध्ये पालापाचोळा टाका (मल्चिंग)
            </p>
            <p className="text-slate-600 mt-0.5 text-[11px]">
              जमिनीतील ओलावा उडून जात नाही व मुळे थंड राहतात.
            </p>
          </div>
        </div>
      </div>

      {/* DON'T DO THIS (काय करू नये) */}
      <div className="bg-white rounded-2xl p-4 border border-rose-200 bg-rose-50/20 shadow-xs space-y-2 text-xs">
        <h3 className="font-extrabold uppercase text-rose-950 font-mono flex items-center gap-1.5">
          <XCircle className="w-4 h-4 text-rose-700" />
          <span>{language === 'mr' ? 'काय करू नये? (Don\'t Do This)' : 'Important Cautions'}</span>
        </h3>

        <ul className="pl-4 list-disc space-y-1 text-rose-900 font-semibold leading-relaxed">
          <li>कोरड्या जमिनीत दाणेदार रासायनिक खत (युरिया किंवा डीएपी) टाकू नका, मुळे जळतील.</li>
          <li>दुपारी कडक उन्हात पाण्याचा फवारा मारू नका.</li>
        </ul>
      </div>

      {/* Ask Question Shortcut */}
      <button
        onClick={() => setFarmerTab('ask_ai')}
        className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>
          {language === 'mr' ? 'याबद्दल प्रश्न विचारा (बोलून किंवा लिहून)' : 'Ask a question about this advice'}
        </span>
      </button>
    </div>
  );
};
