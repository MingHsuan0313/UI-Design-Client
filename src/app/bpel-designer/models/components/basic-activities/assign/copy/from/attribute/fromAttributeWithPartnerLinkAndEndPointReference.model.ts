import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithPartnerLinkAndEndPointReference extends FromAttribute {
    partnerLink: string;
    endpointReference: string;    // "myRole | partnerRole"

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithPartnerLinkAndEndPointReference");
    }
}