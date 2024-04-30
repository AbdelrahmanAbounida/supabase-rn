import "react-native-url-polyfill/auto";
// import "react-native-get-random-values";
import * as SecureStore from "expo-secure-store";
import * as aesjs from "aes-js";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { Platform } from "react-native";

class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1)
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    if (Platform.OS !== "web") {
      await SecureStore.setItemAsync(
        key,
        aesjs.utils.hex.fromBytes(encryptionKey)
      );
    }
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async _decrypt(key: string, value: string) {
    let encryptionKeyHex;
    if (Platform.OS !== "web") {
      encryptionKeyHex = await SecureStore.getItemAsync(key);
      if (!encryptionKeyHex) {
        return encryptionKeyHex;
      }
    } else {
      encryptionKeyHex = await AsyncStorage.getItem(key);
      if (!encryptionKeyHex) {
        return encryptionKeyHex;
      }
    }
    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1)
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) {
      return encrypted;
    }

    return await this._decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);

    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync(key);
    }
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);

    await AsyncStorage.setItem(key, encrypted);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(), // Platform.OS !== "web" ?new LargeSecureStore(): AsyncStorage, // AsyncStorage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
