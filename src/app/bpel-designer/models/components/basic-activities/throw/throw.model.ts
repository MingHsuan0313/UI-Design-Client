import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ThrowAttribute } from './throw-attribute.model';

export class Throw extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ThrowAttribute;
    componentName: String = "throw";

    constructor(id: String) {
        super(id);
        this.attribute = new ThrowAttribute();
        console.log(this.componentName)
    }
}