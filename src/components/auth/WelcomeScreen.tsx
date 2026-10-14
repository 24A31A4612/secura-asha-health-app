import React from 'react';
import SecuraLogo from '../SecuraLogo';
import { Language } from '../../types';
import { useTranslation } from '../../services/i18n';
import { Globe, ArrowRight, ShieldCheck, HeartHandshake, Database, WifiOff } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateLogin,
  onNavigateRegister,
  language,
  onLanguageChange
}) => {
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-[#EEF4F8] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header with Language Selector */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        {/* Compact Logo Mark */}
        <div className="flex items-center gap-2">
          <SecuraLogo variant="icon-only" size="sm" />
          <span className="text-xs font-bold text-[#0B3558] tracking-wider uppercase">
            MoHFW / NHM Frontline Portal
          </span>
        </div>

        {/* Visible Language Selector for English, Telugu, and Hindi */}
        <div className="flex items-center gap-1 bg-white border border-[#D8E5EA] p-1 rounded-xl shadow-xs">
          <Globe className="w-4 h-4 text-[#0D9488] ml-1.5" />
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              language === 'en'
                ? 'bg-[#0B3558] text-white'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('te')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              language === 'te'
                ? 'bg-[#0B3558] text-white'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            తెలుగు
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              language === 'hi'
                ? 'bg-[#0B3558] text-white'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </header>

      {/* Main Hero Card Container */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D8E5EA] p-6 sm:p-8 text-center space-y-6">
          {/* Prominent Official Secura Logo */}
          <div className="flex justify-center pt-2">
            <SecuraLogo variant="stacked" size="xl" showTagline={true} />
          </div>

          {/* Description */}
          <div className="space-y-2 px-2">
            <p className="text-sm text-[#607887] leading-relaxed">
              {t.welcomeDesc}
            </p>
          </div>

          {/* Frontline Feature Highlights */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-left">
            <div className="p-2.5 bg-[#EAF7F6] rounded-xl border border-teal-100 flex flex-col justify-between">
              <ShieldCheck className="w-4 h-4 text-[#0D9488] mb-1.5" />
              <span className="text-[11px] font-bold text-[#0B3558] leading-tight">
                MoHFW Protocols
              </span>
            </div>
            <div className="p-2.5 bg-[#EEF4F8] rounded-xl border border-blue-100 flex flex-col justify-between">
              <WifiOff className="w-4 h-4 text-[#0B3558] mb-1.5" />
              <span className="text-[11px] font-bold text-[#0B3558] leading-tight">
                100% Offline Ready
              </span>
            </div>
            <div className="p-2.5 bg-[#EAF7F6] rounded-xl border border-teal-100 flex flex-col justify-between">
              <HeartHandshake className="w-4 h-4 text-[#0D9488] mb-1.5" />
              <span className="text-[11px] font-bold text-[#0B3558] leading-tight">
                Daily Visits & ANC
              </span>
            </div>
          </div>

          {/* Authentication Action Buttons */}
          <div className="space-y-3 pt-3">
            {/* Prominent Sign In Button (Navy Blue) */}
            <button
              onClick={onNavigateLogin}
              className="w-full min-h-[48px] bg-[#0B3558] hover:bg-[#082A46] text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
            >
              <span>{t.signIn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Sign Up Button (Teal Border / Accent) */}
            <button
              onClick={onNavigateRegister}
              className="w-full min-h-[48px] bg-white hover:bg-[#EAF7F6] text-[#0D9488] font-bold rounded-xl border-2 border-[#0D9488] transition-all active:scale-[0.99] flex items-center justify-center text-sm"
            >
              <span>{t.signUp}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto text-center py-2 text-xs text-[#607887]">
        <p>© 2026 Secura Healthcare · Smarter Support for ASHA Workers</p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
