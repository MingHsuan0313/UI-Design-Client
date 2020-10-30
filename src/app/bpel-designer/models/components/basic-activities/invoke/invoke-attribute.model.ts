import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class InvokeAttribute extends BPELComponentAttribute {
    inputVariable?: string = "";
    outputVariable?: string = "";
    partnerLink: string = "";
    operation: string = "";
    portType?: string = "";

    constructor(name?: string) {
        super(name);
    }
}