import { BPELComponentAttribute } from '../../BPELComponent-attribute.model'

export class ProcessAttribute extends BPELComponentAttribute {
    abstractProcessesList: string[] = undefined; // 1...*
    targetNamespace: string = undefined;
    queryLanguage?: string = undefined;
    expressionLanguage?: string = undefined;
    exitOnStandardFault?: string = undefined;   // "yes | no"

    constructor(name?: string) {
        super(name);
        // Fake data
        let XMLNS_BPEL = "xmlns:bpel=\"http://docs.oasis-open.org/wsbpel/2.0/process/executable\"";
        let targetNamespace = "process.bpel";

        this.abstractProcessesList = [XMLNS_BPEL];
        this.targetNamespace = targetNamespace;
    }
}