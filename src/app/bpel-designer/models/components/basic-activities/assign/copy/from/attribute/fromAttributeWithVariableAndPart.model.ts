import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithVariableAndPart extends FromAttribute {
    variable: string = undefined;
    part?: string = undefined;

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithVariableAndPart");
    }
}