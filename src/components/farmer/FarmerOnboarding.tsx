import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmProfile } from '../../types';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraData';
import { Sprout, MapPin, Calendar, Droplets, CheckCircle, ArrowRight } from 'lucide-react';

export const FarmerOnboarding: React.FC = () => {
  const { farm, updateFarm, executeNewAssessment, setRole, setFarmerTab, language, user, showNotification } = useApp();

  const [crop, setCrop] = useState(farm.crop || 'Soybean');
  const [district, setDistrict] = useState(farm.district || 'Latur');
  const [taluka, setTaluka] = useState(farm.taluka || 'Ausa');
  const [village, setVillage] = useState(farm.village || 'Kharosa');
  const [farmArea, setFarmArea] = useState<number>(farm.farmArea || 3.5);
  const [farmAreaUnit, setFarmAreaUnit] = useState<'acres' | 'guntha' | 'hectares'>(farm.farmAreaUnit || 'acres');
  const [sowingDate, setSowingDate] = useState(farm.sowingDate || '2026-06-25');
  const [waterSource, setWaterSource] = useState<'rain-fed' | 'partially-irrigated' | 'irrigated'>(farm.waterSource || 'rain-fed');
  const [cropStage, setCropStage] = useState<'vegetative' | 'flowering' | 'pod_formation' | 'grain_filling' | 'maturity'>(farm.cropStage || 'pod_formation');
  const [soilType, setSoilType] = useState<'black_cotton' | 'medium_black' | 'red_loam' | 'sandy_loam'>(farm.soilType || 'black_cotton');

  const handleAnalyzeFarm = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFarm: FarmProfile = {
      ...farm,
      farmerId: user?.id || 'farmer-01',
      farmerName: user?.name || 'Ramesh Patil',
      crop,
      district,
      taluka,
      village,
      farmArea,
      farmAreaUnit,
      sowingDate,
      waterSource,
      cropStage,
      soilType,
      updatedAt: new Date().toISOString()
    };

    updateFarm(updatedFarm);
    // Execute risk assessment for this farm
    executeNewAssessment(updatedFarm);

    showNotification(
      language === 'mr'
        ? 'शेताची तपासणी पूर्ण झाली! अहवाल तयार आहे.'
        : 'Farm assessment completed successfully!'
    );

    setRole('farmer');
    setFarmerTab('home');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#f5f8f3] via-[#ecf3e9] to-[#e4eee0] py-6 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        
        {/* Step Indicator & Header */}
        <div className="space-y-1.5 text-center border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/90 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'पायरी २: शेताची माहिती' : 'Step 2: Farm Profile Setup'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'mr' ? 'आपल्या शेताची माहिती भरा' : 'Tell Us About Your Farm'}
          </h1>
          <p className="text-xs text-slate-600">
            {language === 'mr'
              ? 'हवामानाचा धोका व पिकाचे योग्य मार्गदर्शन मिळवण्यासाठी ही माहिती आवश्यक आहे.'
              : 'Provide accurate field details to receive tailored climate advisories and yield projections.'}
          </p>
        </div>

        <form onSubmit={handleAnalyzeFarm} className="space-y-4 text-xs">
          
          {/* Crop Type Selection */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '१. पिकाचा प्रकार (Crop Type) *' : '1. Crop Type *'}
            </label>
            <div className="relative">
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 font-extrabold text-slate-900 bg-white focus:border-emerald-600 focus:outline-none text-sm"
              >
                <option value="Soybean">🌱 Soybean (सोयाबीन) - Active Kharif Model</option>
                <option value="Cotton" disabled>🌾 Cotton (कापूस) - Coming Soon</option>
                <option value="Tur" disabled>🌿 Tur / Red Gram (तूर) - Coming Soon</option>
                <option value="Maize" disabled>🌽 Maize (मका) - Coming Soon</option>
              </select>
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">
              {language === 'mr'
                ? 'सध्या महाराष्ट्र खरीप हंगामातील सोयाबीन पिकासाठी एआय मॉडेल पूर्णपणे सक्रिय आहे.'
                : 'Soybean Kharif model is fully active and validated with IMD weather datasets.'}
            </p>
          </div>

          {/* District, Taluka & Village */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '२. शेताचे ठिकाण (Location) *' : '2. Location *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">District</span>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-900"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({language === 'mr' ? d.nameMr : d.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Taluka / Block</span>
                <input
                  type="text"
                  required
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  placeholder="e.g. Ausa"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Village</span>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Kharosa"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Farm Area + Unit */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '३. शेताचे क्षेत्रफळ (Farm Area) *' : '3. Farm Area *'}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={farmArea}
                onChange={(e) => setFarmArea(parseFloat(e.target.value) || 1)}
                className="w-2/3 p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
              <select
                value={farmAreaUnit}
                onChange={(e) => setFarmAreaUnit(e.target.value as any)}
                className="w-1/3 p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
              >
                <option value="acres">{language === 'mr' ? 'एकर (Acres)' : 'Acres'}</option>
                <option value="guntha">{language === 'mr' ? 'गुंठा (Guntha)' : 'Guntha'}</option>
                <option value="hectares">{language === 'mr' ? 'हेक्टर (Hectares)' : 'Hectares'}</option>
              </select>
            </div>
          </div>

          {/* Sowing Date */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '४. पेरणीची तारीख (Sowing Date) *' : '4. Sowing Date *'}
            </label>
            <input
              type="date"
              required
              value={sowingDate}
              onChange={(e) => setSowingDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
            />
          </div>

          {/* Water Availability */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '५. पाण्याची सोय (Water Availability) *' : '5. Water Availability *'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'rain-fed', labelMr: 'कोरडवाहू (पावसावर)', labelEn: 'Rain-fed' },
                { id: 'partially-irrigated', labelMr: 'अंशतः बागायत (१-२ पाणी)', labelEn: 'Partially-irrigated' },
                { id: 'irrigated', labelMr: 'बागायत (विहीर/कॅनॉल)', labelEn: 'Fully Irrigated' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setWaterSource(opt.id as any)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    waterSource === opt.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700 font-extrabold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span className="block text-xs">{language === 'mr' ? opt.labelMr : opt.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Crop Stage */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '६. पिकाची सद्य अवस्था (Current Crop Stage) *' : '6. Crop Stage *'}
            </label>
            <select
              value={cropStage}
              onChange={(e) => setCropStage(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-900"
            >
              <option value="vegetative">{language === 'mr' ? 'शाकीय वाढ (Vegetative)' : 'Vegetative growth'}</option>
              <option value="flowering">{language === 'mr' ? 'फुलोरा अवस्था (Flowering)' : 'Flowering stage'}</option>
              <option value="pod_formation">{language === 'mr' ? 'शेंगा भरण्याची अवस्था (Pod development)' : 'Pod development stage'}</option>
              <option value="grain_filling">{language === 'mr' ? 'दाणे भरणे (Grain filling)' : 'Grain filling stage'}</option>
              <option value="maturity">{language === 'mr' ? 'पक्वता / कापणी (Maturity)' : 'Maturity / Harvest stage'}</option>
            </select>
          </div>

          {/* Optional Soil Type */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              {language === 'mr' ? '७. मातीचा प्रकार (Soil Type - ऐच्छिक)' : '7. Soil Type (Optional)'}
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800"
            >
              <option value="black_cotton">{language === 'mr' ? 'काळी कसदार जमीन (Black Cotton Soil)' : 'Deep Black Cotton Soil'}</option>
              <option value="medium_black">{language === 'mr' ? 'मध्यम काळी जमीन (Medium Black Soil)' : 'Medium Black Soil'}</option>
              <option value="red_loam">{language === 'mr' ? 'हलकी / मुरमाड जमीन (Light / Morrum Soil)' : 'Light Red/Sandy Soil'}</option>
            </select>
          </div>

          {/* One Big Prominent Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sprout className="w-5 h-5 text-amber-300" />
              <span>{language === 'mr' ? 'माझ्या शेताचे विश्लेषण करा' : 'Analyze My Farm'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
