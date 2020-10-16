import { PartnerLink } from "./partnerLink.model";

export class PartnerLinksElement {
    partnerLinkList: PartnerLink[]; // 1...*

    constructor() {
        this.partnerLinkList = new Array<PartnerLink>();
        this.partnerLinkList.push(new PartnerLink());
        console.log("[CONSTRUCT] construct a new <partnerLink> for the <partnerLinks>");
    }
}