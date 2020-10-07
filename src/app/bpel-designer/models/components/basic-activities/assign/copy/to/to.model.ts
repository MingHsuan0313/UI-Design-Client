import { ToAttribute } from "./to-attribute.model";
import { ToElement } from "./to-element.model";

export class To {
    attribute?: ToAttribute;
    element?: ToElement;

    constructor() {
        console.log("consturct a to-spec for the selected <copy>");
    }
}