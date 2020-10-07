export abstract class BPELComponentAttribute {
    name?: String;
    suppressJoinFailure?: String;   // "yes" | "no"

    constructor(name?: String, suppressJoinFailure?: String) {
        this.name = name;
        this.suppressJoinFailure = suppressJoinFailure;
    }
}