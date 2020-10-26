import { BPELNode } from "../../BPELNode.model";
import { FromPartAttribute } from "./fromPart-attribute.model";

export class FromPart extends BPELNode {
    attribute: FromPartAttribute;

    constructor() {
        super();
        this.attribute = new FromPartAttribute();
    }
}