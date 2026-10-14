import React, { useState, useEffect } from 'react';
import { User, Household, Visit, ProtocolDocument, DangerSignEvaluation, Language } from './types';
import { AuthService } from './services/authService';
import { Repository } from './database/repository';
import { getStoredLanguage, setStoredLanguage } from './services/i18n';
import { useOnlineStatus } from './hooks/useOnlineStatus';

// Header & Navbar
import Header from './components/Header';
import Navbar from './components/Navbar';

// Auth Screens
import WelcomeScreen from './components/auth/WelcomeScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';

// Modals
import EmergencyAlertModal from './components/EmergencyAlertModal';
import AddHouseholdModal from './components/AddHouseholdModal';
import VisitCompletionModal from './components/VisitCompletionModal';
import ProtocolReaderModal from './components/ProtocolReaderModal';

// Pages
import HomePage from './pages/HomePage';
import VisitsPage from './pages/VisitsPage';
import HouseholdsPage from './pages/HouseholdsPage';
import HouseholdDetailPage from './pages/HouseholdDetailPage';
import AskSevaPage from './pages/AskSevaPage';
import ProtocolLibraryPage from './pages/ProtocolLibraryPage';
import SyncCentrePage from './pages/SyncCentrePage';
import SettingsPage from './pages/SettingsPage';
import EvaluatorPage from './pages/EvaluatorPage';

export default function App() {
  // Authentication & View Flow State
  const [currentUser, setCurrentUser] = useState<User | null>(() => AuthService.getCurrentUser());
  const [authView, setAuthView] = useState<'welcome' | 'login' | 'register'>('welcome');

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);

  // Localization State
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());

  // Data State
  const [households, setHouseholds] = useState<Household[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Modals State
  const [activeEmergency, setActiveEmergency] = useState<DangerSignEvaluation | null>(null);
  const [showAddHouseholdModal, setShowAddHouseholdModal] = useState<boolean>(false);
  const [selectedVisitForCompletion, setSelectedVisitForCompletion] = useState<Visit | null>(null);
  const [selectedProtocolForReading, setSelectedProtocolForReading] = useState<ProtocolDocument | null>(null);

  // Online / Offline Hook
  const {
    isOnline,
    toggleManualOffline,
    pendingSyncCount,
    syncNow,
    refreshPendingCount
  } = useOnlineStatus();

  // Load initial repository data
  const loadAppData = async () => {
    try {
      setLoadingData(true);
      await AuthService.ensureDemoAccount();
      const [loadedHouseholds, loadedVisits] = await Promise.all([
        Repository.getHouseholds(),
        Repository.getVisits()
      ]);
      setHouseholds(loadedHouseholds);
      setVisits(loadedVisits);
      await refreshPendingCount();
    } catch (err) {
      console.error('Failed to load application data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setStoredLanguage(lang);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthView('welcome');
    setCurrentTab('home');
  };

  const handleSignOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    setAuthView('welcome');
    setSelectedHousehold(null);
  };

  const handleSaveHousehold = async (newHousehold: Household) => {
    const success = await Repository.saveHousehold(newHousehold, !isOnline);
    if (success) {
      const updated = await Repository.getHouseholds();
      setHouseholds(updated);
      await refreshPendingCount();
    }
  };

  const handleCompleteVisit = async (
    visitId: string,
    notes: string,
    vitals?: Visit['vitals'],
    dangerSigns?: string[]
  ) => {
    const success = await Repository.completeVisit(visitId, notes, vitals, dangerSigns, !isOnline);
    if (success) {
      const updated = await Repository.getVisits();
      setVisits(updated);
      await refreshPendingCount();
    }
  };

  // If not logged in, render authentication flow
  if (!currentUser) {
    if (authView === 'login') {
      return (
        <LoginScreen
          onSuccess={handleLoginSuccess}
          onNavigateRegister={() => setAuthView('register')}
          onNavigateBack={() => setAuthView('welcome')}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      );
    }

    if (authView === 'register') {
      return (
        <RegisterScreen
          onSuccess={handleLoginSuccess}
          onNavigateLogin={() => setAuthView('login')}
          onNavigateBack={() => setAuthView('welcome')}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      );
    }

    return (
      <WelcomeScreen
        onNavigateLogin={() => setAuthView('login')}
        onNavigateRegister={() => setAuthView('register')}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  // Authenticated Application Shell
  return (
    <div className="min-h-screen bg-[#EEF4F8] text-[#183247] flex flex-col font-sans">
      {/* Universal Desktop Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setSelectedHousehold(null);
          setCurrentTab(tab);
        }}
        language={language}
        onLanguageChange={handleLanguageChange}
        isOnline={isOnline}
        onToggleOnline={toggleManualOffline}
        pendingSyncCount={pendingSyncCount}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-8">
        {selectedHousehold ? (
          <HouseholdDetailPage
            household={selectedHousehold}
            onBack={() => setSelectedHousehold(null)}
            language={language}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomePage
                user={currentUser}
                households={households}
                visits={visits}
                onNavigate={setCurrentTab}
                onOpenAddHousehold={() => setShowAddHouseholdModal(true)}
                onSelectVisit={(v) => setSelectedVisitForCompletion(v)}
                language={language}
              />
            )}

            {currentTab === 'visits' && (
              <VisitsPage
                visits={visits}
                onSelectVisit={(v) => setSelectedVisitForCompletion(v)}
                language={language}
              />
            )}

            {currentTab === 'households' && (
              <HouseholdsPage
                households={households}
                onSelectHousehold={(h) => setSelectedHousehold(h)}
                onOpenAddHousehold={() => setShowAddHouseholdModal(true)}
                language={language}
              />
            )}

            {currentTab === 'ask-seva' && (
              <AskSevaPage
                onTriggerEmergencyModal={(evalResult) => setActiveEmergency(evalResult)}
                isOnline={isOnline}
                language={language}
              />
            )}

            {currentTab === 'protocols' && (
              <ProtocolLibraryPage
                onSelectProtocol={(p) => setSelectedProtocolForReading(p)}
                language={language}
              />
            )}

            {currentTab === 'sync' && (
              <SyncCentrePage
                isOnline={isOnline}
                onToggleOnline={toggleManualOffline}
                pendingSyncCount={pendingSyncCount}
                onSyncCompleted={loadAppData}
                language={language}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsPage
                user={currentUser}
                language={language}
                onLanguageChange={handleLanguageChange}
                onSignOut={handleSignOut}
              />
            )}

            {currentTab === 'evaluator' && (
              <EvaluatorPage language={language} />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Tab Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setSelectedHousehold(null);
          setCurrentTab(tab);
        }}
        language={language}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Modals */}
      {activeEmergency && (
        <EmergencyAlertModal
          evaluation={activeEmergency}
          onClose={() => setActiveEmergency(null)}
          language={language}
        />
      )}

      {showAddHouseholdModal && (
        <AddHouseholdModal
          onClose={() => setShowAddHouseholdModal(false)}
          onSave={handleSaveHousehold}
          language={language}
        />
      )}

      {selectedVisitForCompletion && (
        <VisitCompletionModal
          visit={selectedVisitForCompletion}
          onClose={() => setSelectedVisitForCompletion(null)}
          onComplete={handleCompleteVisit}
          language={language}
        />
      )}

      {selectedProtocolForReading && (
        <ProtocolReaderModal
          protocol={selectedProtocolForReading}
          onClose={() => setSelectedProtocolForReading(null)}
          language={language}
        />
      )}
    </div>
  );
}
