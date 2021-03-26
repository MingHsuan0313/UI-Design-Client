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

    removeActivityInList(activity: BPELComponent): void {
        let activityIdx = this.activityList.findIndex((component) => component.getId() == activity.getId());
        this.activityList.splice(activityIdx, 1);
    }
}