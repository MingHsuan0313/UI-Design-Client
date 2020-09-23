import VertexStorage from 'src/app/models/vertex-storage.model'
import AbstractComponent from 'src/app/shared/AbstractComponent.model';
import { BPELComponentAttribute } from '../attribute/BPELComponent-attribute.model';
import { BPELComponentElement } from '../element/BPELComponent-element.model';

export abstract class BPELComponent implements AbstractComponent{
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: BPELComponentAttribute;
    element?: BPELComponentElement;
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

    getAttribute(): BPELComponentAttribute {
        return this.attribute;
    }

    getElement(): BPELComponentElement {
        return this.element;
    }
}