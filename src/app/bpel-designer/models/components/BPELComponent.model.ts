import VertexStorage from 'src/app/models/vertex-storage.model'
import AbstractComponent from 'src/app/shared/AbstractComponent.model';

// Definition of a BPELComponent: A component that can be drawn and showed on the graph-editor
export abstract class BPELComponent implements AbstractComponent{
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: any; // Because there may be attributes not belonging to BPELComponentAttribute
    element?: any; // Because there may be elements not belonging to BPELComponentElement
    componentName: String;

    constructor(id: String) {
        this.id = id;
        console.log("construct BPELComponent id = " + id);
    }

    getInfo(): any {
        return this;
    }

    getComponentName(): String {
        return this.componentName;
    }

    setVertexStorage(vertexStorage: VertexStorage): void {
        this.vertexStorage = vertexStorage;
    }

    getAttribute(): any {
        return this.attribute;
    }

    getElement(): any {
        return this.element;
    }
}