import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../BPELComponent.model'

export class Empty extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    componentName: string = "empty";

    constructor(id: string) {
        super(id);
        console.log(this.componentName)
    }
}