export class CorrelationAttribute {
    set: string = undefined;
    initiate?: string = undefined;   // "yes | join | no"
    // <invoke> only
    pattern?: string = undefined;   // "request | response | request-response"
}