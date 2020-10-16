import { FromAttributeWithVariableAndPropery } from "../attribute/fromAttributeWithVariableAndPropery.model";
import { From } from "../from.model";

export class FromVariantWithVariableAndProperty extends From {
    constructor() {
        super();
        this.attribute = new FromAttributeWithVariableAndPropery();
        console.log("The from-spec is FromVariantWithVariableAndProperty");
    }
}