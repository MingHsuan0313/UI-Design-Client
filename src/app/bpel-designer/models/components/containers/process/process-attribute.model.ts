import { BPELComponentAttribute } from '../../BPELComponent-attribute.model'

export class ProcessAttribute extends BPELComponentAttribute {
    abstractProcessesList: String[]; // 1...*
    targetNamespace: String;
    queryLanguage?: String;
    expressionLanguage?: String;
    exitOnStandardFault?: String;   // "yes | no"

    constructor(name?: String) {
        // Fake data
        let XMLNS_BPEL = "xmlns:bpel=\"http://docs.oasis-open.org/wsbpel/2.0/process/executable\"";
        let targetNamespace = "process.bpel";

        super(name);
        this.abstractProcessesList = [XMLNS_BPEL];
        this.targetNamespace = targetNamespace;
    }
}