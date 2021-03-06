import { ElseBranchElement } from "./else-branch-element.model";
import { BPELComponent } from "../../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";

export class ElseBranch extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    element?: ElseBranchElement;
    componentName: string = "else";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.element = new ElseBranchElement();
        console.log(this.componentName);
    }

    updateBPELDoc(sourceActivity: BPELComponent): void {
        // 1. setActivity
        this.updateBPELDocService.setActivity(sourceActivity, this);
        console.log("[SET ACTIVITY] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                    + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
    }
}