import { BPELNode } from "../../../BPELNode.model";
import { BranchesAttribute } from "./branches-attribute.model";
import { BranchesElement } from "./branches-element.model";

export class Branches extends BPELNode {
    attribute: BranchesAttribute;
    element: BranchesElement;

    constructor() {
        super();
        this.attribute = new BranchesAttribute();
        this.element = new BranchesElement();
    }
}