import { ToVariantWithExpressionLanguageAndExpression } from "../variants/toVariantWithExpressionLanguageAndExpression.model";
import { IToCreator } from "./IToCreator";

export class ToVariantWithExpressionLanguageAndExpressionCreator implements IToCreator {
    createTo(): ToVariantWithExpressionLanguageAndExpression {
        return new ToVariantWithExpressionLanguageAndExpression();
    }
}