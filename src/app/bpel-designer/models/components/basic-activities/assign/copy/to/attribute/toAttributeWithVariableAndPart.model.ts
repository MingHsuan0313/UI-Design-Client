import { ToAttribute } from "../to-attribute.model";

export class ToAttributeWithVariableAndPart extends ToAttribute {
    variable: string = "";
    part?: string = "";

    constructor() {
        super();
        console.log("create to-spec ToAttributeWithVariableAndPart");
    }
}