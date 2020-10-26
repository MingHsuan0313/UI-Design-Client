import { BPELNode } from "../../BPELNode.model";
import { CorrelationSetsElement } from "./correlationSets-element.model";

export class CorrelationSets extends BPELNode {
    element: CorrelationSetsElement;

    constructor() {
        super();
        this.element = new CorrelationSetsElement();
    }
}