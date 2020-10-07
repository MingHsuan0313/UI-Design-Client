import { LinkAttribute } from "./link-attribute.model";

export class Link {
    attribute: LinkAttribute;

    constructor() {
        this.attribute = new LinkAttribute();
    }
}