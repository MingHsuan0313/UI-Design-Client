import { BPELNode } from "../../BPELNode.model";
import { ToPartsElement } from "./toParts-element.model";

export class ToParts extends BPELNode {
    element: ToPartsElement;

    constructor() {
        super();
        this.element = new ToPartsElement();
    }
}