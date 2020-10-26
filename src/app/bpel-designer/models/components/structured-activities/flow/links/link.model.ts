import { BPELNode } from "../../../BPELNode.model";
import { LinkAttribute } from "./link-attribute.model";

export class Link extends BPELNode {
    attribute: LinkAttribute;

    constructor() {
        super();
        this.attribute = new LinkAttribute();
    }
}