import { BPELComponentElement } from "./BPELComponent-element.model";
import { BPELComponent } from "./BPELComponent.model";

export class BPELComponentElementWithActivityList extends BPELComponentElement {
    activityList: BPELComponent[];

    constructor() {
        super();
    }

    pushActivity(activity: BPELComponent): void {
        this.activityList.push(activity);
    }

    getActivityList(): BPELComponent[] {
        return this.activityList;
    }
}