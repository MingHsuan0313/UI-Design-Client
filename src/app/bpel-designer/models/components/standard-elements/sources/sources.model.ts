import { BPELNode } from "../../BPELNode.model";
import { SourcesElement } from "./sources-element.model";

export class Sources extends BPELNode {
    element: SourcesElement;

    constructor() {
        super();
        this.element = new SourcesElement();
    }
}