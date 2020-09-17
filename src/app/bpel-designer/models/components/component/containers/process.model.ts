import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../BPELComponent.model'
import { ProcessAttribute } from '../../attribute/containers/process-attribute.model';
import { ProcessElement } from '../../element/containers/process-element.model';

export class Process implements BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ProcessAttribute;
    element?: ProcessElement;

    constructor(init?: Partial<Process>) {
        Object.assign(this, init);
    }

    getInfo(): any {
        return this;
    }
}