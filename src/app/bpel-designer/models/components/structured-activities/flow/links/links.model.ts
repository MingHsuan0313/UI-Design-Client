import { BPELNode } from "../../../BPELNode.model";
import { LinksElement } from "./links-element.model";

export class Links extends BPELNode {
    element: LinksElement;

    constructor() {
        super();
        this.element = new LinksElement();
    }
}