import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ReplyAttribute extends BPELComponentAttribute {
    variable?: string = undefined;
    partnerLink: string = undefined;
    operation: string = undefined;
    portType?: string = undefined;
    messageExchange?: string = undefined;
    faultName?: string = undefined;

    constructor(name?: string) {
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