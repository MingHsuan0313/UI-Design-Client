import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { fakeServiceComponents } from "../../fakedata/fakeServiceComponents";
import { ServiceComponentModel } from "../models/model";

@Injectable({
  providedIn: 'root'
})
export default class ServiceComponentService {

  serviceComponents: ServiceComponentModel[];
  selectedServiceComponent: ServiceComponentModel;
  isMatchMaking: Boolean;

  constructor(private httpClient: HttpClient) {
    // it will use http service in the future
    // this.serviceComponents = fakeServiceComponents;
    this.serviceComponents = []
    this.isMatchMaking = false;
    console.log("Get services from server");
    console.log(this.serviceComponents);
  }

  setIsMatchMaking(isMatchMaking) {
    this.isMatchMaking = isMatchMaking;
  }

  getServiceComponents() {
    return this.serviceComponents;
  }

  queryServer(uiCategory,parameters,matchmaking) {
    console.log("Query Server for service components");
    console.log(this);
    let responseJson;
    let url = `http://localhost:8080/?uiCategory=${uiCategory}&parameters=${parameters}&matchmaking=${matchmaking}`;
    console.log("url = " + url);
    if (matchmaking) {
      // will use ui component category and argument length
      responseJson = this.httpClient.get(url, {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      })
    }
    else {
      responseJson = this.httpClient.get(url, {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      })
    }
    console.log(responseJson);
    return "111"
  }
}
