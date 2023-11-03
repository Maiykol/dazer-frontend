import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ClassificationResult, SubsampleResult } from './interfaces';


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

  public getFileColumnsSubsampling(subsamplingId: string): Promise<any> {
    const request = `${this.API}file_columns_subsampling/${subsamplingId}`;
    return this.getRequest(request);
  }

  public startSubsampling(session_id: string, filename: string, keepRatioColumns: string[], ratio: number): Promise<any> {
    const request = `${this.API}subsample/${session_id}/${filename}`;
    const payload = {
      keepRatioColumns,
      ratio
    }

    return this.postRequest(request, payload);
  }

  public getSubsamplingResult(subsamplingId: string): Promise<SubsampleResult> {
    const request = `${this.API}subsample_result/${subsamplingId}`;
    return this.getRequest(request);
  }

  public startClassificationTask(subsampleId: string, targetColumn: string, targetValue: string): Promise<any> {
    const request = `${this.API}classification/${subsampleId}`;
    const payload = {
      targetColumn,
      targetValue
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
