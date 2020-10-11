export class OnEventAttribute {
    partnerLink: string = undefined;
    portType?: string = undefined;
    operation: string = undefined;
    variable?: string = undefined;
    messageExchange?: string = undefined;
    // has either messageType or element, or neither of them.
    messageType?: string = undefined;
    element?: string = undefined;
}