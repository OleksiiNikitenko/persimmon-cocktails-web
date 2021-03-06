import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {
  localStorage: Storage;
  constructor() {
    this.localStorage = sessionStorage
  }
  getItem(key: string): T | null {
    if (this.isLocalStorageSupported) {
      let temp = this.localStorage.getItem(key)
      if (temp != null) {
        return JSON.parse(temp)
      }
    }
    return null;
  }
  setItem(key: string, value: T): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  removeItem(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  isPresent(key: string): boolean {
    if (this.isLocalStorageSupported) {
      let temp = this.localStorage.getItem(key)

      return temp != null;
    }
    return false;
  }
}
