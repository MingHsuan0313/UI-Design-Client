import VertexStorage from "src/app/models/vertex-storage.model";
import { AssignAttribute } from "./assign-attribute.model";
import { AssignElement } from "./assign-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import { Copy } from "./copy/copy.model";

export class Assign extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: AssignAttribute;
    element?: AssignElement;
    componentName: string = "assign";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new AssignAttribute();
        this.element = new AssignElement();
        console.log(this.componentName);
    }

    updateBPELDoc(sourceActivity: Copy): void {
        if (sourceActivity instanceof Copy) {
            // 1. push <copy>
            this.updateBPELDocService.pushActivity(sourceActivity, this);
            console.log("[PUSH ACTIVITY] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
            // 2. update nodes order
            this.updateBPELDocService.updateOrder(this);
        } else {
            alert("[PUSH ACTIVITY ERROR]");
            throw new Error("<" + this.componentName + "> can only push <copy> to activityList");
        }
    }
}