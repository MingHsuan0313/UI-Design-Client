import { BranchesAttribute } from "./branches-attribute.model";
import { BranchesElement } from "./branches-element.model";

export class Branches {
    attribute: BranchesAttribute;
    element: BranchesElement;

    constructor() {
        this.attribute = new BranchesAttribute();
        this.element = new BranchesElement();
    }
}