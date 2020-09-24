import { LiteralElement } from "src/app/bpel-designer/models/components/element/basic-activities/assign/copy/from/literal-element.model";

export class Literal {
    element: LiteralElement;

    constructor(value: String) {
        this.element = new LiteralElement(value);
    }
}