import { Injectable } from '@angular/core';
import { StorageKeys } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageKey = window.location.host + '.'

  constructor() { }

  public set(key: StorageKeys, value: string) {
    /** Reads keys to local storage */
    localStorage.setItem(`${this.localStorageKey}.${key}`, value);
  }

  public get(key: StorageKeys) {
    /** Reads keys from local storage */
    return localStorage.getItem(`${this.localStorageKey}.${key}`);
  }

}