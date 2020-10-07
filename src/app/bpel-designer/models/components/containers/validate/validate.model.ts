import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ValidateAttribute } from './validate-attribute.model';

export class Validate extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ValidateAttribute;
    componentName: String = "validate";

    constructor(id: String) {
        super(id);
        this.attribute = new ValidateAttribute();
        console.log(this.componentName)
    }
}