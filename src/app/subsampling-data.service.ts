import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsamplingDataService {

  private _subsamplingModalFilename = new Subject<string>();
  get subsamplingModalFilename$() {
    return this._subsamplingModalFilename.asObservable();
  }
  set subsamplingModalFilename(filename: string) {
    this._subsamplingModalFilename.next(filename);
  }

  private _fileMenuRefreshFlag = new Subject<boolean>();
  get fileMenuRefreshFlag$() {
    return this._fileMenuRefreshFlag.asObservable();
  }
  set fileMenuRefreshFlag(flag: boolean) {
    this._fileMenuRefreshFlag.next(flag);
  }


  constructor() { }


}
