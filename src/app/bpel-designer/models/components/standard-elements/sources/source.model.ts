import { BPELNode } from "../../BPELNode.model";
import { SourceAttribute } from "./source-attribute.model";
import { SourceElement } from "./source-element.model";

export class Source extends BPELNode {
    attribute: SourceAttribute;
    element: SourceElement;

    constructor() {
        super();
        this.attribute = new SourceAttribute();
        this.element = new SourceElement();
    }
}