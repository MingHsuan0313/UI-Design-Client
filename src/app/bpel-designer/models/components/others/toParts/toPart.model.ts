import { BPELNode } from "../../BPELNode.model";
import { ToPartAttribute } from "./toPart-attribute.model";

export class ToPart extends BPELNode {
    attribute: ToPartAttribute;

    constructor() {
        super();
        this.attribute = new ToPartAttribute();
    }
}