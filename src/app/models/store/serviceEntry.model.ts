export class IServiceEntry {
    name: string;
    className: string;
    serviceID: string;
    projectID: string;
    initUrl: string;
    type: string; // type: Operation, Return, Argument, None
    bind: boolean; // indicate whether uiComponent bind to serviceComponent
    constructor() {
        this.name = "";
        this.className = "";
        this.serviceID = "";
        this.projectID = "";
        this.type = "None";
        this.bind = false;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setBind(bind: boolean) {
        this.bind = bind;
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

    getInfo() {
        return {
            name: this.name
        }
    }
}

export class Return extends IServiceEntry {
    data: Object;
    constructor() {
        super();
        this.data = {};
        this.type = "Return";
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
    isComplexType = "false";
    arguments = [];
    setterUrl = "";
    constructor() {
        super();
        this.type = "Argument";
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

export class Operation extends IServiceEntry {
    similarity: number;
    code: string;
    argc: number;
    wsdlName: string;
    url: string; // request mapping url
    httpMethod: string; // get, delete, patch, post
    arguments: Argument[];
    complexTypeUrl: {};
    returnData: Return;
    constructor() {
        super();
        this.complexTypeUrl = {};
        this.similarity = 0;
        this.code = "";
        this.argc = 0;
        this.wsdlName = "";
        this.url = "";
        this.arguments = [];
        this.returnData = new Return();
        this.type = "Operation";
    }

    setSimilarity(preference: number) {
        this.similarity = preference;
        return this;
    }
    
    setComplexTypeUrl(complexTypeUrl) {
        this.complexTypeUrl = complexTypeUrl;
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
    
    setHttpMethod(httpMethod: string) {
        // convert _POST to post
        this.httpMethod = httpMethod.split("_") [0].toLowerCase();
        return this;
    }

    setUrl(url: string) {
        this.url = url;
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