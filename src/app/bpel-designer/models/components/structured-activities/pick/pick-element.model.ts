import { OnMessage } from "./onMessage.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class PickElement extends BPELComponentElement {
    onMessageList: OnMessage[];
}