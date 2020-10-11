import { ToAttribute } from "../to-attribute.model";

export class ToAttributeWithVariableAndPart extends ToAttribute {
    variable: string = undefined;
    part?: string = undefined;

    constructor() {
        super();
        console.log("create to-spec ToAttributeWithVariableAndPart");
    }
}