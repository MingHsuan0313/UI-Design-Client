import { BPELComponent } from "../../BPELComponent.model";
import { Condition } from "../condition/condition.model";
import { ElseBranch } from "./branch/else-branch.model";
import { ElseIfBranch } from "./branch/elseif-branch.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class IfElement extends BPELComponentElement {
    // condition, activity, elseIfList, else are in the order
    condition: Condition;
    activity: BPELComponent = null;
    elseifList?: ElseIfBranch[];
    else?: ElseBranch = null;

    constructor() {
        super();
        this.condition = new Condition();
        // eager creation
        this.elseifList = new Array<ElseIfBranch>();
        this.elseifList.push(null);
    }

    push(): void {
        throw new Error("<elseif> should be drawn and wrapped in.");
    }

    pop(): void {
        throw new Error("<elseif> should be drawn and wrapped out.");
    }
}