import CryptoJS from 'crypto-js';
import { IValueWithExpires } from '../models/StorageModels';

class DataStorage {
  private secretKey: string;

  constructor() {
    this.secretKey = import.meta.env.VITE_STORAGE_SECRET_KEY;
  }

  public set<T>(key: string, value: T, expiresIn?: number): void {

    const result: IValueWithExpires<T> = {
      value: value,
      expires: null
    }

    if(expiresIn){
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expiresIn * 1000);
        result.expires = expirationDate;
    }

    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(result), this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  public get<T>(key: string): T | null {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, this.secretKey).toString(CryptoJS.enc.Utf8);

      try {
        const result = JSON.parse(decryptedValue) as IValueWithExpires<T>;
        if ((result.expires && new Date(result.expires) > new Date()) || result.expires === null) {
          return result.value;
        } else {
          this.remove(key);
        }        
      }
      catch {
        this.remove(key);
        return null;
      }
    }
    return null;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public exist(key: string): boolean {
    return this.get(key) !== null; 
  }
}

export default new DataStorage();