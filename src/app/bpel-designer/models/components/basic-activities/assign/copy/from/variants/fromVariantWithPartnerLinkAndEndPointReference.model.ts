import { FromAttributeWithPartnerLinkAndEndPointReference } from "../attribute/fromAttributeWithPartnerLinkAndEndPointReference.model";
import { From } from "../from.model";

export class FromVariantWithPartnerLinkAndEndPointReference extends From {
    constructor() {
        super();
        this.attribute = new FromAttributeWithPartnerLinkAndEndPointReference();
        console.log("The from-spec is FromVariantWithPartnerLinkAndEndPointReference");
    }
}