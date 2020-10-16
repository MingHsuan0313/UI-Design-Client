import { BPELNode } from "../../BPELNode.model";
import { CorrelationsElement } from "./correlations-element.model";

export class Correlations extends BPELNode {
    element: CorrelationsElement;

    constructor() {
        super();
        this.element = new CorrelationsElement();
    }
}