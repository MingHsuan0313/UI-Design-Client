import { FromAttribute } from "../../../../../attribute/basic-activities/assign/copy/from-attribute.model";
import { FromElement } from "../../../../../element/basic-activities/assign/copy/from/from-element.model";

export class From {
    attribute?: FromAttribute;
    element?: FromElement;

    constructor() {
        this.attribute = new FromAttribute();
        this.element = new FromElement();
        console.log("consturct a from-spec for the selected <copy>");
    }
}