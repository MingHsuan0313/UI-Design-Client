import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../BPELComponent.model'
import { ProcessAttribute } from '../../attribute/containers/process-attribute.model';
import { ProcessElement } from '../../element/containers/process-element.model';

export class Process extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ProcessAttribute;
    element?: ProcessElement;
    componentName: String = "process";

    constructor(id: String) {
        super();
        this.id = id;
        this.attribute = new ProcessAttribute();
        this.element = new ProcessElement();
        console.log(this.componentName)
    }
}