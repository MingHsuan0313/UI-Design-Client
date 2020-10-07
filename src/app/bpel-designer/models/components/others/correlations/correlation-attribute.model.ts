export class CorrelationAttribute {
    set: String;
    initiate?: String;   // "yes | join | no"
    // <invoke> only
    pattern?: string;   // "request | response | request-response"
}