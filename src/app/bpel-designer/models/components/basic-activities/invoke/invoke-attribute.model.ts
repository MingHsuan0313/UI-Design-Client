import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class InvokeAttribute extends BPELComponentAttribute {
    inputVariable?: string = undefined;
    outputVariable?: string = undefined;
    partnerLink: string = undefined;
    operation: string = undefined;
    portType?: string = undefined;

    constructor(name?: string) {
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