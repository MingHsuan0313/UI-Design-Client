import { FromVariantWithVariableAndPartAndQuery } from "../variants/fromVariantWithVariableAndPartAndQuery.model";
import { IFromCreator } from "./IFromCreator";

export class FromVariantWithVariableAndPartAndQueryCreator implements IFromCreator {
    createFrom(): FromVariantWithVariableAndPartAndQuery {
        return new FromVariantWithVariableAndPartAndQuery();
    }
}