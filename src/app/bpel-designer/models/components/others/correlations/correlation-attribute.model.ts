export class CorrelationAttribute {
    set: string = "";
    initiate?: string = "";   // "yes | join | no"
    // <invoke> only
    pattern?: string = "";   // "request | response | request-response"
}