import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ReplyAttribute extends BPELComponentAttribute {
    variable?: String = undefined;
    partnerLink: String = undefined;
    operation: String = undefined;
    portType?: String = undefined;
    messageExchange?: string = undefined;
    faultName?: string = undefined;

    constructor(name?: String) {
        super(name);
        // fake data
        let variable = "Main.reply";
        let partnerLink = "Client";
        let operation = "output";
        let portType = "outputPort";

        this.variable = variable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
    }
}