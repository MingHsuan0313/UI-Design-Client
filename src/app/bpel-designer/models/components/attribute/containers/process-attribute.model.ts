import { BPELComponentAttribute } from '../BPELComponent-attribute.model'

export class ProcessAttribute implements BPELComponentAttribute {
    name?: String;
    abstractProcesses?: Object[] //TODO:
    targetNamespace?: String;

    getInfo() {
        return this;
    }
}