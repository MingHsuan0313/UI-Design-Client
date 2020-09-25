import { BPELComponent } from "../../../component/BPELComponent.model";
import { Condition } from "../../../component/structured-activities/if/branch/condition.model";
import { ElseBranch } from "../../../component/structured-activities/if/branch/else-branch.model";
import { ElseIfBranch } from "../../../component/structured-activities/if/branch/elseif-branch.model";
import { BPELComponentElement } from "../../BPELComponent-element.model";

export class IfElement implements BPELComponentElement {
    condition: Condition;
    activity: BPELComponent;
    elseifList?: ElseIfBranch[];
    else?: ElseBranch;

    constructor() {
        this.condition = new Condition();
    }

    add(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }
    remove(component: BPELComponent): void {
        throw new Error("Method not implemented.");
    }

}