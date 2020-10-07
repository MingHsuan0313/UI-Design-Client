import { OnMessage } from "./onMessage.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";
import { OnAlarm } from "../../others/onAlarm/onAlarm.model";

export class PickElement extends BPELComponentElement {
    onMessageList: OnMessage[];
    onAlarmList?: OnAlarm[];

    constructor() {
        super();
        this.onMessageList = new Array<OnMessage>();
        // eager creation
        this.onAlarmList = new Array<OnAlarm>();
    }
}