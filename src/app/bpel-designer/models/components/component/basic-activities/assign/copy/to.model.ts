import { ToAttribute } from "../../../../attribute/basic-activities/assign/copy/to-attribute.model";
import { ToElement } from "../../../../element/basic-activities/assign/copy/to-element.model";

export class To {
    attribute?: ToAttribute;
    element?: ToElement;

    constructor() {
        this.attribute = new ToAttribute();
        this.element = new ToElement();
        console.log("consturct a to-spec for the selected <copy>");
    }
}