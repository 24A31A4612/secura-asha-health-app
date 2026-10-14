import { INITIAL_HOUSEHOLDS, INITIAL_VISITS } from './seedData';
import { Household, Visit, User, SyncQueueItem, ChatMessage } from '../types';

const DB_NAME = 'SecuraAshaHealthDB';
const DB_VERSION = 2;

// Password hashing using native Web Crypto API (SHA-256)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_secura_salt_v1');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

class DatabaseManager {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase> | null = null;

  async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB not supported in this environment'));
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'email' });
          userStore.createIndex('id', 'id', { unique: true });
        }

        if (!db.objectStoreNames.contains('households')) {
          const hhStore = db.createObjectStore('households', { keyPath: 'id' });
          hhStore.createIndex('householdNumber', 'householdNumber', { unique: false });
          hhStore.createIndex('riskLevel', 'riskLevel', { unique: false });
        }

        if (!db.objectStoreNames.contains('visits')) {
          const visitStore = db.createObjectStore('visits', { keyPath: 'id' });
          visitStore.createIndex('scheduledDate', 'scheduledDate', { unique: false });
          visitStore.createIndex('status', 'status', { unique: false });
        }

        if (!db.objectStoreNames.contains('syncQueue')) {
          db.createObjectStore('syncQueue', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('chatMessages')) {
          db.createObjectStore('chatMessages', { keyPath: 'id' });
        }
      };

      request.onsuccess = async () => {
        this.db = request.result;
        await this.seedInitialDataIfEmpty();
        resolve(this.db);
      };

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };
    });

    return this.initPromise;
  }

  private async seedInitialDataIfEmpty() {
    try {
      const households = await this.getAll<Household>('households');
      if (households.length === 0) {
        for (const hh of INITIAL_HOUSEHOLDS) {
          await this.put('households', hh);
        }
      }

      const visits = await this.getAll<Visit>('visits');
      if (visits.length === 0) {
        for (const v of INITIAL_VISITS) {
          await this.put('visits', v);
        }
      }
    } catch (err) {
      console.warn('Initial seeding note:', err);
    }
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(storeName: string, key: IDBValidKey): Promise<T | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async put<T>(storeName: string, value: T): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(value);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(storeName: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const secDB = new DatabaseManager();
