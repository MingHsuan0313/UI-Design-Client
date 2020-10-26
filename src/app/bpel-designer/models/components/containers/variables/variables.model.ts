import { BPELNode } from "../../BPELNode.model";
import { VariablesElement } from "./variables-element.model";

export class Variables extends BPELNode {
    element: VariablesElement;

    constructor() {
        super();
        this.element = new VariablesElement();
    }
}