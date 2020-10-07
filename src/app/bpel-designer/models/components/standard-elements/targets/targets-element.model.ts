import { JoinCondition } from "./joinCondition.model";
import { Target } from "./target.model";

export class TargetsElement {
    joinCondition?: JoinCondition;
    targetList: Target[];   // 1...*

    constructor() {
        this.targetList = new Array<Target>();
        // eager creation
        this.joinCondition = new JoinCondition();
    }
}