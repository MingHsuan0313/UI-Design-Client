import { MessageExchangeAttribute } from "./messageExchange-attribute.model";

export class MessageExchange {
    attribute: MessageExchangeAttribute;

    constructor() {
        this.attribute = new MessageExchangeAttribute();
    }
}