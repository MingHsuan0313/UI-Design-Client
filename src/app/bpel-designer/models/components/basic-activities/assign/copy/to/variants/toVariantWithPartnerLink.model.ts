import { ToAttributeWithPartnerLink } from "../attribute/toAttributeWithPartnerLink.model";
import { To } from "../to.model";

export class ToVariantWithPartnerLink extends To {
    constructor() {
        super();
        this.attribute = new ToAttributeWithPartnerLink();
        console.log("create to-spec ToVariantWithPartnerLink");
    }
}