import { FromVariantWithExpressionLanguageAndExpression } from "../variants/fromVariantWithExpressionLanguageAndExpression.model";
import { IFromCreator } from "./IFromCreator";

export class FromVariantWithExpressionLanguageAndExpressionCreator implements IFromCreator {
    createFrom(): FromVariantWithExpressionLanguageAndExpression {
        return new FromVariantWithExpressionLanguageAndExpression();
    }
}