import { BPELComponentAttribute } from "../BPELComponent-attribute.model";

export class ReceiveAttribute extends BPELComponentAttribute {
    variable?: String;
    partnerLink: String;
    operation: String;
    portType?: String;
    createInstance?: String; // "yes" | "no"

    constructor(name?: String) {
        let variable = "Main.startRequest.0";
        let partnerLink = "GetDepartmentMain";
        let operation = "start";
        let portType = "startInteractionPort";
        let createInstance = "yes";

        super(name);
        this.variable = variable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
        this.createInstance = createInstance;
    }
}