import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ReceiveAttribute extends BPELComponentAttribute {
    variable?: string = "";
    partnerLink: string = "";
    operation: string = "";
    portType?: string = "";
    createInstance?: string = ""; // "yes" | "no"
    messageExchange?: string = "";

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