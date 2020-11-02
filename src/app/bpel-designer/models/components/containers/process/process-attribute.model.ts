import { BPELComponentAttribute } from '../../BPELComponent-attribute.model'

export class ProcessAttribute extends BPELComponentAttribute {
    abstractProcessesList: string[] = [""]; // 1...*
    targetNamespace: string = "";
    queryLanguage?: string = "";
    expressionLanguage?: string = "";
    exitOnStandardFault?: string = "";   // "yes | no"

    constructor(name?: string) {
        super(name);
    }
}