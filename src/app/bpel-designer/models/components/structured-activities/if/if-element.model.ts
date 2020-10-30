import { Condition } from "../condition/condition.model";
import { ElseIfBranch } from "./branch/elseif-branch.model";
import { BPELComponentElementWithActivityAndActivityList } from "../../BPELComponentElementWithActivityAndActivityList.model";

export class IfElement extends BPELComponentElementWithActivityAndActivityList {
    // condition, activity, elseIfList, else are in the order
    condition: Condition;
    // activity: BPELComponent;
    // elseifList?: ElseIfBranch[];
    // else?: ElseBranch = null; // TODO: temporary solution: else: ElseBranch;

    constructor() {
        super();
        this.condition = new Condition();
        // activity
        this.activityList = new Array<ElseIfBranch>();
    }

    push(): void {
        throw new Error("<elseif> should be drawn and wrapped in.");
    }

    pop(): void {
        throw new Error("<elseif> should be drawn and wrapped out.");
    }
}