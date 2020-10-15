import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ReceiveAttribute extends BPELComponentAttribute {
    variable?: string = undefined;
    partnerLink: string = undefined;
    operation: string = undefined;
    portType?: string = undefined;
    createInstance?: string = undefined; // "yes" | "no"
    messageExchange?: string = undefined;

    constructor(name?: string) {
        super(name);
        // fake data
        let variable = "Main.startRequest.0";
        let partnerLink = "GetDepartmentMain";
        let operation = "start";
        let portType = "startInteractionPort";
        let createInstance = "yes";

        this.variable = variable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
        this.createInstance = createInstance;
    }
}