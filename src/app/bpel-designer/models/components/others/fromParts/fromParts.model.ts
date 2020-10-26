import { BPELNode } from "../../BPELNode.model";
import { FromPartsElement } from "./fromParts-element.model";

export class FromParts extends BPELNode {
    element: FromPartsElement;

    constructor() {
        super();
        this.element = new FromPartsElement();
    }
}