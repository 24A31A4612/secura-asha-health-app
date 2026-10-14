import { User } from '../types';
import { Repository } from '../database/repository';
import { secDB, hashPassword } from '../database/db';

const CURRENT_USER_KEY = 'secura_authenticated_session';

export const isWebAuthnSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.PublicKeyCredential !== undefined &&
    typeof window.PublicKeyCredential === 'function'
  );
};

export const AuthService = {
  // Check if default demo account is initialized
  async ensureDemoAccount(): Promise<void> {
    try {
      const demoEmail = 'asha.sarala@health.gov.in';
      const existing = await secDB.get('users', demoEmail);
      if (!existing) {
        const passwordHash = await hashPassword('Secura@2026');
        const demoUser: User = {
          id: 'asha-demo-01',
          email: demoEmail,
          fullName: 'Sarala Devi (ASHA)',
          ashaId: 'ASHA-TS-4829',
          subCentre: 'Rampur Sub-Centre / PHC',
          village: 'Rampur Ward 3',
          phone: '+91 98765 12345',
          biometricEnrolled: true,
          biometricCredentialId: 'webauthn-demo-credential-asha-01',
          createdAt: '2026-01-01T00:00:00Z',
          lastLoginAt: new Date().toISOString()
        };
        await secDB.put('users', {
          ...demoUser,
          passwordHash
        });
      }
    } catch (err) {
      console.warn('Demo account check note:', err);
    }
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      if (!data) return null;
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (err) {
      console.error('Failed to set current user:', err);
    }
  },

  async register(params: {
    fullName: string;
    email: string;
    ashaId: string;
    subCentre: string;
    village: string;
    phone: string;
    passwordPlain: string;
    enableBiometricPasskey?: boolean;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    let credentialId: string | undefined = undefined;

    if (params.enableBiometricPasskey && isWebAuthnSupported()) {
      try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
          challenge,
          rp: {
            name: 'Secura ASHA Health',
            id: window.location.hostname
          },
          user: {
            id: Uint8Array.from(params.email, c => c.charCodeAt(0)),
            name: params.email,
            displayName: params.fullName
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }, { alg: -257, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'preferred'
          },
          timeout: 60000,
          attestation: 'none'
        };

        const credential = (await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions
        })) as PublicKeyCredential;

        if (credential) {
          credentialId = credential.id;
        }
      } catch (err: any) {
        // Do not block registration if biometric fails or is cancelled
        console.warn('Biometric registration optional step skipped or unsupported:', err.message);
      }
    }

    const result = await Repository.registerUser({
      ...params,
      biometricCredentialId: credentialId
    });

    if (result.success && result.user) {
      this.setCurrentUser(result.user);
    }

    return result;
  },

  async loginWithEmail(email: string, passwordPlain: string): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.ensureDemoAccount();
    const result = await Repository.authenticateEmailPassword(email, passwordPlain);
    if (result.success && result.user) {
      this.setCurrentUser(result.user);
    }
    return result;
  },

  async loginWithBiometrics(email?: string): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.ensureDemoAccount();

    const targetEmail = email || this.getCurrentUser()?.email || 'asha.sarala@health.gov.in';

    if (!isWebAuthnSupported()) {
      return {
        success: false,
        error: 'Hardware biometric authentication is not supported on this browser/device. Please use your secure password.'
      };
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        timeout: 60000,
        userVerification: 'preferred',
        rpId: window.location.hostname
      };

      const assertion = await navigator.credentials.get({
        publicKey: credentialRequestOptions
      });

      if (assertion) {
        const result = await Repository.authenticateBiometricUser(targetEmail);
        if (result.success && result.user) {
          this.setCurrentUser(result.user);
          return { success: true, user: result.user };
        }
      }

      // If user cancelled or simulated fallback
      return { success: false, error: 'Biometric verification was cancelled or failed.' };
    } catch (err: any) {
      // In dev or iframe sandboxes where WebAuthn might throw NotAllowedError:
      // Provide an authentic, graceful message
      if (err.name === 'NotAllowedError' || err.name === 'SecurityError') {
        return {
          success: false,
          error: 'Biometric prompt was cancelled or permission denied by platform. Please use password sign-in.'
        };
      }
      return { success: false, error: err.message || 'Biometric authentication failed.' };
    }
  },

  logout(): void {
    this.setCurrentUser(null);
  }
};
