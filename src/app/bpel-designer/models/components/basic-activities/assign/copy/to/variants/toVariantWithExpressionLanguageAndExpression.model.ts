import { ToAttributeWithExpressionLanguage } from "../attribute/toAttributeWithExpressionLanguage.model";
import { ToElementWithExpression } from "../element/toElementWithExpression.model";
import { To } from "../to.model";

export class ToVariantWithExpressionLanguageAndExpression extends To {
    constructor() {
        super();
        this.attribute = new ToAttributeWithExpressionLanguage();
        this.element = new ToElementWithExpression();
        console.log("create to-spec ToVariantWithExpressionLanguageAndExpression");
    }
}