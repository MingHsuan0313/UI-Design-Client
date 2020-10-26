import { BPELNode } from "../../BPELNode.model";
import { TargetAttribute } from "./target-attribute.model";

export class Target extends BPELNode {
    attribute: TargetAttribute;

    constructor() {
        super();
        this.attribute = new TargetAttribute();
    }
}