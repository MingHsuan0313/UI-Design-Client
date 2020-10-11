import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithVariableAndPropery extends FromAttribute {
    variable: string = undefined;
    property: string = undefined;

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithVariableAndPropery");
    }
}