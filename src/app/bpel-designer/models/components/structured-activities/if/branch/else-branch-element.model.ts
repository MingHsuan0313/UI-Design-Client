import { BPELComponent } from "../../../BPELComponent.model";

export class ElseBranchElement {
    activity: BPELComponent;

    constructor() {
        this.activity = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }
}