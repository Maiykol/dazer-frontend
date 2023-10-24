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
    sessionStorage.setItem(`${this.localStorageKey}.${key}`, value);
  }

  public get(key: StorageKeys) {
    /** Reads keys from local storage */
    return sessionStorage.getItem(`${this.localStorageKey}.${key}`);
  }

}