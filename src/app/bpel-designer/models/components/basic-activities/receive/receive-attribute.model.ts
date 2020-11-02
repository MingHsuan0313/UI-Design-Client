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
    }
}