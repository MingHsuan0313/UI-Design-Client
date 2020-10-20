import { BPELComponentElement } from "./BPELComponent-element.model";
import { BPELComponent } from "./BPELComponent.model";

export class BPELComponentElementWithActivity extends BPELComponentElement {
    activity: BPELComponent;

    constructor() {
        super();
        this.activity = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }
}