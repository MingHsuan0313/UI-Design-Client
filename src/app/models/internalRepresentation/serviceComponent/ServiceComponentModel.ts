import { ArgumentModel } from "./ArgumentModel";
import { ComplexType } from "./ComplexTypeModel";
import { IServiceEntry } from "./IServiceEntry";
import { ReturnModel } from "./ReturnModel";

export class ServiceComponentModel extends IServiceEntry {
    serviceID: string;
    projectID: string;
    projectName: string;
    wsdlFilename: string;
    className: string;
    name: string;
    similarity: number;
    arguments: ArgumentModel[];
    returnData: ReturnModel;
    serviceType: string;
    initServiceUrl: string; // request mapping url
    invokeServiceUrl: string;
    httpMethod: string; // get, delete, patch, post
    argComplexTypeUrl: Map<String,ComplexType>; // table for constructer and setter service
    log: string; // result respond from API Server
    code: string;

    constructor() {
        super();
        this.argComplexTypeUrl = new Map<String,ComplexType>();
        this.code = "";
        this.similarity = 0;
        this.wsdlFilename = "";
        this.projectName = "";
        this.initServiceUrl = "";
        this.arguments = [];
        this.returnData = new ReturnModel();
        this.serviceType = "ServiceComponent";
        this.log = "";
    }
    
    getProjectName() {
        return this.projectName;
    }
    
    setProjectName(projectName: string) {
        this.projectName = projectName; 
    }
    
    getServiceID() {
        return this.serviceID;
    }
    
    getName() {
        return this.name;
    }
    
    getClassName() {
        return this.className;
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
        this.invokeServiceUrl = `${this.className.split(".").join("/")}/${this.wsdlFilename.split(".")[0]}`;
        return this;
    }

    getInitServiceUrl() {
        return `${this.className.split(".").join("/")}/initMethod`;
    }
    
    getInvokeServiceUrl() {
        return `${this.className.split(".").join("/")}/${this.wsdlFilename.split(".")[0]}`;
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
        this.wsdlFilename = wsdlName;
        return this;
    }
    
    setHttpMethod(httpMethod: string) {
        // convert _POST to post
        this.httpMethod = httpMethod.split("_") [0].toLowerCase();
        return this;
    }

    addArgument(argument: ArgumentModel) {
        this.arguments.push(argument);
        return this;
    }

    setReturn(returnData: ReturnModel) {
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
            type: "ServiceComponent"
        }
    }
}