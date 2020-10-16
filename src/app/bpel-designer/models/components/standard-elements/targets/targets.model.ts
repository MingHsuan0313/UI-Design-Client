import { BPELNode } from "../../BPELNode.model";
import { TargetsElement } from "./targets-element.model";

export class Targets extends BPELNode {
    element: TargetsElement;

    constructor() {
        super();
        this.element = new TargetsElement();
    }
}