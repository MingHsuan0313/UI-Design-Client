import { ToElement } from "../to-element.model";

export class ToElementWithExpression extends ToElement {
    expression: string = "";

    constructor() {
        super();
        console.log("create to-spec ToElementWithExpression");
    }
}