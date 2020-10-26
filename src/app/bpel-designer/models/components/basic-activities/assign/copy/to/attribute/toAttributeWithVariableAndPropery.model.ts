import { ToAttribute } from "../to-attribute.model";

export class ToAttributeWithVariableAndPropery extends ToAttribute {
    variable: string = "";
    property: string = "";

    constructor() {
        super();
        console.log("create to-spec ToAttributeWithVariableAndPropery");
    }
}