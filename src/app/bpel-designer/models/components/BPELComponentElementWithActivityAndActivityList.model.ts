import { BPELComponentElement } from "./BPELComponent-element.model";
import { BPELComponent } from "./BPELComponent.model";
import { ElseBranch } from "./structured-activities/if/branch/else-branch.model";

export class BPELComponentElementWithActivityAndActivityList extends BPELComponentElement {
    activity: BPELComponent;
    activityList: BPELComponent[];
    elseBranchActivity: ElseBranch;   // TODO: temporary solution for <if>, which has an activity + <elseif> list + <else> (2 activities + 1 activityList)

    constructor() {
        super();
        this.activity = null;
        this.elseBranchActivity = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }

    pushActivity(activity: BPELComponent): void {
        this.activityList.push(activity);
    }

    setElseBranchActivityForIf(elseBranchActivity: ElseBranch): void {
        this.elseBranchActivity = elseBranchActivity;
    }

    getActivityList(): BPELComponent[] {
        return this.activityList;
    }
}