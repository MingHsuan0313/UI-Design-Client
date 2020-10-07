import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ForEachAttribute } from './forEach-attribute.model';
import { ForEachElement } from './forEach-element.model';

export class ForEach extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ForEachAttribute;
    element?: ForEachElement;
    componentName: String = "forEach";

    constructor(id: String) {
        super(id);
        this.attribute = new ForEachAttribute();
        this.element = new ForEachElement();
        console.log(this.componentName)
    }
}