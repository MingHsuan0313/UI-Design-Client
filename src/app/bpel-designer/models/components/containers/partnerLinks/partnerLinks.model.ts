import { BPELNode } from "../../BPELNode.model";
import { PartnerLinksElement } from "./partnerLinks-element.model";

export class PartnerLinks extends BPELNode {
    element: PartnerLinksElement;

    constructor() {
        super();
        this.element = new PartnerLinksElement();
    }
}