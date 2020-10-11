import { Scope } from "../../containers/scope/scope.model";
import { For } from "../for/for.model";
import { Until } from "../until/until.model";
import { RepeatEvery } from "./repeatEvery.model";

export class OnAlarmElement {
    // <eventHandlers>: has either for or until, or neither of them.
    // <pick>: has either for or until
    for?: For;
    until?: Until;
    repeatEvery?: RepeatEvery;
    scope: Scope;   //TODO:

    constructor() {
        // eager creation
        this.for = new For();
        this.until = new Until();
        this.repeatEvery = new RepeatEvery();
    }
}