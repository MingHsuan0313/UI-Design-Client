import { FromElement } from "../from-element.model";
import { Literal } from "./literal/literal.model";

export class FromElementWithLiteral extends FromElement {
    literal: Literal;

    constructor() {
        super();
        // eager creation
        this.literal = new Literal();
    }
}