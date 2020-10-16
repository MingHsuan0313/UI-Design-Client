import { MessageExchange } from "./messageExchange.model";

export class MessageExchangesElement {
    messageExchangeList: MessageExchange[]; // 1...*

    constructor() {
        this.messageExchangeList = new Array<MessageExchange>();
        this.messageExchangeList.push(new MessageExchange());
        console.log("[CONSTRUCT] construct a new <messageExchange> for the <messageExchanges>");
    }
}