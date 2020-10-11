import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ForEachAttribute extends BPELComponentAttribute {
    counterName: string = undefined;
    parallel: string = undefined; // "yes | no"
}