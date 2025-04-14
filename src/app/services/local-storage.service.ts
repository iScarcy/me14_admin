import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): string | null {
    const value = localStorage.getItem(key);
    return value ? value : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
