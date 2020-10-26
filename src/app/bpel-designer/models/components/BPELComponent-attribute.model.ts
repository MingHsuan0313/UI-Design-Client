export abstract class BPELComponentAttribute {
    name?: string = "";
    suppressJoinFailure?: string = "";   // "yes" | "no"

    constructor(name?: string, suppressJoinFailure?: string) {
        this.name = name;
        this.suppressJoinFailure = suppressJoinFailure;
    }
}