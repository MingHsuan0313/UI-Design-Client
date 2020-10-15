import VertexStorage from 'src/app/models/vertex-storage.model'
import AbstractComponent from 'src/app/shared/AbstractComponent.model';
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

    constructor(id: string) {
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
}