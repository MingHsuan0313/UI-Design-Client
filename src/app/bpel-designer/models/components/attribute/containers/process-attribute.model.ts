import { Process } from '../../component/containers/process.model';
import { BPELComponentAttribute } from '../BPELComponent-attribute.model'

export class ProcessAttribute implements BPELComponentAttribute {
    name?: String;
    abstractProcesses?: Object[] //TODO:
    targetNamespace?: String;

    constructor() {
        this.name = "process";
        let XMLNS_BPEL = "xmlns:bpel=\"http://docs.oasis-open.org/wsbpel/2.0/process/executable\"";
        this.abstractProcesses = [XMLNS_BPEL];
        this.targetNamespace = "process.bpel";
    }

    getInfo() {
        return this;
    }
}