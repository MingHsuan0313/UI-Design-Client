import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ReceiveAttribute extends BPELComponentAttribute {
    variable?: String = undefined;
    partnerLink: String = undefined;
    operation: String = undefined;
    portType?: String = undefined;
    createInstance?: String = undefined; // "yes" | "no"
    messageExchange?: string = undefined;

    constructor(name?: String) {
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