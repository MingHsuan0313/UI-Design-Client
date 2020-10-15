import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ValidateAttribute } from './validate-attribute.model';

export class Validate extends BPELComponent {
    id: string;
    x?: string;
    y?: string;
    width?: number;
    height?: number;
    type: string;
    vertexStorage?: VertexStorage;
    attribute?: ValidateAttribute;
    componentName: string = "validate";

    constructor(id: string) {
        super(id);
        this.attribute = new ValidateAttribute();
        console.log(this.componentName)
    }
}