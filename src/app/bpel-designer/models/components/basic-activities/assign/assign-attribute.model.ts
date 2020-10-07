import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class AssignAttribute extends BPELComponentAttribute {
    validate?: string;  // "yes | no"

    constructor(name?: String) {
        super(name);
    }
}