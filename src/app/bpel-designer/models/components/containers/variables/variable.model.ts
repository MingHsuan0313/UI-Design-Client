import { BPELNode } from "../../BPELNode.model";
import { VariableAttribute } from "./variable-attribute.model";
import { VariableElement } from "./variable-element.model";

export class Variable extends BPELNode {
    attribute: VariableAttribute;
    element: VariableElement;

    constructor() {
        super();
        this.attribute = new VariableAttribute();
        this.element = new VariableElement();
    }
}