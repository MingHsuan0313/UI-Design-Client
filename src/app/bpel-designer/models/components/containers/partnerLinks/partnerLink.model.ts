import { PartnerLinkAttribute } from "./partnerLink-attribute.model";

export class PartnerLink {
    attribute: PartnerLinkAttribute;

    constructor() {
        this.attribute = new PartnerLinkAttribute();
    }
}