import React, { useState } from 'react';
import SecuraLogo from './SecuraLogo';
import { Language, User } from '../types';
import { useTranslation } from '../services/i18n';
import {
  Globe,
  Wifi,
  WifiOff,
  LogOut,
  RefreshCw,
  ShieldCheck,
  User as UserIcon,
  Activity
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isOnline: boolean;
  onToggleOnline: () => void;
  pendingSyncCount: number;
  currentUser: User | null;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  language,
  onLanguageChange,
  isOnline,
  onToggleOnline,
  pendingSyncCount,
  currentUser,
  onSignOut
}) => {
  const t = useTranslation(language);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'visits', label: t.navVisits },
    { id: 'households', label: t.navHouseholds },
    { id: 'ask-seva', label: t.navAskSeva },
    { id: 'protocols', label: t.navProtocols },
    { id: 'sync', label: t.navSync, badge: pendingSyncCount > 0 ? pendingSyncCount : undefined },
    { id: 'evaluator', label: t.navEvaluator }
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0B3558] text-white border-b border-[#082A46] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 rounded-lg p-1 transition-opacity hover:opacity-95"
            aria-label="Secura Home"
          >
            <SecuraLogo variant="horizontal" size="sm" theme="light" showTagline={false} />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors relative whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0D9488] text-white shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px]">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Controls (Online status, Language Selector, User Profile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Online / Offline Mode Toggle */}
            <button
              onClick={onToggleOnline}
              title={isOnline ? t.switchToOffline : t.switchToOnline}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                isOnline
                  ? 'bg-teal-900/40 text-teal-200 border-teal-500/40 hover:bg-teal-900/60'
                  : 'bg-amber-950/40 text-amber-200 border-amber-500/40 hover:bg-amber-950/60'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span className="hidden sm:inline">{t.online}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{t.offline}</span>
                </>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span className="uppercase font-bold tracking-wider">{language}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 bg-white text-[#183247] rounded-lg shadow-xl border border-[#D8E5EA] py-1 z-50 text-xs">
                    <button
                      onClick={() => { onLanguageChange('en'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 hover:bg-[#EAF7F6] transition-colors flex items-center justify-between ${
                        language === 'en' ? 'font-bold text-[#0D9488]' : ''
                      }`}
                    >
                      <span>English</span>
                      {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />}
                    </button>
                    <button
                      onClick={() => { onLanguageChange('te'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 hover:bg-[#EAF7F6] transition-colors flex items-center justify-between ${
                        language === 'te' ? 'font-bold text-[#0D9488]' : ''
                      }`}
                    >
                      <span>తెలుగు</span>
                      {language === 'te' && <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />}
                    </button>
                    <button
                      onClick={() => { onLanguageChange('hi'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 hover:bg-[#EAF7F6] transition-colors flex items-center justify-between ${
                        language === 'hi' ? 'font-bold text-[#0D9488]' : ''
                      }`}
                    >
                      <span>हिन्दी</span>
                      {language === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* User Profile / Menu */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <span className="hidden md:inline text-xs text-slate-200 font-medium max-w-[120px] truncate">
                    {currentUser.fullName}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white text-[#183247] rounded-xl shadow-xl border border-[#D8E5EA] p-3 z-50">
                      <div className="border-b border-[#D8E5EA] pb-2 mb-2">
                        <p className="font-bold text-sm text-[#0B3558]">{currentUser.fullName}</p>
                        <p className="text-xs text-[#607887]">{currentUser.email}</p>
                        <p className="text-[11px] text-[#0D9488] font-semibold mt-1">
                          ID: {currentUser.ashaId} · {currentUser.subCentre}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <button
                          onClick={() => { onNavigate('settings'); setUserMenuOpen(false); }}
                          className="w-full text-left px-2 py-1.5 text-xs text-[#183247] hover:bg-[#EAF7F6] rounded-md transition-colors flex items-center gap-2"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                          <span>{t.navSettings}</span>
                        </button>
                        <button
                          onClick={() => { onSignOut(); setUserMenuOpen(false); }}
                          className="w-full text-left px-2 py-1.5 text-xs text-[#B42318] hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t.signOut}</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
