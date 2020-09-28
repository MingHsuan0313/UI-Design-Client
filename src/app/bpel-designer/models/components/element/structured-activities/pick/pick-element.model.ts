import { OnMessage } from "../../../component/structured-activities/pick/onMessage.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class PickElement extends BPELComponentElement {
    onMessageList: OnMessage[];
}