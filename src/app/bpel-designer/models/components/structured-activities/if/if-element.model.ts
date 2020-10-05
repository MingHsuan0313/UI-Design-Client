import { BPELComponent } from "../../BPELComponent.model";
import { Condition } from "../condition/condition.model";
import { ElseBranch } from "./branch/else-branch.model";
import { ElseIfBranch } from "./branch/elseif-branch.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class IfElement extends BPELComponentElement {
    condition: Condition;
    activity: BPELComponent;
    elseifList?: ElseIfBranch[];
    else?: ElseBranch;

    constructor() {
        super();
        this.condition = new Condition();
    }
}