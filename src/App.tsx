/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { DemoModeBanner } from './components/common/DemoModeBanner';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { AuthScreen } from './components/auth/AuthScreen';

// Farmer Experience Components
import { FarmerOnboarding } from './components/farmer/FarmerOnboarding';
import { FarmerNavigation } from './components/farmer/FarmerNavigation';
import { FarmerHome } from './components/farmer/FarmerHome';
import { AnalyzeFarmForm } from './components/farmer/AnalyzeFarmForm';
import { AssessmentDetailView } from './components/farmer/AssessmentDetailView';
import { AskAIView } from './components/farmer/AskAIView';
import { FarmerWhatIfSimulator } from './components/farmer/FarmerWhatIfSimulator';
import { FarmerHistoryView } from './components/farmer/FarmerHistoryView';
import { FarmerProfileView } from './components/farmer/FarmerProfileView';
import { FarmerAdvisoriesView } from './components/farmer/FarmerAdvisoriesView';
import { OfficerContactView } from './components/farmer/OfficerContactView';

// Officer Experience Components
import { OfficerNavigation } from './components/officer/OfficerNavigation';
import { OfficerOverview } from './components/officer/OfficerOverview';
import { DistrictExplorerMap } from './components/officer/DistrictExplorerMap';
import { DistrictDetailView } from './components/officer/DistrictDetailView';
import { WarningManager } from './components/officer/WarningManager';
import { OfficerProfileView } from './components/officer/OfficerProfileView';

function AppContent() {
  const { role, farmerTab, officerTab, notificationMessage } = useApp();

  // Screen 1: Landing Page
  if (role === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200">
        <Header />
        <DemoModeBanner />
        <WelcomeScreen />
      </div>
    );
  }

  // Screen 2: Dedicated Authentication Page (Farmer or Officer)
  if (role === 'auth') {
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200">
        <Header />
        <DemoModeBanner />
        <AuthScreen />
      </div>
    );
  }

  // Screen 3: Farmer Onboarding (Farm Setup wizard after signup)
  if (role === 'onboarding') {
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200">
        <Header />
        <DemoModeBanner />
        <FarmerOnboarding />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f6] font-sans text-slate-800 antialiased selection:bg-emerald-200">
      <Header />
      <DemoModeBanner />

      {/* Global Toast Notification */}
      {notificationMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 max-w-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span>{notificationMessage}</span>
        </div>
      )}

      {/* Role 1: Simple, High-Content Farmer Experience */}
      {role === 'farmer' && (
        <div className="flex-1 flex flex-col justify-between">
          <main className="flex-1 w-full">
            {farmerTab === 'home' && <FarmerHome />}
            {farmerTab === 'ask_ai' && <AskAIView />}
            {farmerTab === 'history' && <FarmerHistoryView />}
            {farmerTab === 'profile' && <FarmerProfileView />}
            {farmerTab === 'advisories' && <FarmerAdvisoriesView />}
            {farmerTab === 'officer_contact' && <OfficerContactView />}
            {farmerTab === 'analyze' && <AnalyzeFarmForm />}
            {farmerTab === 'assessment_detail' && <AssessmentDetailView />}
            {farmerTab === 'what_if' && <FarmerWhatIfSimulator />}
          </main>
          <FarmerNavigation />
        </div>
      )}

      {/* Role 2: Final Simplified 5-Screen Officer Dashboard */}
      {role === 'officer' && (
        <div className="flex-1 flex flex-col lg:flex-row">
          <OfficerNavigation />
          <main className="flex-1 overflow-y-auto bg-[#f8faf8]">
            {officerTab === 'overview' && <OfficerOverview />}
            {officerTab === 'map' && <DistrictExplorerMap />}
            {(officerTab === 'analysis' || officerTab === 'district_detail') && <DistrictDetailView />}
            {officerTab === 'warnings' && <WarningManager />}
            {officerTab === 'profile' && <OfficerProfileView />}
          </main>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
