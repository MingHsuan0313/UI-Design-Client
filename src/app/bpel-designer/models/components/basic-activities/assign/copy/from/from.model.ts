import { FromAttribute } from "./from-attribute.model";
import { FromElement } from "./from-element.model";

export class From {
    attribute?: FromAttribute;
    element?: FromElement;

    constructor() {
        console.log("consturct a from-spec for the selected <variables> or <copy>");
    }
}