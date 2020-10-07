import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithVariableAndPart extends FromAttribute {
    variable: string;
    part?: string;

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithVariableAndPart");
    }
}