export class OnEventAttribute {
    partnerLink: string;
    portType?: string;
    operation: string;
    variable?: string;
    messageExchange?: string;
    // has either messageType or element, or neither of them.
    messageType?: string;
    element?: string;
}