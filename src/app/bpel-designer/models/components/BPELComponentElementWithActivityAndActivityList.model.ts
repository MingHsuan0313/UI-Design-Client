import { BPELComponentElement } from "./BPELComponent-element.model";
import { BPELComponent } from "./BPELComponent.model";
import { ElseBranch } from "./structured-activities/if/branch/else-branch.model";

export class BPELComponentElementWithActivityAndActivityList extends BPELComponentElement {
    activity: BPELComponent;
    activityList: BPELComponent[];
    else: ElseBranch;   // TODO: temporary solution for <if>, which has an activity + <elseif> list + <else> (2 activities + 1 activityList)

    constructor() {
        super();
        this.activity = null;
        this.else = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }

    pushActivity(activity: BPELComponent): void {
        this.activityList.push(activity);
    }

    setElseBranchActivityForIf(elseBranchActivity: ElseBranch): void {
        this.else = elseBranchActivity;
    }

    getActivityList(): BPELComponent[] {
        return this.activityList;
    }

    hasActivity(activity: BPELComponent) {
        return this.activity == activity;
    }

    hasActivityInList(activity: BPELComponent) {
        return this.activityList.findIndex((component) => component == activity) == -1 ? false : true;
    }

    hasElseBranchActivityForIf(activity: BPELComponent) {
        return this.else == activity;
    }

    removeActivityInList(activity: BPELComponent): void {
        let activityIdx = this.activityList.findIndex((component) => component.getId() == activity.getId());
        this.activityList.splice(activityIdx, 1);
    }
}