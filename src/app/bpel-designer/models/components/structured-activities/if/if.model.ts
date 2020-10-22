import VertexStorage from "src/app/models/vertex-storage.model";
import { IfAttribute } from "./if-attribute.model";
import { IfElement } from "./if-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import { ElseIfBranch } from "./branch/elseif-branch.model";
import { ElseBranch } from "./branch/else-branch.model";

export class If extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: IfAttribute;
    element?: IfElement;
    componentName: string = "if";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new IfAttribute();
        this.element = new IfElement();
        console.log(this.componentName);
    }

    updateBPELDoc(sourceActivity: BPELComponent): void {
        if (sourceActivity instanceof ElseIfBranch) {
            // 1. push <elseif>
            this.updateBPELDocService.pushActivity(sourceActivity, this);
            console.log("[PUSH <elseif>] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
        } else if (sourceActivity instanceof ElseBranch) {
            // 1. set <else>
            this.updateBPELDocService.setActivity(sourceActivity, this);
            console.log("[SET <else>] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
        } else {
            // 1. set activity
            this.updateBPELDocService.setActivity(sourceActivity, this);
            console.log("[Set Activity] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
        }
        // TODO: handle <if> elements order
        // // 2. update nodes order
        // this.updateBPELDocService.updateOrder(this);
    }
}