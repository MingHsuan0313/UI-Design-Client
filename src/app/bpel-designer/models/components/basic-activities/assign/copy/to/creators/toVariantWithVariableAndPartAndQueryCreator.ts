import { ToVariantWithVariableAndPartAndQuery } from "../variants/toVariantWithVariableAndPartAndQuery.model";
import { IToCreator } from "./IToCreator";

export class ToVariantWithVariableAndPartAndQueryCreator implements IToCreator {
    createTo(): ToVariantWithVariableAndPartAndQuery {
        return new ToVariantWithVariableAndPartAndQuery();
    }
}