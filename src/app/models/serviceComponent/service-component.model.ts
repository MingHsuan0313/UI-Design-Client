import { ServiceMappingType } from './service-mapping-type.enum';

export class ServiceComponentModel {
    name: string;
    preference: number;
    serviceType: ServiceMappingType;
    code: string;
    serviceID: string;
    className: string; // include package
    argumentType: string; // if serviceType == argument, else ""
  
    constructor() {
      this.name = "";
      this.preference = 0;
      this.serviceType = ServiceMappingType["none"];
      this.code = "";
      this.serviceID = "";
      this.className = "";
      this.argumentType = "";
    }
    
    getInfo() {
      return {
        name: this.name,
        type: this.serviceType
      } 
    }
  
    setName(serviceComponentName: string) {
      this.name = serviceComponentName;
      return this;
    }
    
    setServiceID(serviceID: string) {
      this.serviceID = serviceID;
      return this;
    }
  
    setPreference(preference: number) {
      this.preference = preference;
      return this;
    }
    
    setClassName(className: string) {
      this.className = className;
      return this;
    }
  
    setServiceType(serviceType: ServiceMappingType) {
      this.serviceType = serviceType;
      return this;
    }
  
    setCode(code: string) {
      this.code = code;
      return this;
    }
    
    getServiceID() {
      return this.serviceID;
    }
    
    getCode() {
      return this.code;
    }
    
    getServiceType() {
      return this.serviceType;
    }
    
    getName() {
      return this.name;
    }
    
    getClassName() {
      return this.className;
    }
    
    getPreference() {
      return this.preference;
    }
}  