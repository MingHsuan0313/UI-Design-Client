import { BPELComponent } from "../../../component/BPELComponent.model";
import { Condition } from "../../../component/structured-activities/condition.model";
import { ElseBranch } from "../../../component/structured-activities/if/branch/else-branch.model";
import { ElseIfBranch } from "../../../component/structured-activities/if/branch/elseif-branch.model";
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