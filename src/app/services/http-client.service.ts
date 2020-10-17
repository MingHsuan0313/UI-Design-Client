import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // UI-Design-Server url
  uiDesignServerUrl: string;

  // Matchmaking Server Url
  matchMakingServerUrl: string;
  
  // Jenkins Server Url
  jenkinsServerUrl: string;


  constructor(private httpClient: HttpClient) {
    this.jenkinsServerUrl = `http://localhost:8080/`
    this.uiDesignServerUrl = `http://localhost:8081/selab/`;
    this.matchMakingServerUrl = `http://localhost:8082/`;
  }

  httpGet(endPointUrl: string, params: HttpParams,serverType: string) {
    let urlPrefix = "";
    if(serverType == "matchMakingServer")
      urlPrefix = this.matchMakingServerUrl;
    else if(serverType == "uiDesignServer")
      urlPrefix = this.uiDesignServerUrl;

    let uri = urlPrefix + endPointUrl;
    console.log("get here")
    console.log(params)

    return this.httpClient.get(uri, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true,
      responseType: "text",
      params: params
    })
  }

  httpPost(endPointUrl: string, requestBody: Object,serverType: string) {
    let urlPrefix = "";
    if(serverType == "matchMakingServer")
      urlPrefix = this.matchMakingServerUrl;
    else if(serverType == "uiDesignServer")
      urlPrefix = this.uiDesignServerUrl;

    let uri = urlPrefix + endPointUrl;
    return this.httpClient.post(uri,
      requestBody,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      });
  }

  triggerJenkinsBuild(endPointUrl: string, params: HttpParams) {
    // Jenkins Server
    let uri = this.jenkinsServerUrl + endPointUrl;


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
