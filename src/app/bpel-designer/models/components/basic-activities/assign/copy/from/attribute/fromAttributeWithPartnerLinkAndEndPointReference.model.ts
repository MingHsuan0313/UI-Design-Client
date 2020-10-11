import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithPartnerLinkAndEndPointReference extends FromAttribute {
    partnerLink: string = undefined;
    endpointReference: string = undefined;    // "myRole | partnerRole"

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithPartnerLinkAndEndPointReference");
    }
}