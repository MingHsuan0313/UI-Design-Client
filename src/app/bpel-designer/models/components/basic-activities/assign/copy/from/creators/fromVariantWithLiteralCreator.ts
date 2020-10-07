import { FromVariantWithLiteral } from "../variants/fromVariantWithLiteral.model";
import { IFromCreator } from "./IFromCreator";

export class FromVariantWithLiteralCreator implements IFromCreator {
    createFrom(): FromVariantWithLiteral {
        return new FromVariantWithLiteral();
    }
}