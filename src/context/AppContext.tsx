import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, FarmProfile, Language, UserRole, Assessment, DistrictRiskData } from '../types';
import { api, DEFAULT_FARM } from '../services/api';
import { runSoybeanRiskAssessment } from '../ml/modelPipeline';

interface AppContextType {
  role: 'welcome' | 'auth' | 'onboarding' | 'farmer' | 'officer' | 'admin';
  setRole: (role: 'welcome' | 'auth' | 'onboarding' | 'farmer' | 'officer' | 'admin') => void;
  authIntent: 'farmer' | 'officer';
  setAuthIntent: (intent: 'farmer' | 'officer') => void;
  user: User | null;
  setUser: (user: User | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  farm: FarmProfile;
  updateFarm: (farm: FarmProfile) => void;
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  farmerTab: string;
  setFarmerTab: (tab: string) => void;
  officerTab: string;
  setOfficerTab: (tab: string) => void;
  selectedDistrictId: string;
  setSelectedDistrictId: (id: string) => void;
  selectedAssessmentId: string | null;
  setSelectedAssessmentId: (id: string | null) => void;
  assessments: Assessment[];
  latestAssessment: Assessment | null;
  refreshAssessments: () => void;
  executeNewAssessment: (customFarm?: Partial<FarmProfile>) => Assessment;
  logout: () => void;
  notificationMessage: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'welcome' | 'auth' | 'onboarding' | 'farmer' | 'officer' | 'admin'>('welcome');
  const [authIntent, setAuthIntent] = useState<'farmer' | 'officer'>('farmer');
  const [user, setUser] = useState<User | null>(api.getUser());
  const [language, setLanguageState] = useState<Language>(api.getLanguage());
  const [farm, setFarm] = useState<FarmProfile>(api.getFarm());
  const [isDemoMode, setDemoModeState] = useState<boolean>(api.isDemoMode());
  
  // Navigation states
  const [farmerTab, setFarmerTab] = useState<string>('home');
  const [officerTab, setOfficerTab] = useState<string>('overview');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('latur');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  
  const [assessments, setAssessments] = useState<Assessment[]>(api.getAssessments());
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    api.setLanguage(lang);
  };

  const setDemoMode = (val: boolean) => {
    setDemoModeState(val);
    api.setDemoMode(val);
    showNotification(val ? 'Switched to Synthetic Demo Mode' : 'Switched to Operational ML Pipeline');
  };

  const updateFarm = (newFarm: FarmProfile) => {
    const saved = api.saveFarm(newFarm);
    setFarm(saved);
    showNotification('Farm details updated successfully.');
  };

  const refreshAssessments = () => {
    setAssessments(api.getAssessments());
  };

  const executeNewAssessment = (customFarm?: Partial<FarmProfile>): Assessment => {
    const farmToAssess = { ...farm, ...(customFarm || {}) };
    const result = runSoybeanRiskAssessment(farmToAssess, isDemoMode);
    api.saveAssessment(result);
    refreshAssessments();
    setSelectedAssessmentId(result.id);
    return result;
  };

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const logout = () => {
    api.setUser(null);
    setUser(null);
    setRole('welcome');
    setFarmerTab('home');
    setOfficerTab('overview');
    showNotification('Logged out successfully.');
  };

  // If user already stored on mount
  useEffect(() => {
    const storedUser = api.getUser();
    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role);
    }

    // Auto-seed an initial assessment if empty
    const currentAssessments = api.getAssessments();
    if (currentAssessments.length === 0) {
      const initial = runSoybeanRiskAssessment(DEFAULT_FARM, false);
      api.saveAssessment(initial);
      setAssessments([initial]);
    }
  }, []);

  const latestAssessment = assessments.length > 0 ? assessments[0] : null;

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        authIntent,
        setAuthIntent,
        user,
        setUser,
        language,
        setLanguage,
        farm,
        updateFarm,
        isDemoMode,
        setDemoMode,
        farmerTab,
        setFarmerTab,
        officerTab,
        setOfficerTab,
        selectedDistrictId,
        setSelectedDistrictId,
        selectedAssessmentId,
        setSelectedAssessmentId,
        assessments,
        latestAssessment,
        refreshAssessments,
        executeNewAssessment,
        logout,
        notificationMessage,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
