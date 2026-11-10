import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { simulateClimateScenario } from '../../ml/modelPipeline';
import { ScenarioResult } from '../../types';
import { Sparkles, ArrowLeft, Droplets, CloudRain } from 'lucide-react';

export const FarmerWhatIfSimulator: React.FC = () => {
  const { farm, language, setFarmerTab } = useApp();

  const [simRainfall, setSimRainfall] = useState<number>(-30);
  const [hasWater, setHasWater] = useState<boolean>(false);

  const [result, setResult] = useState<ScenarioResult>(() =>
    simulateClimateScenario(farm.district, -30, 2.0, 18, false)
  );

  const handleUpdate = (rainDeficit: number, waterAvailable: boolean) => {
    setSimRainfall(rainDeficit);
    setHasWater(waterAvailable);
    const newRes = simulateClimateScenario(farm.district, rainDeficit, 2.0, rainDeficit < -20 ? 20 : 10, waterAvailable);
    setResult(newRes);
  };

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFarmerTab('home')}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            {language === 'mr' ? 'पाऊस लांबला तर काय?' : 'What if Rains Delay?'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'mr' ? 'पाऊस कमी पडल्यास उत्पादनावर काय परिणाम होईल ते पहा' : 'Simulate drought impact on yield'}
          </p>
        </div>
      </div>

      {/* 2 Simple Questions */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        {/* Question 1: Rain */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2">
            १. पाऊस किती कमी पडला तर? (Rain Deficit)
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleUpdate(-15, hasWater)}
              className={`py-2 px-2 rounded-xl font-bold border transition-all cursor-pointer ${
                simRainfall === -15
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              थोडी तूट (-15%)
            </button>
            <button
              onClick={() => handleUpdate(-30, hasWater)}
              className={`py-2 px-2 rounded-xl font-bold border transition-all cursor-pointer ${
                simRainfall === -30
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              मोठी तूट (-30%)
            </button>
            <button
              onClick={() => handleUpdate(-45, hasWater)}
              className={`py-2 px-2 rounded-xl font-bold border transition-all cursor-pointer ${
                simRainfall === -45
                  ? 'bg-rose-700 text-white border-rose-700'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              तीव्र दुष्काळ (-45%)
            </button>
          </div>
        </div>

        {/* Question 2: Irrigation */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-900 mb-2">
            २. तुम्ही शेतात हलके पाणी देऊ शकता का? (Water Facility)
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleUpdate(simRainfall, true)}
              className={`py-2.5 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                hasWater
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              💧 हो, थोडे पाणी देऊ शकतो
            </button>
            <button
              onClick={() => handleUpdate(simRainfall, false)}
              className={`py-2.5 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                !hasWater
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              🚫 नाही, पाणी उपलब्ध नाही
            </button>
          </div>
        </div>
      </div>

      {/* Direct Human Impact Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {language === 'mr' ? 'अपेक्षित परिणाम' : 'Simulation Result'}
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            hasWater ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {hasWater ? 'पाणी दिल्याने फायदा' : 'पाण्याचा ताण कायम'}
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium">अपेक्षित उत्पादन:</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
            {hasWater ? '८ ते ९ पोती / एकर' : '६ ते ७ पोती / एकर'}
          </div>
          <p className={`text-xs font-bold mt-1 ${hasWater ? 'text-emerald-800' : 'text-rose-700'}`}>
            {hasWater 
              ? '✅ १ ते २ पोती उत्पादन वाढेल (संरक्षित पाण्यामुळे)' 
              : '⚠️ २ ते ३ पोत्यांचे नुकसान होऊ शकते'}
          </p>
        </div>

        {/* Actionable takeaway */}
        <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700 leading-relaxed border border-slate-100">
          <span className="font-bold text-slate-900 block">सल्ला:</span>
          <p>
            {hasWater
              ? 'विहीर किंवा शेततळ्यातील पाण्याचा वापर करून तुषार सिंचनाने फक्त १ किंवा २ फेऱ्या पाणी दिले, तरी फुले गळणे थांबून मोठे नुकसान टळेल.'
              : 'जर पाणी नसेल, तर १३:०:४५ खताची १०० ग्रॅम प्रति १० लिटर पाण्यात मिसळून तातडीने फवारणी करा, ज्यामुळे पिकाला पाण्याचा ताण सहन करता येईल.'}
          </p>
        </div>
      </div>
    </div>
  );
};
