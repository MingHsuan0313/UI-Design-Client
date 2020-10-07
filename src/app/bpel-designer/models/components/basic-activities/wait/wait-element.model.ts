import { BPELComponentElement } from "../../BPELComponent-element.model";
import { For } from "../../others/for/for.model";
import { Until } from "../../others/until/until.model";

export class WaitElement extends BPELComponentElement {
    // has either for or until
    for?: For;
    until?: Until;

    constructor() {
        super();
        // eager creation
        this.for = new For();
        this.until = new Until();
    }
}