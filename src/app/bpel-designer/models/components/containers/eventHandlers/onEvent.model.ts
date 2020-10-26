import { BPELNode } from "../../BPELNode.model";
import { OnEventAttribute } from "./onEvent-attribute.model";
import { OnEventElement } from "./onEvent-element.model";

export class OnEvent extends BPELNode {
    attribute: OnEventAttribute;
    element: OnEventElement;

    constructor() {
        super();
        this.attribute = new OnEventAttribute();
        this.element = new OnEventElement();
    }
}