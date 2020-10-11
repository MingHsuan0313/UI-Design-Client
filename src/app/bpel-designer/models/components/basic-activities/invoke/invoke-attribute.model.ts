import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class InvokeAttribute extends BPELComponentAttribute {
    inputVariable?: String = undefined;
    outputVariable?: String = undefined;
    partnerLink: String = undefined;
    operation: String = undefined;
    portType?: String = undefined;

    constructor(name?: String) {
        super(name);
        // fake data
        let inputVariable = "Main.startRequest.0";
        let outputVariable = undefined;
        let partnerLink = "GetDepartmentMain";
        let operation = "start";
        let portType = "startInteractionPort";

        this.inputVariable = inputVariable;
        this.outputVariable = outputVariable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
    }
}