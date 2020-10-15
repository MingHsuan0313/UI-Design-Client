import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ThrowAttribute } from './throw-attribute.model';

export class Throw extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: ThrowAttribute;
    componentName: string = "throw";

    constructor(id: string) {
        super(id);
        this.attribute = new ThrowAttribute();
        console.log(this.componentName)
    }
}