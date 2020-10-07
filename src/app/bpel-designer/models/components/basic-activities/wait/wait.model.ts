import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { WaitElement } from './wait-element.model';

export class Wait extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    element?: WaitElement;
    componentName: String = "wait";

    constructor(id: String) {
        super(id);
        this.element = new WaitElement();
        console.log(this.componentName)
    }
}