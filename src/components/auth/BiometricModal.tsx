import React from 'react';
import { X, ShieldCheck, Fingerprint, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../../types';
import { useTranslation } from '../../services/i18n';
import { isWebAuthnSupported } from '../../services/authService';

interface BiometricModalProps {
  onClose: () => void;
  language: Language;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({ onClose, language }) => {
  const t = useTranslation(language);
  const supported = isWebAuthnSupported();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#D8E5EA] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B3558] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="w-5 h-5 text-[#14B8A6]" />
            <h2 className="text-base font-bold">Biometric & Passkey Security</h2>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Status badge */}
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
            supported
              ? 'bg-[#EAF7F6] border-teal-200 text-[#0B3558]'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {supported ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span className="font-semibold">Hardware WebAuthn / Passkeys supported on this browser.</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold">WebAuthn hardware not detected on this browser session. Password authentication is active.</span>
              </>
            )}
          </div>

          <div className="space-y-3 text-xs text-[#183247] leading-relaxed">
            <div className="p-3 bg-[#EEF4F8] rounded-xl border border-[#D8E5EA] space-y-1">
              <span className="font-bold text-[#0B3558] block">1. Hardware-Level Verification (FIDO2 / WebAuthn):</span>
              <p>
                When you sign in using your fingerprint or screen lock, verification is performed strictly inside your device’s secure hardware enclave (TEE/Secure Enclave).
              </p>
            </div>

            <div className="p-3 bg-[#EEF4F8] rounded-xl border border-[#D8E5EA] space-y-1">
              <span className="font-bold text-[#0B3558] block">2. Zero Raw Biometric Data Stored:</span>
              <p>
                Secura never captures, stores, or transmits raw fingerprint images, facial photos, or biometric templates. The server only validates a standard cryptographic cryptographic signature.
              </p>
            </div>

            <div className="p-3 bg-[#EEF4F8] rounded-xl border border-[#D8E5EA] space-y-1">
              <span className="font-bold text-[#0B3558] block">3. Anti-Spoofing & No Insecure Face Matching:</span>
              <p>
                We strictly reject insecure browser webcam face matching as proof of identity. Only OS-verified biometric hardware or secure passkeys are accepted.
              </p>
            </div>

            <div className="p-3 bg-[#EEF4F8] rounded-xl border border-[#D8E5EA] space-y-1">
              <span className="font-bold text-[#0B3558] block">4. Universal Fallback:</span>
              <p>
                Devices without biometric sensors can always sign in securely using their password.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EEF4F8] border-t border-[#D8E5EA] px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0B3558] hover:bg-[#082A46] rounded-xl transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiometricModal;
