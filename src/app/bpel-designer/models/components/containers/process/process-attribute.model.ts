import { BPELComponentAttribute } from '../../BPELComponent-attribute.model'

export class ProcessAttribute extends BPELComponentAttribute {
    abstractProcessesList: String[] = undefined; // 1...*
    targetNamespace: String = undefined;
    queryLanguage?: String = undefined;
    expressionLanguage?: String = undefined;
    exitOnStandardFault?: String = undefined;   // "yes | no"

    constructor(name?: String) {
        super(name);
        // Fake data
        let XMLNS_BPEL = "xmlns:bpel=\"http://docs.oasis-open.org/wsbpel/2.0/process/executable\"";
        let targetNamespace = "process.bpel";

        this.abstractProcessesList = [XMLNS_BPEL];
        this.targetNamespace = targetNamespace;
    }
}