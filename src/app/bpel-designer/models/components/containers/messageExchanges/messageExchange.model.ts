import { BPELNode } from "../../BPELNode.model";
import { MessageExchangeAttribute } from "./messageExchange-attribute.model";

export class MessageExchange extends BPELNode {
    attribute: MessageExchangeAttribute;

    constructor() {
        super();
        this.attribute = new MessageExchangeAttribute();
    }
}