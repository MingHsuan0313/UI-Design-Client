import { BPELNode } from "../../BPELNode.model";
import { CorrelationSetAttribute } from "./correlationSet-attribute.model";

export class CorrelationSet extends BPELNode {
    attribute: CorrelationSetAttribute;

    constructor() {
        super();
        this.attribute = new CorrelationSetAttribute();
    }
}