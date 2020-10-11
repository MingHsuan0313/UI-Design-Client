import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ScopeAttribute extends BPELComponentAttribute {
    isolated?: string = undefined;    // "yes | no"
    exitOnStandardFault?: string = undefined; // "yes | no"
}