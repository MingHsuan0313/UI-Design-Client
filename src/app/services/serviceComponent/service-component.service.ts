import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import { fakeServiceComponents } from "../../fakedata/fakeServiceComponents";
import { ServiceComponentModel } from "../../models/service-component-dependency";
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { HttpClientService } from '../http-client.service';

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

  constructor(private httpClient: HttpClient,
    private httpClientService: HttpClientService
  ) {
    this.baseUrl = "services";
    this.serviceComponents = [];
    this.selectedServiceComponent = new ServiceComponentModel();
  }

  getServiceComponents() {
    return this.serviceComponents;
  }

  queryServices(uiComponent: UIComponent, parameterCount: number) {
    let url = `${this.baseUrl}/getServices`;
    let params: HttpParams;
    console.log("Query Services");
    console.log(uiComponent);
    let uiType = uiComponent.type;
    let uiName = uiComponent.name;
    let uiCategory = uiComponent.category;
    let matchmaking = "true";

    params = new HttpParams().set("uiCategory", uiCategory.toString())
      .set("uiType", uiType.toString())
      .set("uiName", uiName.toString())
      .set("parameterCount", parameterCount.toString())
      .set("matchmaking", matchmaking);
    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }

  queryMatchedServices(uiComponent: UIComponent, parameterCount) {
    console.log("query Matched Services");
    console.log(this);
    let uiType = uiComponent.type;
    let uiName = uiComponent.name;
    let uiCategory = uiComponent.category;
    let url = "";
    let body;
    if (uiType == "form" || uiType == "card") {
      body = {
        "serviceName": uiName + "Service",
        "operationName": uiName,
        "arguments": []
      }

      if (uiComponent["componentList"] != undefined) {
        for (let subComponent of uiComponent["componentList"]) {
          console.log(subComponent);
          if (subComponent.category == "input" || subComponent.category == "informative") {
            body.arguments.push({
              "argumentName": subComponent.name,
              "type": subComponent["serviceArgumentType"] != undefined ? subComponent["serviceArgumentType"] : "String",
              "isInput": subComponent.category == "input" ? true : false
            })
          }
        }
      }

      url = `${this.baseUrl}/getMatchingServices`;
    }

    console.log(JSON.stringify(body))
    return this.httpClientService.httpPost("getMatchingServices", body,"matchMakingServer");

  }

  queryArgumentsByServiceID(serviceID: string) {
    let url = `${this.baseUrl}/getArguments`;
    let params: HttpParams;
    params = new HttpParams().set("serviceID", serviceID);

    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }

  queryCodeByServiceID(serviceID) {
    let url = `${this.baseUrl}/getCode`;
    // let url = `${this.baseUrl}/getCode?serviceID=${serviceID}`;
    let params: HttpParams;
    params = new HttpParams().set("serviceID", serviceID);

    params.append("serviceID", serviceID);
    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }

  postEditedServiceComponent(code: string, className: string) {
    let url = `${this.baseUrl}/editServiceComponent`;
    let requestBody = {
      "code": code,
      "class": className
    }

    return this.httpClientService.httpPost(url, requestBody, "uiDesignServer");
  }

  triggerJenkinsBuild() {
    let url = "buildByToken/build";
    let jenkinsToken = "SelabServiceGeneratorToken";
    let jenkinsJob = "Service Generator Pipeline";
    let params: HttpParams;
    params = new HttpParams()
      .set("token", jenkinsToken)
      .set("job", jenkinsJob)

    return this.httpClientService.triggerJenkinsBuild(url, params);
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

  setServiceComponents(serviceComponents) {
    this.serviceComponents = serviceComponents;
  }

  findServiceComponentByServiceID(serviceID: String) {
    for (let index = 0; index < this.serviceComponents.length; index++) {
      if (this.serviceComponents[index].serviceID == serviceID)
        return this.serviceComponents[index];
    }
  }
}