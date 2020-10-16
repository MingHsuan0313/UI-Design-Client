import { BPELNode } from "../../BPELNode.model";
import { CatchAttribute } from "./catch-attribute.model";
import { CatchElement } from "./catch-element.model";

export class Catch extends BPELNode {
    attribute: CatchAttribute;
    element: CatchElement;

    constructor() {
        super();
        this.attribute = new CatchAttribute();
        this.element = new CatchElement();
    }
}