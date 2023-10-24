import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  API = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }

  private async getRequest(request: string): Promise<any> {
    try {
      const response = lastValueFrom(this.http.get<any>(request));
      return response;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  private postRequest(request: string, payload: any): any {
    try {
      const response = lastValueFrom(
        this.http.post<any>(request, payload)
      );
      return response;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  public getSessionId(): Promise<any> {
    const request = `${this.API}session_id`;
    return this.getRequest(request);
  }

  public getSessionFiles(session_id: string): Promise<any> {
    const request = `${this.API}session_files/${session_id}`;
    return this.getRequest(request);
  }

  public getFileColumns(session_id: string, filename: string): Promise<any> {
    const request = `${this.API}file_columns/${session_id}/${filename}`;
    return this.getRequest(request);
  }

  public startSubsampling(session_id: string, filename: string, targetCol: string, keepRatioColumns: string[], ratio: number): Promise<any> {
    const request = `${this.API}subsample/${session_id}/${filename}`;
    const payload = {
      targetCol, 
      keepRatioColumns,
      ratio
    }

    return this.postRequest(request, payload);
  }

  public getSubsamplingResult(subsamplingId: string): Promise<any> {
    const request = `${this.API}subsample_result/${subsamplingId}`;
    return this.getRequest(request);
  }

}
