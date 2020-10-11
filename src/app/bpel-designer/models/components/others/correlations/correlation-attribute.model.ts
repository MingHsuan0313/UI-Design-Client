export class CorrelationAttribute {
    set: String = undefined;
    initiate?: String = undefined;   // "yes | join | no"
    // <invoke> only
    pattern?: string = undefined;   // "request | response | request-response"
}