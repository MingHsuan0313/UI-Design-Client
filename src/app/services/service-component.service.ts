import { Injectable } from '@angular/core';
import { fakeServiceComponents } from "../../fakedata/fakeServiceComponents";

@Injectable({
  providedIn: 'root'
})
export default class ServiceComponentService {

  serviceComponents: any;
  isMatchMaking: Boolean;

  constructor() {
    // it will use http service in the future
    this.serviceComponents = fakeServiceComponents;
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

  queryServer() {
    console.log("Query Server for service components");
    console.log(this);
    if(this.isMatchMaking) {

    }
    else {

    }
  }
}
