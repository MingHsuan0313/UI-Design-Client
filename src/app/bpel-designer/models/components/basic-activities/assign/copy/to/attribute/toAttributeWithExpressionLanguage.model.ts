import { ToAttribute } from "../to-attribute.model";

export class ToAttributeWithExpressionLanguage extends ToAttribute {
    expressionLanguage?: string = undefined;

    constructor() {
        super();
        console.log("create to-spec ToAttributeWithExpressionLanguage");
    }
}