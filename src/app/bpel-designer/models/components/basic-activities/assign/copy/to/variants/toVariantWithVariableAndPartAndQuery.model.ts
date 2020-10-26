import { ToAttributeWithVariableAndPart } from "../attribute/toAttributeWithVariableAndPart.model";
import { ToElementWithQuery } from "../element/toElementWithQuery.model";
import { To } from "../to.model";

export class ToVariantWithVariableAndPartAndQuery extends To {
    constructor() {
        super();
        this.attribute = new ToAttributeWithVariableAndPart();
        this.element = new ToElementWithQuery();
        console.log("create to-spec ToVariantWithVariableAndPartAndQuery");
    }
}