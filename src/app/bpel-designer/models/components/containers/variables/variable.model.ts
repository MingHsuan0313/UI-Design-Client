import { VariableAttribute } from "./variable-attribute.model";
import { VariableElement } from "./variable-element.model";

export class Variable {
    attribute: VariableAttribute;
    element: VariableElement;

    constructor() {
        this.attribute = new VariableAttribute();
        // fake data
        let name = "Main.startRequest.0";
        let messageType = "tns:start";
        this.attribute.name = name;
        this.attribute.messageType = messageType;

        this.element = new VariableElement();
    }
}