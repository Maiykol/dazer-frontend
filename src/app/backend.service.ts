import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ClassificationResult, SessionResponse, SubsampleResult } from './interfaces';


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

  public getSessionId(): Promise<SessionResponse> {
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

  public getFileColumnsSubsampling(subsamplingId: string): Promise<any> {
    const request = `${this.API}file_columns_subsampling/${subsamplingId}`;
    return this.getRequest(request);
  }

  public startSubsampling(session_id: string, filename: string, keepRatioColumns: string[], testRatio: number, ratios: number[], nRandomStates: number): Promise<any> {
    const request = `${this.API}subsample/${session_id}/${filename}`;
    console.log('filename', filename)
    const payload = {
      keepRatioColumns,
      testRatio,
      ratios,
      nRandomStates
    }

    return this.postRequest(request, payload);
  }

  public getSubsamplingResult(subsamplingId: string): Promise<SubsampleResult> {
    const request = `${this.API}subsample/result/${subsamplingId}`;
    return this.getRequest(request);
  }

  public getFile(subsamplingId: string): Promise<any> {
    const request = `${this.API}file/${subsamplingId}`;
    return this.getRequest(request);
  }

  public startClassificationTask(subsampleId: string, targetColumn: string, targetValue: string, crossValidationK: number, nRandomStates: number): Promise<any> {
    const request = `${this.API}classification/${subsampleId}`;
    const payload = {
      targetColumn,
      targetValue,
      crossValidationK,
      nRandomStates
    }
    return this.postRequest(request, payload);
  }

  public getClassificationResult(classificationTaskId: string): Promise<any> {
    const request = `${this.API}classification_result/${classificationTaskId}`;
    return this.getRequest(request);
  }

  public getClassificationStatus(classificationTaskId: string): Promise<ClassificationResult> {
    const request = `${this.API}classification_status/${classificationTaskId}`;
    return this.getRequest(request);
  }

}
