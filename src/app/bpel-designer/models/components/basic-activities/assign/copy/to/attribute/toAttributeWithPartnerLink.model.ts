import { ToAttribute } from "../to-attribute.model";

export class ToAttributeWithPartnerLink extends ToAttribute {
    partnerLink: string;

    constructor() {
        super();
        console.log("create to-spec ToAttributeWithPartnerLink");
    }
}