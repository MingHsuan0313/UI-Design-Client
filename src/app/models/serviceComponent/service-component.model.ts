import { ServiceMappingType } from './service-mapping-type.enum';

export class ServiceComponentModel {
    name:String;
    preference: number;
    serviceType: ServiceMappingType;
    code: String;
    serviceID: String;
    className: String; // include package
  
    constructor() {
      this.name = "";
      this.preference = 0;
      this.serviceType = ServiceMappingType["none"];
      this.code = "";
      this.serviceID = "";
      this.className = "";
    }
  
    setName(serviceComponentName: String) {
      this.name = serviceComponentName;
    }
  
    setPreference(preference: number) {
      this.preference = preference;
    }
  
    setServiceType(serviceType: ServiceMappingType) {
      this.serviceType = serviceType;
    }
  
    setCode(code: String) {
      this.code = code;
    }
}  