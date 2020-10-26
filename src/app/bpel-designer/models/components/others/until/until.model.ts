import { BPELNode } from "../../BPELNode.model";
import { UntilAttribute } from "./until-attribute.model";
import { UntilElement } from "./until-element.model";

export class Until extends BPELNode {
    attribute: UntilAttribute;
    element: UntilElement;

    constructor() {
        super();
        this.attribute = new UntilAttribute();
        this.element = new UntilElement();
    }
}