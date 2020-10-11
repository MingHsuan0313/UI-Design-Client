// Not a BPELComponentAttribute because of lacking of standard attributes
export class CopyAttribute {
    keepSrcElementName?: string = undefined;    // "yes | no"
    ignoreMissingFromData?: string = undefined; //"yes | no"
}