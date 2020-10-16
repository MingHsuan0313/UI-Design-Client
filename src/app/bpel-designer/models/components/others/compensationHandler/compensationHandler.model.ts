import { BPELNode } from "../../BPELNode.model";
import { CompensationHandlerElement } from "./compensationHandler-element.model";

export class CompensationHandler extends BPELNode {
    element: CompensationHandlerElement;

    constructor() {
        super();
        this.element = new CompensationHandlerElement();
    }
}