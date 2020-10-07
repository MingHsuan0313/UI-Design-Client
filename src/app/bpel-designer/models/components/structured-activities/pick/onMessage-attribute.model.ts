import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class OnMessageAttribute {
    variable?: String;
    partnerLink: String;
    operation: String;
    portType?: String;
    messageExchange?: string;

    constructor(name?: String) {
        let variable = "Main.startRequest.0";
        let partnerLink = "GetDepartmentMain";
        let operation = "start";
        let portType = "startInteractionPort";

        this.variable = variable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
    }
}