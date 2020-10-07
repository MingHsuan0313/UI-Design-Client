import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithVariableAndPropery extends FromAttribute {
    variable: string;
    property: string;

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithVariableAndPropery");
    }
}