import { BPELNode } from "src/app/bpel-designer/models/components/BPELNode.model";
import { LiteralElement } from "./literal-element.model";

export class Literal extends BPELNode {
    element: LiteralElement;

    constructor() {
        super();
        // eager creation
        this.element = new LiteralElement();
    }
}