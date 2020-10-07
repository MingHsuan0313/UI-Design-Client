import { ToVariantWithVariableAndProperty } from "../variants/toVariantWithVariableAndProperty.model";
import { IToCreator } from "./IToCreator";

export class ToVariantWithVariableAndPropertyCreator implements IToCreator {
    createTo(): ToVariantWithVariableAndProperty {
        return new ToVariantWithVariableAndProperty();
    }
}