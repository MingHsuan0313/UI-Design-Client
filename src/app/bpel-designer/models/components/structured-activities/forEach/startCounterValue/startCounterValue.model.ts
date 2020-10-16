import { BPELNode } from "../../../BPELNode.model";
import { StartCounterValueAttribute } from "./startCounterValue-attribute.model"
import { StartCounterValueElement } from "./startCounterValue-element.model";

export class StartCounterValue extends BPELNode {
    attribute: StartCounterValueAttribute;
    element: StartCounterValueElement;

    constructor() {
        super();
        this.attribute = new StartCounterValueAttribute();
        this.element = new StartCounterValueElement();
    }
}