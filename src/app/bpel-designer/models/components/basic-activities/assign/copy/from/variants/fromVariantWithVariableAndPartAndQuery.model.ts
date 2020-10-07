import { FromAttributeWithVariableAndPart } from "../attribute/fromAttributeWithVariableAndPart.model";
import { FromElementWithQuery } from "../element/fromElementWithQuery.model";
import { From } from "../from.model";

export class FromVariantWithVariableAndPartAndQuery extends From {
    constructor() {
        super();
        this.attribute = new FromAttributeWithVariableAndPart();
        this.element = new FromElementWithQuery();
        console.log("create from-spec FromVariantWithVariableAndPartAndQuery");
    }
}