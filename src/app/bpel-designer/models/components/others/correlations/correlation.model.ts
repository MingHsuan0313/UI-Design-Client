import { BPELNode } from "../../BPELNode.model";
import { CorrelationAttribute } from "./correlation-attribute.model";

export class Correlation extends BPELNode {
    attribute: CorrelationAttribute;

    constructor() {
        super();
        this.attribute = new CorrelationAttribute();
    }
}