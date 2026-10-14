import React, { useState } from 'react';
import SecuraLogo from '../SecuraLogo';
import { Language, User } from '../../types';
import { useTranslation } from '../../services/i18n';
import { AuthService, isWebAuthnSupported } from '../../services/authService';
import { ArrowLeft, User as UserIcon, Mail, Lock, Phone, MapPin, Building, ShieldCheck, Fingerprint, AlertCircle } from 'lucide-react';
import BiometricModal from './BiometricModal';

interface RegisterScreenProps {
  onSuccess: (user: User) => void;
  onNavigateLogin: () => void;
  onNavigateBack: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onSuccess,
  onNavigateLogin,
  onNavigateBack,
  language,
  onLanguageChange
}) => {
  const t = useTranslation(language);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ashaId, setAshaId] = useState('');
  const [subCentre, setSubCentre] = useState('');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [enableBiometrics, setEnableBiometrics] = useState(false);
  const [showBiometricInfo, setShowBiometricInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webAuthnSupported = isWebAuthnSupported();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !ashaId.trim() || !password) {
      setError(t.allFieldsRequired);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordsDoNotMatch);
      return;
    }

    if (!privacyConsent) {
      setError('Please accept the healthcare data security & privacy standards to proceed.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await AuthService.register({
      fullName,
      email,
      ashaId,
      subCentre: subCentre.trim() || 'Rampur Primary Health Sub-Centre',
      village: village.trim() || 'Rampur Sector 1',
      phone: phone.trim() || '+91 90000 00000',
      passwordPlain: password,
      enableBiometricPasskey: enableBiometrics && webAuthnSupported
    });

    setLoading(false);

    if (result.success && result.user) {
      onSuccess(result.user);
    } else {
      setError(result.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4F8] flex flex-col justify-center p-4 sm:p-6 lg:p-8">
      {/* Top back bar */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between mb-4">
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

      <div className="max-w-xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-[#D8E5EA] p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <SecuraLogo variant="horizontal" size="md" showTagline={false} />
          </div>
          <h1 className="text-xl font-bold text-[#0B3558]">{t.signUp}</h1>
          <p className="text-xs text-[#607887]">
            Register official ASHA profile for encrypted offline-first healthcare operations
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-[#B42318] animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.fullNameLabel} *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Sarala Devi"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.emailLabel} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="sarala.devi@health.gov.in"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.ashaIdLabel} *
              </label>
              <input
                type="text"
                value={ashaId}
                onChange={e => setAshaId(e.target.value)}
                placeholder="ASHA-TS-4829"
                required
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.phoneLabel}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.subCentreLabel}
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="text"
                  value={subCentre}
                  onChange={e => setSubCentre(e.target.value)}
                  placeholder="Rampur PHC / Sub-Centre"
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.villageLabel}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="text"
                  value={village}
                  onChange={e => setVillage(e.target.value)}
                  placeholder="Rampur Ward 3"
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.passwordLabel} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.confirmPasswordLabel} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#607887] absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-[#D8E5EA] rounded-xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>
            </div>
          </div>

          {/* Secure Biometric Setup Section */}
          <div className="p-3.5 bg-[#EAF7F6] border border-teal-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-[#0D9488]" />
                <span className="text-xs font-bold text-[#0B3558]">
                  {t.enableBiometrics}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableBiometrics}
                  onChange={e => setEnableBiometrics(e.target.checked)}
                  disabled={!webAuthnSupported}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D9488]"></div>
              </label>
            </div>
            <p className="text-[11px] text-[#607887] leading-tight">
              {webAuthnSupported ? t.biometricConsentNotice : t.biometricFallbackNote}
            </p>
            <button
              type="button"
              onClick={() => setShowBiometricInfo(true)}
              className="text-[11px] text-[#0D9488] font-bold hover:underline block"
            >
              How Secura protects your biometrics & passkeys →
            </button>
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyConsent}
              onChange={e => setPrivacyConsent(e.target.checked)}
              className="mt-0.5 rounded text-[#0D9488] focus:ring-[#0D9488]"
            />
            <label htmlFor="privacy" className="text-xs text-[#183247] leading-relaxed cursor-pointer">
              {t.privacyConsentLabel}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] bg-[#0B3558] hover:bg-[#082A46] text-white font-bold rounded-xl shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm pt-2"
          >
            <span>{loading ? 'Creating ASHA Account...' : t.signUp}</span>
          </button>
        </form>

        {/* Existing account prompt */}
        <div className="text-center pt-2 border-t border-[#D8E5EA]">
          <p className="text-xs text-[#607887]">
            {t.alreadyHaveAccount}{' '}
            <button
              type="button"
              onClick={onNavigateLogin}
              className="font-bold text-[#0D9488] hover:underline ml-1"
            >
              {t.signIn}
            </button>
          </p>
        </div>
      </div>

      {showBiometricInfo && (
        <BiometricModal
          onClose={() => setShowBiometricInfo(false)}
          language={language}
        />
      )}
    </div>
  );
};

export default RegisterScreen;
