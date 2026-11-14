import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Token storage.
 *
 * Native: expo-secure-store (iOS Keychain / Android Keystore-backed
 * EncryptedSharedPreferences), readable only after first unlock on this
 * device and excluded from iCloud backup.
 *
 * Web preview: tokens are kept in memory only — never in localStorage or
 * cookies — so a page reload signs the user out. The web build is for design
 * review, not a supported patient platform.
 */
const memory = new Map<string, string>();

const options: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
};

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    if (Platform.OS === 'web') return memory.get(key) ?? null;
    return SecureStore.getItemAsync(key, options);
  },
  async set(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      memory.set(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value, options);
  },
  async remove(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      memory.delete(key);
      return;
    }
    await SecureStore.deleteItemAsync(key, options);
  },
};

export const SESSION_KEY = 'es.session.v1';
