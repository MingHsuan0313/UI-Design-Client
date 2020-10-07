import { PartnerLink } from "./partnerLink.model";

export class PartnerLinksElement {
    partnerLinkList: PartnerLink[]; // 1...*

    constructor() {
        this.partnerLinkList = new Array<PartnerLink>();
    }
}