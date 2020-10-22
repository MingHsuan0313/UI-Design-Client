import VertexStorage from 'src/app/models/vertex-storage.model'
import AbstractComponent from 'src/app/shared/AbstractComponent.model';
import UpdateBPELDocService from '../../services/updateBPELDoc.service';
import { BPELComponentElementWithActivity } from './BPELComponentElementWithActivity.model';
import { BPELComponentElementWithActivityList } from './BPELComponentElementWithActivityList.model';
import { BPELNode } from './BPELNode.model';

// Definition of a BPELComponent: A component that can be drawn and showed on the graph-editor
export abstract class BPELComponent extends BPELNode implements AbstractComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    componentName: string;

    constructor(id: string, protected updateBPELDocService: UpdateBPELDocService) {
        super();
        this.id = id;
        console.log("construct BPELComponent id = " + id);
    }

    getInfo(): any {
        return this;
    }

    getComponentName(): string {
        return this.componentName;
    }

    setVertexStorage(vertexStorage: VertexStorage): void {
        this.vertexStorage = vertexStorage;
    }

    getId(): string {
        return this.id;
    }

    //Overrided in <pick>, <assign>, <if> to filter the sourceActivity type and do corresponding operations based on it
    updateBPELDoc(sourceActivity: BPELComponent): void {
        // 1. setActivity / pushActivity
        if (this.getElement() instanceof BPELComponentElementWithActivity) {
            this.updateBPELDocService.setActivity(sourceActivity, this);
            console.log("[SET ACTIVITY] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
        } else if (this.getElement() instanceof BPELComponentElementWithActivityList) {
            this.updateBPELDocService.pushActivity(sourceActivity, this);
            console.log("[PUSH ACTIVITY] set <" + sourceActivity.getComponentName() + ">" + "(id = " + sourceActivity.getId() + ") "
                        + "to <" + this.getComponentName() + ">" + "(id = " + this.getId() + ") " + "'s activity");
        } else {
            // instanceof BPELComponentElementWithActivityAndActivityList: Overrided in <if>
        }
        // 2. update nodes order
        this.updateBPELDocService.updateOrder(this);
    }
}