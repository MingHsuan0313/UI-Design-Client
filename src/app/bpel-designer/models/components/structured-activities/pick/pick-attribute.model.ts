import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class PickAttribute extends BPELComponentAttribute {
    // If createInstance=”yes”, the events in the <pick> MUST all be <onMessage> events.
    createInstance?: string;    // "yes | no"
}