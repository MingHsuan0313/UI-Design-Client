import { Sources } from "./standard-elements/sources/sources.model";
import { Targets } from "./standard-elements/targets/targets.model";

export abstract class BPELComponentElement {
    sources?: Sources;
    targets?: Targets;

    constructor() {
        // eager creation
        this.sources = new Sources();
        this.targets = new Targets();
    }
}