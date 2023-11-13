import { Injectable } from '@angular/core';
import { SessionResponse, StorageKeys } from './interfaces';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageKey = window.location.host + '.'

  constructor(private backend: BackendService) { }

  public set(key: StorageKeys, value: string) {
    /** Reads keys to local storage */
    localStorage.setItem(`${this.localStorageKey}.${key}`, value);
  }

  public async get(key: StorageKeys): Promise<string> {

    let sessionId: string | null = localStorage.getItem(`${this.localStorageKey}.${key}`);
    if (sessionId === null) {
      const sessionResponse: SessionResponse = await this.backend.getSessionId();
      sessionId = sessionResponse.session
      this.set('sessionId', sessionId);
    }

    console.log(sessionId)

    /** Reads keys from local storage */
    return sessionId!;
  }

}