import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../BPELComponent.model'

export class Exit extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    componentName: String = "exit";

    constructor(id: String) {
        super(id);
        console.log(this.componentName)
    }
}