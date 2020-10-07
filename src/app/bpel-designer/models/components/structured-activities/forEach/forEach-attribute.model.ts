import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ForEachAttribute extends BPELComponentAttribute {
    counterName: string;
    parallel: string; // "yes | no"
}