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
    }
    
    setServiceID(serviceID: string) {
      this.serviceID = serviceID;
    }
  
    setPreference(preference: number) {
      this.preference = preference;
    }
    
    setClassName(className: string) {
      this.className = className;
    }
  
    setServiceType(serviceType: ServiceMappingType) {
      this.serviceType = serviceType;
    }
  
    setCode(code: string) {
      this.code = code;
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