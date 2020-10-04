import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // UI-Design-Server url
  urlPrefix: string;

  // UI-Design-Server port 
  port: string;


  constructor(private httpClient: HttpClient) {
    this.port = "8090";
    this.urlPrefix = `http://localhost:${this.port}/selab/`;
  }

  httpGet(endPointUrl: string, params: HttpParams) {
    let uri = this.urlPrefix + endPointUrl;
    console.log("get here")
    console.log(params)

    return this.httpClient.get(uri, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true,
      responseType: "text",
      params: params
    })
  }

  httpPost(endPointUrl: string, requestBody: Object) {
    let uri = this.urlPrefix + endPointUrl;
    return this.httpClient.post(uri,
      requestBody,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      });
  }

  triggerJenkinsBuild(endPointUrl: string, params: HttpParams) {
    // Jenkins Server
    let uri = `http://localhost:8080/${endPointUrl}`;


    console.log("get here")
    console.log(params)
    console.log(uri)

    return this.httpClient.get(uri, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Access-Control-Allow-Origin","*"),
      observe: "response", withCredentials: true,
      responseType: "text",
      params: params
    })
  }


}
