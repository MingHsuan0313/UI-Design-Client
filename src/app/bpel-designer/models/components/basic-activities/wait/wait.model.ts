import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { WaitElement } from './wait-element.model';

export class Wait extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    element?: WaitElement;
    componentName: string = "wait";

    constructor(id: string) {
        super(id);
        this.element = new WaitElement();
        console.log(this.componentName)
    }
}