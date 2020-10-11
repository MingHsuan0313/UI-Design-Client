import { ToAttribute } from "../to-attribute.model";

export class ToAttributeWithVariableAndPropery extends ToAttribute {
    variable: string = undefined;
    property: string = undefined;

    constructor() {
        super();
        console.log("create to-spec ToAttributeWithVariableAndPropery");
    }
}