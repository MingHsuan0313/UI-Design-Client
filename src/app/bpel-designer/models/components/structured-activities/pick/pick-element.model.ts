import { OnMessage } from "./onMessage.model";
import { OnAlarm } from "../../others/onAlarm/onAlarm.model";
import { BPELComponentElementWithActivityList } from "../../BPELComponentElementWithActivityList.model";

export class PickElement extends BPELComponentElementWithActivityList {
    // onMessageList: OnMessage[];
    onAlarmList?: OnAlarm[];    // supported by the modal editor

    constructor() {
        super();
        // eager creation
        this.onAlarmList = new Array<OnAlarm>();
        this.onAlarmList.push(new OnAlarm());
        // activityList
        this.activityList = new Array<OnMessage>();
    }

    push(): void {
        this.onAlarmList.push(new OnAlarm());
    }

    pop(): void {
        this.onAlarmList.pop();
    }
}