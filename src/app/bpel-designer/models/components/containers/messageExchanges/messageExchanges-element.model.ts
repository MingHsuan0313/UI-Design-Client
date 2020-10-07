import { MessageExchange } from "./messageExchange.model";

export class MessageExchangesElement {
    messageExchangeList: MessageExchange[]; // 1...*

    constructor() {
        this.messageExchangeList = new Array<MessageExchange>();
    }
}