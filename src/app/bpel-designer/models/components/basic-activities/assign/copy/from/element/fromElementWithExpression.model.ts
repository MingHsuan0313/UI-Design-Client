import { FromElement } from "../from-element.model";

export class FromElementWithExpression extends FromElement {
    expression: string = undefined;

    constructor() {
        super();
        console.log("create from-spec FromElementWithExpression");
    }
}