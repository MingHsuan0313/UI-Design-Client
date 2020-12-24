// ServiceComponent, Argument, Return, ComplexType, ComplexTypeArg

export class IServiceEntry {
    bind: boolean;
    
    setBind(bind: boolean) {
        this.bind = bind;
    }
}
export class ComplexType {
   initUrl: string; // for constructor service
   args: ComplexTypeArg[];
   
   constructor() {
       this.initUrl = "";
       this.args = [];
   }
   
   addArg(arg: ComplexTypeArg) {
       this.args.push(arg);
       return this;
   }
   
   setUrl(url: string) {
       this.initUrl = url;
       return this;
   }
}

export class ComplexTypeArg {
    name: string;
    setterUrl: string;
    type: string;
    
    constructor() {
        this.name = "";
        this.setterUrl = "" ;
        this.type = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setType(type: string) {
        this.type = type;
        return this;
    }
    
    setSetterUrl(url: string) {
        this.setterUrl = url;
        return this;
    }
}

export class Return {
    data: Object;
    type: string;
    name: string;

    constructor() {
        this.data = {};
        this.type = "Return";
        this.name = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setData(data: Object) {
        this.data = data;
        return this;
    }

    getInfo() {
        return {
            name: this.name,
            type: "Return"
        }
    }
}

export class Argument extends IServiceEntry {
    name: string;
    isComplexType: Boolean;
    type: string;
    arguments: Argument[];
    setterUrl: string;
    constructor() {
        super();
        this.arguments = [];
        this.isComplexType = false;
        this.type = "Argument";
        this.setterUrl = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    addArgument(argument: Argument) {
        this.arguments.push(argument);
        return this;
    }
                            
    setIsComplexType(isComplexType) {
        this.isComplexType = isComplexType;
        return this;
    }

    getInfo() {
        return {
            name: this.name,
            type: "Argument"
        }
    }
}

export class ServiceComponent extends IServiceEntry {
    serviceID: string;
    projectID: string;
    wsdlName: string;
    className: string;
    name: string;
    similarity: number;
    arguments: Argument[];
    returnData: Return;
    type: string;
    initServiceUrl: string; // request mapping url
    invokeServiceUrl: string;
    httpMethod: string; // get, delete, patch, post
    argComplexTypeUrl: Map<String,ComplexType>; // table for constructer and setter service
    log: string; // result respond from API Server

    constructor() {
        super();
        this.argComplexTypeUrl = new Map<String,ComplexType>();
        this.similarity = 0;
        this.wsdlName = "";
        this.initServiceUrl = "";
        this.arguments = [];
        this.returnData = new Return();
        this.type = "Operation";
        this.log = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setArgComplexTypeUrl(argComplexTypeUrl:Map<String,ComplexType>) {
        this.argComplexTypeUrl = argComplexTypeUrl;
        return this;
    }
    
    setUrl() {
        this.initServiceUrl = `${this.className.split(".").join("/")}/initMethod`;
        this.invokeServiceUrl = `${this.className.split(".").join("/")}/${this.wsdlName.split(".")[0]}`;
        return this;
    }

    getInitServiceUrl() {
        return `${this.className.split(".").join("/")}/initMethod`;
    }
    
    getInvokeServiceUrl() {
        return `${this.className.split(".").join("/")}/${this.wsdlName.split(".")[0]}`;
    }

    setServiceID(serviceID: string) {
        this.serviceID = serviceID;
        return this;
    }
    
    setClassName(className: string) {
        this.className = className;
        return this;
    }

    setSimilarity(preference: number) {
        this.similarity = preference;
        return this;
    }
    
    setComplexTypeUrl(complexTypeUrl) {
        this.argComplexTypeUrl = complexTypeUrl;
        return this;
    }

    setWSDLName(wsdlName: string) {
        this.wsdlName = wsdlName;
        return this;
    }
    
    setHttpMethod(httpMethod: string) {
        // convert _POST to post
        this.httpMethod = httpMethod.split("_") [0].toLowerCase();
        return this;
    }

    addArgument(argument: Argument) {
        this.arguments.push(argument);
        return this;
    }

    setReturn(returnData: Return) {
        this.returnData = returnData;
        return this;
    }
    
    setMethod(method: string) {
        this.httpMethod = method;
        return this;
    }

    getInfo() {
        return {
            name: this.name,
            type: "Operation"
        }
    }
}