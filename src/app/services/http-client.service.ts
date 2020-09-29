import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // UI-Design-Server url
  url: string;

  // UI-Design-Server port 
  port: string;


  constructor(private httpClient: HttpClient) {
    this.port = "8080";
    this.url = `http://localhost:${this.port}/selab/`;
  }
    
  httpGet(endPointUrl: string, params: HttpParams) {
    let uri = this.url + endPointUrl;

    return this.httpClient.get(uri, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true,
      responseType: "text",
      params: params
    })
  }
}
