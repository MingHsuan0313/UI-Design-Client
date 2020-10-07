import { FromAttributeWithExpressionLanguage } from "../attribute/fromAttributeWithExpressionLanguage.model";
import { FromElementWithExpression } from "../element/fromElementWithExpression.model";
import { From } from "../from.model";

export class FromVariantWithExpressionLanguageAndExpression extends From {
    constructor() {
        super();
        this.attribute = new FromAttributeWithExpressionLanguage();
        this.element = new FromElementWithExpression();
        console.log("create from-spec FromVariantWithExpressionLanguageAndExpression");
    }
}