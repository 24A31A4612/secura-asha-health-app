import { secDB, hashPassword } from './db';
import { Household, Visit, User, SyncQueueItem, RiskLevel } from '../types';

export const Repository = {
  // Households
  async getHouseholds(): Promise<Household[]> {
    return await secDB.getAll<Household>('households');
  },

  async getHouseholdById(id: string): Promise<Household | null> {
    return await secDB.get<Household>('households', id);
  },

  async saveHousehold(household: Household, isOffline: boolean = false): Promise<boolean> {
    try {
      const updatedHousehold = {
        ...household,
        syncedToCloud: !isOffline,
        updatedAt: new Date().toISOString()
      };
      await secDB.put('households', updatedHousehold);

      if (isOffline) {
        const queueItem: SyncQueueItem = {
          id: `sync-hh-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          type: 'ADD_HOUSEHOLD',
          payload: updatedHousehold,
          timestamp: Date.now(),
          synced: false
        };
        await secDB.put('syncQueue', queueItem);
      }

      return true;
    } catch (err) {
      console.error('Failed to save household:', err);
      return false;
    }
  },

  // Visits
  async getVisits(): Promise<Visit[]> {
    const visits = await secDB.getAll<Visit>('visits');
    // Sort by priority: CRITICAL first, then HIGH, then DUE_TODAY, then OVERDUE
    return visits.sort((a, b) => {
      const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, NORMAL: 3 };
      const statusOrder = { OVERDUE: 0, DUE_TODAY: 1, UPCOMING: 2, COMPLETED: 3 };

      if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
      if (b.status === 'COMPLETED' && a.status !== 'COMPLETED') return -1;

      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;

      return statusOrder[a.status] - statusOrder[b.status];
    });
  },

  async completeVisit(
    visitId: string,
    notes: string,
    vitals?: Visit['vitals'],
    dangerSigns?: string[],
    isOffline: boolean = false
  ): Promise<boolean> {
    try {
      const visit = await secDB.get<Visit>('visits', visitId);
      if (!visit) return false;

      const updatedVisit: Visit = {
        ...visit,
        status: 'COMPLETED',
        completedDate: new Date().toISOString(),
        notes,
        vitals,
        dangerSignsDetected: dangerSigns,
        syncedToCloud: !isOffline
      };

      await secDB.put('visits', updatedVisit);

      if (isOffline) {
        const queueItem: SyncQueueItem = {
          id: `sync-vis-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          type: 'COMPLETE_VISIT',
          payload: updatedVisit,
          timestamp: Date.now(),
          synced: false
        };
        await secDB.put('syncQueue', queueItem);
      }

      return true;
    } catch (err) {
      console.error('Failed to complete visit:', err);
      return false;
    }
  },

  // Sync Queue
  async getSyncQueue(): Promise<SyncQueueItem[]> {
    return await secDB.getAll<SyncQueueItem>('syncQueue');
  },

  async processSyncQueue(): Promise<{ processed: number; success: boolean }> {
    try {
      const items = await secDB.getAll<SyncQueueItem>('syncQueue');
      if (items.length === 0) return { processed: 0, success: true };

      // In a real online scenario or with server proxy, dispatch each item
      for (const item of items) {
        if (item.type === 'ADD_HOUSEHOLD' || item.type === 'UPDATE_HOUSEHOLD') {
          const hh = item.payload as Household;
          await secDB.put('households', { ...hh, syncedToCloud: true });
        } else if (item.type === 'COMPLETE_VISIT') {
          const vis = item.payload as Visit;
          await secDB.put('visits', { ...vis, syncedToCloud: true });
        }
        await secDB.delete('syncQueue', item.id);
      }

      return { processed: items.length, success: true };
    } catch (err) {
      console.error('Sync queue failed:', err);
      return { processed: 0, success: false };
    }
  },

  // User Accounts
  async registerUser(userData: {
    email: string;
    passwordPlain: string;
    fullName: string;
    ashaId: string;
    subCentre: string;
    village: string;
    phone: string;
    biometricCredentialId?: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const existing = await secDB.get<any>('users', userData.email.toLowerCase().trim());
      if (existing) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const passwordHash = await hashPassword(userData.passwordPlain);
      const newUser: User = {
        id: `asha-${Date.now()}`,
        email: userData.email.toLowerCase().trim(),
        fullName: userData.fullName.trim(),
        ashaId: userData.ashaId.trim(),
        subCentre: userData.subCentre.trim(),
        village: userData.village.trim(),
        phone: userData.phone.trim(),
        biometricEnrolled: !!userData.biometricCredentialId,
        biometricCredentialId: userData.biometricCredentialId,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      // Store in users table with hashed password
      await secDB.put('users', {
        ...newUser,
        passwordHash
      });

      return { success: true, user: newUser };
    } catch (err: any) {
      console.error('Registration error:', err);
      return { success: false, error: err.message || 'Registration failed' };
    }
  },

  async authenticateEmailPassword(
    email: string,
    passwordPlain: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const record = await secDB.get<any>('users', email.toLowerCase().trim());
      if (!record) {
        return { success: false, error: 'Account not found. Please check your email or register.' };
      }

      const computedHash = await hashPassword(passwordPlain);
      if (computedHash !== record.passwordHash) {
        return { success: false, error: 'Incorrect password. Please verify and try again.' };
      }

      // Update last login
      const updatedUser: User = {
        id: record.id,
        email: record.email,
        fullName: record.fullName,
        ashaId: record.ashaId,
        subCentre: record.subCentre,
        village: record.village,
        phone: record.phone,
        avatarUrl: record.avatarUrl,
        biometricEnrolled: record.biometricEnrolled,
        biometricCredentialId: record.biometricCredentialId,
        createdAt: record.createdAt,
        lastLoginAt: new Date().toISOString()
      };

      await secDB.put('users', { ...record, lastLoginAt: updatedUser.lastLoginAt });

      return { success: true, user: updatedUser };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication error' };
    }
  },

  async authenticateBiometricUser(
    email: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const record = await secDB.get<any>('users', email.toLowerCase().trim());
      if (!record) {
        return { success: false, error: 'User not found.' };
      }

      const user: User = {
        id: record.id,
        email: record.email,
        fullName: record.fullName,
        ashaId: record.ashaId,
        subCentre: record.subCentre,
        village: record.village,
        phone: record.phone,
        avatarUrl: record.avatarUrl,
        biometricEnrolled: record.biometricEnrolled,
        biometricCredentialId: record.biometricCredentialId,
        createdAt: record.createdAt,
        lastLoginAt: new Date().toISOString()
      };

      return { success: true, user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Biometric authentication error' };
    }
  },

  async updateBiometricStatus(email: string, enrolled: boolean, credentialId?: string): Promise<boolean> {
    try {
      const record = await secDB.get<any>('users', email.toLowerCase().trim());
      if (!record) return false;

      record.biometricEnrolled = enrolled;
      record.biometricCredentialId = credentialId;
      await secDB.put('users', record);
      return true;
    } catch (err) {
      console.error('Failed to update biometric status', err);
      return false;
    }
  }
};
