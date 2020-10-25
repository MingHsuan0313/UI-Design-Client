import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ScopeAttribute extends BPELComponentAttribute {
    isolated?: string = "";    // "yes | no"
    exitOnStandardFault?: string = ""; // "yes | no"
}