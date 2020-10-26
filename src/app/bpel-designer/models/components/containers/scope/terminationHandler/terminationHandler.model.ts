import { BPELNode } from "../../../BPELNode.model";
import { TerminationHandlerElement } from "./terminationHandler-element.model";

export class TerminationHandler extends BPELNode {
    element: TerminationHandlerElement;

    constructor() {
        super();
        this.element = new TerminationHandlerElement();
    }
}