import { BPELNode } from "../../BPELNode.model";
import { RepeatEveryAttribute } from "./repeatEvery-attribute.model";
import { RepeatEveryElement } from "./repeatEvery-element.model";

export class RepeatEvery extends BPELNode {
    attribute: RepeatEveryAttribute;
    element: RepeatEveryElement;

    constructor() {
        super();
        this.attribute = new RepeatEveryAttribute();
        this.element = new RepeatEveryElement();
    }
}