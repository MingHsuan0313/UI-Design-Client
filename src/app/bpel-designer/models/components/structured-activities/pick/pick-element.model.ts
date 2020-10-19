import { OnMessage } from "./onMessage.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";
import { OnAlarm } from "../../others/onAlarm/onAlarm.model";

export class PickElement extends BPELComponentElement {
    onMessageList: OnMessage[];
    onAlarmList?: OnAlarm[];

    constructor() {
        super();
        this.onMessageList = new Array<OnMessage>();
        this.onMessageList.push(null);
        // eager creation
        this.onAlarmList = new Array<OnAlarm>();
        this.onAlarmList.push(new OnAlarm());
    }

    push(): void {
        this.onAlarmList.push(new OnAlarm());
    }

    pop(): void {
        this.onAlarmList.pop();
    }
}