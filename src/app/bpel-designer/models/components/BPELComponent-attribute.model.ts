export abstract class BPELComponentAttribute {
    name?: string = undefined;
    suppressJoinFailure?: string = undefined;   // "yes" | "no"

    constructor(name?: string, suppressJoinFailure?: string) {
        this.name = name;
        this.suppressJoinFailure = suppressJoinFailure;
    }
}