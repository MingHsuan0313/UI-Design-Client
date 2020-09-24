import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { fakeServiceComponents } from "../../fakedata/fakeServiceComponents";
import { ServiceComponentModel } from "../../models/service-component-dependency";
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Injectable({
  providedIn: 'root'
})
export default class ServiceComponentService {
  // base url
  baseUrl: String;

  // get from server
  serviceComponents: ServiceComponentModel[];

  // after select from dropdown
  selectedServiceComponent: ServiceComponentModel;
  
  // toggle checkbox
  isMatchMaking: Boolean;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:8080";
    this.serviceComponents = [];
    this.selectedServiceComponent = new ServiceComponentModel();
  }


  getServiceComponents() {
    return this.serviceComponents;
  }

  queryServices(uiComponent:UIComponent, parameterCount, matchmaking) {
    console.log("Query Server for service components");
    console.log(this);
    let uiType = uiComponent.type;
    let uiName = uiComponent.name;
    let uiCategory = uiComponent.category;
    let url = "";
    if(uiCategory == "input") {
      if(uiType == "form")
        url = `${this.baseUrl}/getServices?uiCategory=${uiCategory}&uiName=${uiName}&parameterCount=${parameterCount}&matchmaking=${matchmaking}&uiType=${uiType}`;
    }
    else if(uiCategory == "informative") {
      if(uiType == "Table")
        url = `${this.baseUrl}/getServices?uiCategory=${uiCategory}&uiName=${uiName}&parameterCount=${parameterCount}&matchmaking=${matchmaking}&uiType=${uiType}`;
        // url = `${this.baseUrl}/getServices?uiCategory=${uiCategory}&matchmaking=${matchmaking}`;
      
    }
    else if(uiCategory == "navigation") {
      
    }
    else if(uiCategory == "container") {

    }

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true, responseType: "text"
    })
  }

  setServiceComponents(serviceComponents) {
    this.serviceComponents = serviceComponents;
  }

  queryArgumentsByServiceID(serviceID) {
    let url = `${this.baseUrl}/getArguments?serviceID=${serviceID}`;
    return this.httpClient.get(url, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true, responseType: "text"
    })
  }
  
  queryCodeByServiceID(serviceID) {
    let url = `${this.baseUrl}/getCode?serviceID=${serviceID}`;

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response", withCredentials: true, responseType: "text"
    })
  }

  setSelectedServiceComponent(serviceComponent: ServiceComponentModel) {
    this.selectedServiceComponent = serviceComponent; 
  }

  getSelectedCode() {
    return this.selectedServiceComponent.code;
  }
  
  getSelectedServiceComponent() {
    return this.selectedServiceComponent;
  }

  getSelectedServiceComponentName() {
    return this.selectedServiceComponent.name;
  }
  
  getSelectedServiceID() {
    return this.selectedServiceComponent.serviceID; 
  }
  
  findServiceComponentByServiceID(serviceID: String) {
    for(let index = 0;index < this.serviceComponents.length;index++) {
      if(this.serviceComponents[index].serviceID == serviceID)
        return this.serviceComponents[index];
    }
  }
}