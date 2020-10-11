import { FromAttribute } from "../from-attribute.model";

export class FromAttributeWithExpressionLanguage extends FromAttribute {
    expressionLanguage?: string = undefined;

    constructor() {
        super();
        console.log("create from-spec FromAttributeWithExpressionLanguage");
    }
}