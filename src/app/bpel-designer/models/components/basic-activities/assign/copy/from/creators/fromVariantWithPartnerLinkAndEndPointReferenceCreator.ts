import { FromVariantWithPartnerLinkAndEndPointReference } from "../variants/fromVariantWithPartnerLinkAndEndPointReference.model";
import { IFromCreator } from "./IFromCreator";

export class FromVariantWithPartnerLinkAndEndPointReferenceCreator implements IFromCreator {
    createFrom(): FromVariantWithPartnerLinkAndEndPointReference {
        return new FromVariantWithPartnerLinkAndEndPointReference();
    }
}