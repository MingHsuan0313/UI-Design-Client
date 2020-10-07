import { FromPartAttribute } from "./fromPart-attribute.model";

export class FromPart {
    attribute: FromPartAttribute;

    constructor() {
        this.attribute = new FromPartAttribute();
    }
}