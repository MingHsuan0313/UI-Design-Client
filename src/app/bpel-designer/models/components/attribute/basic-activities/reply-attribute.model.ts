import { BPELComponentAttribute } from "../BPELComponent-attribute.model";

export class ReplyAttribute extends BPELComponentAttribute {
    variable?: String;
    partnerLink: String;
    operation: String;
    portType?: String;

    constructor(name?: String) {
        let variable = "Main.reply";
        let partnerLink = "Client";
        let operation = "output";
        let portType = "outputPort";

        super(name);
        this.variable = variable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
    }
}