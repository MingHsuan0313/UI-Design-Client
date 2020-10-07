import { OnAlarm } from "../../others/onAlarm/onAlarm.model";
import { OnEvent } from "./onEvent.model";

export class EventHandlersElement {
    onEventList?: OnEvent[];
    onAlarmList?: OnAlarm[];

    constructor() {
        // eager creation
        this.onEventList = new Array<OnEvent>();
        this.onAlarmList = new Array<OnAlarm>();
    }
}