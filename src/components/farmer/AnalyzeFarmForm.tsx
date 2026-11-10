import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmProfile } from '../../types';
import { MAHARASHTRA_DISTRICTS, TALUKAS_BY_DISTRICT } from '../../data/maharashtraData';
import { ArrowLeft, CheckCircle2, Sprout } from 'lucide-react';

export const AnalyzeFarmForm: React.FC = () => {
  const { farm, updateFarm, executeNewAssessment, setFarmerTab, language } = useApp();

  const [formData, setFormData] = useState<FarmProfile>({ ...farm });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTalukas = TALUKAS_BY_DISTRICT[formData.district.toLowerCase()] || [
    'Central Taluka', 'East Taluka', 'West Taluka'
  ];

  const handleDistrictChange = (districtId: string) => {
    const talukas = TALUKAS_BY_DISTRICT[districtId.toLowerCase()] || ['Main'];
    setFormData({
      ...formData,
      district: districtId,
      taluka: talukas[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      updateFarm(formData);
      executeNewAssessment(formData);
      setIsSubmitting(false);
      setFarmerTab('assessment_detail');
    }, 800);
  };

  return (
    <div className="pb-24 pt-3 px-3.5 max-w-md mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFarmerTab('home')}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            {language === 'mr' ? 'शेताची माहिती भरा' : 'Check My Farm'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'mr' ? '२ मिनिटांत पिकाचा अचूक सल्ला मिळवा' : 'Takes 1 minute for customized advice'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Step 1: Location */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase text-emerald-900 font-mono">
            १. शेताचे ठिकाण (Location)
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'जिल्हा' : 'District'}
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800 bg-slate-50"
              >
                {MAHARASHTRA_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.nameMr})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'तालुका' : 'Taluka'}
              </label>
              <select
                value={formData.taluka}
                onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800 bg-slate-50"
              >
                {availableTalukas.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'गाव' : 'Village'}
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder="उदा. बेलकुंड"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'क्षेत्र (एकर)' : 'Size (Acres)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={formData.farmArea}
                onChange={(e) => setFormData({ ...formData, farmArea: parseFloat(e.target.value) || 1 })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Crop Condition */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase text-emerald-900 font-mono">
            २. पिकाची आजची स्थिती (Crop Stage)
          </h3>

          <div className="text-xs space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'पिकाची सध्याची अवस्था काय आहे?' : 'Current Growth Stage'}
              </label>
              <select
                value={formData.cropStage}
                onChange={(e) => setFormData({ ...formData, cropStage: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800 bg-slate-50"
              >
                <option value="flowering">
                  {language === 'mr' ? '🌸 फुले लागली आहेत (Flowering)' : '🌸 Flowering'}
                </option>
                <option value="pod_formation">
                  {language === 'mr' ? '🌱 शेंगा भरत आहेत (Pod Formation)' : '🌱 Pod Formation'}
                </option>
                <option value="vegetative">
                  {language === 'mr' ? '🌿 पाने व वाढीची अवस्था (Vegetative)' : '🌿 Vegetative'}
                </option>
                <option value="grain_filling">
                  {language === 'mr' ? '🌾 दाणे भरत आहेत (Grain Filling)' : '🌾 Grain Filling'}
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'पाण्याची काय सोय आहे?' : 'Water Facility'}
              </label>
              <select
                value={formData.waterSource}
                onChange={(e) => setFormData({ ...formData, waterSource: e.target.value as any })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800 bg-slate-50"
              >
                <option value="rain-fed">
                  {language === 'mr' ? 'केवळ पावसावर अवलंबून (कोरडवाहू)' : 'Rain-fed Only'}
                </option>
                <option value="irrigated">
                  {language === 'mr' ? 'विहीर / बोअरवेल पाणी उपलब्ध आहे' : 'Well / Borewell Water Available'}
                </option>
                <option value="partially-irrigated">
                  {language === 'mr' ? 'शेततळे / थोडे पाणी आहे' : 'Farm Pond Water Available'}
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'mr' ? 'शेतात काय दिसत आहे? (ऐच्छिक)' : 'What did you notice? (Optional)'}
              </label>
              <input
                type="text"
                value={formData.recentObservations || ''}
                onChange={(e) => setFormData({ ...formData, recentObservations: e.target.value })}
                placeholder={language === 'mr' ? 'उदा. फुले गळत आहेत, जमीन भेगाळली आहे' : 'e.g. Flowers dropping, dry soil'}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>{language === 'mr' ? 'तपासणी सुरू आहे...' : 'Checking conditions...'}</span>
            ) : (
              <span>
                {language === 'mr' ? 'माझ्या शेताचा सल्ला मिळवा ➔' : 'Get Farm Advice ➔'}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
