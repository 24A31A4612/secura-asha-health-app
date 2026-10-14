import React from 'react';
import { Home, Calendar, Users, MessageSquareQuote, BookOpen, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../services/i18n';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: Language;
  pendingSyncCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  language,
  pendingSyncCount = 0
}) => {
  const t = useTranslation(language);

  const tabs = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'visits', label: t.navVisits, icon: Calendar },
    { id: 'households', label: t.navHouseholds, icon: Users },
    { id: 'ask-seva', label: t.navAskSeva, icon: MessageSquareQuote },
    { id: 'protocols', label: t.navProtocols, icon: BookOpen },
    { id: 'sync', label: t.navSync, icon: RefreshCw, badge: pendingSyncCount > 0 ? pendingSyncCount : undefined }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D8E5EA] shadow-lg">
      <div className="grid grid-cols-6 items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-colors relative focus:outline-none"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#0D9488] stroke-[2.5]' : 'text-[#607887]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-amber-500 text-slate-900 font-bold rounded-full text-[9px] min-w-[14px] text-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 truncate max-w-[54px] ${
                  isActive ? 'text-[#0B3558] font-bold' : 'text-[#607887]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 bg-[#0D9488] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
