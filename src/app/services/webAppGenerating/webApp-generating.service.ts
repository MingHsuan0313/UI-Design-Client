import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export default class WebAppGeneratingService {
  // base url
  baseUrl: string = "webapp";

  constructor(private httpClientService: HttpClientService) {}

  /**
   * Trigger web app generating Jenkins job.
   */
  triggerJenkinsGenerateWebApp(projectName: string) {
    let url = `${this.baseUrl}/generate`;
    let params: HttpParams = new HttpParams()
                                .set("projectName", projectName);

    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }

  /**
   * Get current status info of the web app generating Jenkins job.
   */
  getCurrentStatus(instanceId: string) {
    let url = `${this.baseUrl}/getCurrentGeneratingState`;
    let params: HttpParams = new HttpParams()
                                .set("instanceId", instanceId);

    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }
}