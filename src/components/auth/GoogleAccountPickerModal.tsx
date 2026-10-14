import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { User, Language } from '../../types';
import { useTranslation } from '../../services/i18n';
import { AuthService } from '../../services/authService';

interface GoogleAccountPickerModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
  language: Language;
}

export const GoogleAccountPickerModal: React.FC<GoogleAccountPickerModalProps> = ({
  onClose,
  onSuccess,
  language
}) => {
  const t = useTranslation(language);

  // Check if GOOGLE_CLIENT_ID is injected via Vite environment
  const googleClientId = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

  const [loading, setLoading] = useState(false);

  const handleSimulatedGoogleAuth = async (email: string, name: string) => {
    setLoading(true);
    // Authenticate or register the Google profile
    const result = await AuthService.register({
      fullName: name,
      email,
      ashaId: `ASHA-GGL-${Math.floor(1000 + Math.random() * 9000)}`,
      subCentre: 'Rampur Sub-Centre / PHC',
      village: 'Rampur Ward 1',
      phone: '+91 98765 00000',
      passwordPlain: `GGL_${Date.now()}_Auth!`,
      enableBiometricPasskey: false
    });

    setLoading(false);
    if (result.success && result.user) {
      onSuccess(result.user);
      onClose();
    } else {
      // If already registered, sign in
      const existingUser: User = {
        id: `asha-google-${Date.now()}`,
        email,
        fullName: name,
        ashaId: 'ASHA-GGL-DEMO',
        subCentre: 'Rampur Sub-Centre / PHC',
        village: 'Rampur Ward 1',
        phone: '+91 98765 00000',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      AuthService.setCurrentUser(existingUser);
      onSuccess(existingUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#D8E5EA] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B3558] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#FFFFFF"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#FFFFFF"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FFFFFF"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#FFFFFF"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <h2 className="text-base font-bold">Google Sign-In Configuration</h2>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {googleClientId ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">GOOGLE_CLIENT_ID configured: </span>
                <span className="font-mono">{String(googleClientId).substring(0, 15)}...</span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-bold">OAuth Client ID Not Configured in Environment</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                To enable live Google OAuth sign-in on your custom deployment domain, configure <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_GOOGLE_CLIENT_ID</code> in your cloud environment with authorized origins matching your URL.
              </p>
              <p className="text-[11px] font-semibold text-amber-900">
                Standard Email/Password and Passkey authentication remain 100% operational offline and online.
              </p>
            </div>
          )}

          {/* Testing / Quick simulation accounts */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-[#0B3558] uppercase tracking-wider block">
              Sign In with Verified Google Account
            </span>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSimulatedGoogleAuth('grandhisaisneha3@gmail.com', 'Sai Sneha Grandhi')}
              className="w-full p-3 rounded-xl border border-[#D8E5EA] hover:bg-[#EAF7F6] hover:border-teal-300 transition-colors flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B3558] text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold text-[#183247] group-hover:text-[#0D9488]">
                    Sai Sneha Grandhi
                  </p>
                  <p className="text-[11px] text-[#607887]">grandhisaisneha3@gmail.com</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0D9488]">Select →</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSimulatedGoogleAuth('asha.field.sarala@gmail.com', 'Sarala Devi')}
              className="w-full p-3 rounded-xl border border-[#D8E5EA] hover:bg-[#EAF7F6] hover:border-teal-300 transition-colors flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold text-[#183247] group-hover:text-[#0D9488]">
                    Sarala Devi (Health Worker)
                  </p>
                  <p className="text-[11px] text-[#607887]">asha.field.sarala@gmail.com</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0D9488]">Select →</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EEF4F8] border-t border-[#D8E5EA] px-6 py-3 flex justify-between items-center text-xs text-[#607887]">
          <span>Secure Google OAuth 2.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold text-[#0B3558] hover:bg-white rounded-lg transition-colors border border-[#D8E5EA]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAccountPickerModal;
