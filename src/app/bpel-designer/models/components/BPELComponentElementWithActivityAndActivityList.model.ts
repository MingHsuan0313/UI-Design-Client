import { BPELComponentElement } from "./BPELComponent-element.model";
import { BPELComponent } from "./BPELComponent.model";

export class BPELComponentElementWithActivityAndActivityList extends BPELComponentElement {
    activity: BPELComponent;
    activityList: BPELComponent[];
    _activity: BPELComponent;   // TODO: temporary solution for <if>, which has an activity + <elseif> list + <else> (2 activities + 1 activityList)

    constructor() {
        super();
        this.activity = null;
        this._activity = null;
    }

    setActivity(activity: BPELComponent): void {
        this.activity = activity;
    }

    pushActivity(activity: BPELComponent): void {
        this.activityList.push(activity);
    }

    _setActivity(activity: BPELComponent): void {
        this._activity = activity;
    }
}