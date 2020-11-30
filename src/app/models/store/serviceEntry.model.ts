export class IServiceEntry {
    name: string;
    className: string;
    serviceID: string;
    projectID: string;
    constructor() {
        this.name = "";
        this.className = "";
        this.serviceID = "";
        this.projectID = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setClassName(className: string) {
        this.className = className;
        return this;
    }
    
    setServiceID(serviceID: string) {
        this.serviceID = serviceID;
        return this;
    }
    
    setProjectID(projectID: string) {
        this.projectID = projectID;
        return this;
    }
}

export class Return extends IServiceEntry {
    data: Object;
    constructor() {
        super();
        this.data = {};
    }
    
    setData(data: Object) {
        this.data = data;
        return this;
    }
}

export class Argument extends IServiceEntry {
    constructor() {
        super();
    }
}

export class Operation extends IServiceEntry {
    preference: number;
    code: string;
    argc: number;
    wsdlName: string;
    url: string; // request mapping url
    method: string; // get, delete, patch, post
    arguments: Map<string,Argument>;
    returnData: Return;
    constructor() {
        super();
        this.preference = 0;
        this.code = "";
        this.argc = 0;
        this.wsdlName = "";
        this.url = "";
        this.arguments = new Map<string,Argument>();
        this.returnData = new Return();
    }
    
    setPreference(preference: number) {
        this.preference = preference;
        return this;
    }
    
    setCode(code: string) {
        this.code = code;
        return this;
    }
    
    setArgc(argc: number) {
        this.argc = argc;
        return this;
    }
    
    setWSDLName(wsdlName: string) {
        this.wsdlName = wsdlName;
        return this;
    }
    
    setUrl(url: string) {
        this.url = url;
        return this;
    }
    
    addArgument(argument:Argument) {
        this.arguments.set(argument.name,argument);
        return this;
    }
    
    setReturn(returnData:Return) {
        this.returnData = returnData;
        return this;
    }
}