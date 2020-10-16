import { BPELNode } from "../../BPELNode.model";
import { PartnerLinkAttribute } from "./partnerLink-attribute.model";

export class PartnerLink extends BPELNode {
    attribute: PartnerLinkAttribute;

    constructor() {
        super();
        this.attribute = new PartnerLinkAttribute();
    }
}