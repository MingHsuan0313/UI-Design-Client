import { FromElementWithLiteral } from "../element/fromElementWithLiteral.model";
import { From } from "../from.model";

export class FromVariantWithLiteral extends From {
    constructor() {
        super();
        this.element = new FromElementWithLiteral();
        console.log("The from-spec is FromVariantWithLiteral");
    }
}