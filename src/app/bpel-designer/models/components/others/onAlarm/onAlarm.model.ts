import { BPELNode } from "../../BPELNode.model";
import { OnAlarmElement } from "./onAlarm-element.model";

export class OnAlarm extends BPELNode {
    element: OnAlarmElement;

    constructor() {
        super();
        this.element = new OnAlarmElement();
    }
}