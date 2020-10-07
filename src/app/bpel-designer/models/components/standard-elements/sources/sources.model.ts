import { Source } from "./source.model";
import { SourcesElement } from "./sources-element.model";

export class Sources {
    element: SourcesElement;

    constructor() {
        this.element = new SourcesElement();
    }
}