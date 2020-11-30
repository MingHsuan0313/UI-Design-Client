export class IServiceEntry {
    name: string;
    className: string;
    serviceID: string;
    type: string;
    projectID: string;
}

export class Return extends IServiceEntry {
    data: Object;
}

export class Argument extends IServiceEntry {

}

export class Operation extends IServiceEntry {
    preference: number;
    code: string;
    argc: number;
    wsdlName: string;
    url: string;
    arguments: Map<string,Argument>;
    return: Return;
}