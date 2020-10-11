export abstract class BPELComponentAttribute {
    name?: String = undefined;
    suppressJoinFailure?: String = undefined;   // "yes" | "no"

    constructor(name?: String, suppressJoinFailure?: String) {
        this.name = name;
        this.suppressJoinFailure = suppressJoinFailure;
    }
}