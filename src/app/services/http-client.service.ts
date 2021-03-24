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
  
  // API Server url
  apiServerUrl: string;

  // Return Service url
  returnServiceUrl: string;


  constructor(private httpClient: HttpClient) {
    this.jenkinsServerUrl = `http://localhost:8080/`
    this.uiDesignServerUrl = `http://140.112.90.144:8081/selab/`;
    // this.matchMakingServerUrl = `http://localhost:8082/`;
    this.matchMakingServerUrl = `http://140.112.90.144:8082/`;
    this.apiServerUrl = `http://140.112.90.144:7122/`;
    this.returnServiceUrl = `http://140.112.90.144:3001/`;
  }

  httpGet(endPointUrl: string, params: HttpParams,serverType: string, requestHeader?: Object) {
    let urlPrefix = "";
    if(serverType == "matchMakingServer")
      urlPrefix = this.matchMakingServerUrl;
    else if(serverType == "uiDesignServer")
      urlPrefix = this.uiDesignServerUrl;
    else if(serverType == "apiServer")
      urlPrefix = this.apiServerUrl;
    else if(serverType == "returnServer")
      urlPrefix = this.returnServiceUrl;

    let uri = urlPrefix + endPointUrl;
    // console.log("get here")
    // console.log(params)
    console.log("uri is " + uri);
    // console.log(uri.length)
    let header = new HttpHeaders().set("Content-Type", "application/json")
    if(requestHeader){
      let requestHeaderKeys = Object.keys(requestHeader)
      for(let index=0; index<requestHeaderKeys.length; index++){
        let requestHeaderKey = requestHeaderKeys[index]
        header = header.set(requestHeaderKey, requestHeader[requestHeaderKey])
      }
    }
    
    return this.httpClient.get(uri, {
      headers: header,
      observe: "response",
      responseType: "text",
      params: params
    })
  }

  httpPost(endPointUrl: string, requestBody: Object,serverType: string, requestHeader?: Object) {
    let urlPrefix = "";
    if(serverType == "matchMakingServer")
      urlPrefix = this.matchMakingServerUrl;
    else if(serverType == "uiDesignServer")
      urlPrefix = this.uiDesignServerUrl;
    else if(serverType == "apiServer")
      urlPrefix = this.uiDesignServerUrl;
    let uri = urlPrefix + endPointUrl;
    let header = new HttpHeaders().set("Content-Type", "application/json")
    if(requestHeader){
      let requestHeaderKeys = Object.keys(requestHeader)
      for(let index=0; index<requestHeaderKeys.length; index++){
        let requestHeaderKey = requestHeaderKeys[index]
        header = header.set(requestHeaderKey, requestHeader[requestHeaderKey])
      }
    }
    return this.httpClient.post(uri,
      requestBody,
      {
        headers: header,
        observe: "response", withCredentials: true, responseType: "text"
      });
  }

  httpDelete(endPointUrl: string, serverType: string, requestHeader?: Object) {
    let urlPrefix = "";
    if(serverType == "matchMakingServer")
      urlPrefix = this.matchMakingServerUrl;
    else if(serverType == "uiDesignServer")
      urlPrefix = this.uiDesignServerUrl;
    else if(serverType == "apiServer")
      urlPrefix = this.uiDesignServerUrl;
    let uri = urlPrefix + endPointUrl;
    let header = new HttpHeaders()

    if(requestHeader){
      let requestHeaderKeys = Object.keys(requestHeader)

      for(let index=0; index<requestHeaderKeys.length; index++){

        let requestHeaderKey = requestHeaderKeys[index]
        header = header.set(requestHeaderKey, requestHeader[requestHeaderKey])
      }
    }
    return this.httpClient.delete(uri,
      {
        headers: header,
        observe: "response", withCredentials: true, responseType: "text"
      }
      );
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
