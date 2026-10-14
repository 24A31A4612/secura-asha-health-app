import React, { useState } from 'react';
import SecuraLogo from '../SecuraLogo';
import { Language, User } from '../../types';
import { useTranslation } from '../../services/i18n';
import { AuthService, isWebAuthnSupported } from '../../services/authService';
import { Fingerprint, Mail, Lock, AlertCircle, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import GoogleAccountPickerModal from './GoogleAccountPickerModal';
import BiometricModal from './BiometricModal';

interface LoginScreenProps {
  onSuccess: (user: User) => void;
  onNavigateRegister: () => void;
  onNavigateBack: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSuccess,
  onNavigateRegister,
  onNavigateBack,
  language,
  onLanguageChange
}) => {
  const t = useTranslation(language);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);

  const hasWebAuthn = isWebAuthnSupported();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError(t.allFieldsRequired);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await AuthService.loginWithEmail(email, password);
    setLoading(false);

    if (result.success && result.user) {
      onSuccess(result.user);
    } else {
      setError(result.error || t.loginError);
    }
  };

  const handleBiometricLogin = async () => {
    setLoading(true);
    setError(null);

    const result = await AuthService.loginWithBiometrics(email.trim() || undefined);
    setLoading(false);

    if (result.success && result.user) {
      onSuccess(result.user);
    } else {
      setError(result.error || 'Biometric authentication was not completed.');
    }
  };

  const handleDemoAccountFill = () => {
    setEmail('asha.sarala@health.gov.in');
    setPassword('Secura@2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#EEF4F8] flex flex-col justify-center p-4 sm:p-6 lg:p-8">
      {/* Top back & language bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between mb-4">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0B3558] hover:text-[#082A46] p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-1 bg-white border border-[#D8E5EA] p-0.5 rounded-lg text-xs">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-0.5 rounded font-medium ${language === 'en' ? 'bg-[#0B3558] text-white font-bold' : 'text-[#607887]'}`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('te')}
            className={`px-2 py-0.5 rounded font-medium ${language === 'te' ? 'bg-[#0B3558] text-white font-bold' : 'text-[#607887]'}`}
          >
            తె
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-2 py-0.5 rounded font-medium ${language === 'hi' ? 'bg-[#0B3558] text-white font-bold' : 'text-[#607887]'}`}
          >
            हि
          </button>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl border border-[#D8E5EA] p-6 sm:p-8 space-y-6">
        {/* Header with Official Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <SecuraLogo variant="horizontal" size="md" showTagline={false} />
          </div>
          <h1 className="text-xl font-bold text-[#0B3558]">{t.signIn}</h1>
          <p className="text-xs text-[#607887]">{t.appTagline}</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-[#B42318] animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Quick Demo Credentials Assistant */}
        <div className="p-3 bg-[#EAF7F6] border border-teal-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#0B3558]">
            <Sparkles className="w-4 h-4 text-[#0D9488]" />
            <span className="font-semibold">Quick Demo Login:</span>
          </div>
          <button
            type="button"
            onClick={handleDemoAccountFill}
            className="px-2.5 py-1 bg-white hover:bg-teal-50 text-[#0D9488] font-bold border border-teal-300 rounded-lg transition-colors text-xs"
          >
            Fill Demo ASHA
          </button>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
              {t.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="asha.worker@health.gov.in"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-[#D8E5EA] rounded-xl text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-[#D8E5EA] rounded-xl text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>
          </div>

          {/* Email/Password Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] bg-[#0B3558] hover:bg-[#082A46] text-white font-bold rounded-xl shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
          >
            <span>{loading ? 'Authenticating...' : t.signIn}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#D8E5EA] w-full" />
          <span className="bg-white px-3 text-[11px] font-semibold text-[#607887] uppercase">
            Or Sign In With
          </span>
          <div className="border-t border-[#D8E5EA] w-full" />
        </div>

        {/* Alternate Auth Methods: Biometrics & Google */}
        <div className="space-y-2.5">
          {/* Biometric / Passkey Verification */}
          <button
            type="button"
            onClick={handleBiometricLogin}
            disabled={loading}
            className="w-full min-h-[44px] bg-[#EAF7F6] hover:bg-teal-100 text-[#0B3558] font-bold rounded-xl border border-teal-200 transition-colors flex items-center justify-center gap-2.5 text-xs py-2.5 px-4"
          >
            <Fingerprint className="w-4 h-4 text-[#0D9488]" />
            <span>{t.signInWithBiometrics}</span>
          </button>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full min-h-[44px] bg-white hover:bg-slate-50 text-[#183247] font-semibold rounded-xl border border-[#D8E5EA] transition-colors flex items-center justify-center gap-2.5 text-xs py-2.5 px-4 shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t.continueWithGoogle}</span>
          </button>
        </div>

        {/* Link to Registration */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#607887]">
            {t.noAccountPrompt}{' '}
            <button
              type="button"
              onClick={onNavigateRegister}
              className="font-bold text-[#0D9488] hover:underline ml-1"
            >
              {t.signUp}
            </button>
          </p>
        </div>
      </div>

      {/* Google Setup Guidance Modal */}
      {showGoogleModal && (
        <GoogleAccountPickerModal
          onClose={() => setShowGoogleModal(false)}
          onSuccess={onSuccess}
          language={language}
        />
      )}

      {/* Biometric Explanation Modal */}
      {showBiometricModal && (
        <BiometricModal
          onClose={() => setShowBiometricModal(false)}
          language={language}
        />
      )}
    </div>
  );
};

export default LoginScreen;
