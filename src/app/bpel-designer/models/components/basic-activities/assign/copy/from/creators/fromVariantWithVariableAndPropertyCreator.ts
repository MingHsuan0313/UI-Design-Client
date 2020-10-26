import { FromVariantWithVariableAndProperty } from "../variants/fromVariantWithVariableAndProperty.model";
import { IFromCreator } from "./IFromCreator";

export class FromVariantWithVariableAndPropertyCreator implements IFromCreator {
    createFrom(): FromVariantWithVariableAndProperty {
        return new FromVariantWithVariableAndProperty();
    }
}