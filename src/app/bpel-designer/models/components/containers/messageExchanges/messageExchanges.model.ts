import { BPELNode } from "../../BPELNode.model";
import { MessageExchangesElement } from "./messageExchanges-element.model";

export class MessageExchanges extends BPELNode {
    element: MessageExchangesElement;

    constructor() {
        super();
        this.element = new MessageExchangesElement();
    }
}