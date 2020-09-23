import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { fakeServiceComponents } from "../../fakedata/fakeServiceComponents";
import { ServiceComponentModel } from "../models/service-component-dependency";

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
    this.selectedServiceComponent = new ServiceComponentModel();

    this.isMatchMaking = false;
    console.log("Get services from server");
    console.log(this.serviceComponents);
  }

  setServiceComponents(serviceComponents) {
    this.serviceComponents = serviceComponents;
  }

  setIsMatchMaking(isMatchMaking) {
    this.isMatchMaking = isMatchMaking;
  }

  getServiceComponents() {
    return this.serviceComponents;
  }

  queryServices(uiCategory, parameters, matchmaking) {
    console.log("Query Server for service components");
    console.log(this);
    let responseJson;
    let url = `http://localhost:8080/getServices/?uiCategory=${uiCategory}&parameters=${parameters}&matchmaking=${matchmaking}`;
    console.log("url = " + url);

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true, responseType: "text"
    })
  }

  queryOutputServices(matchmaking) {
    let url = `http://localhost:8080/getOutputServices/?matchmaking=${matchmaking}`;
    console.log("url = " + url);

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true, responseType: "text"
    })
  }

  queryArgumentsByServiceID(serviceID) {
    let url = `http://localhost:8080/getArguments/?serviceID=${serviceID}`;
    return this.httpClient.get(url, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true, responseType: "text"
    })
  }

  setSelectedServiceComponent(serviceComponentName) {
    for (let index = 0; index < this.serviceComponents.length; index++) {
      if (serviceComponentName == this.serviceComponents[index]["name"])
        this.selectedServiceComponent = this.serviceComponents[index];
    }
    console.log("OK")
    console.log(this.selectedServiceComponent);
  }

  getCode() {
    return this.selectedServiceComponent.code;
  }

  getSelectedServiceComponentName() {
    return this.selectedServiceComponent.name;
  }

  findServiceIDByName(serviceName) {
    for (let index = 0; index < this.serviceComponents.length; index++) {
      if (serviceName == this.serviceComponents[index].name)
        return this.serviceComponents[index].serviceID;
    }
  }
}