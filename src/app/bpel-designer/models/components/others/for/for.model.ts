import { BPELNode } from "../../BPELNode.model";
import { ForAttribute } from "./for-attribute.model";
import { ForElement } from "./for-element.model";

export class For extends BPELNode {
    attribute: ForAttribute;
    element: ForElement;

    constructor() {
        super();
        this.attribute = new ForAttribute();
        this.element = new ForElement();
    }
}