import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class InvokeAttribute extends BPELComponentAttribute {
    inputVariable?: String;
    outputVariable?: String;
    partnerLink: String;
    operation: String;
    portType?: String;

    constructor(name?: String) {
        let inputVariable = "Main.startRequest.0";
        let outputVariable = undefined;
        let partnerLink = "GetDepartmentMain";
        let operation = "start";
        let portType = "startInteractionPort";

        super(name);
        this.inputVariable = inputVariable;
        this.outputVariable = outputVariable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
    }
}