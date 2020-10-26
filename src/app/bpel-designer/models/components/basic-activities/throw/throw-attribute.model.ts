import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ThrowAttribute extends BPELComponentAttribute {
    faultName: string = "";
    faultVariable?: string = "";
    // definedFaultsNamespaceList can be directly used, by using an appropriate QName, as the value of the faultName attribute
    // e.g. xmlns:FLT="http://example.com/faults"
    definedFaultsNamenspaceList?: string[] = undefined;
}