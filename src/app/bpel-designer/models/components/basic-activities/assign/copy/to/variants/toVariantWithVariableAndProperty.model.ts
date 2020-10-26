import { ToAttributeWithVariableAndPropery } from "../attribute/toAttributeWithVariableAndPropery.model";
import { To } from "../to.model";

export class ToVariantWithVariableAndProperty extends To {
    constructor() {
        super();
        this.attribute = new ToAttributeWithVariableAndPropery();
        console.log("create to-spec ToVariantWithVariableAndProperty");
    }
}