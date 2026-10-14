import React, { useState } from 'react';
import { User, Language } from '../types';
import { useTranslation, setStoredLanguage } from '../services/i18n';
import { isWebAuthnSupported, AuthService } from '../services/authService';
import { Repository } from '../database/repository';
import {
  Globe,
  User as UserIcon,
  ShieldCheck,
  Fingerprint,
  Database,
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import BiometricModal from '../components/auth/BiometricModal';

interface SettingsPageProps {
  user: User;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSignOut: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  language,
  onLanguageChange,
  onSignOut
}) => {
  const t = useTranslation(language);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(user.biometricEnrolled || false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const hasWebAuthn = isWebAuthnSupported();

  const handleToggleBiometrics = async () => {
    if (!hasWebAuthn) {
      setShowBiometricModal(true);
      return;
    }

    if (!biometricEnabled) {
      try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const credential = (await navigator.credentials.create({
          publicKey: {
            challenge,
            rp: { name: 'Secura ASHA Health', id: window.location.hostname },
            user: {
              id: Uint8Array.from(user.email, c => c.charCodeAt(0)),
              name: user.email,
              displayName: user.fullName
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            authenticatorSelection: { userVerification: 'preferred' },
            timeout: 60000,
            attestation: 'none'
          }
        })) as PublicKeyCredential;

        if (credential) {
          await Repository.updateBiometricStatus(user.email, true, credential.id);
          setBiometricEnabled(true);
          setStatusMessage('Biometric passkey enrolled successfully for this device!');
        }
      } catch (err: any) {
        setStatusMessage('Biometric enrollment cancelled or not completed.');
      }
    } else {
      await Repository.updateBiometricStatus(user.email, false);
      setBiometricEnabled(false);
      setStatusMessage('Biometric authentication removed.');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B3558]">
          {t.settingsTitle}
        </h1>
        <p className="text-xs text-[#607887]">
          Frontline worker profile, device credentials, and language customization
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#EAF7F6] border border-teal-200 rounded-2xl flex items-center gap-2 text-xs text-[#0B3558]">
          <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Language Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D8E5EA] pb-3">
          <Globe className="w-5 h-5 text-[#0D9488]" />
          <h2 className="text-sm font-bold text-[#0B3558]">
            {t.languageSection}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onLanguageChange('en')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              language === 'en'
                ? 'bg-[#EAF7F6] border-[#0D9488] text-[#0B3558] shadow-xs'
                : 'border-[#D8E5EA] hover:bg-slate-50 text-[#183247]'
            }`}
          >
            <span className="text-sm font-bold block">English</span>
            <span className="text-[11px] text-[#607887] mt-0.5 block">Standard National Guidelines</span>
          </button>

          <button
            onClick={() => onLanguageChange('te')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              language === 'te'
                ? 'bg-[#EAF7F6] border-[#0D9488] text-[#0B3558] shadow-xs'
                : 'border-[#D8E5EA] hover:bg-slate-50 text-[#183247]'
            }`}
          >
            <span className="text-sm font-bold block">తెలుగు (Telugu)</span>
            <span className="text-[11px] text-[#607887] mt-0.5 block">ఆంధ్రప్రదేశ్ / తెలంగాణ భాష</span>
          </button>

          <button
            onClick={() => onLanguageChange('hi')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              language === 'hi'
                ? 'bg-[#EAF7F6] border-[#0D9488] text-[#0B3558] shadow-xs'
                : 'border-[#D8E5EA] hover:bg-slate-50 text-[#183247]'
            }`}
          >
            <span className="text-sm font-bold block">हिन्दी (Hindi)</span>
            <span className="text-[11px] text-[#607887] mt-0.5 block">राष्ट्रीय स्वास्थ्य मिशन भाषा</span>
          </button>
        </div>
      </div>

      {/* ASHA Profile Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#D8E5EA] pb-3">
          <UserIcon className="w-5 h-5 text-[#0D9488]" />
          <h2 className="text-sm font-bold text-[#0B3558]">
            {t.profileSection}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#607887] font-medium block">ASHA Worker Name</span>
            <span className="text-[#183247] font-bold text-sm block mt-0.5">{user.fullName}</span>
          </div>

          <div>
            <span className="text-[#607887] font-medium block">ASHA Worker Code</span>
            <span className="text-[#0D9488] font-bold text-sm block mt-0.5">{user.ashaId}</span>
          </div>

          <div>
            <span className="text-[#607887] font-medium block">Email Address</span>
            <span className="text-[#183247] font-semibold block mt-0.5">{user.email}</span>
          </div>

          <div>
            <span className="text-[#607887] font-medium block">Phone Number</span>
            <span className="text-[#183247] font-semibold block mt-0.5">{user.phone}</span>
          </div>

          <div>
            <span className="text-[#607887] font-medium block">Sub-Centre / PHC</span>
            <span className="text-[#183247] font-semibold block mt-0.5">{user.subCentre}</span>
          </div>

          <div>
            <span className="text-[#607887] font-medium block">Assigned Village / Ward</span>
            <span className="text-[#183247] font-semibold block mt-0.5">{user.village}</span>
          </div>
        </div>
      </div>

      {/* Biometric & Device Security */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8E5EA] pb-3">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="w-5 h-5 text-[#0D9488]" />
            <h2 className="text-sm font-bold text-[#0B3558]">
              {t.deviceSection}
            </h2>
          </div>
          <button
            onClick={() => setShowBiometricModal(true)}
            className="text-[11px] font-bold text-[#0D9488] hover:underline"
          >
            Security Info
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#EEF4F8] rounded-2xl border border-[#D8E5EA]">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0B3558] block">
              Device Passkey / Fingerprint Sign-In
            </span>
            <p className="text-[11px] text-[#607887] max-w-md">
              {biometricEnabled
                ? 'Passkey credentials enrolled on this hardware device.'
                : 'Enable native biometric/passkey verification for fast one-tap sign-in.'}
            </p>
          </div>

          <button
            onClick={handleToggleBiometrics}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              biometricEnabled
                ? 'bg-white text-[#B42318] border border-red-200 hover:bg-red-50'
                : 'bg-[#0B3558] text-white hover:bg-[#082A46]'
            }`}
          >
            {biometricEnabled ? 'Remove Passkey' : 'Enable Passkey'}
          </button>
        </div>
      </div>

      {/* Sign Out Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#B42318] block">Sign Out Session</span>
          <p className="text-[11px] text-[#607887]">
            Local offline database remains safely encrypted on this device.
          </p>
        </div>
        <button
          onClick={onSignOut}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-[#B42318] border border-red-200 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.signOut}</span>
        </button>
      </div>

      {showBiometricModal && (
        <BiometricModal
          onClose={() => setShowBiometricModal(false)}
          language={language}
        />
      )}
    </div>
  );
};

export default SettingsPage;
