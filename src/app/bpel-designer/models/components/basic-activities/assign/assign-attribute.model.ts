import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class AssignAttribute extends BPELComponentAttribute {
    validate?: string = undefined;  // "yes | no"

    constructor(name?: string) {
        super(name);
    }
}