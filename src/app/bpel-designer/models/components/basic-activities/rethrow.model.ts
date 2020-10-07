import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../BPELComponent.model'

export class Rethrow extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    componentName: String = "rethrow";

    constructor(id: String) {
        super(id);
        console.log(this.componentName)
    }
}