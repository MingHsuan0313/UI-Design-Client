import { Injectable } from '@angular/core';
import { fakeServiceComponents } from "../../fakedata/fakeServiceComponents";

@Injectable({
  providedIn: 'root'
})
export default class ServiceComponentService {

  serviceComponents: any;

  constructor() {
    // it will use http service in the future
    this.serviceComponents = fakeServiceComponents;
    console.log("Get services from server");
    console.log(this.serviceComponents);
  }

  getServiceComponents() {
    return this.serviceComponents;
  }
}
