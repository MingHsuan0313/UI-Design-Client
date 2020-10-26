import { ToVariantWithPartnerLink } from "../variants/toVariantWithPartnerLink.model";
import { IToCreator } from "./IToCreator";

export class ToVariantWithPartnerLinkCreator implements IToCreator {
    createTo(): ToVariantWithPartnerLink {
        return new ToVariantWithPartnerLink();
    }
}