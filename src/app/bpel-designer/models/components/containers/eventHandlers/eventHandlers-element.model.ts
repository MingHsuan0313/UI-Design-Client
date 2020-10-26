import { OnAlarm } from "../../others/onAlarm/onAlarm.model";
import { OnEvent } from "./onEvent.model";

export class EventHandlersElement {
    onEventList?: OnEvent[];
    onAlarmList?: OnAlarm[];

    constructor() {
        // eager creation
        this.onEventList = new Array<OnEvent>();
        this.onEventList.push(new OnEvent());
        console.log("[CONSTRUCT] construct a new <onEvent> for the <eventHandlers>");
        this.onAlarmList = new Array<OnAlarm>();
        this.onAlarmList.push(new OnAlarm());
        console.log("[CONSTRUCT] construct a new <onAlarm> for the <eventHandlers>");
    }

    //TODO: handle respective push() and pop() for onEventList and onAlarmList
    push(): void {
        this.onEventList.push(new OnEvent());
        this.onAlarmList.push(new OnAlarm());
    }

    pop(): void {
        this.onEventList.pop();
        this.onAlarmList.pop();
    }
}