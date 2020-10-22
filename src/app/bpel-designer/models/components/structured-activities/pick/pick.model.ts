import VertexStorage from "src/app/models/vertex-storage.model";
import { PickAttribute } from "./pick-attribute.model";
import { PickElement } from "./pick-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import UpdateBPELDocService from "src/app/bpel-designer/services/updateBPELDoc.service";
import { OnMessage } from "./onMessage.model";

export class Pick extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: PickAttribute;
    element?: PickElement;
    componentName: string = "pick";

    constructor(id: string, updateBPELDocService: UpdateBPELDocService) {
        super(id, updateBPELDocService);
        this.attribute = new PickAttribute();
        this.element = new PickElement();
        console.log(this.componentName);
    }

    updateBPELDoc(sourceActivity: OnMessage): void {
        if (sourceActivity instanceof OnMessage) {
            // 1. push <onMessage>
            this.updateBPELDocService.pushActivity(sourceActivity, this);
            console.log("[PUSH ACTIVITY] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
            // 2. update nodes order
            this.updateBPELDocService.updateOrder(this);
        } else {
            alert("[PUSH ACTIVITY ERROR]");
            throw new Error("<" + this.componentName + "> can only push <onMessage> to activityList");
        }
    }
}