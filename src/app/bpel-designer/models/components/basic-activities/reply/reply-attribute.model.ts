import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ReplyAttribute extends BPELComponentAttribute {
    variable?: string = "";
    partnerLink: string = "";
    operation: string = "";
    portType?: string = "";
    messageExchange?: string = "";
    faultName?: string = "";

    constructor(name?: string) {
        super(name);
    }
}