import { TransitionCondition } from "./transitionCondition.model";

export class SourceElement {
    transitionCondition?: TransitionCondition;

    constructor() {
        // eager creation
        this.transitionCondition = new TransitionCondition();
    }
}