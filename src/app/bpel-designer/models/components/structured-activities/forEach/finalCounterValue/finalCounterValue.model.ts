import { BPELNode } from "../../../BPELNode.model";
import { FinalCounterValueAttribute } from "./finalCounterValue-attribute.model";
import { FinalCounterValueElement } from "./finalCounterValue-element.model";

export class FinalCounterValue extends BPELNode {
    attribute: FinalCounterValueAttribute;
    element: FinalCounterValueElement;

    constructor() {
        super();
        this.attribute = new FinalCounterValueAttribute();
        this.element = new FinalCounterValueElement();
    }
}