import { JoinCondition } from "./joinCondition.model";
import { Target } from "./target.model";

export class TargetsElement {
    joinCondition?: JoinCondition;
    targetList: Target[];   // 1...*

    constructor() {
        this.targetList = new Array<Target>();
        this.targetList.push(new Target());
        console.log("[CONSTRUCT] construct a new <target> for the <targets>")
        // eager creation
        this.joinCondition = new JoinCondition();
    }

    push(): void {
        this.targetList.push(new Target());
    }

    pop(): void {
        this.targetList.pop();
    }
}