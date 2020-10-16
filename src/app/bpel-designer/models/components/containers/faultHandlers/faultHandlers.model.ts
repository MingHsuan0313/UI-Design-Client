import { BPELNode } from "../../BPELNode.model";
import { FaultHandlersElement } from "./faultHandlers-element.model";

export class FaultHandlers extends BPELNode {
    element: FaultHandlersElement;

    constructor() {
        super();
        this.element = new FaultHandlersElement();
    }
}